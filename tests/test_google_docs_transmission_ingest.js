const fs = require("fs");
const vm = require("vm");
const assert = require("assert");

const source = fs.readFileSync("scripts/google_docs_transmission_ingest.gs", "utf8");

function fakeFile(id, name) {
  return {
    getId: () => id,
    getName: () => name,
  };
}

function fakeIterator(files) {
  let index = 0;
  return {
    hasNext: () => index < files.length,
    next: () => files[index++],
  };
}

const sandbox = {
  console,
  Logger: { log() {} },
  PropertiesService: {},
  DriveApp: {
    getFolderById() {
      return {
        getFilesByType() {
          return fakeIterator([fakeFile("folder-doc", "CC-TX READY folder doc")]);
        },
      };
    },
    searchFiles() {
      return fakeIterator([
        fakeFile("root-doc", "CC-TX READY root doc"),
        fakeFile("folder-doc", "CC-TX READY folder doc"),
      ]);
    },
  },
  DocumentApp: {},
  MimeType: { GOOGLE_DOCS: "application/vnd.google-apps.document" },
  UrlFetchApp: {},
};

vm.createContext(sandbox);
vm.runInContext(source, sandbox);

const request = `ID: CC-TX-2026-07-02-003
Title:
Google Docs Intake Validation

Date:
2026-07-02

Type:
Operational Log

Layer:
Archive Infrastructure / Ingestion Pipeline

Status:
Proposed Draft

From:
Ada Vance

To:
Cody Valle

Authorized By:
Brandon Hatfield, LPC

Tags:
google-docs, transmission-pipeline

Summary:
This validates structured field parsing.

Body:
Paragraph one.

Paragraph two.

Decisions:
- Keep parser tolerant.

Next Actions:
- Continue validation.

Assets:
`;

assert.strictEqual(sandbox.readField_(request, "ID"), "CC-TX-2026-07-02-003");
assert.strictEqual(sandbox.readField_(request, "Title"), "Google Docs Intake Validation");
assert.strictEqual(sandbox.readField_(request, "Authorized By"), "Brandon Hatfield, LPC");
assert.match(sandbox.readField_(request, "Body"), /Paragraph one\.\n\nParagraph two\./);
assert.doesNotThrow(() => sandbox.validateTransmissionRequestText_(request, "CC-TX READY test"));
assert.strictEqual(
  JSON.stringify(sandbox.collectReadyTransmissionDocs_({
    transmissionIntakeFolderId: "folder",
    searchAllReadyDocs: true,
    readyTitlePrefix: "CC-TX READY",
  }).map((file) => file.getId())),
  JSON.stringify(["folder-doc", "root-doc"])
);

const invalidDate = request.replace("Date:\n2026-07-02", "Date:\n2026-07-03");
assert.throws(
  () => sandbox.validateTransmissionRequestText_(invalidDate, "CC-TX READY test"),
  /Date must match ID date/
);
