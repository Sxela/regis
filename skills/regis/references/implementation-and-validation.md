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
