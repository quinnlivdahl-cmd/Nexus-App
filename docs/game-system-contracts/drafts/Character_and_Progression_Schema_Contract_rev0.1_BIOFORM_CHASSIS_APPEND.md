# Character_and_Progression_Schema_Contract_rev0.1_BIOFORM_CHASSIS_APPEND

Date: 2026-06-12  
Mode: Draft  
Related artifact: `docs/game-system-contracts/drafts/Character_and_Progression_Schema_Contract_rev0.1.md`  
Status: companion append / residue preservation  
Canon status: not source canon; not implementation; not A1 prose; not final TypeScript schema

## Intended placement

`docs/game-system-contracts/drafts/Character_and_Progression_Schema_Contract_rev0.1_BIOFORM_CHASSIS_APPEND.md`

## Supplements

This file supplements:

- `docs/game-system-contracts/drafts/Character_and_Progression_Schema_Contract_rev0.1.md`
- GitHub Issue #33

## Replaces

Nothing.

Do not delete, overwrite, archive, supersede, or replace the accepted character/progression schema contract, prior game-system draft files, live source, or Chassis/Bioform source material based on this companion append.

## Purpose

Preserve a follow-up design residue after the accepted Character and Progression Schema Contract was committed.

This append records the relationship between the three-Bioform model and Chassis/cybernetic implantation limits without rewriting the accepted scaffold file.

---

# 1. Residue: three Bioforms as a strength

The three-Bioform model is likely strong because it keeps the body taxonomy simple while still supporting meaningful cybernetic-implantation constraints.

Current Bioform set:

```text
plain_human_dna
gene_edited
gene_spliced
```

Working player-facing labels:

```text
Plain Human DNA
Gene Edited
Gene Spliced
```

Design note:

```text
Three broad Bioforms may be enough. More categories might make body/cybernetic compatibility harder to define, validate, and display without adding useful gameplay pressure.
```

This is residue, not final source canon.

---

# 2. Residue: Bioform constrains default Chassis access

Bioform should probably constrain default Chassis access.

Draft relationship:

```text
Bioform
→ default cybernetic compatibility band
→ allowed Chassis tier range
→ exceptions / upgrades / special rules, if any
```

Bioform does not replace Chassis.

Chassis remains the cybernetic implantation tier. Bioform constrains how far into the Chassis tier system a body can normally go.

---

# 3. Residue: default compatibility assumptions

## 3.1 Plain Human DNA

Plain Human DNA likely has the broadest default cybernetic compatibility.

Draft assumption:

```text
Plain Human DNA
→ access to all Chassis tiers by default
```

Reason:

Plain baseline human bodies are the cleanest reference platform for full cybernetic implantation.

## 3.2 Gene Edited

Gene Edited likely sits in the middle.

Draft assumption:

```text
Gene Edited
→ mixed Chassis tier access
→ broader than Gene Spliced
→ more constrained than Plain Human DNA
```

Exact tier limits are TBD.

## 3.3 Gene Spliced

Gene Spliced likely has the strictest default cybernetic compatibility.

Draft assumption:

```text
Gene Spliced
→ limited Chassis tier access by default
→ new-age splices such as ceph/fungus may access Tier 1 at most by default
```

Reason:

Strongly divergent biology should create friction with deep cybernetic implantation unless a special rule, exception, adaptation, or source-defined upgrade path allows more.

---

# 4. Open questions to route later

These should not block the accepted character/progression scaffold.

1. What is the final source-canon term for `Bioform`, if not Bioform?
2. Are Plain Human DNA, Gene Edited, and Gene Spliced the final three body categories?
3. What exact Chassis tiers are already defined in source?
4. What Chassis tier range does Gene Edited get by default?
5. Are ceph/fungus examples subtypes under Gene Spliced, or do they require named subtype refs?
6. Can training, surgery, rare tech, faction backing, or special ability choices override Bioform/Chassis constraints?
7. Do Bioform limits constrain only cybernetic implantation, or also equipment, medicine, healing, abilities, status effects, and narrative consequences?

---

# 5. Future contract implication

A later revision of the main Character and Progression Schema Contract should consider adding:

```text
BioformCyberneticCompatibilityProfile
- bioformRef
- defaultAllowedChassisTierRefs
- blockedChassisTierRefs
- conditionalChassisTierRefs
- exceptionRuleRefs
- sourceSliceRefs
- validationResult
```

This should remain a hook until live source or a later Draft/Steward pass verifies exact Chassis tiers and Bioform terminology.

---

# 6. Preservation note

This append is intentionally narrow. It exists to preserve the user's design residue without forcing an immediate rewrite of the accepted scaffold artifact.
