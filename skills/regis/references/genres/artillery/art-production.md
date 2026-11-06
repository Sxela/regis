# Artillery art and terrain asset production

For raster assets, use the shared [sprite/atlas workflow](../../sprite-and-atlas-production.md)
for generation, provenance, preparation and packing. Apply its source/sheet/
texture procedures only to the asset types selected by the project. Vector and
procedural games do not need generated sprites, atlases or painted materials;
retain their native geometry and apply the equivalent scale, anchor, silhouette,
edge and motion checks. The following findings address side-view terrain
composition and large camera-scale changes.

## A visual contract across size classes

Review a fighter, held weapon, projectile, large formation, medium connector,
small prop, material tile, terrain edge and UI control together at actual game
scale. Fix projection, light direction, palette, outline/detail scale, anchors
and intended world dimensions before bulk production. Separate sky/cloud/sun
sprites from terrain when independent scaling or motion helps.

World units per source texel alone do not establish consistent density: one
painting can contain much larger baked pixel clusters or softer brushwork.
Inspect native-size crops and motion at gameplay/overview zoom and target DPR.
If scale-independent illustrated art is intended, use smooth high-resolution
masters, prepare near final world density, then cache high-quality filtered
draw sizes or mip levels. Bilinear display cannot reconstruct a badly enlarged
low-resolution painting. Repaint/edit from the approved reference at the needed
resolution, preserving identity, proportions, openings and registration.

For deliberately authored pixel art, retain a coherent pixel grid instead of
automatically smoothing it away. For smooth art with optional CRT pixelization,
apply the coarse grid once in the final presentation pass. CRT can unify minor
differences but does not repair blur, inconsistent detail or sampling shimmer.
See [style/rendering](../../style-and-rendering.md) for stable camera phase,
bounded prefilter caches, device-pixel masks, context loss and clean comparisons.
Do not hide a sky artifact by silently exempting the sky from an otherwise
uniform picture treatment; resolve mask sampling/moire and inspect the result.

## Generate composable land, not miniature screenshots

Use isolated large landmarks when arches, tunnels and complete silhouettes need
room. Sheets work for medium pieces and small decor when all objects remain
separate and intact. Useful roles include cliffs, bowls, arches, root masses,
ruins or wrecks, bridging connectors and small floor props. Subjects belong to
the zone; another zone need not repeat the same ship or building silhouette.

Request true transparent alpha, safe margins, complete rounded/scalloped bases,
no background plane, exterior shadow, labels or rectangular bottom crop. For
grounded props, include a little zone-matched footing; for large formations,
design embed-friendly lower masses with open negative spaces as required.
Existing large artwork may need bottom-repair edits too. A rounded base does
not replace a measured support anchor or make every placement grounded.

Prepare seamless interior materials and separate floor/grass, ceiling/cave and
side/rim strips as appropriate. Their physical detail scale should agree with
the illustrations. Test tile seams in a broad flat region, not only behind
busy props. Do not stretch a short texture to fill a long ledge.

Inspect real alpha rather than trusting a transparency request. Fake white or
checkerboard backgrounds can make a whole sheet one connected object. Verify
expected object counts, actual connected components and canvas-edge contacts.
Generated grids may be uneven: crop whole measured objects, not arbitrary equal
cells. Retain low-alpha contours and trim/pivot metadata without neighbor leaks.
If a limb, root or blade is clipped, repair the source; padding alone cannot
restore missing content. Preserve originals and version edit outputs.

## Anchors, mirrors and embedding

Store the floor/contact point inside the artwork, embedding depth and a support
footprint independently of canvas bounds. A tree root pad, broad cliff footing
and narrow wreck support need different registration. Sample support across
the footprint, not just its center. Review anchor marks drawn over the asset
and the same asset placed on slopes, ledges and cavern floors.

Compose overlapping terrain in an intentional order: lower foundations first,
higher surfaces over them to conceal underlying grassy seams. Apply protected
map voids after the relevant overlap stages so hidden backing sprites cannot
fill a cave. Small cavern props must fit its usable floor/headroom.

Horizontal mirroring can increase layout variety. Transform anchors, masks,
holes, support samples and attachment offsets with the image. Directional
lighting or text may make a particular asset unsuitable for mirroring. Mirrors
and recolors are variants, not new unique designs when auditing catalog parity.

## Spline edges and effect bounds

An edge strip follows the contour's arc length and local tangent/normal. Use
short overlapping textured segments or a mesh; interpolate a smooth contour
and maintain texture frequency instead of stretching a few broad quads. The
registration seam inside the painted strip determines its normal offset: center
the intended seam on the artwork/clipping contour, rather than placing the
whole grass/rock bumper inside or outside it. Check floors and ceilings with
opposite normals. Define corner joins and avoid self-overlap at tight curves.

Trim ends with a smooth taper toward the clipping contour; blunt flat cuts and
thick rounded caps read as detached sausages. Crop/reveal texture through the
taper rather than compressing its texels to a point. Distinguish the supporting
collision boundary from a narrow decorative fringe and measure that fringe.

Projectiles and blasts need their own sprites, pivots and transparent guards.
Remove baked ground shadows from airborne objects. Radial airborne blasts must
not inherit a floor-clipped stock explosion. Inspect every frame's four edges,
lower half and maximum radius. Align animated bodies to stable torso/foot
landmarks so wings or limbs move without frame-to-frame body jumps.

Held-weapon art can contain a diagonally painted barrel. Calibrate grip, barrel
axis and muzzle, including mirrored facing. Aim, projectile origin and rendered
weapon must share that transform. Parent/child cluster sprites may have different
sizes; visibility settings and art enlargement must not silently change damage
or collision unless that is the chosen gameplay contract.
