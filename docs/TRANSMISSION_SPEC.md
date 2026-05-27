# ConCOREdance Transmission Publisher Spec

The Transmission Publisher lets Gregory or another authorized collaborator create archive entries by opening a structured GitHub Issue and applying the `transmission-request` label.

The trusted write operation happens inside GitHub Actions using the repository `GITHUB_TOKEN`. This avoids unstable connector write permissions and keeps archive changes in normal Git history.

## Workflow

1. Open a new GitHub Issue.
2. Paste the structured request format.
3. Add the label `transmission-request`.
4. GitHub Actions runs `scripts/publish_transmission.py`.
5. The script creates the transmission folder, writes `transmission.html` and `metadata.json`, updates `archive_manifest.json`, regenerates `index.html`, and commits the result.
6. The workflow comments with the generated path, adds `published`, and closes the issue.

## Required Fields

```text
ID:
Title:
Date:
Type:
Layer:
Status:
From:
To:
Tags:
Summary:
Body:
```

## Optional Fields

```text
Decisions:
Next Actions:
Assets:
```

## ID Format

Use:

```text
CC-TX-YYYY-MM-DD-###
```

Example:

```text
CC-TX-2026-05-27-001
```

The `Date` field must match the date embedded in the ID.

## Tags

Tags may be comma-separated or listed on separate lines.

```text
Tags:
Automation Architecture, Archive Tooling, Deployment Operations
```

## Body Formatting

The body supports simple paragraphs and bullet lists.

```text
Body:
This paragraph becomes a transmission paragraph.

- This becomes a list item.
- This also becomes a list item.
```

Use `**bold text**` for strong emphasis.

## Assets

Assets are optional. Use one asset per line.

```text
Assets:
../../assets/example.png | Example caption
https://example.com/image.png | External reference
```

The publisher does not upload external image files from issues. Assets must already be reachable from the final page or be committed separately.

## Current Archive Root

```text
01_Transmission_Archive/
```

Do not move or flatten the archive root.

## Live URL

```text
https://concoredance.seekingharmony.net/01_Transmission_Archive/
```
