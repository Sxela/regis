# Implementation and validation

## Architecture that permits honest tests

Choose the engine/rendering approach after representative extraction. Keep the
source catalog immutable and survival adaptations in configuration. Use stable
IDs through extraction, combat, rendering, offers, UI, saves and tests. Separate
simulation from presentation where practical; engine-level replay tests are a
valid equivalent when a headless simulation is unavailable.

Build one complete vertical slice, then extend asset families and regions in
batches. Every imported skill/stat needs an implemented consumer, an observable
effect and eligibility limits. An animated icon alone is not a mechanic.

## Source presentation is implemented behavior

Derive idle, movement, attack, death and other required actions from the source's
animation metadata and representative contact sheets. Check frame ordering,
directions, mirroring, loop bounds, timing and anchors. Never infer a walk cycle
by taking a fixed number of initial frames from every creature. Decoding an atlas
does not finish its playback. Exercise facing changes, attacks and death in the
running renderer; retain a short motion capture alongside stills.

Map source-facing indices to world movement, aim and the camera projection
explicitly; do not assume frame zero points along a standard mathematical axis.
Run visible direction probes for all supported facings, including reversals and
mirrored frames. Compare actual displacement with the displayed body/feet and
walk-cycle direction. A changing facing variable does not prove the right frame
was rendered. Keep intentional strafing/aiming behavior distinct from an inverted
axis, wrong angular offset or reversed animation lookup.

Use source projection, actor/world scale, terrain transitions, elevation and
depth ordering. Tile a coherent interior/transition set using its adjacency
rules, not random rows from a terrain sheet. Validate equipped/attached layers
against moving actors, not only a static preview. Native projectile/VFX/audio
associations should reach the actual attack/status consumer. Temporary circles,
lines and static sprites are debug assets until replaced or intentionally chosen
within the quality target.

For every included spell/ability, trace the applicable chain from source assets
to cast animation/origin, projectile travel, collision/target resolution,
impact or persistent effect, status lifetime and sound. Use source-derived
offsets, orientation, layering and timing where established. Connect those stages
to the real damage/status event; a loaded atlas, an icon or a line drawn while
damage resolves elsewhere does not establish spell integration. Test expiry,
misses, obstruction and upgrades against the chosen actual rules. Inspect a
rendered cast at normal speed and frame by frame to verify the right effect is
visible at the right place/time. Record deliberate mechanic/art remapping.

Keep supplied source layouts and their encounter identities separate from
authored adaptation configurations. Different titles on an identical arena do
not establish distinct regions. Continue integrating the scoped source catalog
after the representative slice passes its review.

## Behavior tests

| System | Meaningful invariants/scenarios |
| --- | --- |
| Formulas | Base/contribution arithmetic, units, independent layers once, caps, equal-time cast counts, unequip/re-equip and buff expiry. |
| Combat | Automatic target selection; real status effects; chain order/range; projectile/field collision; summon ownership, pursuit and expiration; bounded recursive procs. |
| Rewards | Useful offers after caps/full slots; learning versus improving; milestone queues; preview and applied effect agree. |
| Economy | Legal earned budgets; purchase debit/apply once; stale offer/double input/cancellation cannot consume currency. |
| Persistence | New-run/death/next-area reset table; save RNG/cooldowns/pending choices; idempotent migrations; no duplicated loot/healing. |
| Navigation | Reachable spawn/exit/loot, floor correctness, body clearance, pursuit round obstacles, legal escape destinations, stuck detection and documented recovery. |
| UI/input | Explicit buy/select; modal input release; focus/tap equivalents; comparison/drag/cancel; safe responsive layout and controls. |
| Performance | Worst frames/path budgets, population bursts, VFX and decode memory on representative devices. |

Test advertised behavior and past defects. Avoid tests that merely restate
configuration values or assert that a function was called. Seed scenarios, save
build/configuration hashes and keep instrumentation from changing RNG/state.

## Native geography and pathfinding

Collision must agree with visible terrain and the actual walking surface. Check
flood-fill connectivity for placement, then real actor navigation for paths.
Render floor/height/collision overlays to compare with the map. Probe doors,
stairs, diagonal corners, walls, shorelines, crop boundaries, props and bridges;
repeat for the player, smallest mob, largest ordinary mob and promoted boss.

Measure stalled time, failed path searches, blocked placements and recovery.
An offscreen spawn needs a legal path inward. A reachable cell for a point may
be unreachable for a large body. Keep local spawn identity while finding legal
positions. Queue failed guaranteed encounters/rewards rather than dropping them.
Use budgeted/cached pathfinding and test moving targets; do not replace it with
routine wall clipping or silent teleporting. A recovery is reported separately
from successful navigation.

## Validate beyond unit tests

Run formula/transaction checks, controlled encounters, map/navigation probes,
earned campaign policies, human sessions and packaged-device checks. Mark each
result with class, difficulty, seed/route, earned or synthetic budget, source
version, content/config hashes and outcome (win/death/horizon/abort).

All three classes and all three difficulty contracts require evidence. Unit
tests do not prove fun, a bot win rate does not prove human balance, a horizon
does not prove victory, and a debug/browser run does not validate an installer.
Keep an open-issues log with reproduction and next experiment. If actual human
or device testing is unavailable, record that gap and make the review build
runnable; do not invent sessions.
