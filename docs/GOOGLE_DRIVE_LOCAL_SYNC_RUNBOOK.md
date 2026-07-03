# Google Drive Local Sync Runbook

Status: operational local runner

This runbook describes the local sync path used when Google Drive for desktop is mounted on this Mac. It is the operational local runner for the archive workspace; the broader Apps Script architecture remains a separate proof of concept.

## Current Source

Google Drive account:

```text
brandon.hatfield@seekingharmony.net
```

Drive source root:

```text
~/Library/CloudStorage/GoogleDrive-brandon.hatfield@seekingharmony.net/My Drive/ConCOREdance
```

Repository working copy:

```text
{REPO_ROOT}
```

`{REPO_ROOT}` resolves to the directory containing this repository checkout. If the configured Drive path is not present, the runner tries to auto-discover a mounted `GoogleDrive-*` folder under `~/Library/CloudStorage`.

## Current Allowlist

The active config is `config/google_drive_sync.json`.

It maps:

| Drive path | Repo path |
| --- | --- |
| `README_UPLOAD_INSTRUCTIONS.md` | `README_UPLOAD_INSTRUCTIONS.md` |

The public archive is now generated and published from GitHub, not imported from
Google Drive. `archive` is the clean public URL path used by
`https://www.concoredance.com/archive/`; the legacy `01_Transmission_Archive`
folder has been removed.

Deletes are disabled by default. If a file is missing from Drive, the runner does not remove the GitHub copy.

Existing GitHub files are protected on the first baseline. If Drive has an older copy of a file that already differs from GitHub, the runner records it as `protected` instead of overwriting the repository. After a baseline exists, a later Drive-side hash change is treated as an intentional update and can be copied into the repo.

## Commands

Preview changes:

```bash
python3 scripts/local_google_drive_sync.py --dry-run
```

Apply Drive additions and updates into the local repo:

```bash
python3 scripts/local_google_drive_sync.py
```

Apply and commit:

```bash
python3 scripts/local_google_drive_sync.py --commit
```

Run through the launchd wrapper:

```bash
scripts/run_local_google_drive_sync.sh
```

## Outputs

The runner writes:

- `data/google_drive_sync_manifest.json` in the repository
- JSON reports under `output/reports`
- launchd wrapper logs under `output/reports`
- launchd stdout/stderr under `output/reports`

The manifest records source path, target path, size, modified time, and SHA-256 hash for every allowlisted Drive file. It avoids volatile run timestamps so repeated no-op sync checks do not create pointless Git changes.

## Safety Rules

- Source is allowlisted, not the entire Drive.
- Deletes are disabled unless explicitly enabled in config.
- The runner refuses to write outside the configured repository root.
- The runner refuses source paths outside the configured Drive root.
- GitHub push may still require connector publishing if local Git credentials are unavailable.

## Scheduled Job

The included launchd plist runs every 30 minutes:

```text
launchd/com.concordance.google-drive-sync.plist
```

Install command:

```bash
mkdir -p "$HOME/Library/LaunchAgents"
ln -sf "$(pwd)/launchd/com.concordance.google-drive-sync.plist" "$HOME/Library/LaunchAgents/com.concordance.google-drive-sync.plist"
launchctl bootstrap "gui/$(id -u)" "$HOME/Library/LaunchAgents/com.concordance.google-drive-sync.plist"
```

On this Mac, manual sync is verified. The launchd schedule may require granting the launching shell or automation host permission to read Google Drive for desktop or any removable volume that hosts the repository; without that macOS can return `Operation not permitted` when launchd tries to read the mounted files. Leave the job unloaded until that privacy permission is granted.
