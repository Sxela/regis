# Shareable web-game links

For a requested web release or link-sharing feature, prepare a recognizable share
card alongside the game. Keep this out of offline-only work unless requested.

## Metadata must exist before JavaScript

Put the canonical URL, page title and description, Open Graph website/site/title/
description/URL/image fields and a Twitter `summary_large_image` card in the
initial HTML response. Include the image's HTTPS URL, MIME type, dimensions and
useful alt text. Use absolute public URLs, not localhost, a filesystem path or a
relative image URL. Do not rely on client-side localization or DOM updates:
messenger crawlers may never execute the SPA.

Use current, implemented gameplay for the pitch. Keep the game's actual identity
and any existing fan-project attribution; a share card should not imply an
official product or features the delivered build lacks.

## Match the game's art direction

Prefer the project's actual logo, bitmap font, native UI panels and real gameplay
or source sprites. Compose a readable thumbnail rather than shrinking an entire
portrait poster into a landscape card. A 1200 x 630 PNG/JPEG is a useful default,
not a required format. Keep essential text and recognizable subjects within safe
insets, measure text bounds, and inspect the result at small display sizes.
Preserve pixel-art sampling where appropriate. Apply the same provenance and
distribution scope as the rest of the release's media.

## Localize the response, not just the interface

For localized releases, maintain title, description, image alt text and artwork
for the intended sharing languages. Keep one authoritative locale-to-copy/image
mapping where practical. Set document language and `og:locale` consistently;
declaring a locale alone does not translate the card.

A static deployment must choose its metadata at build time, or provide separate
locale paths/pages. A client-only `?locale=` switch cannot rewrite the HTML a
crawler receives from a static server. A dynamic server can select the locale
before responding. Ensure locale/config changes affect HTML cache validators,
and avoid duplicate competing Open Graph values.

## Export and verify the actual delivery

- Include the card and metadata mapping in the web export and deployment
  allowlist; verify their hashes and presence in the actual ZIP/package. Keep the
  card out of gameplay preloads unless the game itself needs it.
- Fetch the deployed-form HTML without JavaScript and check the selected
  language, title, description, canonical URL and image URL. Fetch that image;
  check status, MIME type, real dimensions and successful decoding. Inspect its
  appearance and padding separately from these structural checks.
- Test each supported sharing locale, including default URLs and any server-side
  locale routes. An image that works only in the development checkout is not
  release evidence. Use synthetic metadata/images in public package tests.
- Use a content-hashed or versioned image URL when replacing artwork. Messenger
  caches can retain an older card; valid new metadata does not prove a previously
  shared message has refreshed. Report local validation separately from a live
  crawler refresh.
- A retained-upload retry that sends only a deployment helper still uses the old
  archive. New HTML or images require a fresh payload, not that helper-only retry.

Prepare the preview locally within the requested scope. Metadata work does not
itself authorize uploading assets or publishing the game.
