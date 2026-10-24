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
