# Building UI that feels like the original game

Recreate the source game's visual and interaction language closely: fonts, controls, frames, colors, icons, layouts, cursor/controller feedback and sounds. Adapt information and controls to the new game while preserving recognizable details. Use generated art for a menu illustration or genuinely missing assets after inspecting the original resources. This method applies to any game genre, engine, era or visual style.

Use this alongside the [mechanics guide](game-to-survivors-mechanics.md), [playtesting workflow](playtesting-and-balance-log.md) and [promo workflow](promo-video-workflow.md). Examples are component roles, not a required fantasy inventory, fixed screen layout or prescribed set of game systems.

## Establish the exact reference

Choose the source edition and era, then capture original screens before designing. Similar names can conceal different art. Mixing an older interface with a remaster's frame or replacement character can break the intended nostalgia even when each resource is official. Define whether the target is pixel art, painted panels, clean vector UI, diegetic controls or another source style.

Collect references for the main menu, status display, map/radar, inventory or command panel, equipment view if present, object properties, action icons, buttons in every state, sliders, scrollbars, modal windows, cursors and common interactions. Note the original proportions and placements as well as colors. Keep a contact sheet at native size and an annotated screen showing which asset fills each role.

Separate **original art**, **adapted original art/layout** and **new generated art** in the manifest. A genuine spell icon used as a skill alias remains an adaptation; it should not be described as a recovered official icon for that skill.

## Recover the building blocks before inventing panels

Search archives, atlases, UI definition files and existing widgets for reusable pieces. Many old games ship enough caps, corners, fills, bars and empty slots to build new windows with original artwork.

| Family | Recover and record |
| --- | --- |
| Fonts | Native glyphs, advances, baseline, kerning if present, covered characters and title/body roles |
| Windows | Corners, edges, centers, title ornaments, content insets and close/minimize controls |
| Buttons | Normal, hover, pressed, disabled and selected states; blank text-button pieces |
| Icons | Exact action/ability associations, navigation, inventory/command shortcuts and markers |
| Inventory | Container art, item bounds, slot frames, drop targets and stack counters |
| Equipment or unit view | Character/vehicle/unit preview, layers, anchors, attachments and slot mapping |
| Status | Relevant resource/progress fills, frames, status icons, cooldowns and digit style |
| Navigation | Minimap/radar frame, scrollbar pieces, tabs, checkboxes, sliders and focus feedback |
| Sound | Native open/close, click, equip, purchase and error cues at a comfortable level |

Record source IDs, dimensions, transparent padding, crop bounds, slice widths and hashes. Keep extraction reproducible. Before calling a resource missing, check aliases, alternate banks, the correct edition and whether the icon is a small crop inside a larger atlas.

Do not replace recognizable native components with fashionable generic cards merely because they are easy to build. The source's distinctive typography, borders, selected-state colors, radar, command grid or equipment layout may carry more identity than a large decorative background. Match the actual game: a minimalist science-fiction interface should not acquire fantasy parchment simply because another port used it.

## Build a small native component kit

Define reusable components such as NativeButton, Frame, PropertyPanel, ActionIcon, Slot, StatusBar, Tab and Modal. Components receive content and behavior; they should not each redraw their own approximation of the art. A shared fix then repairs every shop, inventory and level reward.

Use nine-piece or three-piece composition for resizable art. Preserve corner pixels and edge thickness, tile suitable fills, and stretch only regions designed to stretch. Do not scale a complete ornate panel nonuniformly. Record inner content insets so text does not collide with the decorative frame.

Example manifest specification:

```text
role: primary_button
source_ids: normal / hover / pressed
native_bounds: original pixel extent
slice: top, right, bottom, left
content_insets: text-safe region inside ornaments
font_role: source subtitle face
focus: adapted native highlight
disabled: original state or documented derived treatment
```

Preserve transparent padding and anchors when composing a paperdoll. Independently centering every cropped piece misaligns hair, clothing, weapons and jewelry. Render layers in the source order and keep the backdrop aspect ratio. An empty slot frame belongs behind its item, not in front of it.

Recover original empty-slot frames and blank control pieces where available. If the source has an equipment figure, keep its body and equipment in a shared coordinate system. A unit command panel, vehicle outfitting screen or ability wheel requires its own source-specific anchors and composition rather than inheriting a paperdoll layout.

## Keep native typography readable

Use original faces for their intended roles: large title, smaller label and readable body text. Preserve glyph shapes and spacing where bitmap fonts are converted for a modern renderer. Inspect actual text samples and punctuation rather than assuming a font file loading means it is correct.

Test needed languages and fallback glyphs explicitly. A nostalgic alphabet that cannot show a minus sign, accented name or percentage is an incomplete UI asset. Keep original-looking text large enough on high-PPI phones; scale the world separately from the interface.

