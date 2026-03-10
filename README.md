# maybee_skills

`maybee_skills` is the open-source Skill template repository for MayBee.
It contains cross-ecosystem skill definitions and integration request examples
for OpenClaw, Claude, OpenAI, and Cursor.

## Why Separate Repo

- `maybee_server` is a closed-source business repository
- Skill templates can evolve independently and be open-source friendly
- Third-party integrators can consume templates without accessing private server code

## Structure

- `openclaw/maybee-trading/`
- `claude/maybee-trading/`
- `openai/maybee-trading/`
- `cursor/maybee-trading/`

Each directory includes:

- `SKILL.md`: Platform-specific skill definition and behavior constraints
- `request.template.json`: Minimal runnable request template

## Unified Execution Contract

Skill execution relies on the same delegated MayBee APIs:

- `GET /maybee/developers/overview`
- `GET /maybee/developers/quickstart`
- `GET /maybee/agent/skills/spec`
- `POST /maybee/agent/trade/execute`

Unified status values:

- `success`
- `accepted_pending`
- `rejected_policy`
- `trade_ok_report_failed`
