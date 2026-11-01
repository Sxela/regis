# Forward runner module (integrated REGIS Runner)

Read this for lane-based forward runners. Keep the target loop separate from
the source genre: a shooter, RPG or racer contributes different secondary verbs.
Read the [source-genre matrix](genre-adaptation-matrix.md),
[mechanics](game-to-runner-mechanics.md),
[design and difficulty](design-and-difficulty.md) and
[track fairness](track-generation-and-fairness.md) for the selected project.

## Product defaults and overrides

Default to three lanes, automatic forward movement, lane changes, jump and slide;
three source-themed starting runners with strengths, weaknesses and two earned
build paths; useful autoequip and an end-round loot/inventory/equipment/buy/sell/
permanent-upgrade flow. These are defaults, not evidence about the source.
Honor a requested simpler game without inventory, shops, upgrades or leveling;
exclude their scenarios and document the actual loop rather than adding them
to satisfy a template. Authored tracks are valid: test their full route and
transitions; seeded generation adds a reachability sweep across seeds.

Use three.js for a 3D runner by default, pinned in the game's lockfile and served
locally. Canvas 2D fits sprite-based projections. Choose from inspected assets
and the requested view; a flat front sprite must not become a stretched wall
where the player expects a walkable roof. Preserve facing, proportions, anchors
and height. Read the [implementation supplement](implementation.md).

## Controls and fairness

Default touch controls are swipes (left/right lane, up jump, down slide) with
optional buttons; desktop uses arrows/WASD plus the selected combat controls.
Specify distance/velocity thresholds, buffering and simultaneous actions.
If jump+strafe is supported, recognize a diagonal as two actions and allow two
touch buttons at once; a dominant-axis-only recognizer would lose that input.
Measure touch latency and reaction windows at the maximum supported speed,
including portrait mode, resize, safe areas and full HUD occlusion.

Biomes retain source area art, local rosters and coherent transitions. Every
hazard has visible counterplay (one or more documented answers). Distinguish
roof support, side impacts, head-on collisions and overhead clearance. Match
collision to the displayed shape and make hit/death feedback explain failure
before the menu. A reachability solver must include actual action timings,
buffers and any overlapping threats, not just an empty lane per row.

Read the [runner playtesting supplement](playtesting.md) with the shared log.
Keep unit/property, actual-module headless simulation, rendered real-input
automation and human sessions separate. Test novice/average/expert policies,
fresh and earned states where progression exists, every runner/mode/biome,
speed caps and transitions. Report sample sizes, distributions and death causes.
Fix hidden hits, unavoidable patterns and frame stalls before tuning damage.
For promos, select active source-gameplay windows for movement and secondary
verbs, distinct seeds/routes, and disclose capture-only warps or assisted runs.


See the [illustrated English runner case](../../examples/railway-runner.md) for
lane/roof visibility, scenery framing and electrical hit feedback. The case's
authored assets and rules illustrate the principles; they are not module defaults.
