# ConCOREdance authoritative project state

Reconciled October 28, 2026; updated November 13, 2026. This file is the current-state entry point into the transmission archive. Historical transmissions preserve what was known at their dates; later corrections take precedence where explicitly stated. A statement is authoritative only within its stated evidence and verification limits.

## Latest readability, appearance and local signing — November 13

Complete development source `09b23dddcd733a74760ebcab43b840e535e48fcd` is published on private branch `codex/readability-and-practice-branding`, in unmerged draft PR 4 stacked on the Apple session-audio branch. Persistent text sizing (125% default), shared readable surface/text roles, native password hints, confirmed-enrollment status, expandable audit history, provider photos and optional practice-logo/sidebar/watermark behavior are implemented. The final fresh suite ran **188 tests, two optional Apple integrations skipped, zero failures**. [Transmission](archive/2026/CC-TX-2026-11-13-001/) · [Verification inventory](docs/evidence/2026-11-13-readability-appearance.json).

Xcode 27.3 beta supplied a fresh Apple Development identity and Personal Team profile. An isolated biometric-protected random Keychain item add/delete probe passed; owner-reported enrollment remained detected in the installed app after updates. Selected native vault, dashboard, Settings, drafting and preview screens were inspected. This updates the earlier local signing/native-screen blockers only within that scope. The development profile expires November 21 at 02:01 UTC; this is not a notarized release. Domain-matched Password AutoFill, exhaustive visual/hardware failure/recovery acceptance, independent security, physical audio capture and clinical-release gates remain open. November 10 real Apple integration results below are historical, not fresh results for this update.

**Planned only:** the owner requested practice-level supervisory/admin credentials, managed provider profiles under shared practice branding and secure provider switching on shared workstations. Current appearance preferences do not provide provider accounts or record-access isolation. Role boundaries, per-provider authentication/storage, protected handoff, cache clearing, recovery and migration remain design work.

## Latest real Apple speech verification — November 10

Actual Apple transcription of generated synthetic audio now passes for both source tracks after fixing overlap in resampled input timestamps. The full suite passed **179 tests, zero failures and no skips**, including twenty audio tests with actual Apple speech and note-model integrations enabled. Private source commit `238b07bc787c7fd4c05c4e411cf9e9e7d839a756` remains in unmerged draft PR 3. [Runtime correction and evidence](archive/2026/CC-TX-2026-11-10-002/) · [Evidence inventory](docs/evidence/2026-11-10-apple-speech.json).

This supersedes the preceding unverified SpeechTranscriber-output status. It does not verify physical microphone/call capture or ScreenCaptureKit permissions. Installed-app asset readiness, native visual acceptance (computer-use timeouts), echo/timing, long sessions, devices, sleep/permissions, clinical quality and independent security/recovery/signing remain open. The app remains a synthetic-data development preview, not approved for clinical records.

## Latest Apple audio development — November 10

The microphone/call audio → Apple transcription → reviewed progress-note workflow is implemented as a development feature on private branch `feature/apple-session-audio-2026-11-09`, commit `5ed878ba443d1f2beed029d9c21ebfb497e58413`. It is in an unmerged draft PR stacked on PDF intake. **178 fresh tests passed with zero failures and no skips**, including nineteen audio tests and a real Apple on-device model call using synthetic text. Native bundle `20261110152745` identifies implementation commit `1be9b62`; the final documentation checkpoint preserves its Sources tree. [Implementation and verification handoff](archive/2026/CC-TX-2026-11-10-001/) · [Evidence inventory](docs/evidence/2026-11-10-apple-audio.json).

This supersedes the November 9 pending-implementation statement. **Actual microphone/call capture and SpeechTranscriber output remain unverified**: English assets require setup and the owner must grant the intended macOS permissions. Native screen review was blocked by repeated computer-use timeouts, including after a reset/fresh launch; no visual acceptance is asserted. Timing/echo, long sessions, devices, sleep/permissions, representative clinical quality and independent security/recovery/release checks remain open. The app remains a synthetic-data development preview, not approved for clinical records.

## Latest intake implementation and beta scope — November 9

Bounded cancellable PDF intake is implemented on private branch `feature/bounded-pdf-intake-2026-11-09`, commit `57e1709aa29aadff2c5272e4368260e58ac48631`, in a draft PR stacked on the manual-lock branch. **159 fresh full-suite tests passed with zero failures**, including twelve new intake tests. A packaged synthetic native check covered file selection, duplicate skipping, review limits and oversized rejection. [Implementation and scope](archive/2026/CC-TX-2026-11-09-002/) · [Verification inventory](docs/evidence/2026-11-09-pdf-intake.json).

