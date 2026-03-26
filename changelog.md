# Changelog

This file tracks meaningful production updates to `shkaev.me`.
Add newer committed work at the top, group updates by date, and describe outcomes rather than raw file churn.
Use completed/past tense throughout, including entry titles, and do not show commit hashes in visible content.

<p class="changelog-meta"><span class="changelog-meta__date">2026-03-26</span></p>

## Expanded and refined the photography archive

<p class="changelog-label changelog-label--added">Added</p>

- Added new Cyprus photography series for October 2023 through May 2024, including Limassol, Troodos, Agios Pavlos, Nicosia, and Kampi Trail Hike entries.
- Extended the photography archive with the next Limassol sequence, including Parts 8 and 9, plus a standalone Limassol Carnival 2024 post.
- Added the next archive wave for June 2024 through March 2025, including Zygi, Edro III Shipwreck, Abu Dhabi, Pissouri, Q Gardens, Home & Kids, Hiking, and the next Paphos, Larnaca, Limassol, and carnival entries.

<p class="changelog-label changelog-label--improved">Improved</p>

- Improved photography archive cards with optional custom card covers so difficult crops could be framed more intentionally.
- Fixed custom photography card covers so special archive crops loaded from the R2 photo domain instead of broken relative paths on the main site.
- Improved archive continuity by rebalancing several photography series across months so Limassol, Paphos, Nicosia, and related side trips stayed in the right narrative buckets.
- Improved photo series navigation so archive and case study Back links returned to the correct section without jumping into the wrong previous page, while preserving scroll restore on the listing pages.
- Improved gallery affordances with a pointer cursor in the lightbox image, better flag tooltips on archive cards, and cleaner hover behavior across archive and masonry tiles.

<p class="changelog-label changelog-label--infrastructure">Infrastructure</p>

- Added support in the content model for custom archive card cover assets alongside the standard generated covers.
- Updated project workflow notes to require live progress reporting during long photo imports and to keep consecutive commits inside the same top changelog entry when they belong to one shipped release.

<p class="changelog-meta"><span class="changelog-meta__date">2026-03-25</span></p>

## Added a changelog drawer and set the workflow for future updates

<p class="changelog-label changelog-label--added">Added</p>

- Added a changelog button to the site header next to the theme toggle.
- Added a right-side changelog drawer with keyboard shortcuts, blur overlay, and inline rendering of `changelog.md`.
- Added project rules that required future committed work to update `changelog.md` in the same changeset.

<p class="changelog-label changelog-label--improved">Improved</p>

- Restyled the changelog into a date-based format with cleaner titles, clearer labels, and simpler past-tense copy.
- Tuned the drawer width, spacing, typography, label colors, checkmark styling, tooltip placement, and open/close animation.
- Fixed focus behavior so keyboard shortcuts for the changelog and theme toggle no longer left unwanted focus rings behind.

<p class="changelog-meta"><span class="changelog-meta__date">2026-03-24</span></p>

## Launched the photography archive and moved it to R2-backed storage

<p class="changelog-label changelog-label--added">Added</p>

- Added a real photography archive with generated pages for each series.
- Added country flags to photography cards and series headers.
- Added previous and next links between photography series.

<p class="changelog-label changelog-label--improved">Improved</p>

- Improved photography pages with better scroll restore, keyboard and touch lightbox behavior, and smoother image loading.
- Tightened mobile spacing and type across the home, about, design, and photography pages.
- Cleaned up the mobile site shell so the avatar wordmark, nav, footer, and theme toggle fit better on small screens.
- Reworked photography series pages on phones with a horizontal carousel, paired landscape shots, and better mobile layout rules.
- Refined the shared site shell and homepage layout around the avatar wordmark, spacing, and footer social links.

<p class="changelog-label changelog-label--infrastructure">Infrastructure</p>

- Imported dozens of photo series into Astro content collections with structured JSON metadata.
- Added `PUBLIC_PHOTO_BASE_URL` support so photography assets could load from Cloudflare R2 instead of the repo.
- Added R2 sync scripts, environment examples, and setup docs for moving `public/photo-imports` out of git.
- Added a few small performance tweaks, including avatar preloading and cleaner theme setup in the shared layout.

<p class="changelog-meta"><span class="changelog-meta__date">2026-03-22</span></p>

## Added full design case studies and updated the shared site layout

<p class="changelog-label changelog-label--added">Added</p>

- Added a persistent dark mode with local storage support and a keyboard shortcut.
- Added visual previews to the design landing page instead of plain text links.
- Added full case studies for Avast Online Security & Privacy, Cookie Manager, and TrackOFF.
- Added Telegram to the site chrome and linked the contact section to it.
- Added brand favicons to the work timeline so companies became easier to scan.

<p class="changelog-label changelog-label--improved">Improved</p>

- Reworked the shared site chrome with a tighter nav layout, avatar label, dedicated theme toggle, and footer social tooltips.
- Extended the refreshed theme across the homepage, about page, design pages, photography page, and case study templates.
- Turned the design section into a browsable portfolio with dedicated project pages.
- Rewrote the About page intro to better explain the product design background and ongoing work.
- Polished the work timeline with cleaner markers, stronger links, and tighter copy.
- Shortened the first view of the page by showing only part of the recommendations list, with the rest behind a reveal action.
- Cleaned up About page copy and recommendation text for the first public version.

<p class="changelog-label changelog-label--infrastructure">Infrastructure</p>

- Imported the supporting images for the design case studies and linked them from the main design page.
- Moved portrait assets into `/avatars` and replaced the initial favicon set with project-specific files used by the new layout.

<p class="changelog-meta"><span class="changelog-meta__date">2026-03-21</span></p>

## Launched the first multi-page site layout and about page

<p class="changelog-label changelog-label--added">Added</p>

- Replaced the placeholder front page with a new light visual direction and a shared site layout.
- Launched the About page with a career timeline, recommendation blocks, and portrait assets.
- Added top-level Design and Photography pages.

<p class="changelog-label changelog-label--improved">Improved</p>

- Expanded the global styling so the project worked as a multi-page portfolio instead of a single placeholder screen.
