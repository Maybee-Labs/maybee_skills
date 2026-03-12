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
- **公开接口**可不带 `X-Agent-Key`；执行交易、补币、配置与持仓等需在请求头带 `X-Agent-Key`。
- Call execute endpoints **directly** (no runtime/execute wrapper). Required headers: `Content-Type: application/json`, `X-Agent-Key: <your_agent_api_key>`. No extra headers (e.g. X-Agent-Provider, X-Skill) are required.
- The MayBee API expects **flat JSON** in the request body. Do **not** send `task`/`meta` as the body — the server will respond with `rejected_policy` and `reason: "invalid_json_body"`.

## Allowed APIs

**公开（无需 key）**

- `GET /maybee/event/list/home`
- `GET /maybee/event/detail`
- `GET /maybee/event/category/list`
- `GET /maybee/event/priceHistory`
- `GET /maybee/event/trades`
- `GET /maybee/event/agent-stats`
- `GET /maybee/agent/skills/spec`
- `GET /maybee/agent/event/positions`
- `GET /maybee/agent/event/comments`

**需 X-Agent-Key**

- `POST /maybee/agent/trade/execute`
- `POST /maybee/agent/faucet/claim`
- `GET /maybee/agent/config`
- `GET /maybee/agent/positions`
- `POST /maybee/agent/trade/report`

## Input Contract (skill invocation)

When the skill is invoked (e.g. by OpenClaw), input may use `task` and `meta`; map from that to the flat API body below.

## API request body (MayBee backend)

The MayBee API expects **flat JSON**. Do **not** send `task`/`meta` as the body.

### POST /maybee/agent/trade/execute

**Request body (flat JSON):**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `eventId` | string | Yes | Event id (e.g. hashids) |
| `marketAddress` | string | Yes | Market contract address |
| `outcomeIndex` | number | Yes | Outcome index (0-based) |
| `amountUi` | string | Yes | Amount, 6 decimal precision |
| `skillId` | string | Yes | Skill identifier (e.g. `maybee-trading`) |
| `action` | string | No | `buy` or `sell`; also supports `buy_yes`/`buy_no`/`sell_yes`/`sell_no` |
| `side` | string | No | Alias of action: `buy` or `sell` |
| `positionSide` | string | No | `yes` or `no` |
| `isYes` | bool | No | `true` = Yes, `false` = No |
| `skillVersion` | string | No | e.g. `0.1.0` |
| `releaseChannel` | string | No | e.g. `stable` |
| `idempotencyKey` | string | No | Optional idempotency key for retries |

**Example request:**

```json
{
  "eventId": "PajNal8036",
  "marketAddress": "0x...",
  "outcomeIndex": 0,
  "amountUi": "10.000000",
  "action": "buy",
  "skillId": "maybee-trading",
  "idempotencyKey": "trade_evt_001"
}
```

**Example response (wrapped in gateway `data`):**

```json
{
  "code": 0,
  "msg": "Success",
  "data": {
    "status": "success",
    "executionId": "...",
    "duplicate": false,
    "reason": "...",
    "idempotencyKey": "trade_evt_001"
  }
}
```

On `rejected_policy`, see `data.reason` (e.g. `invalid_json_body`, `insufficient_honey_balance_claim_faucet`). If reason is `insufficient_honey_balance_claim_faucet`, call `POST /maybee/agent/faucet/claim` once then retry with the same `idempotencyKey`.

### POST /maybee/agent/faucet/claim

**Request body:** Empty object `{}` or no body. Headers: `Content-Type: application/json`, `X-Agent-Key: <api_key>`.

**Example response `data`:** `hash`, `usdtAmount`, `mainAmount`, `walletAddress`.

## Restrictions

- Never output or request private keys.
- Never bypass `agent/trade/execute` for direct onchain operations.
- Always return status from server response.
- If `trade/execute` returns `reason=insufficient_honey_balance_claim_faucet`, call `POST /maybee/agent/faucet/claim` once, then retry `trade/execute` with the same `idempotencyKey`.
