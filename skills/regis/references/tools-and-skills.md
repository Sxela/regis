# Shared tools and optional production skills

Use these across genres when the task needs them. Inspect the available tool
schemas and installed skills first; a reference here does not install a tool,
register a provider, supply checkpoints or certify compatibility. Keep core work
possible with existing assets and ordinary source/rendering tools. Record tool
versions, inputs, adaptations, unknowns and tested scope in the project.

| Need | Tool / skill route | Read or retain |
| --- | --- | --- |
| Unknown shipped formats, native behavior or resource mapping | Available REA skill/providers; ordinary source tools for complete repositories | [Source discovery](source-discovery.md); evidence and supported-version limits. |
| Bitmap gaps, sprite/texture variants or blank native-style UI | Available imagegen skill and image generation/edit tool | [UI workflow](nostalgic-ui-workflow.md); inspect references and actual outputs, preserve identity, alpha, scale and provenance. |
| Procedural pixel VFX / sprite-sheet animation | Optional [PixelFX](https://github.com/patch-gg/pixelfx), using its own skill | See the integration notes below. |
| 3D asset generation, multiview geometry or texture comparisons | Available local geometry/texturing pipelines and Blender where suitable | [3D benchmarks](3d-asset-benchmarks.md); inspect geometry separately from paint, compare matched views and preserve small structural detail. |
| Real browser input, responsive/mobile play and loading | Available browser automation, engine replay and device tools | [Platform/mobile](platform-and-mobile.md), [playtesting](playtesting-and-balance-log.md), [performance](performance-playtest.md). |
| Gameplay capture, edit, soundtrack and generated inserts | Available capture/FFmpeg/audio tools; image/video skills when needed | [Promo](promo-video-workflow.md), [generation/dialogue](generation-and-dialogue.md); actual motion, listening and end-to-end decode. |

The [electrical-contact screenshot](examples/railway-runner.md#electricity-bound-to-the-actual-actor-and-cause-of-death) illustrates an effect attached to the actual actor.

For choosing rendering techniques by source style, see
[CRT, pixel stability and sprites in 3D](style-and-rendering.md). Generated
sprite/UI kits and deterministic atlas recipes are covered in
[sprite and atlas production](sprite-and-atlas-production.md).

## PixelFX integration

Consult the [reviewed upstream skill](https://github.com/patch-gg/pixelfx/blob/fe7103c36d94e02f2d7df7d8f7a341e493837cde/skills/pixelfx/SKILL.md)
and the selected checkout's actual skill/API. This link pins the inspected
instructions, not a runtime dependency or a promise about newer versions.
The library is optional; no PixelFX source or generated sheets are bundled here.

1. Search the catalog before authoring: `node tools/list.mjs <words>` in a
   selected checkout, then render candidates with `node tools/render.mjs <id>`.
   Open contact sheets and review motion at the game's actual display scale.
2. Choose live JS effects or offline transparent sheets (`--sheet`). Sheets are
   portable across engines and often cheaper for mobile; shared atlases reduce
   requests. Preserve frame timing, pivot, loop/one-shot semantics, alpha and
   the chosen blend mode. Live output has separate color and additive-light
   buffers; baked glow needs inspection against both bright and dark scenes.
3. Fit the projection. Weather demos may include a side-view ground/backdrop;
   remove sample scenery and adapt wind/fall vectors, world/screen coordinates,
   parallax and occlusion. Ground dust follows contact and movement; airborne
   actors must not emit walking dust. Electricity attaches to actual contact
   geometry, and shock masks must use the game's actor rather than the stock
   demonstration character. Keep collision/damage authoritative in simulation.
4. Hook effects to real events (impact, shock, death, pickup, surface contact),
   cap/pool instances, handle transition/restore/cleanup, and use the correct
   simulation or presentation clock. A fatal effect must continue during its
   death presentation even when normal gameplay has stopped.
5. For new custom effects follow upstream authoring/check instructions, including
   its minimum three render/view/refine rounds. Recoloring an existing effect
   does not require rebuilding the catalog. Inspect the final effect in-game
   under overlapping load and on supported mobile viewports.

Useful families include rain/snow/wind/fog and lightning, arcs/idle sparks and
electric shocks, contact dust/smoke/debris, impacts and damage flashes, fire,
water splashes, pickups, status effects and transitions. Select them for the
game's art direction and readable feedback, not as a compulsory feature list.
Retain the selected upstream license/credits when vendoring code; the reviewed
PixelFX checkout declares MIT. Measure actual delivered cost and visual quality
instead of assuming a procedural effect is cheap or an export is production-ready.
