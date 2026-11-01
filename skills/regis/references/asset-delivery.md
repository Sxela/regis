# Asset delivery for web and mobile

Use this when a source catalog grows, loading stalls or the user questions file
counts/downloads. Keep the extraction/archive representation separate from the
runtime distribution. Many source members do not imply that every member should
be fetched at startup; few files do not prove low transfer or decode cost.

## Measure before choosing a container

Inventory logical identities, physical files, unique payloads, frame counts,
compressed bytes and decoded memory. Check whether a file is one frame, an
indexed animation sheet, shared texture page, audio clip or terrain image before
proposing a new format. Account for transparent padding, duplicates and assets
exported for discovery but absent from playable dependencies.

Record cold menu, first playable area, later-area entry and warm reload separately:
request count, transferred bytes, readiness, missing/error responses, decode/upload
stalls and retained image/audio memory. State browser/device, cache conditions and
network profile. Loopback timing is not a mobile internet estimate. Compare the
complete pipeline, not only compression ratios or local directory counts.

## Build the playable dependency set

Preserve the full discovery catalog/provenance while deriving an explicit runtime
set from included actors, equipment/action variants, complete ability lifecycles,
UI, regions and audio consumers. Reachability must include deferred arrivals,
rare deaths, branches, companions and saved loadouts, not just one captured run.
Do not remove required content merely to hit a request target.

Split boot metadata from region/actor details where the full manifest is expensive.
Load required menu/first-area resources first; fetch subsequent regions and optional
content on demand with bounded prefetch. Avoid loading every map and source variant
because discovery exported them. Deduplicate payloads without merging distinct
logical IDs or their timing/anchor metadata.

For generation, sheet cleanup, pivots, complete dependency sets and deterministic
packing, use [sprite/atlas production](sprite-and-atlas-production.md). For UV
orientation, repeating surfaces and temporal shimmer, use
[style-specific rendering](style-and-rendering.md).

## Preserve indexed animation access

For sprite renderers, compare shared PNG/lossless WebP atlas pages grouped by
actual use (UI/icons, actor/equipment/action families, region scenery/VFX). Retain
frame rectangles, direction sequences, timing, offsets, roots, palette/alpha and
source mappings. Several independently phased instances must index frames without
forcing each other to seek. Validate pixel/alpha fidelity and actual playback.

Bound page dimensions and decoded memory for supported devices. A giant sheet can
reduce requests while increasing first-use latency and memory; compressed image
bytes are not decoded RGBA size. Support multiple pages and release unused groups.
A WebGL implementation must query/test relevant texture limits; Canvas/browser
image limits still require target-device checks.

For many heterogeneous payloads, indexed region/family packs can reduce transport
requests while retaining logical file IDs. Define index/version/hash validation,
concurrent request deduplication, bounded decode/cache ownership and failure retry.
Choose whole-pack versus range/stream reads deliberately. One archive containing
the entire game can force unused downloads and make cache updates expensive.

A video container is not automatically a better sprite archive. For SMK or any
other candidate, demonstrate decoder availability on the actual browsers, exact
frame access, transparency/palette fidelity, multiple independent animations,
CPU/memory cost and total transfer including the decoder. Custom decoding may be
appropriate for a recovered source cutscene; it is not native browser support.
Use capability probes plus actual decode/playback tests. Prefer a simple indexed
texture path when arbitrary sprite-frame selection is the requirement.

## Ship and verify the serving policy

Compress text metadata/code with negotiated gzip/Brotli or the deployment's
verified equivalent. Do not assume the hosting layer compresses them. Already
compressed textures/audio need measurement rather than another blanket layer.
Use versioned/content-hashed payload names with appropriate persistent caching;
revalidate manifests, and keep development cache behavior distinct from delivery.
Verify cache invalidation and coherent versions after an update.

Compare suitable audio codecs, per-clip versus grouped SFX and streamed music
against actual browser support and random/overlapping playback. Bound decoded
audio buffers; a smaller audio download can still decode to large PCM memory.

When source music is in scope, preserve its identity and documented playback. Sequenced scores (MIDI, engine-specific note
formats, tracker modules) usually come with the instrument bank the original
driver used, such as an FM patch bank. Extract the raw score lumps and the bank
rather than silently substituting unrelated stock tracks or instruments.
When implementing a custom synth, validate the relevant conventions:

- Parse every score format the supported editions use into one timed event
  list. Validate each score during extraction and record failures.
