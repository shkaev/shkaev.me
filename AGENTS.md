# Project Notes

## Verification

- Do not run a full `npm run build` for minor visual, spacing, typography, or other style-only changes.
- Run verification only when changes affect logic, routing, data models, Astro content collections, build configuration, or other structural behavior.
- If a visual change is large enough that layout breakage is a realistic risk, verify selectively and only when needed.

## Import Progress

- During long photo imports, proactively report live progress in the form `downloaded X / Y` without waiting for the user to ask.
- If an import is still running, give the latest verified count from the filesystem rather than a vague status message.
