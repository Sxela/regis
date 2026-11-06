# Terrain generation and zone variety

Use a heightfield when it satisfies the selected settling-ground rules. Use a
two-dimensional mask/field when caverns and overhangs require it. Vector shapes
can keep initial topology compact; raster textures are visual resources, and
collision representation remains a separate engineering choice.

## Shape first, materials second, fitted illustrations third

For an illustrated two-dimensional mask world, a useful alternative to arranging
a few giant sprites is the pipeline below. A vector heightfield game can omit
illustration fitting and raster baking entirely; its render and simulation still
share the selected final terrain geometry.

1. Generate seeded terrain topology: ridges, concavities, cliffs, traversable
   shelves, overpasses, cavern cutouts and sparse floating islands where selected.
2. Fill solid ground with zone materials and mark protected voids/spawn regions.
3. Fit large/medium illustrations over that shape, preserving approved world
   sizes and aspect ratios. Use support anchors for grounded decor and a
   coverage/error score for terrain-body illustrations.
4. Add accepted silhouette extensions and smoothing under explicit limits;
   reapply protected voids, compose intentional artwork openings and validate
   the final topology. Resolve rim strips from the final contour.
5. Place fitting small decor, pickups/hazards and qualified actor starts. Bake
   destructible art and compile the same final solidity for simulation.

The exact stage order depends on whether an asset is a clipped terrain skin or
an object contributing new solid ground. Encode that role in metadata. A single
bottom-center anchor does not solve both. Keep expensive image readback and
asset analysis in preparation where possible, not at every new game.

Score illustrated coverage separately from number of placements. A map with
many small objects can still be mostly repeated filler. A greedy uncovered-area
score with size/overlap/protrusion limits can favor coherent large areas while
using medium connectors for gaps. If a large piece is omitted, compensate with
an area-appropriate group of medium pieces; a small ratio such as two or three
is a tunable starting point, not a cross-game rule. Do not shrink all art merely
to satisfy a source-pixel scale cap; preserve the approved world composition and
improve source resolution when that is the actual problem.

Limit deep overlap to preserve identity and cave openings. Border/footing
overlaps help pieces read as one landmass. A sprite should either connect to
support, extend below the waterline, or be an intentional floating island.
Being off-screen or partly under water does not prove connectedness. Classify
substantial floating components explicitly so cleanup does not remove intended
islands. Permit islands in the middle as well as outer regions when the topology
contract allows them; enforce spacing/density rather than one canned layout.

## Protrusion, smoothing and protected space

Expose advanced parameters when useful: maximum artwork stick-out beyond the
base shape, smoothing radius and topology/island density. State units, limits
and when they apply. A distance field can bound accepted solid extensions;
protected caves, corridors, spawn headroom and deliberately separate islands
must survive the expansion/smoothing stages.

Use one resulting mask for collision and terrain alpha, with explicitly allowed
visual-only antialias/rim fringe. Added ground receives material and exposed
edges receive the appropriate floor/ceiling/side treatment. Smoothing is a real
topology operation when it adds/removes solidity, not merely a blurry picture.
Recheck narrow bridges, cave entrances and support after it.

For setting comparisons hold seed, base shape and illustration choices/positions
constant where feasible; let only dependent decor/spawns change as required.
Otherwise a different random map can conceal the setting's effect.

## Qualify starts and initial objects

Use the actual movement body and current/largest supported combat size. Check
support footprint, headroom, actor separation and safe team-side allocation.
A grounded, healthy fighter can still be trapped in a decorative alcove.
Require useful non-self-damaging firing options under an explicit criterion:
for example, two separated aim sectors with real bazooka trajectories that
clear the body and avoid an immediate self-blast. Define angle separation,
clearance and shot power; two nearly identical rays are not two useful choices.
Use actual terrain and projectile integration, not a bounding-box-only probe.

When scenery prevents a start, retry/reduce/reposition scenery before silently
replacing the requested terrain topology. Bound retries and expose requested
seed, accepted seed/attempt and any fallback. Keep a reproducible safe fallback
when a valid layout cannot be produced; report its use. Revalidate after final
mask cleanup and after placing initial objects that can affect safety.

Initial mines/loot, if selected, need support and clearances, weighted spawn
probabilities, safe distance from starts and sensible access. Do not arm an
unavoidable mine under a newly spawned player. Airdrops must sweep/refine their
landing against actual support; a faster descent must not tunnel through it.

## Expand zones by roles, not copies

Keep a zone manifest of material identity, available unique large/medium/decor
designs, runtime template roles, dimensions, anchors, holes and source hashes.
Equalize catalogs only when that is the requested variety target; equal catalog
counts do not require equal numbers placed in every seed. Validate the active
filtered catalog, not a raw directory containing retired or excluded assets.

Keep distinct subjects and silhouettes within matching size/role budgets.
Where distinct zone identities are intended, materials, ceiling/floor strips
and small props should support that identity too, not only the landmark. Retain
intentionally shared materials when that is the art contract. Preserve original
content when expanding: baseline its image
hashes, dimensions, masks and IDs; append new designs and check retention.

Track whether every template is reachable in real generation. Rare pieces may
need a broader deterministic seed sweep; distinguish rarity caused by legitimate
fit from an unreachable role/filter. Show same-seed zone comparisons and several
seeds per zone, including wide/concave maps, overhangs, cave-heavy maps and
floating islands. A contact sheet of masters alone does not establish runtime use.

If existing seed outputs must remain unchanged, baseline complete layouts as
well as asset IDs. Append-only catalog changes and different selection weights
can change seeded choices even with separate RNG streams. Preserve a legacy
generator/catalog path, a compatible selection scheme or versioned placement
manifests, and regression-test old seed outputs. Otherwise identify the new
generator/content version explicitly instead of promising cross-version replay.
