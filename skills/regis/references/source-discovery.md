# Source discovery with REA

## Select and preserve the source

Record installation/package path, platform, edition, patch level and file hashes.
Keep a separate generated workspace and write no conversions back into the
installation. Make a bounded inventory before decoding large archives. Record
unreadable, encrypted, corrupt or unsupported members rather than silently
omitting them. Do not execute a supplied game merely to obtain static metadata.
Runtime evidence uses an isolated profile/save and declared observations/actions
when the requested task permits execution.

## Route by carrier and question

Consult the available REA skill and current session tool schemas. Examples of
REA routes are archive inventory through `open_binary`, managed assemblies
through `inspect_managed_artifact`, packaged JavaScript through
`analyze_javascript_application`, and native loader/decoder functions through
`open_binary` followed by focused function analysis. Use format-aware resource
inspection where advertised. These are routes, not promises that a particular
version or provider supplies every operation. Source trees need ordinary code
inspection; unknown shipped parsers and behavior justify REA.

REA can establish how files are indexed, decompressed, laid out and referenced;
implement a deterministic adapter for a format it does not decode directly.
Retain file/member digests, offsets, endianness, compression and palette facts,
REA Evidence IDs or complete inline records, and the limits of each inference.
Start summary-first and page retained evidence rather than redoing an analysis
to avoid response truncation. Missing a provider is not a reason to fabricate a
decoder result. Use REA's connection/recovery instructions only for an observed
blocker; do not run installation or alter agent registrations automatically.

## Inventory contract

For every asset family, record stable source IDs, member paths, extraction
coverage, output format, native dimensions/scales/anchors, and intended use:

| Family | Required distinctions |
| --- | --- |
| Maps | Geometry versus rendered background; collision, walk surfaces, heights, props, region origin and connectivity. |
| Actors | Player/mob/boss IDs; animation actions, facings, variants, palettes, layers, skeletons, hitboxes and attachments. |
| Abilities | Icons versus behavior; targeting, damage/status, timing, projectile collision, VFX and audio association. |
| Items | Logical slots, inventory art versus wearable/paperdoll/world variants, attachments, palettes/dyes, fixed unique properties, affixes, restrictions and units. Record which slots actually change appearance in each source view. |
| UI | Fonts/glyph metrics, frames/slices, input states, icons, cursors, sound cues and native layouts. |
| Audio | Sound identity, trigger, channel/loop metadata, music source and redistribution status. |
| Gameplay data | Stats, traits, resistances, AI, area spawns, population and rare/boss rules with evidence. |

For each selected identity, inventory companion resources by lifecycle role,
not just a single representative atlas. Spell icons, cast/travel/impact/splash,
fields and lingering statuses may live in different banks, as can actor attacks,
dying sequences, corpse/bones and sound variants. Trace metadata/references to
those companions and preserve their distinctions in the source-to-runtime
manifest. Use the [lifecycle matrix](implementation-and-validation.md#verify-complete-asset-lifecycles)
to account for each applicable role; an absent search match is not a completed
asset audit.

Use `present`, `absent_in_searched_scope`, `unsupported`, or `unknown` coverage.
Define the searched scope; missing matches do not prove global absence. A
creature catalog does not identify its zone. Correlate spawn definitions,
coordinates and region boundaries, or label authored placement as adaptation.

Track separate **discovered, decoded, mapped, implemented and validated** IDs
for each relevant family. State the denominator and selection rule: frames read
by a decoder, a handful of exported images and actors used in gameplay are
different coverage. Choose targets from the source/benchmark quality brief,
not the subset that an existing decoder happens to support.

Check input completeness for the selected target: companion map packs, loose
data versus archives, locale tables, palettes, animation registries and attachment
banks. Use supplied or explicitly selected resources; do not fetch unrelated packs
or search arbitrary installations. Investigate a missing dependency before
declaring the whole family unavailable. Trace a representative native map through
geometry/height/collision and local entity placement when that geography is part
of the target. An authored arena may unblock an isolated combat test; it leaves
native-world integration pending.

Route investigation tools to that concrete gap. PE icon/resource enumeration is
useful for executable resources but says nothing about a game's loose map or
sprite formats. If a prior extractor exists, inspect its bounds, output, edition
and limitations; credit reused format knowledge and verify it against the selected
input. Existing game code is not evidence of the original game's runtime rules.

## Validate the adapter before bulk extraction

Distinguish structural decode, correct mapping, semantic plausibility and visual
verification in context. A valid PNG/digest does not prove that it represents
floor, uses the right palette or belongs to the named attack. Inspect suspicious
black/transparent surfaces with neighboring geometry and source metadata; voids,
masks and invisible helpers can be intentional. Record derived repairs separately
instead of replacing every dark tile. Capture native cell size, transition rules,
height interpolation, transparent-index and palette semantics, and straight or
premultiplied alpha where applicable. Inspect item edges and semitransparent
effects against light and dark backgrounds before bulk conversion.

Decode representative assets from each family and inspect previews/contact
sheets and audio. Test malformed lengths, bounds/offsets, invalid indexes,
decompression limits and coordinate transforms. Fixtures should be synthetic or
redistributable. Ensure archive extraction cannot escape the output directory or
follow unsafe links. Stage output, verify a manifest, then activate it; a failed
run preserves the previous usable extraction. Keep original identities and
recovered values immutable; derived runtime assets can be rebuilt independently.

Deliver an inventory, evidence ledger, source-to-runtime manifest and extraction
recipe. Unknown behavior stays unknown until tested or intentionally authored.
