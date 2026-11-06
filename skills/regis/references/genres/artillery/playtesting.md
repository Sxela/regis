# Artillery validation and balance

Read the shared [playtest/evidence policy](../../playtesting-and-balance-log.md)
and [performance protocol](../../performance-playtest.md). Use the real game
simulation and renderer. Rule tests, headless matches, rendered real-input
automation, controlled visual fixtures and human sessions answer different
questions; retain their actual scope.
Apply scenarios only to selected systems and representations: vector games need
no sprite contact sheets, single-language games need no additional locale, and
no-inventory games need no resource economy.

## Terrain and content qualification

For each shipped zone and topology family, cover deterministic seeds, different
roster sizes and the maximum supported combat size. Exercise terrain settings
at zero/default/extremes and use matched-seed comparisons when isolating one
parameter. Include an overhang, concave valley, cave interior, narrow bridge,
rooted mainland and sparse floating-island cases where those features ship.

Record requested/accepted seed, generator/content hashes, retries/fallbacks,
topology, illustrated coverage, placements by role and spawns. Check grounded,
separated healthy starts after normal simulation advances, plus useful firing
lanes. A safety probe must include actual body/muzzle size, trajectories and
self-blast radius. Cover support changes from final cleanup or initial objects.

Assert active catalog counts independently of file counts. Verify all retained
IDs, dimensions, image hashes and masks when expanding a catalog. New designs
must appear in actual seeded placement, not only an asset board. Sample enough
seeds for fit-dependent rare content; record sample size and missing IDs. Do not
distort legitimate generation merely to make every design appear in a tiny demo.

Render every zone using its actual materials and selected sprites. Compare
rendered alpha against authoritative collision after assembly, mirroring,
protrusion, smoothing, holes, blast cuts, sliver cleanup and cache rebuilding.
Use exact pixel comparisons where definitions permit. If antialiasing or a rim
fringe is intentionally visual-only, define a narrow measured allowance and
reject interior cave fills or hidden solids outside it. A broad edge exemption
can conceal exactly the invisible blockers the audit is meant to detect.

Retain actual map screenshots for several seeds, native-scale crops, contact
sheets and motion captures. Inspect embedded footings, lower contours, spline
offsets/tapers, repeated textures, density mismatch, stable animation bodies and
out-of-world water/backgrounds. A generated scene illustration is not runtime
evidence. A single flat map is not evidence for caves or overpasses.

## Weapon roles, exploits and match outcomes

Use applicable close/mid/far, covered/elevated and water-edge cases to explain
damage falloff, displacement, self-risk, terrain removal and utility. Include
actor scale extremes, overlapping bodies, cluster splits, bounce/fuse behavior,
salvo edge shifts and repeated-hit rules. A small fixed aim grid is a bounded
probe, not proof of the maximum possible weapon damage.

Compare mixed play with single-weapon/spam policies on matched seeds and sides,
using the selected resource rules and real action/turn limits. Report
completion, turns, damage, deaths/water kills, resource use and failure causes,
not just aggregate win rate. If bots repeatedly choose one weapon, inspect
planner coverage and legal alternatives before concluding that damage alone is
wrong. Use utility weapons through their actual lifecycles, not a damage ranking.

For AI difficulties record shot-error distributions, hit/self-hit rates and
outcomes across multiple maps, factions and starting positions. Verify one
error sample survives plan refinement/charge and consumes no combat RNG. Do not
claim human difficulty from a few AI-vs-AI completions. Record planner omissions.
Horizon, recovery and aborted matches remain distinct from earned wins.

Test the whole action: high flight, impact quiet hold, long falls, knockback to
water, secondary shots/mines, aftermath stability and a fresh next-turn timer.
Add a regression where resolution outlasts an old fixed handoff timeout. Confirm
shared ammunition, if selected, does not refill on actor rotation/death, and
failed/cancelled actions, pickups and optional shared meters follow their chosen
ownership rules. Games without these systems need no inventory or meter tests.

For compound or persistent attacks, add applicable regressions:

- A prepaid follow-up still fires at zero remaining inventory, allows the chosen
  movement/re-aiming and keeps the old timer and event boundary.
- Fixed-power shots replay identically after zero, low and high prior power;
  preview, input and AI follow the same weapon rule.
- Parent/child contacts, attribution, reactive-object chains and harmless falls
  follow the selected contracts without repeated detonation.
- Stream particles emit over time with the intended spread; landed units move,
  burn at their new positions, execute exactly their allowed ticks and expire.
- Ground erosion removes actual supported solid pixels and matching rendered
  alpha, not merely increments a crater list or paints fire over intact ground.
- Camera framing remains stable across emission gaps, repeated ticks and effect
  expiry; batching preserves damage/ground changes and flushes before handoff.

## Actual input and visual settings

Use rendered input on the chosen platforms for aiming while charging, firing,
pause/resume, menu return and actor handoff; include direction+jump and targeted
weapons only where selected. Even immobile tanks need support/settlement checks
if their ground can change. Test release
and cancellation on focus loss, pointer cancellation and turn expiry. Cover
held-input leakage and repeat-key behavior. If rope ships, fire and attach it
normally; keep injected wrap/rebound fixtures separate from earned traversal.

Exercise desktop wide screens and phone portrait/landscape with full rosters,
the longest supported names/strings, applicable ammo/charge values and safe-area constraints.
When weapons are added, review the complete arsenal layout and both input modes;
a hard-coded column count can add an unwanted row and shrink the game viewport.
Test only the selected languages. Check HUD bounds, usable control targets,
fonts/glyphs and actual available arena
area. For camera/CRT/size settings test saved state, live versus next-match
application, gameplay versus overview, pointer inversion, DPR/resize, clean
versus filtered motion and fallback/context restoration when applicable.

## Runtime and release evidence

Measure menu/boot, selected-zone metadata, only used sprite files, decode/upload,
terrain composition and first interactive frame separately. Expanded variety can
leave per-map image counts stable while making the zone module much larger.
Large literal mask/fringe arrays can also stress parsers; consider compact
encoded data and typed-array/JSON decoding, verified on each supported engine.

Load a selected zone and its seeded dependency closure rather than all worlds
at boot. Bound retained decoded zone pools and filtered terrain levels. Test
revisits, different seeds using new pieces, failed/cancelled loads, progress and
retry. A single large RGBA surface costs width × height × 4 bytes before cached
scales, actor/effect atlases or compositing surfaces; network bytes are not a
decode-memory budget.

Profile native and throttled workloads with large rosters, zoom extremes,
terrain destruction, trails, weather and events. Retain p95, tail stalls and
memory figures, cold/warm timings and explicitly staged loads. Verify what the
network emulator actually caps; decoded-body throttling is not a calibrated
compressed wire-byte measurement. Record timeouts and extended observations
without redefining slow loading as acceptable performance.

Validate dependency pruning against every action/cycle, not one screenshot.
Compare source, web/export and desktop package catalogs and sprite hashes; launch
the actual delivered archive/app. Exporters/legacy rebuild commands must retain
new zones and appended catalog entries. Keep generated masters/prompts and
preparation recipes while excluding private source-game bytes. Package/skill
tests are not gameplay, human-balance or physical-phone certification.
