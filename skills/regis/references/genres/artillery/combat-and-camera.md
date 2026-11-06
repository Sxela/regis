# Combat, destruction, ropes and action cameras

## One authoritative destruction lifecycle

Keep authoritative, versioned terrain state: a heightfield, solid mask or other
representation appropriate to the selected rules. Render the same geometry.
For raster terrain, bake destructible assets into a visual surface or ensure
their rendering consumes the same cuts. A separate untouched foreground tree
must not reappear over its crater. Damage, collision, support queries, ropes,
spawning and AI forecasts must all see the updated ground. Never use an uncut
original sprite mask for one of these consumers.

Carve the selected blast geometry from both terrain state and visuals. For circular
collision, add deterministic irregular scorch/color gradients clipped to the
surviving ground without changing the physical circle. An irregular physical
crater is also valid, but its geometry must then be shared by all consumers.
Do not let scars refill existing holes or flicker from per-frame random jitter.

Where raster caches are used, update minification levels only where changed, with enough
filter-kernel halo. Compare patched output against a fresh full resample after
overlapping cuts and cache recreation. Invalidate image/prefilter caches when
art hashes change. Bound cache memory and avoid resampling the whole map every
frame during a pan or shower of impacts.

Tiny detached components and narrow slivers can invisibly block walking or
shots. Remove only those below scale-relative area AND footprint/thickness
criteria, from both collision and rendered caches. Preserve meaningful bridges
and intentional islands. With suspended terrain, cleanup does not imply general
collapse; with settling terrain, use that game's separate settling rules.

## Ballistics and combat bodies

Use swept/substepped contact tests for fast shots, hooks and descending crates.
Share gravity, wind, origin and collision rules with prediction/AI. If increasing
travel speed while retaining the same arc, apply one consistent ballistic-time
mapping to integration and forecasts; separately specify fuse, effect, turn and
impact-hold clocks. Multiplying velocity alone generally changes the arc.
Test bounces and splits under the chosen fuse clock.

Apply hits to the agreed current-size body envelope or silhouette, not a stale
point/100%-size body. For blasts, shortest distance to that body gives meaningful
edge overlap and falloff; a center-distance check can miss an enlarged head.
Keep visual size, combat size and traversal body changes explicit. Test both
facings, scale extremes, partially obscured fighters and environmental deaths.

Inventory belongs to its chosen owner. Shared team ammunition must survive
fighter rotation/death and update from pickups without per-character refills.
Separate unlimited basics from consumables and prevent failed/cancelled actions
from spending resources unless specified. If shared abilities charge from
damage, count actual HP lost, define self/friendly/environmental attribution,
charge caps/overflow and reset rules. Route casts through normal action/camera
resolution; healing should not accidentally revive dead actors.

Spread salvos relative to explosion diameter and supported body sizes. At map
edges shift the formation as a group instead of clamping all bombs to one x.
If one action is intended to hit each actor once, implement a cast-level victim
set; do not rely on visual spacing alone. Radius increases also change area,
terrain removal and displacement opportunities, so retest more than peak damage.

## Compound attacks and secondary hazards, when selected

Define launch power per weapon: chargeable, fixed or another explicit rule.
A fixed-power attack must ignore stale power from previously selected weapons,
including zero. Use the same declaration for simulation, aim preview, input
feedback and AI; hiding the charge control alone does not enforce fixed power.
Keep balance values in shared weapon data rather than duplicating damage in AI
scores. Distinguish flat damage, percentage of maximum health, percentage of
remaining health and range falloff before changing a damage contract.

For separately fired attacks within one turn, model remaining activations and
resource reservation explicitly. A final inventory charge may still entitle the
actor to the prepaid follow-up. Resolve the first impact/fall before restoring
movement and re-aiming with the same remaining turn time. Define switching,
skipping, timeout, death and victory behavior. A follow-up must not advance the
world-event boundary or arm next-turn hazards early. AI and human inputs use the
same availability rules and interruption cleanup.

Parent and child projectiles need separate impact/fuse contracts. A bouncing
parent may emit contact-detonating fragments; inheriting its fuse must not make
those fragments bounce unintentionally. Preserve damage attribution through
splits and environmental chains, prohibit unintended recursive splitting, and
use swept contacts with the selected body and terrain representations.

Separate damage causes for destructible pickups or other reactive objects.
If landing is harmless but attacks ignite an object, do not route fall/landing
physics into the combat-damage trigger. Define eligible direct hits, blast and
persistent damage, including zero-damage effects. Remove or mark the object
spent before emitting its children so overlapping hits cannot detonate it twice.
Nearby chains must remain in the current action's resolution lifecycle.

A pickup that cannot currently help the actor may remain available under the
selected rules. Give concise no-op feedback, such as full health, without
consuming it or spamming feedback every simulation step. Recheck after leaving,
re-entering or changing eligibility; an unavailable benefit is not a failed
collision by itself.

## Persistent and liquid attacks, when selected

A sequential narrow stream and a simultaneous fan are different attacks. Define
emission timing, angular/speed variation and inherited momentum explicitly.
Queued emissions count as unfinished work even during gaps with no live
projectile. Give each landed unit its own finite tick count, schedule, source
and cleanup; tie damage to simulation time rather than rendered frame count.
Pause freezes those deadlines.

