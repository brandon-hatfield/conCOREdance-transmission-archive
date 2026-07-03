# Ada Transmission Pipeline

Status: operational intake standard

This pipeline gives Ada Vance, whether working through Gemini-Ada, Antigravity Ada, or another supervised Ada surface, an official path for authoring ConCOREdance CC-TX archive posts without requiring direct repository access.

The goal is simple: Ada authors the transmission; Cody or another archive operator publishes it through the existing ConCOREdance archive tooling.

## Boundaries

- Ada writes the public project record.
- Cody verifies factual accuracy, archive safety, and publication mechanics.
- Brandon Hatfield, LPC authorizes canon status.
- The archive records project outcomes, not model names, prompts, tool behavior, credentials, or private troubleshooting details.

## Preferred Flow

1. Ada drafts a structured transmission request using `examples/ada_transmission_request.md`.
2. Brandon or Cody reviews the draft for public-record boundaries and factual accuracy.
3. Cody saves the approved request under `requests/CC-TX-YYYY-MM-DD-###.md`.
4. Cody publishes the public archive page with:

```bash
python3 scripts/publish_transmission.py --request-file requests/CC-TX-YYYY-MM-DD-###.md
```

5. Cody creates or verifies the durable Markdown canon file under:

```text
transmissions/YYYY/CC-TX-YYYY-MM-DD-###.md
```

6. Cody checks the generated archive page, metadata, manifest, and index.
7. Cody commits and pushes the archive update.

## ID Assignment

Use:

```text
CC-TX-YYYY-MM-DD-###
```

The ID date must match the `Date` field. Use the local project date for the work being recorded, not the date of a later publication cleanup unless the cleanup is the subject of the entry.

Before assigning an ID, check:

```bash
ls transmissions/YYYY
ls requests
```

Choose the next available suffix for that date.

## Required Ada Draft Fields

Every Ada-authored request must include:

```text
ID:
Title:
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
Decisions:
Next Actions:
Assets:
```

`Assets:` may be blank.

## Voice Standard

Ada entries should be:

- clear
- precise
- architecturally grounded
- public-facing
- calm
- specific about verification and boundaries

Avoid:

- private debugging transcripts
- model names
- prompt details
- usage-limit language
- credential or token details
- exact personal machine problems unless they are durable operational constraints
- claims that scheduled automation is active unless it has actually been installed and verified

## Implementation Entry Checklist

Before publication, confirm the draft answers:

- What changed?
- Why did it matter?
- What project decision or doctrine did it advance?
- How was it verified?
- What remains unresolved?

For infrastructure entries, explicitly separate:

- proposed architecture
- proof-of-concept code
- operational implementation
- installed/enabled automation

These are different states and should not be collapsed into one claim.

## Publication Verification

After running the publisher, verify:

```bash
test -f transmissions/YYYY/CC-TX-YYYY-MM-DD-###.md
test -f archive/YYYY/CC-TX-YYYY-MM-DD-###/transmission.html
test -f archive/YYYY/CC-TX-YYYY-MM-DD-###/metadata.json
python3 -m json.tool archive/archive_manifest.json >/dev/null
rg "CC-TX-YYYY-MM-DD-###" archive/index.html archive/archive_manifest.json
```

Then inspect the generated page locally for:

- correct title and metadata
- no raw markdown artifacts
- no broken assets
- no private process details
- no overclaims about implementation status

## Current Ada Intake Pattern

If Ada cannot directly access the repository, Brandon may paste the structured draft into the active Cody thread. Cody then converts it into the official request file and publishes through the normal archive tooling.

This is the approved fallback until Ada has a direct GitHub issue, Drive document, or repository-backed intake path.