- Read the driver's own tuning conventions from source or reference
  implementations (note-to-frequency offsets, pitch-bend range, percussion
  channel, voice limit). Test pitch against note events with synthetic patches.
  A one-octave error is easy to miss without a pitch check.
- Render off the main thread (a worker) and loop as the original did. Map songs
  to the same contexts: per-level score, title, intermission, victory.
- Give music its own volume control, start it only after the audio unlock
  gesture, duck it under pause, and keep it out of the deterministic simulation.
- The same synth module renders the promo soundtrack offline.
- Report synthesis as an approximation unless it is a verified chip emulator.
  Automated pitch and level checks are not a listening review.

Keep packaging reproducible from the authorized original source and selected
adapter/configuration, without depending on earlier generated games. Bind output
indexes/hashes to their inputs. Before replacing the runtime path, exercise cold
and warm loads, region/save transitions, missing/corrupt packs, frame/direction/
anchor/alpha fidelity, concurrent actors and audio, and mobile memory/performance.
Report measured improvements and remaining device/hosting gaps. Source-only
releases still exclude proprietary payloads unless redistribution is authorized.

Browser references: consult MDN's CanvasRenderingContext2D.drawImage for frame
rectangles, HTMLMediaElement.canPlayType for capability results, and WebGL best
practices for texture atlases, hardware limits and memory budgets.

## Loading feedback is part of readiness

Use one shared progress model for boot, new/continued runs, area changes and
on-demand artwork/audio. Cover request, transfer, decode/upload and scene setup;
an HTTP response finishing does not make an area playable. Aggregate overlapping
jobs, deduplicate shared payloads and settle completed, failed and cancelled jobs.
Report real byte totals when known, resource/stage counts where meaningful, and
indeterminate work honestly; do not invent percentages for unknown work.

Paint feedback before heavy work. Keep controls responsive enough to cancel or
retry; split or move expensive work off the UI thread when the measured stall
warrants it. Gate simulation while required visible terrain, collision or actors
are unavailable, so downloads cannot expose missing ground or kill the player.
Optional background work should use unobtrusive feedback rather than blocking
every interaction. Preserve the previous usable scene until its replacement is
ready, or provide an explicit recoverable loading state.

Acceptance covers slow first entry, warm entry, overlapping loads, failed required
content, cancellation/rapid travel and retry. The indicator appears, advances or
explains the current stage, and settles correctly; play resumes only when required
resources are usable. Test under the [performance network matrix](performance-playtest.md),
not only fast local file access.

## Atlas, streaming and cache acceptance

Choose page/chunk sizes from measured requests, bytes, first-use cost and decoded
memory. A larger nominal tile size can increase requests when it splits existing
terrain patches. Keep logical IDs, native dimensions, anchors, hues and collision
independent of transport packing. Extrude suitable gutters, validate source
rectangles, and test edges, transparent pixels, tinting and filtering at runtime.
Lossless conversion should preserve decoded pixels; a lossy choice needs an
explicit visual-quality review rather than a byte-only improvement claim.

Stream visible resources first, prefetch nearby content within a decoded-memory
budget and release evicted images/textures. Pin required visible content; report
unavoidable viewport or transient decode overshoot separately. A stationary camera
must not repeatedly evict and download the same prefetched pages. Exercise moving
across chunk boundaries, area/save changes and disposal with requests in flight.

Test persistent browser caches across full reloads, not only an in-memory map.
Revalidate the small index; use coherent versioned payloads and publish the index
after its dependencies are complete. Failed/partial responses must not become
successful cached assets. Verify update, retry and recovery with interrupted loads
and old caches; do not require unused original and optimized copies in the runtime
dependency set. Pixel equality with a previous renderer preserves its existing
bugs too: retain contextual visual and world-behavior review.

When the source game ships as several data files (a base game and a sequel,
or official expansions), let the extractor merge any subset into one install.
Declare deterministic collision precedence (for example, first source wins).
A later source's same-named asset with
different content is kept under a suffixed name, and that source's levels
point at it. The game then offers whatever content is present, without
errors for what is missing. Test the collision and the single-source case
with synthetic files.

For a promised offline-capable run, assets must remain available after boot. Assets fetched on first use
(sound effects, later biomes' textures, music) fail silently when the server
stops or the connection drops mid-session. When the full set fits the budget,
download the remaining manifest in the background after boot into a
content-hashed browser store (memory plus Cache Storage where a secure context
allows it), and route every loader through it, including CSS backgrounds. Do
not cache a failed load as permanent silence. Test it: after boot, block every
asset request and confirm that sounds, music and later biomes still work.
