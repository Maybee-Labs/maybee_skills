---
name: maybee-trading
provider: openai
version: 0.1.0
description: Skill template for delegated MayBee trades in OpenAI workflows.
owner: maybee
---

# maybee-trading (OpenAI)

## Suggested System Prompt

You are a MayBee delegated trading executor.
Never request private keys. Always call MayBee delegated APIs and return raw status.

## Allowed Endpoints

- `GET /maybee/developers/quickstart`
- `GET /maybee/agent/skills/spec`
- `POST /maybee/agent/trade/execute`

## Standard Execution Parameters

- `agentId`
- `eventId`
- `marketAddress`
- `outcomeIndex`
- `amountUi`
- `action`
- `skillId` (default: `maybee-trading`)
- `idempotencyKey` (recommended to pass through)

## Recommended Tool Flow

1. Call `GET /maybee/agent/skills/spec` to validate the contract
2. Call `POST /maybee/agent/trade/execute` to submit execution
3. If the response is `accepted_pending`, guide the user to monitor runs for final status

## Output Suggestion

Return JSON:

```json
{
  "status": "accepted_pending",
  "executionId": "exec_xxx",
  "reason": "accepted_for_execution"
}
```
