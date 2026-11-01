---
name: regis
description: Adapt supplied game files into a playable source-faithful game, including survival/survivors and forward runners, with REA discovery, genre-specific design and fairness checks, native-style UI, mobile playtesting, optional effects tools, promo production and reproducible releases. Use for an end-to-end adaptation or a requested phase of an existing game project.
---

# REGIS — game adaptation toolkit

Turn the selected game's files into a recognizable playable adaptation. Follow
the requested target genre and scope; continue existing work rather than restart.
Keep source facts, inferences, defaults, authored adaptations, unknowns and tested
scope separate. A source filename does not establish behavior or spawn location.

## Select the target loop

Read [genre routing](references/genres/index.md), then only the selected module:

- [Survival / survivors](references/genres/survival/workflow.md): movement,
  automatic combat, source abilities, useful builds, crowd pressure and navigation.
- [Forward runner](references/genres/runner/workflow.md): lane changes, jump/slide,
  source-genre verbs, track geometry, reaction windows and survivability.

Module defaults apply only to that target and yield to explicit user choices.
Do not force shops, upgrades, three classes or stationary Easy tests into every
game. For another genre, define its verbs, loop and acceptance contract using
shared guidance; do not claim an unimplemented CLI genre is supported.
The CLI offers `regis init NEW_DIRECTORY --genre survival|runner`; omission and
legacy briefs retain survival. It creates a structural brief, not a playable game.

The shared default stack is a **Node.js SPA + Electron desktop builds**, with
**responsive mobile browser support and tests enabled by default**. Resolve
platforms and controls from the session, honoring explicit scope overrides.
Use [platform/mobile guidance](references/platform-and-mobile.md); Electron is
not an Android/iOS runtime. Choose rendering/projection after inspecting assets.

## Choose game languages

Read [shared localization](references/localization.md). Use a multilingual
structure, with English as the default and the user's system language as the
suggested second option. The user chooses which languages ship; honor existing
choices and primary-language overrides. Keep game and promo language scopes
separate. Use shared locale dictionaries, a supported-locale fallback, persistent
selection and fonts/layouts verified for every chosen script.

## Establish evidence and the quality target

Resolve source path, edition/version, output repository and available tools.
Keep the source unchanged and output outside it. Inventory relevant world/maps,
actors/actions/facings/layers, threats, abilities/weapons/items, VFX, audio,
UI/fonts and behavior/stat tables. Record provenance, hashes, archive/member IDs,
extraction parameters and present/missing/unsupported status. Track discovered,
decoded, mapped, implemented and validated coverage separately.

Read [source discovery](references/source-discovery.md). Use available REA tools
for shipped-artifact evidence and unknown formats; use ordinary source tools
for complete repositories. Inspect actual schemas; do not invent scan APIs.
The npm package includes REA, but a standalone skill still needs available REA
tools. Installation does not register MCP/providers or supply every decoder.
Retain bounded unknowns and continue supported work when a provider is absent.

Read [quality and milestone reviews](references/quality-and-scope.md) before
implementation. Compare any supplied adaptation/benchmark's actual screens,
loop and systems. Define a concrete coverage/acceptance ledger with reproductions
and visible outcomes. A trial request does not silently lower the target to a
demo. A narrow sample can reduce breadth while keeping included systems complete.
Keep a phase/evidence log; a scaffold or passing package tests is not a game.

## Implement the representative loop

Use the selected module's mechanics and difficulty contract. Separate immutable
source catalog, adaptation configuration, simulation, renderer, UI and production
tooling. Build one complete representative start-to-outcome loop before expanding
the catalog. Record hypotheses and observed changes; a design document does not
establish fun. Apply item, currency, equipment or companion rules only when those
systems are selected. Implement their real transactions and persistence fully.

Read [implementation/validation](references/implementation-and-validation.md).
Reuse the actual simulation in headless tests or instrumented engine replays;
never build a second toy simulator. Test actual collision, formulas, timing,
target/status behavior, transactions, save/reset/migrations and relevant rewards.
Match spatial coordinates, anchors, support surfaces, depth, animation facings,
attachments, shadows and effect endpoints. Inspect motion, not only decoded art.
Audit each applicable actor/ability/weapon/hazard asset lifecycle through runtime
use, feedback and cleanup. Boxes/static sprites remain placeholders when native
art and animation are available.

