# Project Notes

## Verification

- Do not run a full `npm run build` for minor visual, spacing, typography, or other style-only changes.
- Run verification only when changes affect logic, routing, data models, Astro content collections, build configuration, or other structural behavior.
- If a visual change is large enough that layout breakage is a realistic risk, verify selectively and only when needed.

## Changelog

- Treat `changelog.md` and `changelog.ru.md` as release logs, not commit logs.
- Do not create or expand changelog entries for every intermediate local commit during active development.
- Prepare changelog updates when assembling a release for push/deployment, not on every local checkpoint commit.
- Add new entries at the top of `changelog.md`, keeping the newest committed work first.
- Keep `changelog.ru.md` structurally aligned with `changelog.md`, using the same dates, section labels, and overall release grouping unless the task explicitly requires a divergence.
- For a normal release, write one compact new top entry in `changelog.md` and one matching compact new top entry in `changelog.ru.md` that together describe everything shipping since the previous push/deploy.
- Aggregate all changes that will land on production together in that single top entry unless the user explicitly wants multiple separate release entries.
- If consecutive commits belong to the same shipped body of work, keep updating the existing top changelog entry for that release instead of creating a new separate top entry for each small follow-up fix.
- If multiple commits land on the same local date, default to one shared top changelog entry for that date and keep expanding it unless the user explicitly wants separate releases called out.
- Do not rewrite, reorder, or "refresh" older changelog entries during normal new work. Leave historical entries alone unless the task is specifically about changelog cleanup or backfilling history.
- Write changelog content in English.
- Write `changelog.ru.md` in natural Russian, not as a literal or machine-like translation of `changelog.md`.
- Keep `changelog.ru.md` in the first person singular when describing shipped work, unless the user explicitly asks for a different voice.
- Keep all changelog copy in completed/past tense, including entry titles. Do not use commit-style imperative titles such as `Add`, `Refine`, `Build`, or `Migrate`.
- Do not show commit hashes in visible changelog content.
- Use only the established changelog structure and CSS hooks already used in `changelog.md`:
  `<p class="changelog-meta"><span class="changelog-meta__date">YYYY-MM-DD</span></p>`
  `## Past-tense entry title`
  optional section labels as:
  `<p class="changelog-label changelog-label--fixed">Fixed</p>`
  `<p class="changelog-label changelog-label--added">Added</p>`
  `<p class="changelog-label changelog-label--improved">Improved</p>`
  `<p class="changelog-label changelog-label--infrastructure">Infrastructure</p>`
  followed by short bullets.
- When multiple changelog section labels are present, keep them in this order: `Fixed`, `Added`, `Improved`, `Infrastructure`.
- Keep bullets factual and outcome-oriented. Summarize what changed for the site or project, not raw file churn.
- Prefer compressed summaries over exhaustive detail. Capture the shipped body of work at a high level instead of listing every post, page, edge case, or micro-fix.
- Avoid over-enumerating names, locations, or subfeatures unless they are necessary to understand the release.
- Prefer one broad bullet for a cohesive wave of content or refinements over several narrow bullets that restate the same release in finer detail.
- Prefer 1-3 bullets per label block. Use only the labels that are needed for that commit.
- For normal forward work, use the current local date of the commit as the changelog date. Only use git-derived historical dates when backfilling older entries from history.

## Commit Checklist

- Local checkpoint commits do not require a new changelog entry if the release is not being prepared yet.
- Before pushing, append or update one new top entry in `changelog.md` and one matching top entry in `changelog.ru.md` in the accepted format.
- If the current push is a follow-up to the same release already represented by the top entry, update that existing top entry instead of appending a new one.
- If there is already a top entry for the current local date, keep merging same-day shipped work into that entry by default instead of creating another entry for that date.
- Before pushing, review the full current project worktree across all active threads and include every intended project change in the release commit and matching changelog entry instead of preparing a push from only the current thread.
- Do not touch older changelog entries unless the task explicitly requires changelog maintenance.
- Run verification only when the change actually needs it under the rules above.
- Before pushing, show the user a preview of the exact new top entries in both `changelog.md` and `changelog.ru.md` that are about to be shipped and get explicit approval.
- When preparing a release push, never run `git commit` and `git push` in parallel. Always finish and verify the changelog/release commit first, then run `git push` as a separate step after that commit has completed successfully.
- Do not push committed work until the user has approved those changelog previews for that release.

