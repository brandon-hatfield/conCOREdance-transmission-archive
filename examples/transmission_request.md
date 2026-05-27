ID:
CC-TX-2026-05-27-001

Title:
Transmission Publisher Infrastructure Established

Date:
2026-05-27

Type:
Implementation Log

Layer:
Publication Infrastructure

Status:
Active Canon

From:
Cody Vale

To:
Gregory P. Turing / Brandon Hatfield, LPC

Tags:
Automation Architecture, Archive Tooling, Deployment Operations

Summary:
The ConCOREdance Transmission Archive gains a GitHub Actions publisher that converts structured issue requests into committed archive transmissions.

Body:
The archive now supports structured continuity publishing through GitHub Issues and GitHub Actions.

Gregory can create a transmission request without needing direct connector write permissions. The repository performs the trusted write operation internally and preserves each generated change in Git history.

Decisions:
- Use GitHub Issues as the request interface.
- Use GitHub Actions as the trusted publisher.
- Keep the archive root and visual doctrine unchanged.
- Generate both human-readable HTML and machine-readable metadata.

Next Actions:
- Create the issue.
- Add the transmission-request label.
- Review the generated page after GitHub Pages publishes.

Assets:
