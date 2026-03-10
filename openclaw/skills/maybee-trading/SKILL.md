---
name: maybee-trading
provider: openclaw
version: 0.1.0
description: Execute delegated trades on MayBee with auditable policy control.
owner: maybee
---

# maybee-trading (OpenClaw)

## Endpoint Guidance

- Production API base URL: `https://api.maybee.ai`
- All API paths below are relative to this base URL.
- Do not use localhost endpoints in production skill execution.

## Allowed APIs

- `GET /maybee/developers/overview`
- `GET /maybee/developers/quickstart`
- `GET /maybee/agent/skills/spec`
- `POST /maybee/agent/trade/execute`

## Input Contract

- `task`: User task description
- `meta.agentId`: Target agent
- `meta.eventId`: Target event
- `meta.marketAddress`: Market address
- `meta.outcomeIndex`: Outcome index
- `meta.amountUi`: Trade amount (UI precision)
- `meta.side`: `buy` or `sell`

## Restrictions

- Never output or request private keys.
- Never bypass `agent/trade/execute` for direct onchain operations.
- Always return status from server response.
