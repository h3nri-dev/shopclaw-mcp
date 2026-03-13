# ShopClaw.dev

**Search 364M+ Shopify products** via MCP, REST API, or any AI agent.

[Website](https://www.shopclaw.dev) | [Docs](https://www.shopclaw.dev/docs) | [npm](https://www.npmjs.com/package/shopclaw-mcp)

---

## Quick Start

### MCP Server (Claude, Cursor, Windsurf)

```bash
npx -y shopclaw-mcp
```

Set `SHOPCLAW_API_KEY` to your API key. Get one free at [ShopClaw.dev](https://www.shopclaw.dev/register) — every account starts with **$5 free credit**.

### Claude Desktop

Add to `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "shopclaw": {
      "command": "npx",
      "args": ["-y", "shopclaw-mcp"],
      "env": { "SHOPCLAW_API_KEY": "your_key_here" }
    }
  }
}
```

### Claude Code

```bash
claude mcp add --scope user shopclaw -e SHOPCLAW_API_KEY=your_key_here -- npx -y shopclaw-mcp
```

### Claude.ai Connector (Remote MCP — no install)

1. Go to **Claude.ai > Settings > Integrations > Add custom connector**
2. Name: `ShopClaw.dev`
3. URL: `https://www.shopclaw.dev/api/mcp?key=YOUR_API_KEY`

### Cursor

Create `.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "shopclaw": {
      "command": "npx",
      "args": ["-y", "shopclaw-mcp"],
      "env": { "SHOPCLAW_API_KEY": "your_key_here" }
    }
  }
}
```

### Windsurf

Add in **Settings > Cascade > MCP**:

```json
{
  "mcpServers": {
    "shopclaw": {
      "command": "npx",
      "args": ["-y", "shopclaw-mcp"],
      "env": { "SHOPCLAW_API_KEY": "your_key_here" }
    }
  }
}
```

### REST API (any language or agent)

```bash
curl -X POST https://www.shopclaw.dev/api/search \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"query": "wireless headphones", "limit": 5}'
```

---

## Endpoints

| Type | URL | Auth |
|------|-----|------|
| **MCP** (remote) | `https://www.shopclaw.dev/api/mcp` | `?key=API_KEY` or `Bearer` header |
| **MCP** (local) | `npx -y shopclaw-mcp` | `SHOPCLAW_API_KEY` env var |
| **REST** | `POST https://www.shopclaw.dev/api/search` | `Authorization: Bearer API_KEY` |

## Tools

### search_products

Search Shopify products with optional filters.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `query` | string | Yes | Search terms, e.g. "organic coffee" |
| `limit` | number | No | Results to return (1-50, default 5) |
| `vendor` | string | No | Filter by brand/vendor |
| `price_min` | number | No | Minimum price in USD |
| `price_max` | number | No | Maximum price in USD |

### get_product_fields

Returns available searchable fields and API documentation. No parameters.

## Example Prompts

- "Find Nike running shoes under $100"
- "Search for organic coffee beans between $15 and $30"
- "What Shopify stores sell mechanical keyboards?"
- "Compare prices for wireless earbuds across Shopify stores"

## Agent Discovery

This repo follows the [Agent Skills](https://agentskills.io) open standard.

| File | Description |
|------|-------------|
| [`SKILL.md`](./shopclaw/SKILL.md) | Agent Skill definition (Claude Code, Codex, ChatGPT, 27+ agents) |
| [`.well-known/ai-plugin.json`](./.well-known/ai-plugin.json) | OpenAI plugin manifest |
| [`.well-known/openapi.json`](./.well-known/openapi.json) | OpenAPI 3.1 specification |

Also available at:
- `https://www.shopclaw.dev/SKILL.md`
- `https://www.shopclaw.dev/.well-known/ai-plugin.json`
- `https://www.shopclaw.dev/.well-known/openapi.json`

## Pricing

- Every account starts with **$5 free credit**
- Each search costs **$0.007** (less than a penny)
- Recharge from $5 to $500 at [ShopClaw.dev/pricing](https://www.shopclaw.dev/pricing)

## License

MIT
