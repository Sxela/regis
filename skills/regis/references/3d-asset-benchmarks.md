# Compare 3D asset pipelines and learn local defaults

Use when producing or replacing 3D game assets, particularly when a user asks to
compare generated models or retain the best working combinations for later use.
Honor the requested conversion scope. Distinguish world objects/characters from
material textures, distant backgrounds, particles and interface elements; record
the user's choices rather than silently converting or excluding a category.

## Controlled candidate matrix

Inventory actual local capabilities before choosing adapters. Record installed
checkpoints, versions/fingerprints, compatible nodes, output representation and
missing prerequisites. Separate local generators from remote paid services. A
Gaussian output only counts as a mesh candidate when its mesh conversion is
actually executed and inspected. Multi-view inference requires recorded camera
assumptions/calibration and view consistency; independent generated views do not
establish measured camera poses.

For every in-scope asset, preserve identity references and matched front and
three-quarter conditioning images. Record source hash, prompt, image generator,
view, crop, alpha handling, actual resolution, framing and any invented hidden
surfaces. Prefer matched style and subject proportions across the pair. Existing
unmatched pilots remain useful historical evidence, not a controlled view study.

Run each eligible geometry model against both views with recorded deterministic
seeds and comparable output budgets. Record native settings rather than claiming
different architectures have identical internal resolution. Keep geometry and
appearance comparisons separate: neutral clay reveals structural defects, while
native appearance and compatible texture passes test the complete pipeline.
Reject broken geometry before expensive painting, recording that rejection and
why a texture branch was not run. Do not silently drop a failing model/view.

Preserve generation masters. Derive runtime copies with documented axis/root,
uniform scale, UV treatment, pixel palette/grid, texture resolution, LODs and
material settings. Stored atlas dimensions, generated view dimensions and logical
pixel grid are different measurements. Simplification, painting and palette
changes each get separate recipe identities and validation.

## Append-only run and review ledger

Give each candidate a stable configuration ID and each execution a unique run ID.
Retain exact inputs/workflow/settings, checkpoint/adapter fingerprints, prompt ID,
timestamps, terminal status, errors and artifact hashes. Resume a known live job
by polling its authoritative handle/history/queue; a timeout is not permission to
resubmit it. Record explicit retries as new attempts without erasing failures.

Measure queue wait separately from execution time. Record cached nodes and cache
conditions. Log hardware/runtime, input/output bytes, vertex/triangle counts,
materials, texture dimensions, decoded texture memory and bounds. Record peak
VRAM only when measured, with sampling method and baseline; otherwise use null.
Do not fabricate unavailable historical timings or memory measurements.

Render matched front, side, rear, elevated and game-camera views for each viable
candidate. Assess identity, silhouette/proportions, holes/negative space,
surface quality, texture placement/warping, pixel style and unseen surfaces.
Characters also require rig/animation/root/feet checks. Inspect runtime LODs and
collision/clearance agreement. Record reviewer type, evidence paths, confidence,
rubric scores or explicit pairwise verdicts and rejection reasons. A successful
export, more polygons or larger texture file does not establish visual quality.

## Choose assets; then learn defaults

Select per-asset winners after visual review and runtime validation. Among
quality-equivalent candidates, prefer measured lower cost and better fit to the
target device. Keep native and runtime results distinct. Measure frame-time
distribution, load/decode/upload costs and memory in a representative scene;
loopback or emulated-browser evidence does not certify a physical phone.

Learn preferences by asset family and compatible model/adapter version, not a
single universal winner. Record the number of independently reviewed assets,
matched comparisons, wins/losses/ties, failures, quality margins and uncertainty.
Define promotion thresholds before aggregation. Historical unscored pilots and
unreviewed candidates must not silently train defaults. A selection for one asset
is not evidence for a family-wide recommendation.

Persist the preferred input view, geometry model, texture stage, preparation and
runtime recipe with supporting run/review IDs and tested scope. Mark provisional
preferences explicitly. For unseen families, changed checkpoints or failed quality
gates, fall back to the full comparison matrix. Retain a runner-up and occasional
controlled comparisons so defaults can be revised rather than becoming folklore.

Keep project-specific assets and run evidence in the generated project, outside
the toolkit. A toolkit verification command must not start generation, download
weights, modify model services or publish results.


For runtime projection, billboards, texture origin, repeated atlas surfaces,
materials and HUD-aware camera framing, use
[style-specific rendering](style-and-rendering.md). Geometry-generation quality
and correct runtime presentation are separate reviews.
