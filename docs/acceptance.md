# End-to-end acceptance and scope

Use this table to review an actual adaptation. Repository package tests validate
REGIS plumbing; they do not populate this evidence table for a future game.

Each row applies to the selected product scope, even when the user chooses only
a few maps or spells. Catalog breadth does not reduce integration or delivery
quality. Record expected outcomes and relevant input identities in the project's
acceptance ledger. After changes, preserve historical results, mark affected
claims stale and rerun their scenarios; unrelated edits need not invalidate all
evidence. Failed, stale or untested required rows keep completion unestablished.

| Phase | Reviewable output | Evidence needed to call it complete |
| --- | --- | --- |
| Scope and quality | Source/benchmark quality target and coverage table | Required systems and presentation are explicit; exclusions have a reason/authority; representative-slice and final comparisons have concrete findings and corrections. A test request does not silently become a minimal-demo brief. |
| Scoped survival slice | Small representative content sample with complete depth | Included actors face/move/animate correctly; native UI and applicable spell cast/projectile/impact/status/audio assets execute with real rules; earned progression, navigation, save and the start-to-outcome loop work. Reduced content count does not excuse broken integration. Full-catalog, promo and release breadth follow the selected scope. |
| Discovery | Inventory, source manifest, evidence ledger, extraction adapters | Actual source identity/version, representative decoded assets, coverage/unknowns and stable mapping to source members. |
| Design | Loop, class sheets, mechanics profile, upgrade/item audits | Three source-themed classes with distinct mechanics and two viable build directions each; recorded iterations rather than a claimed optimum. |
| Skills/spells | Source identity mapping and usefulness audit | Included skills retain original in-game names and matching applicable icons, sprites/VFX and sounds; adaptations and missing assets are explicit. Mode-inapplicable abilities and dependent stats are absent from loadouts, offers, loot, shops and procs, with exclusion reasons and save handling recorded. |
| Asset lifecycles | Per-identity role matrix with runtime consumers and evidence | Every applicable icon, cast/travel/impact/splash, field/status/DoT, actor move/attack/hit/dying/corpse/decay and event-sound role is accounted for and exercised through completion/cleanup. Available companions are integrated; absent/unsupported roles and adaptations are explicit. |
| Implementation | Playable Node.js SPA and Electron wrapper | Actual-rule tests for combat, progression, transactions, saves, navigation and numerical previews; a complete start-to-outcome loop. |
| UI | Native component kit, generated gaps, responsive interactions | Fresh/saved menus, max-load HUD, long comparisons, full inventory, pending/canceled replacements and unaffordable shop; actual actions/state effects on selected inputs, fan note and component provenance. |
| Equipment presentation | Native paperdoll, inventory/shop UI and source-supported worn appearances | Reused native components and item-to-appearance mappings; equip/replace/remove updates stats, paperdoll and world views where supported by the source. Verify motion/facings, body variants, death/corpse handling, travel and save/reload; missing variants and adaptations are explicit. |
| Item handling | Side-by-side comparison, autoequip, drag/drop, double-click equip, sell/autosell | Shared compatible-slot comparison across all retained candidates; iterative strictly dominated sales stop at a stable useful set, protect tradeoffs/favorites/companion uses and debit/equip/sell once. Verify pickup-order chains, duplicates, full inventory, touch actions and save/reprocessing. |
| Companion, when supported by source | One optional recruit with earned leveling and useful support | Recruitment, follow/combat, XP/rewards, death/recovery and persistence work; solo routes remain viable. Native remarks/conversations and voice cues are integrated where supplied, with speaker/text/mute controls. Reaudit ally-dependent skills and gear. |
| Mobile | Phone portrait/landscape + tablet supported by default; honor explicit platform scope | Record platform/control preferences; complete touch actions and input-appropriate hints. Mobile suite in normal npm test/CI, real gameplay/touch flows in Chromium/WebKit; physical-device evidence or explicit gaps. |
| Balance | Easy/Medium/Hard configurations and experiment log | All three classes, seeds/maps, earned routes and reported sustain regressions; controller capability, winning paths and win frequency separate; equal-investment and earned economy checks, visible counterplay/pacing, honest outcomes/aborts and human-evidence limits. |
| Navigation | Collision overlays and repeatable walkability playtests | Every included region has connectivity checks and actual actor traversal to required objectives, rewards and exits; legal spawns and pursuit, floor/clearance and corner tests, stuck/fallback telemetry; blocked required routes fixed. |
| Performance | Rendered-game load scenarios, budgets and raw timing results | Early/dense/late combat, effects, transitions, cold loading and sustained play on selected platforms; frame-time p50/p95/p99, worst stalls, population/load and available memory/cost measurements; diagnosed regressions rerun and device gaps stated. |
| Promo | Master, poster, storyboard, script/edit/workflow/provenance | Actual gameplay claims, corrected first-frame art, frame/audio review, full decode and parsed technical/loudness measurements. |
| README screenshots | Embedded images from the finished build | Real desktop gameplay, mobile portrait and upgrade choices; current UI, visible card actions, relative image paths, alt text/captions and verified image availability in delivered docs; public-distribution limits recorded where applicable. |
| README feature pitches | Game pitch and important-feature explanations | Each important implemented feature has a one-line benefit plus a short paragraph explaining player value and concrete behavior; claims match current evidence, scope limits are clear and planned features are separate. |
| Delivery | Source-only game packages, CI/build workflow, install/run/asset setup docs | Runnable shipped extractor; empty-cache/fresh-profile extraction and actual launch without developer file/env fallbacks; implemented phone asset flow, current delivered screenshots, synthetic fixture CI, platform checks, checksums and content audit. |

Easy's largely stationary combat wins are intentional. Medium should reward
movement/build decisions, and Hard should require practiced play while allowing
earned winning builds. Treat example rates in the design guide as hypotheses;
report samples and limits. Never label a time horizon or automation abort a win.

For each phase, preserve what was observed, what was inferred, what was authored,
what actually ran, and what is still blocked. Do not claim external CI executed,
human playtests happened, or publishing succeeded based on local preparation.

Review [quality targets and milestone decisions](../skills/regis/references/quality-and-scope.md)
before accepting a generated result. Coverage separates discovered, decoded,
mapped, implemented and validated IDs. A few native sprites, renamed copies of
one arena, generic panels, static creatures and an unedited silent capture do
not collectively satisfy the corresponding world, presentation and promo targets.
Tests can pass while these dimensions remain incomplete. Record exact launch
failures without attributing them to the environment by assumption.