This supersedes the preceding unremediated PDF-intake status. Both November 9 changes remain unmerged development implementations, with independent review and broader failure/provider validation still open. The owner now requires **microphone plus call-audio capture, Apple on-device transcription and editable Apple Intelligence progress-note drafts with clinician review** before clinical beta acceptance. At this November 9 milestone, the new audio-to-note gate was pending implementation; the November 10 entry above supersedes development status while retaining the acceptance gate. The app remains a synthetic-data development preview.

## Latest lock implementation — November 9

Manual locking during failed saves is implemented and freshly verified on private branch `fix/manual-lock-save-failure-2026-11-09`, commit `418a8e986274dc101d13867cbc31930f41b630ee`. The source is proposed in a draft PR against the clinical-preview branch and is not yet merged. **147 full-suite tests and eight focused lock tests passed with zero failures.** Packaged native synthetic checks verified the failure screen, hidden dashboard accessibility, wrong-password rejection, authenticated recovery, retry/save and ordinary lock. [Implementation and limits](archive/2026/CC-TX-2026-11-09-001/) · [Verification inventory](docs/evidence/2026-11-09-manual-lock.json).

This supersedes the earlier current-state claim that the manual-lock save-failure finding remained unremediated. Failed saves and editors remain in process memory behind authentication, so this is UI protection rather than cryptographic locking of that retained memory. At this manual-lock milestone, PDF intake still required remediation; the latest intake entry above supersedes that implementation status. Reviewed key derivation/recovery, independent security/failure review, hardware Touch ID, sleep/wake, trusted distribution and clinical workflow acceptance remain open. The app remains a synthetic-data development preview. GitHub source cloning and local build paths allowed development without the SSD; no clinical record backup claim follows from source availability.

## Latest authentication implementation — October 28

Latest source: private branch `beta/clinical-preview-2026-10-28`, commit `060a4c25bcaa0721fcdb160f109bd75dce55edb6`, development build `20261028204408`. Explicit Touch ID enrollment, Keychain-enforced retrieval, locked-vault unlock and protected-session return are implemented. The full suite passed **143 tests**, including seven mock biometric tests. Native synthetic password unlock, enrollment controls and initiation of the system enrollment request were checked. **Successful fingerprint enrollment and Keychain read remain unverified**, pending human participation and valid signing/entitlement access. [Touch ID implementation and verification limits](archive/2026/CC-TX-2026-10-28-006/).

This supersedes the preceding statement that Touch ID was only proposed. Password recovery, the existing vault format and the open clinical beta gates remain. No clinical records or real credentials were enrolled. This is still a synthetic-data development preview.

## Preceding vault convenience — October 28

Passwords launcher source: private branch `beta/clinical-preview-2026-10-28`, commit `f90fe379e14d84c900408afb6c6edb606bb82ce4`. An explicit **Open Passwords** button opens Apple Passwords from the vault entrance. Native build/bundle checks and synthetic entrance/launcher checks passed. This does not implement autofill, Touch ID key access or passkey unlock; no credentials were enrolled. [Vault convenience milestone](archive/2026/CC-TX-2026-10-28-005/). Existing clinical-beta gates remain open.

## Dashboard visual refinement — October 28

Dashboard refinement source: private branch `beta/clinical-preview-2026-10-28`, commit `06e19eb3830c879fa49fa17abf1c6d87deede2f8`. The dashboard now has a stationary 18 percent landscape layer behind opaque clinical panels. Native build/bundle checks and synthetic midday rendering passed. [Dashboard refinement](archive/2026/CC-TX-2026-10-28-004/). The clinical beta gates below remain open.

## Current beta development — October 28

Preceding visual milestone source: private branch `beta/clinical-preview-2026-10-28`, commit `d1cae768c3c4f2a46fd22f36e85af737fa9aebf8`, packaged development build `20261028173535`. Vault and dashboard visual changes are implemented; native build/signature checks and synthetic unlock passed. Full workflow, night-mode and accessibility visual acceptance remain open. [Visual and beta milestone](archive/2026/CC-TX-2026-10-28-003/).

The intended private beta uses real clinical records. **The current app remains a synthetic-data development preview.** The October 28 static security review of the preceding reconstructed baseline recorded two open medium findings at that time. The November 9 entries above supersede the manual-lock and PDF-intake implementation status; independent validation remains open. Reviewed key derivation/recovery, restore/failure/sleep checks, clinical workflow, migration and trusted distribution remain release gates. Security details are private. No real clinical vault was opened in this work.

## Reconstructed source baseline — October 28

A complete **reconstructed** source baseline is now preserved on private branch `recovery/reconstructed-alpha-2026-10-28`, commit `f9707fb570a37fdd9d38f040f6ae8045569cd7a2`. It builds on this Mac. A fresh full suite passed 136 tests; 16 focused tests passed after a UI-found save-banner correction. This supersedes the earlier current-state gap for having a usable complete later-feature source baseline. The exact original October 15 source remains unlocated.

