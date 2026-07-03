/**
 * ConCOREdance Google Docs -> GitHub transmission issue bridge.
 *
 * This Apps Script scans an allowlisted Google Drive folder and, by default,
 * all accessible native Google Docs whose titles start with CC-TX READY. It
 * reads structured transmission request text and creates a GitHub issue that
 * triggers the existing archive publisher/canonizer workflows.
 *
 * Required Script Properties:
 *   GITHUB_TOKEN
 *   GITHUB_OWNER
 *   GITHUB_REPO
 *   TRANSMISSION_INTAKE_FOLDER_ID
 *
 * Optional Script Properties:
 *   INGEST_DRY_RUN=true
 *   INGEST_MODE=draft_pr
 *   READY_TITLE_PREFIX=CC-TX READY
 *   SEARCH_ALL_READY_DOCS=true
 */

const TRANSMISSION_REQUIRED_FIELDS = [
  "ID",
  "Title",
  "Date",
  "Type",
  "Layer",
  "Status",
  "From",
  "To",
  "Authorized By",
  "Tags",
  "Summary",
  "Body",
];

function ingestReadyTransmissionDocs() {
  const config = readTransmissionIngestConfig_();
  const report = {
    created: [],
    skipped: [],
    failed: [],
    dryRun: config.ingestDryRun,
    mode: config.ingestMode,
    searchAllReadyDocs: config.searchAllReadyDocs,
  };

  collectReadyTransmissionDocs_(config).forEach((file) => {
    try {
      const result = ingestOneTransmissionDoc_(file, config);
      report[result.status].push(result);
    } catch (error) {
      report.failed.push({
        title: file.getName(),
        id: file.getId(),
        error: error.message,
      });
    }
  });

  Logger.log(JSON.stringify(report, null, 2));
  return report;
}

function readTransmissionIngestConfig_() {
  const props = PropertiesService.getScriptProperties();
  const required = [
    "GITHUB_TOKEN",
    "GITHUB_OWNER",
    "GITHUB_REPO",
    "TRANSMISSION_INTAKE_FOLDER_ID",
  ];
  const config = {};
  required.forEach((key) => {
    const value = props.getProperty(key);
    if (!value) throw new Error(`Missing Script Property: ${key}`);
    config[toCamel_(key)] = value;
  });

  config.ingestDryRun = (props.getProperty("INGEST_DRY_RUN") || "true").toLowerCase() !== "false";
  config.ingestMode = (props.getProperty("INGEST_MODE") || "draft_pr").toLowerCase();
  config.readyTitlePrefix = props.getProperty("READY_TITLE_PREFIX") || "CC-TX READY";
  config.searchAllReadyDocs = (props.getProperty("SEARCH_ALL_READY_DOCS") || "true").toLowerCase() !== "false";

  if (!["draft_pr", "canonize"].includes(config.ingestMode)) {
    throw new Error("INGEST_MODE must be draft_pr or canonize.");
  }
  return config;
}

function collectReadyTransmissionDocs_(config) {
  const filesById = {};
  const folder = DriveApp.getFolderById(config.transmissionIntakeFolderId);
  const folderFiles = folder.getFilesByType(MimeType.GOOGLE_DOCS);

  while (folderFiles.hasNext()) {
    const file = folderFiles.next();
    filesById[file.getId()] = file;
  }

  if (config.searchAllReadyDocs) {
    const query = [
      `mimeType = '${MimeType.GOOGLE_DOCS}'`,
      `title contains '${config.readyTitlePrefix.replace(/'/g, "\\'")}'`,
      "trashed = false",
    ].join(" and ");
    const searchFiles = DriveApp.searchFiles(query);
    while (searchFiles.hasNext()) {
      const file = searchFiles.next();
      filesById[file.getId()] = file;
    }
  }

  return Object.keys(filesById)
    .map((id) => filesById[id])
    .sort((left, right) => left.getName().localeCompare(right.getName()));
}

