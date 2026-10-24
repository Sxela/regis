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

Document the spatial contract: source cells, world coordinates, walking support/
height, actor feet/root, sprite/model anchors, projection, camera, screen and
minimap transforms. Ground, shadows, corpses, loot and effect endpoints must agree;
flying body height may intentionally differ from its ground shadow. Declare the
runtime's support for stacked surfaces, bridges, slopes, attachments and occlusion
before importing difficult maps. Implement unsupported structures or make an
explicit scoped adaptation with visible boundaries; accessible-looking scenery
must not silently promise playable ground outside the actual crop.

Retain a visual traversal probe across a relevant slope/height seam, tile boundary,
zoom change and mirrored actor. Check foot/shadow contact, loot and attack endpoints
and compare minimap relief with the rendered world. Arithmetic and a successful
decode cannot establish that a hill or supported floor looks correct.

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
For difficult included families, retain a compact source-to-runtime comparison:
behavior evidence or bounded uncertainty, target/origin, path shape, sprite scale/
spacing, cadence, impact, status and sound. Exercise a self-buff, sustained field
and unusual beam where present; a branching beam is not a curved beam and a
decorative aura is not active protection. Verify representative behavior before
multiplying it across the catalog.

Keep supplied source layouts and their encounter identities separate from
authored adaptation configurations. Different titles on an identical arena do
not establish distinct regions. Continue integrating the scoped source catalog
after the representative slice passes its review.

## Verify complete asset lifecycles

For every included spell and actor, maintain a compact role matrix alongside
its source ID. Record source member/variant, available/absent/unsupported/unknown/
not-applicable status, runtime event/consumer and rendered or audio evidence.
Keep discovered, decoded, connected and verified states separate per role;
one used sprite or a successful sound-file load does not complete the identity.

| Identity | Applicable roles to trace and exercise |
| --- | --- |
| Spell/skill | Original name and icon in offers/loadout/inspection; caster animation/origin; projectile or beam travel; collision/miss; impact/splash; persistent field; damage-over-time/status application, active feedback and expiry; cast/travel/impact/loop/end sounds where supplied. |
| Character/creature | Idle and movement facings; attack/cast variants; hit reaction where supported; dying sequence; corpse/resting body and bones/decay where supplied; attachments/shadows; movement, attack/cast, hurt and death sounds where supplied. |

Use all recovered applicable roles for the selected content. Do not require a
projectile for a self-buff, invent a corpse for a creature that disintegrates, or
add a status purely to display an unrelated effect. Do not drop a native death
or splash resource merely because a fade or circle is easier. Investigate missing
companions; an absent/unsupported role needs evidence, an explicit adaptation
and review against the quality target before counting the identity complete.

Exercise the full chain in the actual renderer: cast through impact and lingering
status expiry; movement/attack through death, the final resting corpse and its
configured cleanup. Verify frame order, anchors, direction, scale, timing and
transition continuity. Damage/status ticks must match the feedback rather than
an unrelated animation. Persistent visuals and looped sounds follow their owner,
stop on expiry/removal and do not survive death, travel or reload incorrectly.
If corpses persist across saves, restore their correct stage; otherwise document
the cleanup policy. Bound corpse/effect/audio populations and test repeated kills
and overlapping casts under load without silently removing required feedback.

Bind sounds to their real events, with correct variants and controlled retrigger/
overlap. Check audio playback and stop behavior separately from file decoding or
unlock state; retain an actual recording and distinguish audible review from
technical playback evidence. Report per-role gaps instead of describing a whole
spell/character family as integrated when only its icon or walk cycle works.

For web/mobile distribution, distinguish the decoded archive from resources
actually requested and retained by the client. Follow [asset delivery](asset-delivery.md)
for dependency pruning, indexed atlases/bundles, compression, cache behavior,
random frame access and cold/warm load measurements.

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

Start input/render probes after their observable prerequisites: the rendered
camera, decoded required resources and usable controls, rather than a simulation
phase flag alone. Report real-asset checks separately from synthetic CI fixtures.
Bind release checks to the delivered artifact and use a fresh unpack directory;
a development tab/cache or leftovers from an older archive can hide omissions.

Test advertised behavior and past defects. Avoid tests that merely restate
configuration values or assert that a function was called. Seed scenarios, save
build/configuration hashes and keep instrumentation from changing RNG/state.

Use these real-runtime regression properties where applicable: reordering the
same attackers respects declared hit-selection/tie-break rules; enabling telemetry
leaves authoritative/RNG state and outcomes unchanged; recomputing after equip,
buff expiry and save/reload does not accumulate contributions; applying a preview
to a copy agrees with committing the purchase; nested proc/heal effects are
accounted once. Exercise shared cooldowns and distinguish attempted from restored
healing. Use justified numeric tolerances, not arbitrary frame-step invariance.
Keep acceptance results current using the [change-impact contract](playtesting-and-balance-log.md#keep-acceptance-evidence-current).

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
