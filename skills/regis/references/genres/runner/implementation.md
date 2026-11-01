# Runner implementation supplement

Apply the selected defaults and user overrides in the [module workflow](workflow.md).
Only selected systems require their corresponding scenarios.


Read [shared implementation](../../implementation-and-validation.md) first.

## Deterministic simulation contract

The runner simulation is a pure module: `step(state, inputs, dt)` with a fixed
timestep (for example 1/60 s), seeded RNG stored in state, and no access to the
DOM, audio, renderer or wall clock. The renderer interpolates between steps; the
headless agents, unit tests and replay tool call the same `step`. Inputs are a
queue of discrete actions (lane-left, lane-right, jump, slide, fire, switch) with
buffering rules from the movement contract. A replay is `(seed, config hash,
input log)` and must reproduce the run exactly.

Keep in the simulation: track rows/chunks, runner position and vertical state,
speed, hazards, enemies and projectiles, pickups, combat, damage, autoequip,
run statistics and death cause. Keep out: camera, animation frame selection,
particles, sound triggers (emit events instead), HUD layout.

## Track geometry, collision and rendering

Declare the spatial contract: lane centers in world units, row spacing, runner
hitbox, hazard hitboxes by type (full, low, high), jump arc and slide height,
enemy and projectile hitboxes. The renderer places source art on those same
coordinates; a mismatch between drawn obstacle and hitbox is a fairness defect.
Provide a debug overlay that draws hitboxes over the rendered scene and use it in
screenshots for the track-traversal pass.

For 3D runners, three.js is the default renderer: a corridor or road built from
source wall/floor/ceiling or sky textures, a chase camera behind the runner,
sprites as camera-facing billboards (source sprite games already drew actors that
way) or source models with native animations. Use nearest-neighbor filtering for
pixel-art textures, native palettes, and fog matching the source's light
diminishing. Pin three.js in the game's lockfile and serve it locally so
Electron and offline play work without a CDN.

Billboard sprites need correct anchors (feet on the floor), native animation
frame order and timing, and rotation-angle selection where the source has
directional sprites (choose the frame by the angle between enemy facing and
camera). Death animations play to their final frame and remain or fade according
to a declared policy. Projectiles use native sprites and impact frames.

Probe lane changes, jumps, slides and collisions visually at normal speed and
frame by frame: the runner must visibly clear what the simulation says it
cleared, and must visibly hit what killed it.

## Checks that caught real defects

- Derive timings (refire periods, wind-ups, animation lengths) from the source's
  state chains, stop at the documented return state, and assert a few known
  source values in tests. Counting one extra "ready" step makes every weapon
  slower.
- Verify atlas sampling on a known frame in the actual renderer. Engines differ
  in texture origin conventions (for example three.js flips textures vertically
  by default); a correctly decoded atlas can still render the wrong region.
- Capture the runner at every supported viewport with the full HUD: a chase
  camera that looks right without the HUD can hide the runner behind a status
  bar. Shift the projection or reframe instead of shrinking source HUD art.
- Filter loot, shop stock and pickups to what the loaded edition contains
  (shareware versus registered data sets differ).
- Make end-of-run settlement idempotent on the run's identity, not on a counter
  that settlement itself increments.
- Make the development server port configurable and never stop another local
  process that already holds a port.

## Pickups, autoequip and transactions

Pickups resolve in the simulation on overlap with a declared magnet radius.
Autoequip runs inside the same step as the pickup and emits an event the UI shows.
Persisted inventory changes only at round end, through the same transaction
helpers the shop uses. Test pickup order permutations, locks, full inventory,
save mid-flow and repeated end-round screens for duplication.

## Validate beyond unit tests

Run the separate [performance playtest](../../performance-playtest.md), then keep its
results distinct from earned balance and human-experience claims.
Run formula/transaction checks, controlled encounters, map/navigation probes,
earned campaign policies, human sessions and packaged-device checks. Mark each
result with runner, agent profile, difficulty, seed, earned or synthetic budget, source
version, content/config hashes and outcome (win/death/horizon/abort).

All three starting runners, all three agent profiles and all three difficulty contracts require evidence. Unit
tests do not prove fun, a bot win rate does not prove human balance, a horizon
does not prove victory, and a debug/browser run does not validate an installer.
Keep an open-issues log with reproduction and next experiment. If actual human
or device testing is unavailable, record that gap and make the review build
runnable; do not invent sessions.
