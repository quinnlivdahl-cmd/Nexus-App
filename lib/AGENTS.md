# Nexus Shared Libraries Agent Instructions

## Scope

These instructions apply to shared library packages under `lib`.

## Local Rules

- Treat generated API/spec packages as shared contracts.
- Do not hand-edit generated output unless the generator is unavailable and the user approves the exception.
- Keep schema/API changes backward-compatible with current app usage unless the task explicitly changes the contract.
- Run relevant typechecks or codegen checks when changing shared contracts.

## Boundary

Shared libraries support app implementation. They are not Nexus source authority.
