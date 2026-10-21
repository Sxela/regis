# Quality target and milestone reviews

Read this before selecting a renderer or building the first playable loop.
Use it again after that loop works and before handing over the requested result.

## Establish the actual target

Resolve whether the user requested a full adaptation, an explicitly limited
prototype, a phase, or a repair. A request to try/test the skill does not by
itself reduce a full game workflow to a minimal demo. In a trial, state the scope
being exercised and keep unfinished requested work active. Time spent, a large
test count, or calling the result an experiment does not change that scope.
Honor an explicit timebox or prototype request; do not expand it into production.

A quick test of whether the adaptation works as a survival game can explicitly
target a **vertical slice with limited breadth and complete depth**. For example,
roughly ten percent of the spells, monsters and zones can be sufficient content;
that fraction is illustrative, not a quota. Complete the selected content's asset
integration, gameplay rules, feedback and progression. Reduce the number of
content entries rather than leaving every included system partly implemented.
Do not require the full catalog, a finished promo or every release platform to
answer a scoped survival-slice question; name those outside-slice deliverables.

When the user supplies an existing adaptation or visual benchmark, inspect its
relevant screens, implemented loop and feature documentation before writing a
replacement. Record which qualities must carry over and which changes the user
requested. A benchmark is a quality reference; reusing its code/assets follows
the user's scope and provenance, and its own reported defects remain defects.
For a new source without a benchmark, calibrate against that edition's screens,
asset families and mechanics. Do not invent a uniform content quota for all games.

Write a project-specific quality target before implementation. Include:

| Dimension | Concrete target to resolve |
| --- | --- |
| Presentation | Source perspective/projection, actor size, terrain depth, animation and UI reference screens. |
| World | Native regions/maps and companion packs supplied; walkability, heights, scenery, local population; justified adaptations. |
| Actors | Player roles, enemy/boss families, directions/actions, layers/attachments and their runtime behavior. |
| Builds | Useful source abilities, status/counterplay, items/equipment where relevant, two distinct earned build paths per class. |
| Interaction | Full combat/reward/camp/end flow, inspections/previews, save/reset rules, desktop and touch controls. |
| Delivery | Required platforms, source setup, clean-package launch, promo and review evidence. |

Use a coverage table with **source identity, target behavior/presentation,
implemented consumer, evidence, status and next action**. Separate observed
facts, inferences, adaptations and unknowns. Mark each relevant target required,
an explicit scope exclusion, or investigation pending. Record the reason and
authority for exclusions. An agent-authored defer list is not user approval to
drop the difficult parts. If requirements are unclear, proceed with supported
work and clarify the consequential choice rather than silently lowering quality.

## Accept the selected product, not a content percentage

Record a compact project profile: runtime/platforms and controls, role/loadout
count, run structure and length, ability capacity, resource systems, persistence
and fidelity goal. Identify which decisions come from the user, source evidence,
REGIS policy or authored design. Keep the normal three-class and web/Electron/
mobile defaults unless overridden; do not invent equipment, currency or party
systems just to fill a template.

A user selecting ten maps out of two hundred or five spells out of fifty selects
catalog breadth, not a lower standard of implementation. Check the selected
entries and their dependency closure: assets, encounter rules, useful upgrades,
rewards, interactions, saves and required transitions. An exclusion must not leave
a dead stat, missing countermeasure or impossible progression in the included
game. Distinguish a requested small finished game from an intermediate trial;
finish the requested platforms, docs and media at that breadth when in scope.