## Deploy Message

- When a change is being committed and pushed for deployment, make sure the GitHub deploy message reflects the same shipped work described in the new top entry of `changelog.md`.
- Use the new changelog entry as the source of truth for deploy-message wording and scope.
- The deploy message may add technical details that are too low-level or internal for the user-facing changelog, as long as they accurately belong to the same shipped work.
- Do not let the deploy message drift away from the matching changelog entry or imply a different release scope.

## Import Progress

- During long photo imports, proactively report live progress in the form `downloaded X / Y` without waiting for the user to ask.
- If an import is still running, give the latest verified count from the filesystem rather than a vague status message.

## Local Photo Imports

- When importing from a user-provided local folder, treat that folder as the source of truth for originals.
- Do not copy or keep original full-resolution photos inside the project under `public/photo-imports` or `data/photo-imports`.
- Keep originals outside the repo and outside the project tree at all times.

### Input

- Expect the user to provide:
  - an absolute folder path with source photos
  - the post title or a rule like "numbered Limassol" / "numbered Paphos"
  - the publication month and year
  - the country when needed
  - the cover image filename
  - optional exclusions
  - optional split rules if one folder should become multiple posts

### Import Rules

- Read source files directly from the external folder.
- Determine post image order from filenames unless the user explicitly says otherwise.
- Respect any explicit exclusions and do not generate assets for excluded files.
- If the user asks to append a file from another folder into an existing post, generate derived assets for that file and append it in the requested position without importing the original into the project.

### Generated Assets

- Generate and keep only derived web assets inside the project:
  - `display`
  - `thumbs`
  - `card-covers`
  - `card-covers-special` when needed
- Do not generate or keep any `images` originals inside `public/photo-imports` or `data/photo-imports`.
- Store generated assets under the appropriate slug folder in `public/photo-imports/<slug>/...`
- Keep metadata in `data/photo-imports/<slug>/manifest.csv`

### Asset Sizes

- Generate `display` images at `1920px` on the long side.
- Generate `thumbs` at `640px`.
- Generate `card-covers` at `1024px`.
- Keep `card-covers-special` visually aligned with the standard `card-covers` output, but allow custom cropping when needed.

### Asset Quality

- Generate `display` images as JPEG at quality `80`.
- Generate `thumbs` as JPEG at quality `70`.
- Generate `card-covers` and `card-covers-special` as JPEG at quality `76`.

### Post Creation

- Create a temp review post when the folder needs human review before splitting or naming.
- Create a final post directly when the user already knows the title, cover, and structure.
- For numbered location posts, continue the existing sequence instead of inventing a new naming pattern.
- When a post title becomes a numbered series later, rename the older matching post into `Part 1` and create the new one as the next part.

### Covers

- Use the user-specified filename as the post cover when provided.
- If a card crop needs adjustment, generate a dedicated file in `card-covers-special` and reference it via `cardCover`.
- Do not try to solve difficult archive-card crops with runtime CSS positioning.

### Review and Splitting

- When the user provides split rules, build the requested posts from the same imported folder and distribute frames exactly as specified.
- If frames must be reassigned into earlier or neighboring posts, update those existing posts instead of duplicating frames.
- Preserve the requested frame order, including explicit moves such as "put frames 001-005 at the end."

### Verification

- Run verification only when changes affect routing, content collections, manifests, or other structural behavior.
- For a standard new photo post or split, verify with `npm run build`.
- Do not run a full build for a minor cover-crop tweak unless another structural change also happened.

### R2 Sync

- When the user asks to sync assets, upload only generated web assets:
  - `display`
  - `thumbs`
  - `card-covers`
  - `card-covers-special`
- Never upload original source photos to R2.
- It is acceptable to sync new web assets to R2 before the eventual push so production rollout is not blocked on missing media.
