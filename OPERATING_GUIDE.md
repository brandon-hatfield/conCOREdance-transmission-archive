# ConCOREdance Transmission Archive Operating Guide

This guide explains the normal transmission workflow for Brandon Hatfield, LPC, Gregory, and Cody.

The short version:

```text
GitHub Issue -> review -> canonize label -> Markdown canon + visual archive -> mark complete
```

## Roles

**Gregory**

Creates structured transmission issues and preserves the voice, doctrine, and creative intent.

**Brandon Hatfield, LPC**

Reviews the issue, decides whether it is ready for canon, and confirms the final archive entry.

**Cody**

Maintains the automation, archive structure, templates, and implementation integrity.

## Create a Transmission Issue

1. Open a new GitHub Issue.
2. Use the transmission request format.
3. Include the required fields:

```text
ID:
Date:
Type:
Layer:
Status:
From:
To:
Authorized By:
Tags:
Summary:
Body:
```

`Title:` is optional. If it is missing, the automation uses the GitHub issue title.

`Authorized By:` should name the person who approved the transmission for canon. It is not the same as `From:`; a transmission can be written by Gregory, Paula, or Cody while still being authorized by Brandon Hatfield, LPC.

4. Add optional sections when useful:

```text
Decisions:
Next Actions:
Assets:
```

5. Save the issue.

## Review the Issue

Before canonizing, Brandon Hatfield, LPC should confirm:

- The ID uses `CC-TX-YYYY-MM-DD-###`.
- The `Date` matches the date embedded in the ID.
- The summary is clear.
- The body is complete enough to become historical record.
- `Authorized By:` reflects the person approving the transmission for canon.
- Decisions and next actions are included when relevant.
- The issue should become permanent canon.

If the issue is not ready, use a normal comment or apply `needs-revision`.

## Canonize an Approved Issue

When the issue is ready, apply one approval label:

```text
canonize
approved
Active Canon
```

The automation matches these approval labels case-insensitively, but the labels
above are the canonical spellings to use in GitHub.

The GitHub Action will automatically:

1. Read the issue content.
2. Create a Markdown canon file:

```text
transmissions/YYYY/CC-TX-YYYY-MM-DD-###.md
```

3. Create the visual archive entry:

```text
###/transmission.html
archive/YYYY/CC-TX-YYYY-MM-DD-###/metadata.json
```

4. Update:

```text
archive/archive_manifest.json
archive/index.html
```

5. Add the `canonized` label to the issue.
6. Comment on the issue with the generated paths.

## Confirm the Result

After the workflow finishes, Brandon Hatfield, LPC should check:

1. The issue has the `canonized` label.
2. The generated Markdown file exists under `transmissions/YYYY/`.
3. The visual transmission page exists under `archive/YYYY/`.
4. The live archive index includes the new transmission.
5. The page title, summary, body, decisions, and next actions look right.

Live archive:

```text
https://www.concoredance.com/archive/
```

GitHub Pages may take a minute to update after the commit lands.

## Mark the Issue Complete

Once the Markdown and visual archive entries are confirmed:

1. Mark the GitHub Issue complete or close it.
2. Leave the `canonized` label in place.
3. Do not delete the issue. The issue remains the drafting and discussion record.

## Blocking Labels

These labels prevent canonization:

```text
canonized
do-not-canonize
needs-revision
```

Blocking labels are also matched case-insensitively.

Use `needs-revision` when a transmission should pause before becoming permanent.

Use `do-not-canonize` when an issue should remain discussion only.

## What Lives Where

**GitHub Issues**

Drafting space, collaboration history, and review trail.

**transmissions/**

Durable Markdown canon. This is the plain-text historical record.

**archive/**

Public visual archive. This is the reader-facing archive experience.

## If Something Fails

Open the GitHub Actions run named `Transmission Canonizer`.

Common causes:

- Missing `ID`, `Date`, `Summary`, or `Body`.
- ID does not match `CC-TX-YYYY-MM-DD-###`.
- `Date` does not match the date embedded in the ID.
- The issue already has `canonized`, `needs-revision`, or `do-not-canonize`.

Fix the issue body or labels, then apply the approval label again.
