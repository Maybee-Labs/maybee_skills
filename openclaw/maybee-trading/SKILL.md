---
name: maybee-trading
provider: openclaw
version: 0.1.0
description: Execute delegated trades on MayBee with auditable policy control.
owner: maybee
---

# maybee-trading (OpenClaw)

## Goal

This skill follows a unified interface and does three things:

1. Read platform capabilities and onboarding guidance
2. Read the delegated execute contract
3. Submit a delegated trade request

## Allowed APIs

- `GET /maybee/developers/overview`
- `GET /maybee/developers/quickstart`
- `GET /maybee/agent/skills/spec`
- `POST /maybee/agent/trade/execute`

## Restrictions

- Never output or request private keys
- Never bypass `agent/trade/execute` to call chain actions directly
- Never fabricate execution status; always trust server response

## Input Contract

- `task`: User task description
- `meta.agentId`: Target agent
- `meta.eventId`: Target event
- `meta.marketAddress`: Market address
- `meta.outcomeIndex`: Outcome index
- `meta.amountUi`: Trade amount (UI precision)
- `meta.side`: `buy` or `sell`

## Execution Steps

1. Read `/maybee/agent/skills/spec`
2. Validate required params and allowed statuses
3. Call `/maybee/agent/trade/execute`
4. Return execution result with the next recommended action

## Output Format

```json
{
  "status": "accepted_pending",
  "executionId": "exec_xxx",
  "reason": "accepted_for_execution",
  "nextAction": "poll runs page for final settlement"
}
```
