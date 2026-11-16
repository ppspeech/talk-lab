---
name: Talk Lab
description: Artic cards on a clinic table. CAS session, plan and progress for one clinician, iPad first.
colors:
  desk-grey: "#e8ebee"
  card-white: "#ffffff"
  card-tint: "#f3f5f7"
  ink: "#1b222b"
  muted-ink: "#56616d"
  card-edge: "#d6dbe1"
  ink-navy: "#1f3d7a"
  ink-navy-on: "#ffffff"
  navy-wash: "#e2e9f6"
  selection: "#cddcf5"
  goal-blue: "#2f7fd8"
  goal-orange: "#e07b20"
  goal-green: "#2a9a5f"
  goal-violet: "#8452d1"
  ok: "#23824f"
  ok-soft: "#e1f2e8"
  err: "#b9382f"
  err-soft: "#f9e3e1"
  warn: "#9a6a10"
  warn-soft: "#f7ecd4"
typography:
  headline:
    fontFamily: "Atkinson Hyperlegible, system-ui, sans-serif"
    fontSize: "18px"
    fontWeight: 700
    letterSpacing: "0em"
  title:
    fontFamily: "Atkinson Hyperlegible, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 700
    letterSpacing: "0em"
  body:
    fontFamily: "Atkinson Hyperlegible, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    fontFeature: "\"tnum\""
  label:
    fontFamily: "Atkinson Hyperlegible, system-ui, sans-serif"
    fontSize: "13px"
    fontWeight: 700
    letterSpacing: "0em"
rounded:
  tab: "9px"
  card: "12px"
  panel: "14px"
  word-card: "20px"
  pill: "999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "12px"
  lg: "16px"
  header: "60px"
  header-phone: "52px"
  goal-edge: "6px"
  word-card-edge: "10px"
  deck-rail: "300px"
components:
  bar:
    backgroundColor: "{colors.card-white}"
    textColor: "{colors.ink}"
    height: "{spacing.header}"
  segmented-tabs:
    backgroundColor: "{colors.card-tint}"
    textColor: "{colors.muted-ink}"
    rounded: "{rounded.card}"
    padding: "3px"
  segmented-tab-selected:
    backgroundColor: "{colors.ink-navy}"
    textColor: "{colors.ink-navy-on}"
    rounded: "{rounded.tab}"
    padding: "8px 16px"
    height: "40px"
  button-primary:
    backgroundColor: "{colors.ink-navy}"
    textColor: "{colors.ink-navy-on}"
    height: "40px"
  goal-card:
    backgroundColor: "{colors.card-white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    width: "{spacing.deck-rail}"
  panel:
    backgroundColor: "{colors.card-white}"
    rounded: "{rounded.panel}"
  word-card:
    backgroundColor: "{colors.card-white}"
    rounded: "{rounded.word-card}"
  jump-link:
    backgroundColor: "{colors.card-white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "8px 14px"
    height: "40px"
  chip-button:
    backgroundColor: "{colors.card-white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "7px 14px"
    height: "36px"
---

# Design System: Talk Lab

## Overview

**Creative North Star: "Artic Cards on the Clinic Table"**

Talk Lab is a deck of articulation cards laid on a cool grey desk, not a website with a row of tabs. Each goal is a crisp white card wearing a thick coloured top edge; the goal in play lifts out of the deck, and the word card in the game wears that same colour. Everything else stays quiet: one ink-navy for primary actions and the selected section, one legible typeface, flat white surfaces at rest.

This world (Artic cards) replaced the dealt direction (Playground); the user chose it. It was built from a fresh world, not a catalog seed, so no `world:` or `seededFrom` provenance is carried. Density is working-tool density: three sections (Session, Plan, Progress), each meant to fit one screen on an iPad, with clinician controls close but calm so the child's game stays the focus.

