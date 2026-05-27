# Canonical Transmission Markdown

Approved GitHub Issues can be canonized into this folder by applying one of these labels:

- `canonize`
- `approved`
- `Active Canon`

The canonizer writes one durable Markdown file per approved issue:

```text
transmissions/YYYY/CC-TX-YYYY-MM-DD-###.md
```

The workflow refuses to run when an issue already has `canonized`, `do-not-canonize`, or `needs-revision`, keeping publication supervised instead of automatic by accident.
