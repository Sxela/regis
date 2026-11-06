# Sprite generation and atlas production

Use this for generated/adapted sprites and runtime packing. Recovered source
assets remain preferable where they already satisfy the role. Generation fills
real gaps or an explicitly authored art direction; packing is a separate,
deterministic stage. Follow [asset delivery](asset-delivery.md) for loading and
[style/rendering](style-and-rendering.md) for projection and sampling.

## Establish a small visual contract first

Record reference identities, palette/ramp, pixel density, camera elevation and
projection, facing, light direction, world scale, ground/root anchor, transparent
padding and required animation actions. Inspect a representative actor, obstacle,
tile, effect and UI component together before batch generation. A pleasing
isolated asset may still have the wrong scale or perspective in the game.

Use the available imagegen skill for bitmap generation/editing. Supply inspected
identity/style references and request the actual role: a transparent cutout,
matched facing/action sheet, blank panel or seamless texture. Record prompt,
model/tool version, seed where available, inputs, original outputs and preparation
recipe. Describe opaque backgrounds explicitly when transparency is not intended.
Do not use a fully generated game screenshot as evidence that playable sprites
exist or as a substitute for a composition of actual runtime assets.

Front and three-quarter views are useful conditioning references for some 3D
pipelines, not interchangeable sprites for an arbitrary game camera. For multiview
generation preserve the same object's volumes, markings and proportions, recording
invented hidden surfaces. Follow [3D benchmarks](3d-asset-benchmarks.md) rather
than assuming a front image or a successful export proves model fidelity.

## Inspect and prepare generated sheets

- Review outputs before slicing: missing/extra parts, inconsistent facings,
  scale, lighting, blurry pixel clusters, halos, baked floor/shadow and fake
  transparency grids. Do not silently ship a checkerboard as alpha.
- Determine real cell/frame bounds. A model-generated grid may not be perfectly
  regular; fixed equal crops can cut limbs or leak neighboring art. Clean alpha
  and padding, retaining the original as provenance. Keep source-to-runtime IDs.
- Align movement, idle, jump, slide, attack and death frames to a common anchor
  and scale. Cropping each independently and centering the result causes jitter.
  Store trim offsets/pivots with every frame, including mirrored variants.
- Review contact sheets and actual playback. A pair of near-identical poses is
  not a readable walk cycle; translation alone does not prove gait animation.
  Standing NPCs can use idle poses; walkers need both displacement and motion.
- Test colors/alpha against both bright and dark scenes. Pixel-art cleanup can
  require palette reduction, controlled edge pixels or a texture-map edit, but
  inspect the resulting asset in context before calling it an improvement.
- Preserve repeating texture edges and complete tile transitions/end caps.
  Use larger coherent textures or scenery modules to reduce visible repetition;
  never stretch a short image to imply a different physical length.

## Pack runtime atlases deterministically

Keep logical asset identities separate from physical delivery pages. Build from
the actual dependency closure: full action/direction and animated-surface cycles,
equipment variants, delayed spawns, rare deaths, UI states and selected locales.
Pruning only frames visible in one map or screenshot can drop later cycle frames.

Group by actual lifetime/use: boot UI/font/icons, common actors/effects, region
scenery, and later content. Use bounded pages appropriate to supported texture
limits and decoded memory; fewer files alone is not a performance result.
Use deterministic ordering/packing and content hashes. Frame metadata retains
rectangle, page, untrimmed size, trim offset, pivot, timing, direction/mirroring,
palette/alpha and source provenance. Do not deduplicate distinct logical timing
or behavior merely because two frame images have identical pixels.

Prevent sampling bleed with appropriate padding/extruded edges and correct UVs;
rotated frames require explicit renderer support. Verify renderer texture origin
and flipped facings on a known frame. Repeating surfaces need an isolated crop
or a compatible shader/array path, as [3D rendering](style-and-rendering.md#sprites-and-geometry-in-a-3d-scene)
describes. Indexed PNG can preserve palette art with smaller files when it is
truly lossless; compare decoded pixels/alpha rather than assuming that from the
extension. Alpha-bearing lossless WebP/PNG needs the same inspection.

Route every relevant loader through the manifest, including CSS/UI backgrounds,
preload hints and audio where packed. Otherwise a new atlas build can coexist
with old individual fetches. Treat success as a verified export/deployment
property: check the actual shipped manifest, page hashes and network requests,
not only the source folder or a local build command.

Cold boot and transitions need download, decode/upload and scene-ready progress,
with retries and coherent old/new versions. Do not report each logical frame as
a separately downloaded file or count a persistent cache write complete before
it finishes. Keep transport savings distinct from GPU batching and decode cost.

## Verification that changes the conclusion

Use synthetic images to test packing bounds, alpha/offset/mirror preservation,
exact crops and required dependency coverage without putting game data in CI.
In the real renderer inspect known frames, looping animations, independently
phased actors, attachment alignment, minification, seams, transitions and crowded
effects. Measure request/byte/decode-memory/frame-time outcomes for the actual
export, cold and warm loads, supported browsers and mobile viewports.
Record physical-device gaps separately. A clean atlas image is not proof of
correct indexing, animation, complete packaging or reduced draw calls.

For raster assets in destructible side-view artillery games, read the
[artillery art supplement](genres/artillery/art-production.md) for terrain
footings, cave openings, spline-edge registration and airborne effect bounds.