Use dark ink on parchment and light text on dark native surfaces as appropriate. Choose sufficient contrast for ordinary, positive and negative item stats. Color alone is insufficient for comparisons: include a sign, label or direction. Decorative title lettering should not carry dense numerical explanations.

Match source palettes and material contrast. Avoid mixing art generations or applying an unrelated material style to the interface. Use nearest-neighbor scaling where original pixel artwork needs crisp integer enlargement, and appropriate smooth scaling for painted generated backgrounds. Check fractional browser/device scales for seams and lost readability.

## Design the main menu around a few actions

Start with a centered composition: game title, one primary Start/Continue action, and a short secondary group such as Options and Bestiary. Move class/difficulty selection to a compact setup step if showing everything at once makes the home screen clunky. Keep labels short and meaningful.

Reuse actual source buttons and frame ornaments. A generated main-menu painting can create atmosphere behind them, but the interactive controls remain deterministic UI with native states. Reserve a quiet area for text and controls rather than placing them over detailed faces, flames or buildings.

Specify background focal points and safe areas for both wide and portrait screens. Test cover-cropping around those focal points; a single painting may need separate wide/portrait variants. Keep logos and button labels out of the generated image so they can be sharp, localized and changed without regeneration.

Example main-menu image prompt:

```text
Create a background illustration for this port or adaptation.
Use the supplied original environment and character references as identity anchors.
Match the selected era's materials, palette, setting and mood.
Keep a quiet central or specified side region for the real menu controls.
Keep important subjects inside the safe crop for the target screen orientation.
No UI frame, button, logo, lettering or watermark inside the image.
Preserve the source subject, costume or machinery rather than substituting a modern redesign.
```

Record whether a background is an illustration of the game or a screenshot. Place a concise fan-project attribution where it remains readable without competing with the primary action.

## Generate missing UI sparingly

Use this order: exact original asset; original compatible component; documented adaptation of a native piece; newly generated illustration or icon. Search first, especially for empty slots, paperdoll buttons and property backgrounds that may already exist.

When generation is necessary, provide nearby original components as references and define the required pixel dimensions, palette, edge treatment, lighting, perspective, alpha and state family. Ask for no embedded text. Generate a useful missing piece, not an entire new visual system around one missing icon.

For a transparent icon, request genuine alpha and inspect it against both light and dark backgrounds. Do not accept a painted checkerboard. For buttons, keep a consistent silhouette and lighting across normal/hover/pressed states; derive states deterministically when that gives a closer match than independent generations. Keep interaction bounds separate from irregular decorative pixels.

Example missing-icon specification:

```text
Missing role: an action shortcut, shown beside the existing source shortcuts.
References: supplied native icons are palette/lighting/edge references.
Asset: one recognizable symbol at the target small size, transparent background.
Match: source perspective, outline weight, materials and subdued highlights.
Exclude: lettering, modern app badges, baked background or extra ornaments.
```

If an original icon is reused with a new meaning, explain the association in the tooltip and asset metadata. Do not invent a historical source ID for generated art.

## Organize the battlefield by priority

Keep the character, telegraphs, target threats, drops and exit readable. Assign stable screen anchors to the minimap, hero status, progress/timeline and shortcuts, and reserve space before adding panels. Test the longest labels, maximum ability count, large currency values and expanded buffs together.

Prefer small source icons where a large background panel adds no information. Use source interactions where meaningful: draggable ability icons, a compact equipment shortcut, a command grid or a radial selector may be preferable to a permanent panel. Choose from the original game and target controls rather than requiring the same bar in every port.

Use the original minimap frame and familiar marker language where possible. Size it for navigation value, especially on a narrow phone screen; do not give every HUD group equal visual weight. Keep less urgent statistics in the character panel or Stats menu. Offscreen threats/loot can use clear edge arrows rather than another large panel.

If controls are draggable, clamp them to usable viewport bounds, persist their placement by an intentional screen-layout policy, and provide Reset Layout. Recheck saved desktop positions when entering portrait mode. Decorative layers should not intercept input intended for the world.

## Preserve inventory interaction as well as appearance

Apply this section when the game has an inventory or equipment system. For another genre, use the equivalent object inspector, command panel, vehicle loadout or other source interaction; do not add an inventory just to imitate a different game.

Use source item art consistently in drops, shop cards, inventory, equipment slots and tooltips. Make native slot backgrounds visible behind equipment so an empty target is understandable. Support every meaningful logical slot, including accessories, even if the original doll needs adapted surrounding controls.

Drag items onto compatible equipment targets and a clear trash/sell target. Show affordances and feedback before changing state. Prevent unintended loss of equipped or protected items according to the project's rules. On touch, make drag initiation distinguishable from scrolling and provide an explicit action alternative when precision is difficult.

Compare an unequipped item with the item occupying its actual logical slot, including items with different names or shared source layers. Hovering an equipped item should show its own properties without a redundant comparison against itself.

