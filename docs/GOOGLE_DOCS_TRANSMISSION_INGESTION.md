# Google Docs Transmission Ingestion

Status: proposed operational bridge

This bridge lets Ada write CC-TX transmission drafts as native Google Docs and have those drafts automatically enter the existing GitHub archive workflows.

The bridge does not write archive files directly. It creates a GitHub Issue from a ready Google Doc, then lets the existing GitHub Actions handle draft publication or canonization.

## Architecture

```text
Ada Google Doc
-> Google Apps Script ready-doc scan
-> GitHub Issue
-> Existing transmission publisher or canonizer
-> Archive Markdown, HTML, metadata, manifest, and index
```

This keeps the publication boundary inside GitHub, where the current archive automation already lives.

## Ada Draft Contract

Ada creates a native Google Doc. The designated intake folder remains the preferred home for organization, but the bridge can also scan all accessible Google Docs with the `CC-TX READY` title prefix when `SEARCH_ALL_READY_DOCS=true`.

Title format:

```text
CC-TX READY - CC-TX-YYYY-MM-DD-### - Short Title
```

The document body must use the normal structured request format:

```text
ID:
CC-TX-YYYY-MM-DD-###

Title:
Short Title

Date:
YYYY-MM-DD

Type:
Infrastructure Log

Layer:
Archive Infrastructure / Specific Layer

Status:
Proposed Draft

From:
Ada Vance

To:
Cody Valle

Authorized By:
Brandon Hatfield, LPC

Tags:
tag-one, tag-two, tag-three

Summary:
One concise summary sentence.

Body:
Public-facing transmission body.

Decisions:
- Durable decision.

Next Actions:
- Concrete next action.

Assets:
```

## Apps Script

The bridge script is:

```text
scripts/google_docs_transmission_ingest.gs
```

Install it as a Google Apps Script project that can access the intake Drive folder.

Required Script Properties:

```text
GITHUB_TOKEN=<fine-grained GitHub token>
GITHUB_OWNER=brandon-hatfield
GITHUB_REPO=conCOREdance-transmission-archive
TRANSMISSION_INTAKE_FOLDER_ID=<Drive folder id>
```

Optional Script Properties:

```text
INGEST_DRY_RUN=true
INGEST_MODE=draft_pr
READY_TITLE_PREFIX=CC-TX READY
SEARCH_ALL_READY_DOCS=true
```

## Modes

### `draft_pr`

Creates a GitHub Issue labeled:

```text
transmission-request
```

The existing `Transmission Publisher` workflow prepares a draft PR for human review.

Use this as the default mode.

### `canonize`

Creates a GitHub Issue and then applies:

```text
canonize
```

The existing `Transmission Canonizer` workflow writes canonical Markdown and the public visual archive directly to `main`.

Use this only for trusted, already-approved entries.

## Dry Run

Keep:

```text
INGEST_DRY_RUN=true
```

until the script logs show the expected Docs are detected and validated.

After dry-run validation, set:

```text
INGEST_DRY_RUN=false
```

## Suggested Trigger

Use an Apps Script time-driven trigger:

```text
ingestReadyTransmissionDocs
every 15 minutes
```

Manual execution should remain available for supervised publication moments.

## Duplicate Protection

The script stores processed document IDs in Apps Script Properties. A ready Doc is processed once unless the stored property is manually removed.

## Safety Rules

- Prefer the designated intake folder for organization.
- Process only native Google Docs whose titles begin with `CC-TX READY`.
- Keep `SEARCH_ALL_READY_DOCS=true` when Ada cannot create Docs directly inside the intake folder.
- Require all structured fields before creating a GitHub Issue.
- Keep the GitHub token in Apps Script Properties, never in the Doc body.
- Prefer `draft_pr` mode unless Brandon explicitly authorizes direct canonization.
- Do not use this bridge for private clinical data or PHI.

## Operational Handoff

Once configured, the normal flow becomes:

```text
Ada writes Google Doc
-> Ada titles it CC-TX READY...
-> Apps Script creates GitHub Issue
-> GitHub Actions publish or canonize
-> Cody verifies archive result
```

This removes Neal from routine copy-paste and drag-and-drop handling while keeping review and publication boundaries intact.