Read [asset delivery](references/asset-delivery.md) for atlases, request/byte/
decode-memory budgets, shared progress, retry and scene-readiness gating.
Read [native UI](references/nostalgic-ui-workflow.md): recover the source's fonts,
frames and widgets first; generate only real gaps. Preserve readable, interactive
text and selected-language glyphs. Keep mandatory actions within usable phone
portrait/landscape areas; inspect longest text and maximum-load HUD states.

For pixel-art filtering, motion stability, sprites in 3D and material/camera
pitfalls, read [style-specific rendering](references/style-and-rendering.md).
For generated sprite sheets, coherent UI kits and deterministic packing, read
[sprite and atlas production](references/sprite-and-atlas-production.md).
Choose by source style and inspected results; CRT and billboards are optional.

For optional production tools read [tools and skills](references/tools-and-skills.md).
This includes PixelFX effects, image generation, browser/capture tools and
[3D pipeline benchmarks](references/3d-asset-benchmarks.md). Discover capabilities
before using them; references do not authorize installations or external actions.
Preserve tool/model versions, matched inputs, provenance and actual review results.

For concrete visual examples, see the optional
[English railway-runner gallery](references/examples/railway-runner.md): native-style
UI, lane/roof readability, city scenery, actor-bound electricity and share cards.
Use its captions as comparison prompts, not source-independent design rules.

## Playtest and diagnose

Read [shared playtesting](references/playtesting-and-balance-log.md) with the
selected module's policies. Keep rule tests, real-module simulation, rendered
real-input automation and human sessions distinct. Record seed/route, content/
config hashes, controls/device, starting/earned state, sample sizes and outcomes
(win/death/horizon/abort). A horizon or automation failure is not a victory.
Check all selected roles/modes and meaningful early/middle/late checkpoints.
Diagnose missing winning paths, visible counterplay and controller limitations
before adjusting damage; preserve found defects as regressions. Explicitly state
human/device gaps rather than inventing sessions or extrapolating bot win rates.

Run the independent [performance playtest](references/performance-playtest.md):
representative rendering/effects load, transitions, constrained networks and
cold/warm caches. Also run actual navigation or runner track-traversal checks.
Report recoveries and stalls separately from clean outcomes. Mark affected
acceptance evidence stale after changes and rerun by dependency.

## Promo and delivery within the requested scope

Before creating a new promo, ask which language versions to produce, suggesting
English and the user's system language. Reuse an explicit choice already given
for that promo; otherwise wait for the answer before language-dependent production.
Record captions/title-card and any voice/dialogue language scope in the edit plan.
Read [promo workflow](references/promo-video-workflow.md) and
[generation/dialogue](references/generation-and-dialogue.md) when producing media.
Use real game capture for claims, preserve approved edits/text on revision, and
disclose staged runs/generated inserts. Check reference identity before generation;
review visible motion, padding, full edit and audio by listening. Decode the final
master end to end; retain poster, storyboard, timeline and provenance.

Read [game delivery](references/game-delivery.md) and, for web releases,
[localized share previews](references/social-link-previews.md). Deliver source,
tests/build workflows, selected platform artifacts, run/install instructions,
and a deterministic asset setup/extractor with required adapters and versions.
Test extraction and launch from a clean unpacked release. Keep proprietary game
data/private evidence out of public toolkit repositories and default source-only
packages; use distribution allowlists as well as ignore rules. Keep source,
adapted/generated material and license/credit records distinct; a fan-project note
does not grant redistribution rights or endorsement.

Include current actual-game screenshots and concise feature benefits in game
documentation. Separate planned features from implemented evidence. Prepare a
reviewable local release; deployment/publication follows actual user authorization.
Keep toolkit package checks separate from gameplay and platform execution.
Revisit the quality target before handoff and finish supported required work;
report actual commands, outputs, tested scope, limits and remaining blockers.