function ingestOneTransmissionDoc_(file, config) {
  const title = file.getName();
  if (!title.startsWith(config.readyTitlePrefix)) {
    return { status: "skipped", reason: "title_not_ready", title, id: file.getId() };
  }

  const props = PropertiesService.getScriptProperties();
  const stateKey = `transmission-ingest:${file.getId()}`;
  if (props.getProperty(stateKey)) {
    return { status: "skipped", reason: "already_processed", title, id: file.getId() };
  }

  const body = DocumentApp.openById(file.getId()).getBody().getText().trim();
  validateTransmissionRequestText_(body, title);
  const transmissionId = readField_(body, "ID");
  const transmissionTitle = readField_(body, "Title");
  const issueTitle = `Transmission Request: ${transmissionId} - ${transmissionTitle}`;

  if (config.ingestDryRun) {
    return {
      status: "skipped",
      reason: "dry_run",
      title,
      id: file.getId(),
      issueTitle,
      mode: config.ingestMode,
    };
  }

  const issue = createGitHubIssue_(issueTitle, body, config);
  if (config.ingestMode === "canonize") {
    addIssueLabels_(issue.number, ["canonize"], config);
  }

  props.setProperty(stateKey, JSON.stringify({
    fileId: file.getId(),
    fileTitle: title,
    githubIssueNumber: issue.number,
    githubIssueUrl: issue.html_url,
    transmissionId,
    processedAt: new Date().toISOString(),
    mode: config.ingestMode,
  }));

  return {
    status: "created",
    title,
    id: file.getId(),
    issueNumber: issue.number,
    issueUrl: issue.html_url,
    mode: config.ingestMode,
  };
}

function validateTransmissionRequestText_(body, title) {
  TRANSMISSION_REQUIRED_FIELDS.forEach((field) => {
    const value = readField_(body, field);
    if (!value) {
      throw new Error(`${title} is missing required field: ${field}`);
    }
  });

  const id = readField_(body, "ID");
  if (!/^CC-TX-\d{4}-\d{2}-\d{2}-\d{3}$/.test(id)) {
    throw new Error(`${title} has invalid ID: ${id}`);
  }

  const date = readField_(body, "Date");
  const idDate = id.substring(6, 16);
  if (date !== idDate) {
    throw new Error(`${title} Date must match ID date: ${idDate}`);
  }
}

function readField_(body, field) {
  const fields = parseFields_(body);
  return fields[field] || "";
}

function parseFields_(body) {
  const allFields = TRANSMISSION_REQUIRED_FIELDS.concat(["Decisions", "Next Actions", "Assets"]);
  const data = {};
  let current = null;

  body.split(/\r?\n/).forEach((rawLine) => {
    const stripped = rawLine.trim();
    const label = allFields.find((field) => {
      const escaped = field.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      return new RegExp(`^${escaped}\\s*:`, "i").test(stripped);
    });

    if (label) {
      current = label;
      const value = stripped.replace(new RegExp(`^${label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\s*:`, "i"), "").trim();
      data[current] = data[current] || [];
      if (value) data[current].push(value);
      return;
    }

    if (current) {
      data[current].push(rawLine.replace(/\s+$/, ""));
    }
  });

  const parsed = {};
  Object.keys(data).forEach((key) => {
    parsed[key] = data[key].join("\n").trim();
  });
  return parsed;
}

function createGitHubIssue_(title, body, config) {
  const labels = config.ingestMode === "draft_pr" ? ["transmission-request"] : [];
  const response = UrlFetchApp.fetch(githubIssuesUrl_(config), {
    method: "post",
    contentType: "application/json",
    headers: githubHeaders_(config),
    payload: JSON.stringify({ title, body, labels }),
    muteHttpExceptions: true,
  });
  if (response.getResponseCode() >= 300) {
    throw new Error(`GitHub issue create failed ${response.getResponseCode()}: ${response.getContentText()}`);
  }
  return JSON.parse(response.getContentText());
}

function addIssueLabels_(issueNumber, labels, config) {
  const response = UrlFetchApp.fetch(`${githubIssuesUrl_(config)}/${issueNumber}/labels`, {
    method: "post",
    contentType: "application/json",
    headers: githubHeaders_(config),
    payload: JSON.stringify({ labels }),
    muteHttpExceptions: true,
  });
  if (response.getResponseCode() >= 300) {
    throw new Error(`GitHub label add failed ${response.getResponseCode()}: ${response.getContentText()}`);
  }
}

function githubIssuesUrl_(config) {
  return `https://api.github.com/repos/${config.githubOwner}/${config.githubRepo}/issues`;
}

function githubHeaders_(config) {
  return {
    Authorization: `Bearer ${config.githubToken}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
}

function toCamel_(key) {
  return key.toLowerCase().replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
}