For liquid-like ticks, apply the chosen surface movement, then damage and ground
burning at the new position. Use current collision for legal steps/support,
settle into newly cut ground, and define behavior at walls, gaps and water.
Choose downhill preference and momentum deliberately; tiny self-made pits must
not accidentally reverse the liquid back and forth if forward flow is intended.
A stationary scorch effect does not demonstrate liquid movement.

Terrain burning must be visible at the game's supported scale and remove the
same ground from collision and artwork. A crater counter or particle effect
alone cannot prove that the ground was consumed. Inspect the cut below the
original surface and the subsequent support/settlement, including overlapping
burns and surviving surface rims. Tick counts, travel distances, radii and damage
remain project-specific tuning choices.

Many small terrain cuts can repeatedly invalidate surface queries, debris
cleanup and filtered render caches. Profile the actual workload before changing
behavior. Where appropriate, batch nearby-in-time cuts into bounded updates and
patch dirty regions, while retaining the requested damage, erosion and timing
contract. Include queued terrain work in completion/flush rules so no edit from
one action leaks into the next turn.

## Action resolution owns the next turn

Model aim/control, flight, impact and unsettled aftermath explicitly. Track all
live parent/child projectiles, recent impacts, affected moving actors and
queued emissions, persistent ticks and pending mine/chain events. Start the next turn and its fresh timer only after
the required action work has resolved and the selected stability/quiet interval
has elapsed. Pause should freeze simulation deadlines and inputs together.

A fixed timeout must not silently hand control to the next team while a fighter
is falling. Diagnose non-settling states; use a disclosed bounded recovery for
genuine numerical deadlocks rather than redefining an unfinished action as a
clean handoff. Do not implement an impact hold by freezing the entire simulation:
smoke, secondary impacts and ongoing physical falls still need to progress.

Follow the projectile through high arcs, then the impact and displaced/falling
fighter through landing or death. Prioritize consequential action when a fall
and remaining shots overlap. Multi-shot/meteor cameras fit the union of live
shots, expected landing area where available, recent hits and affected actors.
Retain a sufficiently wide action envelope when only the last shot remains to
avoid zoom pumping. User zoom multiplies this framing without cropping required
subjects; overview/targeting can retain an explicit map-fit mode. Invert the
actual camera transform for mouse/touch coordinates at every zoom and DPR.

A dense particle attack may read better with a stable landing-area subject than
by following individual particles or the latest damage tick. Accumulate the
chosen impact bounds for that action and keep the center independent of flame
expiry, terrain erosion and per-particle jitter. A fixed action zoom with eased
position changes can avoid a scale jump when the first particle lands. Resume
consequential actor/fall follow when appropriate after the lingering action;
this is a camera policy, not permission to skip the aftermath.

Diagnose perceived lag with both frame timings and camera transforms. Cheap
simulation can still look jerky when subjects alternate, zoom changes repeatedly
or a terrain filter rebuild accompanies each tiny hit. Measure simulation,
terrain/cache work, drawing, frame intervals and camera position/scale separately
on reproducible scenes. A desktop headless improvement does not certify mobile
performance; do not remove requested gameplay to mask a rendering problem.

## Ropes, if selected

Fire the hook through normal gun aiming/origin and swept terrain contact. On a
legal hit attach; otherwise miss/expire with an explicit range. Represent a
wrapped rope as a path of anchor/contact points plus the actor segment. Bends
consume total length; reeling the last segment alone gives incorrect reach.

Use the current destructible mask for segment obstruction and line-of-sight
unwrapping. Remove destroyed contacts and detach when the anchor disappears.
Share the path across physics, drawing and camera. Bound routing searches and
handle enclosed/failed routes explicitly rather than letting the cable tunnel.
State approximations such as absent thickness, friction or moving attachments.

Swing/reel controls must coexist with drop/jump semantics. Dropping preserves
the selected momentum contract. A small cooldown-limited ground rebound can aid
navigation if requested, but idle contact must not bounce or create unlimited
energy. Verify multiple bends, unwrap, blast removal, length limits, release,
ground collision, turn expiry and pause with actual fired hooks.

## AI and environmental presentation

AI should select legal plans through the same actions/resources as players,
including terrain, wind, bodies and friendly fire. When difficulty uses aim
error, separate it from planning quality: perturb the final refined angle/power/
target once per shot, keep it during aim/charge, and do not let refinement erase
the error. Exact aim can remain a chosen source rule or difficulty setting.
Use a separate deterministic error stream. Fixed plans should replay, while a
difficulty curve still needs outcome/accuracy distributions and human calibration.
Document weapons or traversal tactics the planner cannot use.

Fire/smoke trails follow actual projectile motion; clear effects on match reset
and stop emission while paused. Weather can be cosmetic or physical: specify
which. Zone-weighted rain/snow/night/fog should retain aiming, terrain and team
readability, with bounded particles and reduced-motion support. Cosmetic birds,
weather, water and scorch must not consume combat RNG or alter invisible ground.
