---
name: maybee-trading
provider: cursor
version: 0.1.0
description: Skill template for executing delegated MayBee trades in Cursor workflows.
owner: maybee
---

# maybee-trading (Cursor)

## Use Cases

- Local development and debugging of delegated execution
- Quick validation of whether strategy output is executable in Cursor
- Integration testing with runs/settings pages

## Execution Principles

1. Never request private keys or sign directly on-chain
2. Execute only through `POST /maybee/agent/trade/execute`
3. Provide actionable fixes when status is `rejected_policy`

## Required Inputs

- `instruction` (natural language task)
- `context.agentId`
- `context.eventId`
- `context.marketAddress`
- `context.outcomeIndex`
- `context.amountUi`
- `context.action` (`buy` / `sell`)

## Recommended Flow

1. Fetch `GET /maybee/agent/skills/spec`
2. Build the execute request according to the contract
3. Call execute and parse the returned status
4. Generate the next action (retry, adjust params, or monitor runs)

## Output Template

```json
{
  "result": "accepted_pending",
  "executionId": "exec_xxx",
  "hint": "open /developers/agents/{agentId}/runs to track status"
}
```