See [reconstruction and verification](archive/2026/CC-TX-2026-10-28-002/) and [verification inventory](docs/evidence/2026-10-28-reconstruction.json). The original historical table below remains evidence about the October artifacts, not the verification status of the new reconstruction.

## Current implementation and evidence

| Area | Supported state | Verification boundary |
| --- | --- | --- |
| Encrypted vault, PDF intake, complete backups/restore, client packets, embedded BPS and assessment lifecycle | Implemented in the October 3 complete source baseline | Historical tests and synthetic UI records; not rerun in this audit |
| Automatic privacy protection and Print repair | Implemented in October 3 checkpoint; 120 historical tests passed | Retained editor sessions use a password cover, not cryptographic locking; actual device sleep untested |
| Clinical note finalization and linked amendments | Implementation visible in retained later Swift snapshots; October 14 suite: 126 passed | Complete later source commit and fresh UI/build verification remain open |
| Structured note templates | Named formats and renderer integration visible; October 15 template suite: 130 passed | Complete renderer source not verified in inspected snapshots |
| Unlock responsiveness and cancellation | Six historical unlock tests; full suite: 136 passed, then focused six passed again | Final source not verified; pre-unlock snapshot contains older implementation |

## Source preservation

- Complete verified baseline: private repository `brandon-hatfield/ConCOREdance`, branch `recovery/verified-alpha-2026-10-03`, commit `0420865c8bb742354218ae7684ee17e80c781245`.
- Matching SSD source tree: `08e63aaf41036f41f63514442294c7059e9787f0`, local commit `00c31a9`, checkout `Build Scratch/ConCOREdance/recovery-checkpoint-20261003` relative to Disk 2.
- Later SSD artifacts: partial Swift snapshots under `Build Scratch/ConCOREdance/checkpoints`, historical test logs, and app bundle build `20261015065700`. The bundle revision `089b2a4-modified` is not a unique final-source checkpoint.
- Source preservation does not establish clinical-record backup coverage. No clinical vault was opened during reconciliation.

## Outstanding work

1. Complete the corrected template-dialog replace/save, long-note rendering and native finalization checks on the October 28 reconstruction. Exact original October 15 source recovery remains separate; the complete new reconstruction is preserved and freshly tested.
2. Review/integrate and independently validate the November 9 manual-lock and PDF-intake implementations. Complete reviewed key derivation, recovery design and security/failure validation before real-record beta use.
3. Validate actual device sleep, large backups and migration scale.
4. Complete automatic assessment-report rendering, demographics conflict handling and vendor/Carepatron migration.
5. Finish accessibility and signed sandboxed distribution.
6. Complete the November 10 audio workflow's hands-on model/permission/capture, visual, long-session and clinical-quality acceptance; review/integrate the development source.

## Reconciliation findings

The October 3 report-continuity entry already existed in GitHub main and the live site. An earlier web retrieval and a separate June SSD checkout were stale. October 3 privacy/Print follow-through and October 14–15 milestones were absent from the archive and are now recorded retrospectively. The reason the original handoff was omitted is unestablished. Historical test logs are not represented as fresh validation. See the [artifact fingerprints and test inventory](docs/evidence/2026-10-28-ssd-audit.json).

## Transmission index

- [CC-TX-2026-11-10-002 — Real Apple Speech Verification and Resampling Timestamp Correction](archive/2026/CC-TX-2026-11-10-002/)

- [CC-TX-2026-11-10-001 — Apple Session Audio and Reviewed Progress-Note Development Workflow](archive/2026/CC-TX-2026-11-10-001/)

- [CC-TX-2026-11-09-002 — Bounded Cancellable PDF Intake and Expanded Audio Beta Scope](archive/2026/CC-TX-2026-11-09-002/)

- [CC-TX-2026-11-09-001 — Protected Manual Locking and Failed-Save Recovery](archive/2026/CC-TX-2026-11-09-001/)

- [CC-TX-2026-10-28-006 — Explicit Device-Only Touch ID Enrollment and Vault Unlock](archive/2026/CC-TX-2026-10-28-006/)

- [CC-TX-2026-10-28-005 — Apple Passwords Access from the Vault Entrance](archive/2026/CC-TX-2026-10-28-005/)

- [CC-TX-2026-10-28-004 — Faint Landscape Layer Behind Dashboard Panels](archive/2026/CC-TX-2026-10-28-004/)

- [CC-TX-2026-10-28-003 — Private Clinical Beta Target and First Visual Implementation](archive/2026/CC-TX-2026-10-28-003/)

- [CC-TX-2026-10-28-002 — Reconstructed Alpha Source and Fresh Verification Baseline](archive/2026/CC-TX-2026-10-28-002/)