Extend the coverage/experiment log into one acceptance ledger rather than
creating a new document for every check. Each row records the requirement or
reported failure, source fact/adaptation, smallest reproduction, expected visible
result, content IDs, build/input conditions, check/capture, latest outcome and
remaining action. Use the [playtesting evidence contract](playtesting-and-balance-log.md#keep-acceptance-evidence-current)
to distinguish current, stale, failed and untested results.

Before calling the selected product complete, verify current evidence for the
included content's presentation and behavior, complete earned routes/builds,
navigation and performance, difficult UI states, and clean required-platform
launches. Review requested media against its actual shots. Fix supported
failures; blocked or untested required rows keep the result partial. Package
tests, content counts and an attractive menu cannot stand in for these checks.

## Make the first slice representative

Separate the scope into two lists: **content included/excluded** and **systems
that must work through the slice**. The selected content should sample relevant
mechanical differences, not just several skins of the same attack or creature.
For each included feature follow its complete path:

| Included feature | Depth required in the playable slice |
| --- | --- |
| Actor | Correct source art, facings, idle/move/attack/cast, hit/dying/corpse/decay stages and event sounds where supplied; collision and attachments. Verify motion against travel direction and the complete death-to-resting-body transition. |
| Spell/ability | Source name/icon, cast/projectile/beam, impact/splash, persistent field and lingering status/DoT art and stage-specific sounds where supplied; actual targeting, timing, collision, damage/status, cooldown, scaling, inspection and saves. Verify every applicable lifecycle role through expiry. |
| Region | Coherent source terrain/scenery and required geometry, legal navigation and local encounter logic; usable reward, boss/exit and next-area flow. |
| UI | Native components for the screens used by the slice, legible live values, interaction states and complete desktop/touch actions. A source font alone is insufficient. |
| Progression/equipment | Earned learning/upgrades and purchases, useful choices and correct previews; where equipment is included, real equip/unequip effects, comparison and persistence. |
| Run | Start, combat, rewards, build decisions, boss/exit, safe progression, death/victory and save/continue without debug grants or missing transitions. |

Untested or broken depth remains a slice defect. A missing native panel, a
backward walk cycle, an unused spell atlas or a circle standing in for an available
spell effect cannot be justified by saying the content sample is small. Debug
placeholders are useful while implementing, but do not pass slice acceptance.
Preserve the selected source's intended presentation and explicitly authored
adaptations without claiming every native rule was recovered.

Choose a slice that exercises the hard parts of the selected source: a real
region's layout/height/collision where available, a correctly composed animated
actor, meaningful attack and status behavior, an ordinary enemy and a distinctive
threat, an earned build choice and native UI pieces. It is a milestone toward
the target. Extend the coverage table after validating it.

A font, a few selected sprites and a generic arena do not establish source
fidelity. Relabeling one layout as several regions does not establish world
coverage. A sprite decoder that reads every frame does not establish animation
playback. A PE resource inventory does not establish discovery of maps, combat,
UI or spawn rules. Match every claim to the operation and observation supporting it.

Temporary shapes, placeholder panels, static actors or authored test floors may
help isolate a mechanic. Keep their replacement tasks visible. Before broadening
the game, compare a running slice against the target's menu, combat, progression
and equipment/inspection screens where those systems apply. Inspect motion too.
Fix wrong scale, tiling, direction, animation, layering and visual hierarchy at
this stage; more content would multiply those errors.

## Review the result in separate dimensions

| Review | Evidence and next decision |
| --- | --- |
| Coverage | Compare decoded, mapped, implemented and validated counts/IDs per relevant family against the scoped source catalog. Investigate unexplained omissions. |
| Visual and motion | Capture matched views at a documented scale; inspect gameplay clips for directional movement, attacks, depth, silhouettes, effects and UI readability. Correct the largest departures from the target. |
| Gameplay and builds | Play/replay complete earned loops for all classes. Explain how two build directions change decisions, targeting, defense or timing, beyond renamed percentage buffs. |
| Difficulty | Inspect every class/mode row, including mature builds and stationary-vs-moving behavior. Investigate missing winning evidence and retain regressions when tuning. |
| Distribution | Extract into a clean unpacked package and launch the actual required executable/web build; verify input/audio/save and setup docs. A packaged directory alone is preparation. |

Functional tests, content coverage, visual review, earned balance and platform
execution are separate evidence. Many passing tests in one column do not fill
the others. A case with no wins is inconclusive about optimal play, but it leaves
fair winning progression unestablished for that class/mode. Continue diagnosis
and iteration rather than treating the small sample as either proof of
impossibility or permission to leave the class broken.

## Persist through observed gaps

For each failed review, identify the missing asset, mapping, mechanic, test,
policy capability or environment prerequisite; fix what the current authorized
environment supports and rerun affected checks. Keep the quality target stable
while tuning. Do not make Easy indistinguishable from other modes just to improve
a win table, or replace native geography to avoid fixing navigation.

For an apparent environment blocker, retain the exact command, artifact/build
identity, exit code/log and the smallest relevant reproduction. Inspect runtime
prerequisites and launch context; distinguish a reproducible application failure
from a denied host operation. Follow host permissions. Do not label a crash an
environment problem merely because it happened in a sandbox.

End a full workflow when the required target has supporting evidence, the user
explicitly stops/narrows it, or a concrete remaining requirement cannot proceed
without unavailable access/input. A partial review build can be useful while a
blocker is pending, but list unmet targets and why they remain. Keep working on
independent requirements. Missing human/device access does not prevent completing
available asset integration, implementation, automated tests or packaging fixes.

## Testing the skill itself

Record the skill revision, selected source and benchmark, task scope, allowed
prior knowledge/code reuse, agent/harness and outcome. Distinguish source-format
knowledge reused from earlier work from fresh discovery. Do not call a guided
run independent evaluation. Evaluate generated artifacts against the quality
target, including failures, rather than scoring only installed files or tests.
If a trial exposes a regression in quality, fix the workflow and rerun the
relevant trial before claiming that generated quality improved. Package checks
and skill-frontmatter validation establish packaging/structure only.
