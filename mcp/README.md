# shopclaw-mcp

MCP server for searching 364M+ Shopify products via the [ShopClaw.dev](https://www.shopclaw.dev) API.

## Quick Start

### Claude Desktop

Add to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "shopclaw": {
      "command": "npx",
      "args": ["-y", "shopclaw-mcp"],
      "env": {
        "SHOPCLAW_API_KEY": "sc_your_api_key"
      }
    }
  }
}
```

### Claude Code

```bash
claude mcp add --scope user shopclaw -e SHOPCLAW_API_KEY=sc_your_api_key -- npx -y shopclaw-mcp
```

### Cursor

Create `.cursor/mcp.json` in your project root:

```json
{
  "mcpServers": {
    "shopclaw": {
      "command": "npx",
      "args": ["-y", "shopclaw-mcp"],
      "env": {
        "SHOPCLAW_API_KEY": "sc_your_api_key"
      }
    }
  }
}
```

## Tools

- **search_products** — Search Shopify products with filters for vendor, price range, and result limit
- **get_product_fields** — Get available searchable and filterable fields

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `SHOPCLAW_API_KEY` | Yes | Your ShopClaw.dev API key (get one at https://www.shopclaw.dev/docs) |
| `SHOPCLAW_API_URL` | No | API base URL (defaults to https://www.shopclaw.dev) |

## Get an API Key

Sign up at [ShopClaw.dev](https://www.shopclaw.dev/register) — every account starts with $5 free credit.
