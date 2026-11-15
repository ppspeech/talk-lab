# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
One user: Pei-Pei Hsing, a Certified Practising Speech Pathologist in Brisbane, running therapy for children with childhood apraxia of speech (CAS) and other speech sound disorders. She uses Talk Lab on an iPad in session with the child sitting beside her (the child plays the games), on a laptop for planning and admin before and after sessions, and on her phone for quick looks. Parents see a family view (shown on the iPad at the end of a session, downloaded, or opened from a home-practice link).

## Product Purpose
Talk Lab runs NDP3-based CAS therapy end to end for one clinician's caseload: assess, set goals and stimulus words, run the session (log every try while the child plays a game), review, and send practice home. Success is a session where she can pick targets, run practice and log accurate tries without hunting through screens, on whatever device is in her hand.

## Positioning
Built by and for one CAS clinician: NDP3 stages and word shapes, a cueing ladder, VC-to-word bridging (Bridge it), a mouth map of placement, voicing and air, and child-facing games whose every move reveals a practice word to say. Every try is logged as it happens, then reviewed at Finish (said it / nearly / not yet).

## Operating Context
- In session: iPad, child beside her, short attention, the game is the child's focus; she needs to switch targets, log tries and change cues fast.
- Planning: laptop; assessment (NDP3 forms, PMV chart), goals across stages, history and progress.
- On the go: phone, quick checks.
- Family: end-of-session iPad view, download, or the home-practice link (ppspeech.github.io/talk-lab/home.html) with practice words, mouth guide, games and day ticks.
- Hosted as a claude.ai artifact (records saved there) and mirrored on GitHub Pages (public copy, does not save).

## Capabilities and Constraints
- Tabs today: Assessment, Session, Goals, PMV chart, History, Family. Clients list with an example client.
- Session: Today's targets (goals on/off, words, refill with VC/CV/CVCV/CVC), game picker (~20 games incl. Bridge it), word card per move (Skip / ✓ Said it), cue ladder, sticker book, fish tank, Mouth map, Finish review, notes, save.
- Shared game module (SpeechGames) is also used by Sound Check and Big Spell Energy; game logic must keep working.
- Single-file HTML artifact; data via the artifact runtime; no build step.
- Pain points to fix (user-confirmed): too many places to click, breaks on smaller screens, clunky session flow. Look was not named as the main pain.

## Brand Commitments
- Name: Talk Lab. Icon: terracotta speech bubble with pink lips.
- Australian English and Aussie pronunciation in all copy.
- Original art only (emoji, CSS, SVG; no copied commercial characters).
- Calm, low-distraction; she is busy and highly distractible: the tool must make her faster, not be a gadget to fiddle with.

## Evidence on Hand
Example client (Sam, demo) with goals, sessions and assessments ships in the app. Mouth pictures (Gemini-generated, her approval) are embedded. No testimonials, metrics or other users exist; none may be invented.

## Product Principles
1. One screen, minimal clicks: what she needs in session is visible without drilling in.
2. The child's game stays the focus; clinician controls stay close but quiet.
3. Every try counts: logging must be one tap and correctable later.
4. Works on iPad first, laptop and phone just as well.
5. Low upkeep: no settings to tend, no decoration that slows her down.

## Accessibility & Inclusion
Child-facing views use large touch targets and plain words; reduced-motion respected; text readable at arm's length on an iPad.
