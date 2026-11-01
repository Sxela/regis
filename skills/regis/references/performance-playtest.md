# Performance playtest

Use this as a separate acceptance pass for the actual game runtime, alongside
balance, walkability and UI review. Record a project report such as
`docs/performance-playtest.md` with raw traces and reproducible scenarios. Select
budgets for the promised devices and experience before judging the result; do not
impose one frame rate, atlas size or memory limit on every adaptation.

## Reproduce the delivered workload

Identify build/configuration and asset-index hashes, renderer, browser/runtime,
device or emulator, viewport/DPR, input mode, hosting path and instrumentation.
Keep authoritative state/RNG unchanged by telemetry. Use real source-derived
resources for release claims; label synthetic CI fixtures separately.

Exercise the supported desktop and mobile runtime, including the actual Electron
package where applicable. Emulated phone dimensions and desktop CPU throttling
help find defects but do not certify a physical phone. Record unavailable device
coverage explicitly.

Use these workloads where applicable:

| Workload | Observe |
| --- | --- |
| Cold launch and first run | Menu readiness, first fully rendered interactive scene, required transfer/decode work and loading feedback. |
| Area travel and continued save | Transition readiness, missing/corrupt resources, old/new scene ownership and input recovery. |
| Boundary traversal and rapid revisits | Visible terrain arrival, prefetch usefulness, cache churn, cancelled jobs and request deduplication. |
| Representative peak combat | Dense pursuit, largest actors, overlapping VFX/statuses, sound, corpses, loot and upgrade/shop transitions. |
| Repeated areas and load/unload cycles | Retained bitmap/texture/audio/DOM resources, disposal, leaks and memory plateau. |
| Degraded delivery | Slow transfers, latency, an interrupted required request, retry and unavailable network with a partially warm cache. |

## Simulated low-bandwidth web delivery

Local assets on loopback are only an unthrottled baseline. Run a browser-level
network emulator or controlled proxy that limits total connection throughput and
adds latency. Record the exact tool, settings, browser session/origin coverage
and any traffic it cannot affect. A fixed delay per response does not simulate
bandwidth contention; a per-request bandwidth cap can multiply total bandwidth
when many requests run in parallel.

Select profiles for the target audience. The following are authored starting
profiles, not measured descriptions of real mobile networks:

| Profile | Download | Upload | Added round-trip latency |
| --- | --- | --- | --- |
| Local baseline | Unthrottled | Unthrottled | None |
| Constrained mobile | 1.5 Mbit/s | 256 kbit/s | 150 ms |
| Poor connection | 500 kbit/s | 128 kbit/s | 300 ms |

Use decimal bit-rate units; convert to bytes per second when the tool requires it
by dividing by eight. Document whether a tool's latency setting means RTT or
one-way delay rather than silently doubling it. Verify the effective cap using a
known uncached payload and a request waterfall, including parallel transfers.
Treat optional jitter/loss tests as additional profiles only where the tool
actually supports them.

Verify what the shaper actually limits before trusting it:

- **Decoded or encoded bytes.** Time one known compressed download under a
  low cap. Some browser emulators throttle the decoded body and report decoded
  sizes as transferred, which makes compression invisible. If yours does, shape
  real traffic with a TCP proxy instead: one shared link per direction, RTT/2
  of propagation each way, and an extra RTT per new connection. Report what it
  does not model, such as slow start and loss.
- **What crosses the loopback wire.** Compare a browser-issued response with a
  plain client's response for the same URL. Local security software can
  intercept browser-looking HTTP, decompress it and re-label it. A diverging
  `Content-Encoding` or `Content-Length` between the two is the tell. Measure
  over TLS (ideally HTTP/2, as a CDN would serve) when that happens, and name
  the interference in the report.
- **Per-connection limits.** Plain HTTP/1.1 caps a browser at about six
  connections per host, which makes request count matter more than it will
  behind an HTTP/2 CDN. Measure both or state which one the numbers describe.

For each selected constrained profile, separate:

1. **Cold first visit:** fresh browser storage/profile, including HTTP cache,
   service-worker/Cache Storage and database asset caches used by the app.