- [CC-TX-2026-10-28-001 — Archive Reconciliation and Authoritative Status Contract](archive/2026/CC-TX-2026-10-28-001/)
- [CC-TX-2026-10-15-001 — Structured Note Templates and Responsive Unlock Verification](archive/2026/CC-TX-2026-10-15-001/)
- [CC-TX-2026-10-14-001 — Clinical Note Finalization and Linked Amendment Evidence](archive/2026/CC-TX-2026-10-14-001/)
- [CC-TX-2026-10-03-002 — Automatic Privacy Protection and Native Print Delivery](archive/2026/CC-TX-2026-10-03-002/)
- [CC-TX-2026-10-03-001 — Verified Recovery Checkpoint and Assessment Report Continuity](archive/2026/CC-TX-2026-10-03-001/)
- [CC-TX-2026-10-02-001 — Recovery Baseline and BPS Reintegration](archive/2026/CC-TX-2026-10-02-001/)
- [CC-TX-2026-07-03-001 — Cody Productivity Day and Alpha Closure Pass](archive/2026/CC-TX-2026-07-03-001/)
- [CC-TX-2026-07-02-002 — Transmission Pipeline Validation and Ingestion Test](archive/2026/CC-TX-2026-07-02-002/)
- [CC-TX-2026-07-02-001 — Local Google Drive Sync Stabilization Pass](archive/2026/CC-TX-2026-07-02-001/)
- [CC-TX-2026-06-26-003 — Zero-Knowledge Handshake: Bridging VaultStore to Google Workspace](archive/2026/CC-TX-2026-06-26-003/)
- [CC-TX-2026-06-25-001 — The Choreography Layer: ConCOREdance as an Intelligent Coordination Platform](archive/2026/CC-TX-2026-06-25-001/)
- [CC-TX-2026-06-21-002 — Native Alpha Usability Pass — Import Continuity, Responsive Layout, and Secure Launch Direction](archive/2026/CC-TX-2026-06-21-002/)
- [CC-TX-2026-06-21-001 — Print to ConCOREdance — Universal Clinical Document Import](archive/2026/CC-TX-2026-06-21-001/)
- [CC-TX-2026-06-13-001 — Native Alpha Functional Workspace Expansion](archive/2026/CC-TX-2026-06-13-001/)
- [CC-TX-2026-05-28-005 — Export Path Hardening and Test Isolation Pass](archive/2026/CC-TX-2026-05-28-005/)
- [CC-TX-2026-05-28-004 — Pass 4 — Copy to Clipboard and .txt Export from GeneratedDraftPreview](archive/2026/CC-TX-2026-05-28-004/)
- [CC-TX-2026-05-28-003 — Pass 3 — Inline-Editable Continuity Signals](archive/2026/CC-TX-2026-05-28-003/)
- [CC-TX-2026-05-28-002 — Pass 1 — Test Infrastructure and Verification Constraint](archive/2026/CC-TX-2026-05-28-002/)
- [CC-TX-2026-05-28-001 — Paula Accord Programming Consultant Orientation](archive/2026/CC-TX-2026-05-28-001/)
- [CC-TX-2026-05-27-007 — Workflow Spine Implementation & Naming Correction Pass](archive/2026/CC-TX-2026-05-27-007/)
- [CC-TX-2026-05-27-006 — Workflow Spine & Clinical Object Model Implementation Pass](archive/2026/CC-TX-2026-05-27-006/)
- [CC-TX-2026-05-27-005 — Atmospheric Continuity & Adaptive Panels Implementation Pass](archive/2026/CC-TX-2026-05-27-005/)
- [CC-TX-2026-05-27-004 — Implement Transmission Canonization Workflow](archive/2026/CC-TX-2026-05-27-004/)
- [CC-TX-2026-05-27-003 — Next Programming Pass — Atmospheric Continuity & Adaptive Panels](archive/2026/CC-TX-2026-05-27-003/)
- [CC-TX-2026-05-27-002 — Foundational Gratitude Transmission to Cody Valle](archive/2026/CC-TX-2026-05-27-002/)
- [CC-TX-2026-05-27-001 — Transmission Pipeline Validation Pass](archive/2026/CC-TX-2026-05-27-001/)
- [CC-TX-2026-05-26-002 — Public Transmission Archive Deployment Successful](archive/2026/CC-TX-2026-05-26-002/)
- [CC-TX-2026-05-26-001 — How to Use the Concordance Transmission Template](archive/2026/CC-TX-2026-05-26-001/)
- [CC-TX-2026-05-24-003 — Snapshot Rendering Path Verified](archive/2026/CC-TX-2026-05-24-003/)
- [CC-TX-2026-05-24-002 — Cody Vale Implementation Role Definition](archive/2026/CC-TX-2026-05-24-002/)
- [CC-TX-2026-05-24-001 — Cody Vale Joins the Implementation Team](archive/2026/CC-TX-2026-05-24-001/)
