# Canonical Transmission Markdown

Approved GitHub Issues can be canonized into this folder by applying one of these labels:

- `canonize`
- `approved`
- `Active Canon`

The canonizer writes one durable Markdown file per approved issue:

```text
transmissions/YYYY/CC-TX-YYYY-MM-DD-###.md
```

The same workflow also renders the public HTML archive entry under `archive/` and updates the archive manifest and index.

The workflow refuses to run when an issue already has `canonized`, `do-not-canonize`, or `needs-revision`, keeping publication supervised instead of automatic by accident.
