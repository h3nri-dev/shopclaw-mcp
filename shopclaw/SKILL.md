---
name: shopclaw
description: "ShopClaw.dev: Search 364M+ Shopify products by keyword, brand, and price range. Use when the user asks about e-commerce products, product research, competitor pricing, market analysis, or finding items on Shopify stores."
license: Proprietary
compatibility: Requires network access and a ShopClaw.dev API key from https://www.shopclaw.dev
metadata:
  author: shopclaw
  version: "1.0"
  website: https://www.shopclaw.dev
  mcp-endpoint: https://www.shopclaw.dev/api/mcp
  npm-package: shopclaw-mcp
---

# ShopClaw.dev — Shopify Product Search

Search across 364M+ indexed Shopify products with full-text search, brand filtering, and price range filtering.

## Setup

1. Get an API key at https://www.shopclaw.dev (every account starts with $5 free credit)
2. Connect via one of the methods below

### Option A: MCP Server (recommended for Claude, Cursor, Windsurf)

Install via npx — no download needed:

```
npx -y shopclaw-mcp
```

Set the environment variable `SHOPCLAW_API_KEY` to your API key.

**Claude Desktop** — add to `claude_desktop_config.json`:
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

**Claude Code:**
```bash
claude mcp add shopclaw -- npx -y shopclaw-mcp
```

### Option B: Remote MCP (no install — works in Claude.ai)

Use the Streamable HTTP endpoint directly:

```
https://www.shopclaw.dev/api/mcp?key=YOUR_API_KEY
```

Add as a custom connector in Claude.ai Settings > Integrations.

### Option C: REST API (any agent or language)

```
POST https://www.shopclaw.dev/api/search
Authorization: Bearer YOUR_API_KEY
Content-Type: application/json

{
  "query": "wireless headphones",
  "platform": "shopify",
  "limit": 10,
  "filters": {
    "vendor": "Sony",
    "price_min": 50,
    "price_max": 200
  }
}
```

## Available Tools

### search_products

Search Shopify products with optional filters.

**Parameters:**
- `query` (string, required) — Search terms, e.g. "organic coffee", "running shoes"
- `limit` (number, default 5) — Number of results (1-50)
- `vendor` (string, optional) — Filter by brand/vendor name
- `price_min` (number, optional) — Minimum price in USD
- `price_max` (number, optional) — Maximum price in USD

**Returns:** Product title, brand, URL, image, price, and currency for each result.

### get_product_fields

Returns available searchable fields and API documentation. No parameters.

## Example Prompts

- "Find Nike running shoes under $100"
- "Search for organic coffee beans between $15 and $30"
- "What Shopify stores sell mechanical keyboards?"
- "Compare prices for wireless earbuds across Shopify stores"
- "Find trending products in the skincare category"

## Pricing

- Every account starts with **$5 free credit**
- Each search costs **$0.007** (less than a penny)
- Recharge from $5 to $500 at https://www.shopclaw.dev/pricing