2. **Warm full reload:** retain persistent caches, reload the document and verify
   unchanged assets avoid full retransfers. Disabling HTTP cache alone does not
   clear application-managed caches.
3. **Later area and return:** enter uncached content, return to cached content,
   and check readiness, prefetch and bounded retention.
4. **Version change and failure recovery:** serve a new index with coherent
   payloads; interrupt or fail a required transfer, retry, and verify stale or
   partial responses cannot masquerade as ready content.

Assert that progress paints promptly, reflects transfer/decode/setup work and
settles on success, failure or cancellation. Required-content delays must not
advance combat over absent terrain or expose unusable controls. Warm-cache loads
may be fast: do not manufacture a delay or fake progress for presentation.

Run the same selected scenarios against the deployed serving path or a faithful
production server configuration when available. Throttled localhost does not
validate real TLS, CDN/proxy behavior, HTTP concurrency, content encoding, MIME
types, caching headers or deployed missing-file responses. Report which of these
were actually checked; keep remote validation open when access is unavailable.

## Measurements and acceptance

Capture request count, transferred bytes, cache source/hits, time to menu and
first usable rendered scene, transition time, failed/cancelled loads and longest
visible stall. Separate fetch, decode/upload and scene preparation when diagnosing
the bottleneck. State whether transfer bytes include protocol overhead.

During rendered play record frame-time distribution (including p95/p99 and worst
stalls), long tasks, active populations and expensive pathfinding work. Report
decoded image/audio, texture and process memory separately when observable;
compressed bytes or tracked bitmap bytes are not total memory/GPU use. Inspect
growth over repeated transitions and verify a stationary camera stops requesting
already available content. Use before/after captures to ensure optimization did
not remove scenery, alter hue/alpha/anchors or break collision and effects.

Repeat the selected comparable loading cases enough to expose variability;
three runs per profile/cache state is a useful starting point. Report median,
range, sample count and failures instead of the best run alone. Keep a controlled
fixture for comparisons and a separate representative gameplay workload.

Common high-latency findings and fixes:

- **Discovery waterfalls.** Each nested ES-module import level and each
  "index, then the files it names" step costs a round trip. Emit
  `modulepreload` for the whole static module graph, and preload the boot
  indexes and atlas pages from the server-rendered page. Start the first
  area's textures as soon as its index arrives, not after the atlases.
- **Uncompressed text.** Engine JSON, map indexes and library code often compress
  substantially with Brotli or gzip; measure the actual shipped set.
- **Full re-downloads on reload.** `no-cache` without a validator downloads
  every file again. Send ETags (or versioned immutable URLs), so warm reloads
  cost 304s or nothing.
- **Oversized images.** Palette art is often stored as 32-bit RGBA. Indexed PNG
  with a transparency chunk is lossless and smaller.
- **Unused content.** Atlases often include content the adaptation never shows.
  Prune by walking the game's own data (state chains, item tables), and add a
  test that every frame and texture the code names exists in the shipped set.
  Keep whole animation cycles from the source's animation tables: a level may
  place only one frame of an animated texture, and pruning by placement drops
  the rest.

Acceptance requires stated budgets and evidence for the supported profiles,
correct loading/recovery behavior, bounded retained resources and reviewed
visual/gameplay fidelity. Diagnose the measured bottleneck and rerun affected
cases after a change. A local compression estimate, passing headless simulation,
captured-but-unreviewed screenshot or advertised device mode is not a pass.

## Project report template

```text
Build/configuration and asset-index identities:
Runtime/device/viewport/input and physical-versus-emulated scope:
Host/serving configuration and local-versus-deployed scope:
Network tool, effective shared rates, latency semantics and verification:
Cache/storage state and reset procedure:
Scenario, relevant content, controller/seed and sample count:
Readiness, frame pacing, transfer and memory budgets:
Before/after measurements, distributions and raw trace locations:
Loading, cancellation, failure, retry and version-update outcomes:
Reviewed visual/interaction regressions and rendered evidence:
Pass/fail, unsupported conditions, open device/hosting checks and next action:
```
