# Shared localization and promo languages

Apply this across genres. Build the game for multiple languages with shared
mechanics and stable content IDs; the user decides which languages ship.

## Choose the language scope

English (`en`) is the default language and initial fallback. Suggest the user's
system/UI language as the second option when it differs from English. Resolve
that language from an explicitly supplied preference or available OS/browser UI
locale; do not infer it from timezone, country or source-game edition. If unknown,
ask when resolving language scope and continue independent work. If it is English,
do not invent a duplicate second language. Normalize and deduplicate locale tags.

Ask which languages the user wants, offering English and the system language
first; they may choose either, both or additional languages. Honor an existing
explicit language choice instead of asking again. A suggestion is not a request
to translate every system language, and a user may override English as primary.
Record primary language, selected locales, fallback, system-language suggestion
and its source, and any excluded surfaces in the project/design brief. Keep game
languages separate from promo languages and from the original asset language.

## Implement one multilingual game

- Extract player-facing strings into locale dictionaries using stable keys.
  Include menus, HUD labels, controls/hints, loading/retry, pause/results,
  settings, NPC/dialogue, item/ability descriptions and accessibility labels.
  Do not translate internal IDs, save keys or simulation rules. Use shared
  templates with interpolation and locale-aware plural/number/date formatting;
  avoid sentence fragments assembled in source-language order.
- Keep authoritative source names and terminology mapped per selected edition
  and locale. Prefer supplied official translations where available; record
  authored translations and unknown terms separately. Preserve meaning and tone
  in adapted jokes rather than claiming an invented line is a source quote.
- Provide an explicit language selector when multiple languages ship, persist
  the choice and apply it consistently across UI and newly opened screens.
  On first launch choose the best supported browser/OS language, then the
  configured default (initially English). Later launches respect the saved
  choice. Document precedence for any explicit launch/build locale override;
  unsupported or malformed input falls back safely to a supported locale.
- Expose locale through the game's selected launch/build interface when needed
  (for example a game launcher argument or web route/query), with the same
  locale mapping as the selector. Do not imply the toolkit's own CLI has locale
  flags unless implemented. Missing keys use the configured fallback and emit
  actionable development diagnostics; raw keys must not become shipped labels.
- Verify fonts cover every selected script, including Cyrillic where selected.
  Preserve native art direction with a compatible font or atlas extension;
  never silently remove unsupported letters. Keep editable text separate from
  decorative panels. Generate separate localized bitmap art only when needed.
  Set document language and direction correctly; support RTL when selected.
- Localize page title, share description, image alt text and applicable preview
  artwork through the same locale mapping. Follow
  [share previews](social-link-previews.md): client-only text switching cannot
  localize the initial HTML that a crawler reads.

## Ask before promo production

Before creating a new promo, explicitly ask which language versions to produce.
Offer English and the user's system language as the first options, and allow
other languages or a subset of the game's supported languages. Confirm the
selected language scope for captions/title cards and, if present, voice/dialogue.
Do not assume all game locales need video exports or that narration is required.

A clear language selection already given for this promo satisfies the question;
retain it for revisions unless the user changes the scope. If no choice has been
given, keep the question pending before language-dependent copy, voice generation,
captioned capture or final exports. Continue language-neutral planning or game
work while waiting. English is the default suggestion, not an answer on behalf
of the user. Save the selection in the shot list/edit manifest.

Each selected promo version keeps the approved shots, feature claims and tone,
with localized copy, glyphs, caption padding and reading time. Translate or
adapt dialogue intentionally; preserve the selected speaker and delivery, and
review pronunciation and actual audio. Identify master/poster/subtitle/voice
outputs by locale to avoid overwriting another version. Reuse language-neutral
gameplay footage where it fits; capture the correct game locale when UI is shown.

## Verify the selected languages

Check dictionary coverage, interpolation/plural cases, unsupported-locale and
missing-key fallback, saved choice and any implemented launch/build overrides.
Inspect each selected locale's longest strings on phone portrait/landscape and
desktop: no missing glyphs, clipping, horizontal overflow, overlapping borders
or inaccessible actions. Exercise the real start-to-outcome loop after switching
language and save/restore. Report translation review separately from structural
key coverage; do not call an unreviewed translation native-speaker validated.
For promo variants inspect every title/caption and listen to the complete mix.
Record locale, build/content hashes and reviewed scope with acceptance evidence.
