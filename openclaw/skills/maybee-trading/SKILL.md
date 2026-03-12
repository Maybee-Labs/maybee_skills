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
- Skill uses standard HTTP API calls only; no MCP-specific protocol, and no database connection config is required.

## Allowed APIs

- `GET /maybee/developers/overview`
- `GET /maybee/developers/quickstart`
- `GET /maybee/agent/skills/spec`
- `POST /maybee/agent/trade/execute`
- `POST /maybee/agent/faucet/claim`

## Input Contract

- `task`: User task description
- `meta.agentId`: Target agent
- `meta.eventId`: Target event
- `meta.marketAddress`: Market address
- `meta.outcomeIndex`: Outcome index
- `meta.amountUi`: Trade amount (UI precision)
- `meta.side`: Trade direction, `buy` or `sell` (alias of `action`)
- `meta.positionSide`: Position direction, `yes` or `no`
- `meta.action`: Optional combined action, supports `buy`/`sell` or `buy_yes`/`buy_no`/`sell_yes`/`sell_no`
- `meta.skillId`: Skill identifier for audit trail
- `meta.idempotencyKey`: Optional idempotency key for safe retry

## Restrictions

- Never output or request private keys.
- Never bypass `agent/trade/execute` for direct onchain operations.
- Always return status from server response.
- If `trade/execute` returns `reason=insufficient_honey_balance_claim_faucet`, call `POST /maybee/agent/faucet/claim` once, then retry `trade/execute` with the same `idempotencyKey`.
