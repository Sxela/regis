# Image identity, voice prompting and production review

Use generated or edited UI images for a concrete need after inspecting native
resources, following the [native UI workflow](nostalgic-ui-workflow.md#generate-missing-ui-sparingly).
Keep runtime text, controls and hit targets deterministic; inspect deliberate
baked-label edits for exact wording. Save prompts, selected outputs, source
references and original/adapted/generated labels.

## Inspect the actual image before video generation

Check the selected edition, face, costume, equipment, limb/horn count, wings,
props, protagonist facing and camera framing at useful resolution. A prompt
claiming "two horns" does not establish that the image has two horns. Resolve
ambiguous silhouettes in the image itself: separate lateral appendages, expose
their roots and remove unintended center spikes/crests. Compare with native
sprites/model renders. Generate a new image when repeated edits preserve the
wrong anatomy. Keep versions; do not certify an old image using a later clip.

## Write actions and speech as a timed performance

Use the selected model's real task mode, supported duration/shapes and prompt
conventions. A local ComfyUI node can still call a cloud service; inspect its
execution path and use available local nodes when local generation is intended.
Preserve the workflow, model/node versions, seed and own job ID. Poll/collect
that job only, and retain failures instead of clearing unrelated queues.

Define each speaker once: on/off-screen, pitch/register, timbre, rate, accent,
delivery and physical state. Prefer observable performance such as a short
inhalation, hesitant start, listening pause, hurried report and cracked final
call. "Make it less AI" does not supply these decisions.

For a requested machine voice, describe the audible synthesis rather than only saying "robotic": choose pitch variation, metallic/vocoder formants, buzz, speaker bandwidth and gated cadence as appropriate. State whether breath and human inflection belong in that character's delivery. Keep the sound consistent through the words, not only an opening effect. Do not apply human jaw or lip instructions to a speaker without that anatomy. These are performance intentions; listening to the selected take must establish whether they were achieved.

Give exact words, speaker attribution, speech windows, pauses, silent characters
and a final state. Keep a short clip's speech within a plausible speaking budget.
Do not hide all instructions in a long paragraph ending in "the monster talks".
Direct breath, chin, jaw, gaze and gesture causally. Keep each worded line once;
avoid voiceover, chanting or extra conversation unless requested.

For MiniMax H3 modes supporting tagged speech, a concrete example is:

```text
The guard is the only speaker (S1), an adult with a low, dry voice and clear
conversational English. The traveler stays silent.
0.0–1.0: the guard notices the approaching traveler and closes the gate halfway.
1.0–2.2: he takes a short breath, raises his chin and asks cautiously:
<d>[English] You brought that here?</d>
2.2–3.0: he closes his mouth and looks at the object, listening in silence.
3.0–4.4: he leans back and calls sharply, with a pitch break on the last word:
<d>[English] Get the captain!</d>
4.4–5.5: he stops speaking and holds an embarrassed expression.
```

Only language and verbatim spoken words belong inside `<d>`; delivery stays
outside. Stable `(S1)` identifies the same speaker across the shot. Full-reference
asset taxonomies and frame-alignment lines depend on mode: inspect the model's
actual adapter/instructions instead of copying an incompatible template. For
another model, translate the performance into its supported syntax.

## Verify the produced result

Inspect frames across the entire shot, especially head turns and the final
reaction. Listen for intelligibility, exact words, extra speech, voice character,
timing and alignment. An independent ASR pass without the expected script as an
initial hint can corroborate wording, but recognition is fallible and cannot
certify acting or lip timing. Low-confidence output is not evidence of gibberish
by itself; neither is a matching transcript proof of a natural performance.

Correct the demonstrated defect and keep useful takes. After a new image/video
generation, validate that new revision; earlier transcripts and screenshots
cannot certify it. Bound retries to identified issues and available generation
resources. Preserve a reviewable take and state a remaining blocker if a model,
service or audio review is unavailable.

Edit captions separately and time them to the produced speech rather than only the planned windows. Check dialogue in the encoded master as well as the source take; editing, cuts or normalization may affect what the audience receives. Preserve an appropriate reaction/read hold without clipping the final word. A matching transcript does not establish voice character, speaker attribution, mix comfort or a listening session.

Decode video and audio end to end, verify dimensions,
fps/duration and measured loudness/true peak, then read the saved validation back.
Parse stdout/stderr using its actual encoding; reject empty or unparsed values.
Keep the approved master when replacing a segment with a new revision.
