---
project: "Nexus"
doc_id: "ART-OPEN-011"
legacy_ids:
  - 'ART-011'
legacy_paths:
  - 'C:\Users\Quintin Livdahl\Nexus\Nexus\99 Archive\01 Superseded Source\00 Source Slots 2026-06-10\19 Art Visual Direction rev0.3\ART-011 - Art_Open_Questions.md'
title: "Art_Open_Questions"
doc_status: "working_draft"
working_state: "domain_rebuild_full_migration"
mode_owner: "Shared"
source_role: "open_questions"
canon_status: "tracking"
placement_domain: "Art"
content_role: "open_questions"
topic_family: "art_open_questions"
owns_topics:
  - 'art_open_questions'
borrows_topics: []
created: "2026-05-14"
last_updated: "2026-05-15"
last_reviewed: "2026-06-08"
metadata_verified: true
metadata_notes: "Phase 10 complete for the Art domain. Open-question routing now follows domain-first boundaries while preserving unresolved asset and workflow questions."
---

# Art Open Questions

## Visual system questions

1. What exact balance should Nexus use between diagrammatic tabletop clarity and cinematic scene art?
2. Should there be one master visual style bible image set, or multiple style lanes for characters, maps, UI, and scenes?
3. How gritty should the default palette be before it becomes too dark or unreadable on phone?
4. How should the alien Signal / Choir be visualized without becoming fantasy magic or a standard faction logo?

## Asset management questions

1. Should Project Sources ever include small key images, or should images always live only in Obsidian asset folders?
2. What metadata fields are required for every generated image?
3. Should old campaign scene images remain in old folders, be moved to `07_Assets/02_Generated_Art/Non_Canon_Reference/`, or be indexed in place?
4. How should duplicate image detection be handled in future cleanups?

## Icon and UI questions

1. Should the DM Mode Encounter-Play Icon Concept Package become the basis for the final icon system?
2. Which icons are needed for DM live play versus player-facing handouts?
3. Should TacMap icons be monochrome, limited-palette, or full-color?
4. Should Route Node maps and TacMaps share one icon family?

## Character and equipment art questions

1. What is the final visual distinction between full chassis cyborgs, Upload sleeves, AI bodies, drones, and maintenance/custodian shells?
2. How much visible body modification should default characters show?
3. What art rules prevent Splicers from reading as fantasy species?
4. What visual tags should represent cyberware hack surface, Firewall, shields, armor, and defense modules?

## Prompt workflow questions

1. RESOLVED 2026-05-15: Art Direction is prompt-only/default. Art Production is explicit execution for image generation/editing. `Do not generate` and `prompt-only` override visual trigger words and attached images.
2. What standard prompt metadata should be mandatory before important art generation?
3. How many variants are useful before the process becomes cluttered?
4. Should there be separate prompt templates for image generation, Canva, Figma, SVG diagrams, and printable PDFs?

## Cross-domain backpatch notes

- Modes still need future DM display updates; visual display rules may need Art cross-reference.
- Play Aids should cross-reference this domain for visual style and iconography.
- Dashboards should eventually point here as the stable visual source.
- Data may later need asset metadata CSVs or workbooks if asset management becomes structured data.
## Mass intake open questions - 2026-05-15

- What is the final TacMap icon grammar for cover, visibility, line-of-fire, node status, path status, and actor state?
- What belongs in one unified TacMap source slot if TacMap organization is later consolidated?
- Which current TacMap assets should become canon visual source, and which remain evidence/prototype?
- What is the minimum SVG node-web set needed for useful map composition?
- How many path/status marker families are needed before playtest?
- Should node-edge cover markers be a single flexible symbol family or separate icons for half, full, directional, path-limited, and visibility-blocking effects?
- Where should actual SVG sprite sheets live in Obsidian, and how should Art source indexes reference them?
- What art rules best preserve readability on phone screens and folded phone layouts?
- How should Art handoffs distinguish visual prototype, asset kit, prompt pattern, and playable map spec?
- Which elements of the asteroid mine TacMap prototype should be rebuilt as structured data before any canonical map promotion?


## Resolved workflow decision - 2026-05-15

Art should remain inside the Nexus project so it has access to central source routing and review context. The correction is not to forbid Art from making art; the correction is to split Art into two lanes:

- **Art Direction:** default, text-only planning/critique/prompt/routing lane.
- **Art Production:** explicit image generation/editing lane.

Preferred workflow: plan in one Art Direction chat, produce an Art Production Packet, then execute in a separate Art Production chat. This preserves source-grounded planning while preventing accidental generation in planning chats.


