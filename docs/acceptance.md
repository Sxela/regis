# End-to-end acceptance and scope

Use this table to review an actual adaptation. Repository package tests validate
REGIS plumbing; they do not populate this evidence table for a future game.

| Phase | Reviewable output | Evidence needed to call it complete |
| --- | --- | --- |
| Scope and quality | Source/benchmark quality target and coverage table | Required systems and presentation are explicit; exclusions have a reason/authority; representative-slice and final comparisons have concrete findings and corrections. A test request does not silently become a minimal-demo brief. |
| Scoped survival slice | Small representative content sample with complete depth | Included actors face/move/animate correctly; native UI and applicable spell cast/projectile/impact/status/audio assets execute with real rules; earned progression, navigation, save and the start-to-outcome loop work. Reduced content count does not excuse broken integration. Full-catalog, promo and release breadth follow the selected scope. |
| Discovery | Inventory, source manifest, evidence ledger, extraction adapters | Actual source identity/version, representative decoded assets, coverage/unknowns and stable mapping to source members. |
| Design | Loop, class sheets, mechanics profile, upgrade/item audits | Three source-themed classes with distinct mechanics and two viable build directions each; recorded iterations rather than a claimed optimum. |
| Implementation | Playable Node.js SPA and Electron wrapper | Actual-rule tests for combat, progression, transactions, saves, navigation and numerical previews; a complete start-to-outcome loop. |
| UI | Native component kit, generated gaps, responsive interactions | Main/menu/max-load HUD and full interactions on desktop and touch, fan note, provenance and source identity checks. |
| Mobile | Phone portrait/landscape + tablet supported by default | Mobile suite in normal npm test/CI, real gameplay/touch flows in Chromium/WebKit; physical-device evidence or explicit gaps. |
| Balance | Easy/Medium/Hard configurations and experiment log | All three classes, representative seeds/maps and earned checkpoints; behavioral contracts and honest outcomes/aborts; human evidence or explicit limitation. |
| Navigation | Collision overlays and pursuit/placement results | Walkable terrain matches rendering, legal spawns/exits, floor/clearance checks, large-body/corner/stair tests, stuck/fallback telemetry. |
| Promo | Master, poster, storyboard, script/edit/workflow/provenance | Actual gameplay claims, corrected first-frame art, frame/audio review, full decode and parsed technical/loudness measurements. |
| README screenshots | Embedded images from the finished build | Real desktop gameplay, mobile portrait and upgrade choices; current UI, visible card actions, relative image paths, alt text/captions and verified image availability in delivered docs; public-distribution limits recorded where applicable. |
| Delivery | Source-only game packages, CI/build workflow, install/run/asset setup docs | Runnable extractor/launcher and recipe included in the final archive/installer; clean unpacked-package extraction from supported game files and launch with the generated assets; synthetic fixture CI, platform checks, checksums and permission-aware content audit. |

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
