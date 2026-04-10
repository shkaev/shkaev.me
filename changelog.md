# Changelog

This file tracks meaningful production updates to `shkaev.me`.
Add newer committed work at the top, group updates by date, and describe outcomes rather than raw file churn.
Use completed/past tense throughout, including entry titles, and do not show commit hashes in visible content.

<p class="changelog-meta"><span class="changelog-meta__date">2026-04-11</span></p>

## Launched the Russian site experience and refined the translated design portfolio

<p class="changelog-label changelog-label--added">Added</p>

- Added Russian versions of the top-level pages, the photography archive and series pages, and the full Design case-study set.

<p class="changelog-label changelog-label--improved">Improved</p>

- Rewrote the Russian About page, the changelog UI, and the translated AOSP, Cookie Manager, and TrackOFF case studies so the copy reads naturally and consistently across the site.
- Refined the shared layout rhythm, reading width, and case-study card metadata so Design, About, and the Russian portfolio content feel more cohesive across both locales.

<p class="changelog-label changelog-label--infrastructure">Infrastructure</p>

- Added a release workflow rule that keeps the English and Russian history entries aligned before each production push.

<p class="changelog-meta"><span class="changelog-meta__date">2026-04-04</span></p>

## Corrected follow-up regressions and continued the v2 refactor

<p class="changelog-label changelog-label--fixed">Fixed</p>

- Removed the duplicate font request and fixed `InfoCardGrid` so case-study layouts behaved correctly after the refactor.
- Restored dark-theme hierarchy and surface styling across shared meta blocks, cards, and aside accents.
- Fixed remaining shared UI regressions including footer icon spacing, dark-theme control icon color, and the About timeline markers.

<p class="changelog-label changelog-label--improved">Improved</p>

- Continued the audit-first `v2` migration by moving more repeated page patterns into shared content components and styling tokens across the case studies and top-level pages.

<p class="changelog-label changelog-label--infrastructure">Infrastructure</p>

- Trimmed follow-up dead code and duplicate prose wrappers from the new shared content-system slices, while tightening the semantics and body-variant APIs in the new shared components.

<p class="changelog-meta"><span class="changelog-meta__date">2026-04-02</span></p>

## Major refactoring

<p class="changelog-label changelog-label--fixed">Fixed</p>

- Removed brittle assumptions from asset resolution and other shared page logic.
- Fixed several accessibility, filtering, and mobile gallery issues across the changelog sheet and photography pages.
- Restored reliable dark-theme typography and reduced page-transition flicker.

<p class="changelog-label changelog-label--added">Added</p>

- Rich metadata to enable clean sharing previews.

<p class="changelog-label changelog-label--improved">Improved</p>

- Rebuilt the shared site shell into dedicated layout components and extracted the main client-side behaviors into focused modules.
- Introduced reusable typography and section primitives across the case studies and top-level pages.
- Replaced the previous font with self-hosted IBM Plex Serif for large headings and other display text.

<p class="changelog-label changelog-label--infrastructure">Infrastructure</p>

- Centralized shared site config, path helpers, theme utilities, and other duplicated support logic.
- Simplified support code by cleaning up the R2 sync script and loosening unused content schema requirements.

<p class="changelog-meta"><span class="changelog-meta__date">2026-04-01</span></p>

## Refined the design case studies and polished the About page

<p class="changelog-label changelog-label--improved">Improved</p>

- Refined the TrackOFF, Cookie Manager, and Avast Online Security & Privacy case studies with tighter section rhythm, clearer content hierarchy, and richer cross-links between projects.
- Reworked key AOSP and Cookie Manager story sections into more visual layouts with team snapshots, goal cards, sidebars, and result modules, while refreshing TrackOFF product, reseller, and promotional content.
- Polished the About page with tighter paragraph spacing, cleaner section flow, and a more interactive featured recommendation presentation.

<p class="changelog-label changelog-label--infrastructure">Infrastructure</p>

- Added a dedicated static asset resolver for the remaining non-photography media and synced those asset directories to Cloudflare R2.

<p class="changelog-meta"><span class="changelog-meta__date">2026-03-29</span></p>

## Posting photos and correcting recommendations

<p class="changelog-label changelog-label--added">Added</p>

- Added a new wave of photography archive entries from September 2025 through January 2026.

<p class="changelog-label changelog-label--improved">Improved</p>

- Refined the photography archive chronology.
- Refreshed the About page recommendation order, spacing, and section rhythm.

<p class="changelog-label changelog-label--infrastructure">Infrastructure</p>

- Switched local photo imports to keep only generated web assets and manifests inside the project while treating external folders as the source of truth for originals.

<p class="changelog-meta"><span class="changelog-meta__date">2026-03-28</span></p>

## Photo gallery filters and total rework of the recommendations

<p class="changelog-label changelog-label--added">Added</p>

- Added live search plus country and year filters to the photography archive.
- Added a featured recommendation carousel to the About page with animated navigation and company icons.
- Implemented the archive controls, empty states, and year dividers across light and dark themes.

<p class="changelog-label changelog-label--improved">Improved</p>

- Expanded the photography grid to a denser three-column layout on large screens and widened the shared page shell to match the header container.
- Reworked the About page recommendations into shorter quotes with refreshed metadata, tighter controls, and cleaner progress feedback.
- Tightened the work timeline card spacing so role descriptions now sit closer to their headings.

<p class="changelog-meta"><span class="changelog-meta__date">2026-03-27</span></p>

## Expanded the photography archive and refined key site sections

<p class="changelog-label changelog-label--added">Added</p>

- Added the next wave of Cyprus photography series for April through September 2025.

<p class="changelog-label changelog-label--improved">Improved</p>

- Recovered the missing July 2025 post from the mislabeled legacy source and returned it to the archive chronology.
- Refined several archive cards and post boundaries so the new entries fit the archive more cleanly.
- Restored the missing September 2025 photography derivatives so the newest archive entry now loads its cover and gallery images correctly in production.
- Improved shared navigation behavior with more reliable active states, safer keyboard shortcuts, stronger mobile header alignment, and back links that now return consistently to their section roots.
- Refined the design and photography sections with cleaner case study cards, better mobile series navigation, non-JavaScript gallery previews, and more stable photography grid behavior.
- Reworked the About page with a stronger introductory heading, updated work-history copy, expandable work timeline entries, and tighter mobile spacing across the timeline cards.

<p class="changelog-label changelog-label--infrastructure">Infrastructure</p>

- Tightened the release workflow rules so same-day work and cross-thread project changes are gathered into one shared changelog entry before pushes.

<p class="changelog-meta"><span class="changelog-meta__date">2026-03-26</span></p>

## Expanded and refined the photography archive

<p class="changelog-label changelog-label--added">Added</p>

- Added new photography archive entries across the Cyprus timeline from late 2023 through March 2025.

<p class="changelog-label changelog-label--improved">Improved</p>

- Improved photography archive cards with optional custom card covers so difficult crops could be framed more intentionally.
- Fixed custom card covers so archive crops loaded from the R2 photo domain correctly.
- Improved archive continuity, navigation, and gallery behavior across the photography section.

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
