---
project: "Nexus"
doc_id: "EQUIP-INVENTORY-001"
legacy_ids:
  - 'SRC-EQUIP-008'
legacy_paths:
  - 'C:\Users\Quintin Livdahl\Nexus\Nexus\99 Archive\01 Superseded Source\00 Source Slots 2026-06-10\11 Equipment Loadout Cyberware rev0.5\SRC-EQUIP-008 - Shared_Armory_and_Inventory_Model.md'
title: "Shared_Armory_and_Inventory_Model"
doc_status: "draft"
working_state: "domain_rebuild_pilot_migration"
mode_owner: "Shared"
source_role: "applied_rule"
canon_status: "provisional-source"
placement_domain: "Equipment"
content_role: "applied_rule"
topic_family: "equipment_inventory"
owns_topics:
  - 'shared_armory'
  - 'inventory_model'
borrows_topics:
  - 'equipment_loadout'
created: "2026-05-14"
last_updated: "2026-07-16"
last_reviewed: "2026-07-16"
metadata_verified: true
metadata_notes: "Pilot migration into the domain-first rebuild repo. Phase 10 consolidated body routing into domain-first language and preserved the active shared-armory and inventory procedure without relying on package-era framing."
---

# Shared Armory and Inventory Model

## 1. Shared storage

Owned equipment is stored in the crew's accessible shared armory, cache, or other committed storage. When the campaign has a Ship, its armory is the normal mobile store; the rule does not require every crew or Downtime interval to be Ship-based.

Crew select Route Node loadouts from accessible shared inventory during post-choice Deployment Preparation, subject to availability, permissions, credentials, body compatibility, role, and scenario access.

## 2. Shared armory rule

Default rule:

```text
The crew owns gear collectively unless a specific item is personal, integrated, restricted, damaged, or story-bound.
```

This supports crew selection and loadout choice without forcing every character to maintain a huge private inventory.

## 3. No inactive carried gear

The active rule is no carried-but-inactive gear by default.

If gear is not in a loadout slot, it remains in committed storage or is otherwise unavailable during the node.

This keeps DM display clean and makes preparation meaningful.

## 4. Purchased items

Purchased or acquired items can be:

- equipped into a slot;
- assigned to a crew member;
- stored in accessible shared inventory;
- installed as Ship equipment when the campaign has a Ship;
- converted into a credential/access relationship;
- reserved for future crafting/fabrication.

## 5. Resupply and recovery

Consumables are restored only through:

- inventory;
- resupply;
- fabrication;
- market access;
- mission reward;
- scenario permission.

Armor and shields may reset by default during Downtime or after Tactical Pressure ends unless damaged, broken, overloaded, compromised, or tagged otherwise.

## 6. Runtime display requirement

Before deployment, the runtime should show concise loadout and relevant current inventory for the Player Character and crew.

In tactical scenes, combat dashboards should include inventory shortcuts when gear choices matter.

Do not require the player to search a buried inventory in the middle of a node.

## 7. Campaign-specific gear

Items gained in playtest, such as custody gear, access cards, transfer chits, observer equipment, recorder patches, and beacon/token remnants, should remain campaign/dashboard state until Draft promotes them into general equipment examples or a reusable item catalog.

## 8. Mass-intake clarifications

### 8.1 Pre-node loadout

Route Node loadouts are chosen from accessible shared inventory after Route Choice and before the node begins. During the node, the crew uses equipped, installed, integrated, credentialed, or scenario-granted gear.

### 8.2 No inactive carried gear

No carried inactive gear is the active rule. This is not a conflict with pickups.

### 8.3 Pickups and inventory

Pickups are added to inventory. They are not related to equipment slots by default.

During a scene, a pickup may be treated as a scene object, evidence, salvage, quest item, immediate-use prop, or carried object if the fiction allows. It becomes normal active equipment only when equipped during a valid loadout or preparation window, unless a specific scene rule grants immediate use.

### 8.4 Runtime display requirement

The runtime should show concise loadout and relevant inventory before deployment and during Tactical Pressure when gear matters. It should not display a giant private carried-inactive gear list, because such a list is not part of the active rule.