**Key Characteristics:**
- Cool paper-grey desk ground, white cards with a 1px grey edge.
- Goal identity carried by a coloured top edge (blue, orange, green, violet), never by filled backgrounds.
- One lifted card at a time: the current goal.
- Atkinson Hyperlegible throughout, bold for headings, sentence case everywhere.
- Drawn line icons for chrome; emoji live only in content and the kids' games.

## Colors

A cool, low-chroma ground with one navy voice and four goal hues that act like coloured card stock.

### Primary
- **Ink Navy** (`ink-navy`): primary buttons, the selected Session/Plan/Progress segment, selected cue chips, focus ring (3px outline, 2px offset). Its soft wash (`navy-wash`) backs gentle selected states; `selection` tints text selection.

### Secondary (goal colours)
- **Goal Blue / Orange / Green / Violet** (`goal-blue`, `goal-orange`, `goal-green`, `goal-violet`; CSS `--g1` to `--g4`): assigned by goal order and passed to a card as `--gc`. Used for the 6px top edge of goal cards, the 10px top edge of the word card, and goal-keyed marks in history. Never as large fills.

### Tertiary (state)
- **Said it / Not yet / Careful** (`ok`, `err`, `warn` with `-soft` washes): logging outcomes, live-session dot, warnings. State only.

### Neutral
- **Desk Grey** (`desk-grey`): the page ground. Cool, not cream.
- **Card White** (`card-white`): bar, panels, cards, word card.
- **Card Tint** (`card-tint`): segmented control track, inset areas.
- **Card Edge** (`card-edge`): every 1px border and divider.
- **Ink / Muted Ink** (`ink`, `muted-ink`): text and secondary text.

