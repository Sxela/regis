# Style-specific rendering findings

Choose techniques for the inspected source style and requested view, not for
the target genre alone. This guide distills authored pixel-runner and classic
sprite-in-3D adaptations. It does not prescribe a CRT filter, low resolution,
billboards or a particular engine for every game.

| Style / problem | Useful approach | Evidence to retain |
| --- | --- | --- |
| Pixel art enlarged on screen | Stable logical resolution, deliberate magnification and native-sized UI | Native-scale crops and actual movement at selected viewport/DPR. |
| CRT-inspired pixel presentation | Optional lightweight display pass with controlled beams, glow and mask | Matched source tick, clean/filtered outputs, fallback and frame costs. |
| Orthographic sprites | One camera/projection contract, consistent anchors and world scroll | Lane/support visibility, contact, occlusion and motion through boundaries. |
| Classic sprite actors in a 3D world | Native directional frames on anchored billboards plus textured geometry | Atlas orientation, mirrored offsets, depth, camera/HUD and visible collisions. |
| True 3D assets | Matched multiview geometry review, then materials and runtime LOD decisions | [3D benchmark](3d-asset-benchmarks.md) records, silhouette/detail checks and actual runtime cost. |

## Pixel art: resolve motion before adding CRT

Nearest magnification can preserve pixel shapes but does not solve minification
or temporal aliasing. Fine rails, ballast and fences shimmer when resampled at
changing fractional positions/scales. Classify the cause before changing the
art: inconsistent transforms, scaling, atlas bleed and a display mask require
different fixes.

Use one camera/world transform and one distance-derived scroll phase for stationary
world layers. If pixel-snapping, quantize their final shared transform rather
than rounding each layer's independent accumulator. Keep simulation positions
continuous; do not quantize collision to fix a display artifact. Intentional
train/NPC/weather motion remains relative to that shared world, with its own
explicit velocity. Test a fixed camera and a moving camera separately.

For repeated minification, prepare and cache filtered surfaces at the actual
drawn size, then display the stable result. Smooth a deliberate camera zoom
where it improves temporal stability; compare it with a crisp fixed-scale view.
For 3D surfaces, choose mipmapping/minification per material and test oblique
distance views; nearest/no-mipmap is a style option, not a blanket performance
or antialiasing fix. Preserve frame padding/UV isolation at every chosen level.
Do not rebuild rescaled surfaces or texture uploads every frame without measuring.

## CRT as a presentation layer

The inspected pixel-art experiment used a single lightweight pass with partial
beam softening, restrained scanlines, an RGB aperture mask and highlight-only
glow, with brightness compensation. It was an authored approximation, not a
calibrated CRT simulation. Treat its strengths/output budget as project settings.

- Filter the game picture separately from HTML/native interface controls unless
  the requested art direction calls for filtering both. Keep text readable and
  hit targets unchanged; display overlays must not intercept input.
- Anchor phosphor patterns to final device pixels. A mask rendered at one
  resolution and subsequently browser-scaled can create moire. Weaken or disable
  it when the actual output budget requires rescaling or cannot resolve it;
  scanlines likewise need adequate output rows per source row.
- Preserve dark detail and warning contrast. Limit glow to useful highlights,
  compensate brightness deliberately and avoid unrequested flicker/warping.
- Separate source pixel size from CSS size and device pixel ratio. Larger
  logical pixels may require averaging detail before nearest enlargement; simply
  enlarging the canvas does not change its underlying pixel size.
- Keep an unfiltered comparison and a usable fallback for WebGL absence/context
  loss. Use the same source canvas/tick for A/B screenshots. Test resize, DPR,
  pointer alignment, layered UI, native-scale crops and sustained animation.
- Bound postprocess output resolution and measure actual GPU/frame costs on
  selected devices. A desktop browser at a phone viewport is not a phone-GPU test.

## Sprites and geometry in a 3D scene

A classic sprite-based source can work well with billboards; a flat railway
front image cannot represent a long walkable roof from arbitrary cameras.
Choose a fixed orthographic projection, directional sprites, or actual geometry
according to what the camera and gameplay require. Avoid stretching a sprite to
invent missing volume. Repeat coherent modules for long vehicles/structures or
use a model whose silhouette, support surfaces and small features were reviewed.

For anchored billboards, preserve native frame dimensions, left/top/root offsets,
world-unit scale and mirrored offsets. Choose source rotation frames from the
actual actor-to-camera angle. Check every supported direction, attack and death,
including attachments; independent centering of trimmed frames causes jitter.

The inspected 3D renderer exposed a real atlas-orientation error: top-down frame
rectangles were combined with a texture flip. Its adapter used `flipY = false`
with matching UVs. That value is a tested fix for that coordinate convention,
not a setting to copy blindly into every renderer. Test a recognizable frame,
corners and mirrored facing in the actual engine before importing a full atlas.

Separate cutout actors, translucent smoke/fuzz, fullbright effects and opaque
world surfaces. Choose alpha cutoff, blending, depth write/test and fog per
material role; inspect overlapping actors, fences, projectiles and light effects
against bright and dark backgrounds. A fullbright flash may bypass distance fog;
ordinary actors should follow the selected scene's lighting contract. Record
approximations instead of claiming a translucent substitute reproduces a native
effect exactly.

A repeating wall/floor texture cannot simply repeat a whole packed atlas: its
neighbors will enter the UV range. The inspected delivery adapter cropped each
logical surface pixel-exactly into a cached standalone canvas before creating
its existing repeat texture. This reduces fetches while retaining texture
objects. Compare that option with an atlas-aware shader or texture arrays only
when the runtime supports them and the measured cost warrants it. Transport
atlases do not by themselves reduce draw calls or GPU texture allocations.

Frame the camera with the complete HUD and selected aspect ratios. Keep the
actor, nearest hazards and telegraphs visible after menu/status overlays are
present; a camera tuned against a bare canvas can hide the player. Inspect fog,
light, source texture scale and upcoming biome surfaces together. Preload and
place upcoming world bands before their boundary instead of repainting the
whole world when the active-zone index changes.

## Contact and scene composition

Ground props with short contact shadows derived from their base/alpha footprint,
on the actual support surface; a distant centered oval can make them appear
airborne. Separate intentional airborne height from a body's grounded shadow.
Break up repetitive tiling with coherent texture variants and real edge props
such as curbs, fences, shrubs or walls. Preserve platform ends, ramps, material
joins and scenery boundaries rather than leaving abruptly cut rectangles.

Precomposed distant/side scenery is useful when it never needs independent
interaction. Keep actors, hazards, movable props and occluding structures separate.
Place scenery outside declared playable/platform bounds and preserve aspect
ratio. Zoom-out moments can reveal more composition without changing physics.

## Scope of these findings

Observed source: the pixel-runner display/motion notes and classic sprite-in-3D
renderer/delivery logs, plus direct inspection of their adapters. Those records
establish the implementation choices and specific corrections above. They do
not establish universal parameter values, calibrated display emulation, general
model quality or physical-device performance. New source styles still require
matched views, motion review and the [performance pass](performance-playtest.md).
