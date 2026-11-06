# Turn-based artillery module

Use for side-view ballistic games in the Scorched Earth / Worms family: timed
or untimed turns, movement where selected, aiming/charging, destructible terrain and a
resolution phase before control passes. These findings apply across art styles
and engines; chibi art, CRT, particular weapons and map dimensions are choices.

Read [terrain and zones](terrain-and-zones.md), [art production](art-production.md),
[combat and camera](combat-and-camera.md) and [playtesting](playtesting.md) as
those systems are implemented. Reuse the shared [asset delivery](../../asset-delivery.md),
[mobile](../../platform-and-mobile.md), [style/rendering](../../style-and-rendering.md)
and [performance](../../performance-playtest.md) guidance.

## Establish the actual terrain and turn rules

Scorched Earth-like does not establish a terrain algorithm. Distinguish:

| Choice | Consequence |
| --- | --- |
| Heightfield, settling ground | A surface profile may suffice; collapse and actor settlement belong to the action. |
| Two-dimensional solid mask, suspended ground | Supports caverns, overhangs, bridges and floating islands; removing support need not collapse terrain. |
| Settling two-dimensional terrain | Requires explicit terrain motion/reconnection rules and a longer resolution lifecycle. |

Record water/boundary deaths, fall damage, wind/gravity, supported movement and
jumps, rope rules if any, action/retreat limits, team inventory ownership and
win/draw rules. Distinguish decorative motion from changes to collision. Do not
import shop/progression, movement-distance limits or collapsing ground from
another genre/module without a source rule or user choice.

Choose authored or seeded maps, allowed topology families, largest supported
fighter size, faction/roster limits and zone scope. Agree what a seed reproduces
within a generator/content version. Clarify whether a size setting changes
physics, combat hit envelopes, traversal or only presentation; never change an
ongoing match's body contract accidentally through a display preference.

## Build one complete shot-to-handoff loop

First implement a normal input-driven shot on representative terrain: aim,
charge/release, swept flight, hit, terrain cut, damage/knockback, falling or
death, settled aftermath, handoff and a fresh turn timer. Include above-map
flight, an overhang and water if those features ship. Expand weapons, zones and
events after this lifecycle works; a projectile disappearing is not completion.

Keep authoritative simulation, visual assets, terrain composition, camera and
input/UI separate. Terrain, combat, AI error and purely visual randomness need
independent reproducible streams. A weather particle or a new decoration should
not change the next damage roll or AI shot.

## Input and menu contract

A compact desktop mapping can use left/right for movement, a separate jump key,
up/down for aim, and hold/release to charge/fire. Treat bindings as configurable
project decisions. Sample simultaneous movement at takeoff so a direction+jump
works in one tick; preserve airborne steering/momentum according to the rules.

Touch may combine field swipes for move/aim with explicit Jump and Fire buttons.
Support move+jump and aim+charge with independent pointers; distinguish taps,
drags and holds. Clear held keys/pointers/charges on pause, focus loss, pointer
cancellation, weapon changes, turn end and actor handoff. A held direction or
key repeat must not control the next team. AI turns use the same pause/reset
contract and lock human combat input appropriately.

Keep setup, promotional copy and long help outside the live combat HUD. Avoid
duplicating weapon names under recognizable icons; retain accessible names,
tooltips and weapon help. Keep ammo, active team, health and turn state legible.
Use the available desktop width and mobile height, with a centered HUD where
useful; a fixed square arena or empty control gap wastes play space.

Keep picture settings separate from advanced generation controls. State whether
a control applies immediately or to the next match. Saved game zoom should scale
the camera, not HTML controls or fighter physics, with tested pointer inversion.
Preserve a full-map targeting/overview mode. When zoom exposes beyond-world
space, define centering, background and water extension rather than showing
clipped rectangular layers. Do not treat a particular zoom range as universal.

## Expand by verified content contracts

Define zone material identity, art roles, approximate size classes and intended
variety. Finish one representative zone's generation and preparation before
expanding its peers. Catalog counts, usable templates, per-map placements and
files actually delivered are different quantities. A request to match variety
does not mean forcing identical layouts or placements everywhere.

Read [playtesting](playtesting.md) for seed sweeps, weapon-role comparisons,
render/collision audits and actual desktop/touch follow-through. Existing shared
evidence tiers and delivery rules still apply. This module is instruction
guidance; it does not add an artillery brief or validator to the CLI. The CLI
currently offers only its separately implemented genre choices.