Dark mode (system preference or `data-theme="dark"`) swaps to a deep slate ground (#12171d), slate cards (#1b222b, #222b35), light ink (#e6ebf0), a light navy accent (#8fb2f0 on #0d1726) and lifted goal hues (#6aa8ec, #f0a05a, #5cc28c, #ad8bec).

### Named Rules
**The Earned Colour Rule.** Colour appears only for goals, state, or the primary action. Everything else is grey, white and ink.

**The Top Edge Rule.** A goal's colour lives on the card's top edge. Fill the card white; let the edge say which goal it is.

## Typography

**Display, Body and Label Font:** Atkinson Hyperlegible (400 and 700, embedded as woff2 so it works offline in the artifact), fallback system-ui, sans-serif.

**Character:** One family chosen for legibility at arm's length on an iPad; weight does the hierarchy work, not a second face.

### Hierarchy
- **Headline** (700, 18px): brand name, deck title, section headings.
- **Title** (700, 15px): segmented tabs, client name, jump links (14px).
- **Body** (400, 16px, tabular numerals): all running text and data.
- **Label** (700, 13px, sentence case, no tracking): small group labels in muted ink. Phone tab labels drop to 12px.

### Named Rules
**The Sentence Case Rule.** No uppercase, no letter-spacing on labels, table heads or game names. Headings carry letter-spacing 0.

## Layout

Max content width 1360px. Header height 60px (52px on phone). Gaps step 4 / 8 / 12 / 16px; panels and hub columns use 16px.

- **Session, 1024px and up:** two columns, a 300px deck rail of goal cards on the left (sticky under the bar, scrolls within itself) and the game stage on the right. Nothing should need page scrolling.
- **Session, below 1024px:** the deck becomes a sideways-scrolling row (snap, cards min(280px, 82vw)) above the game.
- **Plan / Progress, 1100px and up:** two equal columns (hubs): Plan holds goals beside assessment and PMV; Progress holds history beside the family page. Jump links hide.
- **Below 1100px:** hubs stack into one column and pill jump links appear at the top.
- **Below 760px:** Session/Plan/Progress move to a fixed bottom tab bar (three equal cells, icon over 12px label, 52px min height, safe-area padding); main gets 84px bottom padding; the brand collapses to its 28px icon; game picker becomes two columns; cards narrow to min(240px, 72vw).
- **Below 600px:** the history table stacks each row as a block.
- **Below 480px:** goal headings take a full line.
- Hub columns are inline-size containers; the family page stacks below 640px of column width.

## Elevation & Depth

Flat by default. Surfaces separate by the 1px grey edge and the grey ground; shadow is a signal, not decoration.

### Shadow Vocabulary
- **Rest** (`0 1px 2px rgba(27,34,43,.06)`): panels, goal cards, game tiles, clients at rest.
- **Lift** (`0 6px 18px rgba(27,34,43,.14), 0 1px 3px rgba(27,34,43,.08)`): the current goal card, and hover on game tiles and client cards.

### Named Rules
**The One Card In Play Rule.** Only the current goal card is lifted at rest (Lift shadow plus a 3px rise, or a 6px slide right in the deck rail). Motion is 0.2s on a soft-out curve and is removed under reduced motion.

## Shapes

Gently rounded, card-like. Tabs 9px inside a 12px track; goal and client cards 12px; panels and game tiles 14px; the word card 20px; jump links and chip buttons fully pill-shaped. Borders are 1px `card-edge`; goal edges are 6px, the word card edge 10px. The add-goal slot is a 2px dashed outline on transparent.

## Components

### Bar
- White bar, 1px bottom edge, no shadow. Brand icon and name left, client name and age (ellipsised), segmented Session / Plan / Progress centred, status right.

### Segmented tabs
- Card-tint track with 3px padding; each segment has a drawn icon (18px) and bold label, 40px min height. Selected segment is ink-navy with white text; others muted ink, ink on hover. A green 8px dot marks a live session.
- **Phone:** becomes the bottom tab bar (see Layout).

### Buttons
- 40px min height, icon plus label inline with a 6px gap. Primary is ink-navy fill. Secondary chip buttons (e.g. Mouth map) are white pills with a 1px edge.

### Goal deck cards (signature)
- White card, 1px edge, 6px top edge in the goal colour, 12px radius, Rest shadow. Current card lifts; switched-off goals fade to 62% opacity. Cue chips inside go ink-navy when on. A dashed add slot ends the deck.

### Game stage
- Game picker of compact tiles (min 150px, 16:9 art, 14px radius) that lift on hover; game toolbar sits on top of the stage. Game art may stay playful.

### Word card (signature)
- The card shown on every game move: white, 20px radius, 10px top edge in the current goal's colour (navy if none). Skip in ink; Said it is the primary action.

### Jump links
- White pills, bold 14px, 1px edge turning navy on hover; shown only when hubs stack.

### Hubs
- Two columns of white panels (14px radius, Rest shadow); wide content scrolls inside its panel.

### Icons
- Drawn SVG line set (24 grid, 2px stroke, round caps, currentColor, 18px; 20-22px in cue chips and phone tabs): undo, dice, star, lips, image/picture, note, link, and the cue set verbal, visual, tactile, gesture, letter, plus section icons in the tabs.

## Do's and Don'ts

### Do:
- **Do** keep the ground cool desk grey (#e8ebee) and every surface white with a 1px #d6dbe1 edge.
- **Do** carry goal identity as a top edge (6px on deck cards, 10px on the word card) in g1 to g4, set by goal order.
- **Do** lift only the goal in play with the Lift shadow.
- **Do** use the drawn SVG icon set for every chrome control.
- **Do** use emoji freely as word content, picture cues and inside the kids' games.
- **Do** write Australian English in sentence case.

### Don't:
- **Don't** use tracked uppercase labels, eyebrows or table heads.
- **Don't** use emoji as chrome icons (buttons, tabs, toolbars).
- **Don't** return to a cream or warm ground.
- **Don't** spend colour outside goals, state or the primary action; no tinted section fills.
- **Don't** shadow resting surfaces beyond the Rest shadow.
