# Triage Labels

Matt Pocock engineering skills speak in five canonical triage roles. This table maps those roles to the GitHub labels used by Nexus App.

| Matt role | Nexus GitHub label | Meaning |
| --- | --- | --- |
| `needs-triage` | `status:needs-triage` | Maintainer evaluation is required. |
| `needs-info` | `status:needs-info` | More information or a decision is required before triage can continue. |
| `ready-for-agent` | `status:ready-for-agent` | Fully specified and safe for an autonomous agent to claim. |
| `ready-for-human` | `status:ready-for-human` | Ready work that requires human judgment or implementation. |
| `wontfix` | `wontfix` | The work will not be actioned. |

When a skill names a triage role, use the corresponding Nexus label. The five role labels are mutually exclusive: remove the previous role label when moving an issue to another triage role.

Existing Nexus lifecycle labels such as `status:blocked`, `status:parked`, and `status:in-progress` remain available for project control. The older general `status:ready` label is retained for compatibility, but new Matt triage should distinguish `status:ready-for-agent` from `status:ready-for-human`.

Do not bulk-apply these labels to the existing issue queue. Apply them only when an issue is deliberately triaged.