Place properties and side-by-side comparison in a separate overlay layer near the item. Choose left/right placement from available screen space and clamp it to the viewport. Make long content scrollable; do not clip it inside the inventory's scroll container. Keep the item, discard control and drag path usable while inspecting stats. Define pointer behavior, dismissal and focus so the popup does not flicker or eat the click needed to select the item.

On narrow screens, stack comparison sections or use an explicit inspect view rather than squeezing two unreadable columns. Provide the same information through tap and keyboard focus; essential stats cannot depend on hover alone.

## Make progression menus deliberate

Use the same native frames, icon language and button family for level choices, new abilities, behavior milestones and shop purchases. Distinguish their headings and costs without creating four unrelated interface styles.

Show a real action button on every card. Use a short first label, such as Damage or Cast Speed, with current-to-new values or useful scope below it. Provide damage for damage skills and relevant potency/duration/target information for support skills. Display the wallet and exact price in shops.

Clear held world input when opening a menu. A short arming delay on newly opened/refreshed shop actions prevents the click that killed the boss or steered the hero from purchasing something. Back/cancel must preserve money and choices as specified. Inventory and item trading should return to the correct between-area screen.

Upgrade cards must fit vertically within the usable screen height. At normal text size on supported viewports, show the complete upgrade choice set, its heading and every Choose/Buy button together without vertical scrolling, clipped cards or offscreen actions. Budget against the dynamic viewport height after safe-area insets, modal padding, headings and footer controls; do not assume a desktop-height screen. Use compact card content, consistent heights, sensible gaps and a responsive grid: a short landscape screen may need side-by-side cards while portrait uses a compact stack. Keep the exact rolled value, unit and before/after comparison visible; move optional flavor text or detailed breakdowns into an inspect view. Never achieve fit by shrinking text or touch targets below readable, usable sizes.

Test the largest supported choice set with the longest names, wrapped descriptions and maximum-value stat previews on the smallest supported phone in portrait and landscape. Assert that every card and action button lies within the usable viewport, with no overlap or page-level overflow; repeat after resize/orientation changes. For enlarged accessibility text or unusually long localized content, use a deliberate scrollable modal as a fallback, with reachable actions and no clipping, rather than forcing unreadable text. Long shop catalogs and inventory lists may scroll; the normal in-run upgrade choice screen should fit at once.

Use a clearly scrollable content region with a reachable close/continue action. Preserve semantic button behavior, visible focus, readable disabled states and a reliable Escape/Back route while retaining the source art.

## Validate nostalgia and ergonomics together

Compare the implementation with original references at matching visual scale. Then run complete tasks on desktop and a narrow high-PPI touch screen: start, configure, move, inspect a spell, level up, drag/equip, compare, discard/sell, buy repeatedly, reroll, cancel, resize and continue a save.

| Check | Failure to catch |
| --- | --- |
| Edition and source identity | Correct name but wrong-era font, monster, paperdoll or panel |
| Native geometry | Stretched corners, visible slice seams, misaligned wearable anchors |
| States and semantics | Buttons look right but have no pressed/disabled/focus feedback |
| Information | Dead stats, missing units, self-comparison, numerical preview differing from combat |
| Overlays | Clipped tooltip, inaccessible item, blocked trash target or offscreen close button |
| Responsive layout | HUD overlap, unsafe device insets, tiny text or saved controls outside the screen |
| Touch | Hover-only information, accidental page gestures or drag/scroll conflict |
| Performance | Repeated atlas decoding, per-frame DOM reconstruction, unnecessary animated panels |

Keep screenshots of the main menu, maximum-load HUD, backpack/doll, long comparison, progression menus and phone layout. Test screenshots alongside real interactions; a beautiful still cannot establish that dragging, focus and cancellation work.

## Deliver a reusable UI specification

Keep source-specific extraction and rendering adapters separate from reusable components. Choose equivalent mechanisms for the target engine: an atlas/bitmap decoder, scene or model renderer, font adapter, layout system and input adapter. Original asset IDs and paths belong in that project's manifest, not in the general workflow.

Deliver these artifacts:

- A reference board for the selected edition and visual style.
- An asset manifest with provenance, native dimensions, anchors, states and supported scaling.
- A component catalog mapping source widgets to the target implementation.
- A screen/interaction map, including modal transitions, focus and cancellation.
- Menu/background artwork with safe crops and editable text kept separate.
- Marked source-derived, adapted and generated assets, with prompts for generated pieces.
- Responsive screenshots and interaction checks on supported inputs/devices.

Build one complete representative flow before extending every screen: for example start -> action -> inspect -> choose -> return. Use a command/unit flow, character/equipment flow, vehicle/loadout flow or another sequence appropriate to the actual game. Preserve the same source identity when adding new systems later.
