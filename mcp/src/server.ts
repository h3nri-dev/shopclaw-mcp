#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const API_BASE = process.env.SHOPCLAW_API_URL || "https://www.shopclaw.dev";
const API_KEY = process.env.SHOPCLAW_API_KEY || "";

if (!API_KEY) {
  console.error("Error: SHOPCLAW_API_KEY environment variable is required.");
  console.error("Get your API key at https://www.shopclaw.dev/docs");
  process.exit(1);
}

async function apiSearch(body: Record<string, unknown>) {
  const res = await fetch(`${API_BASE}/api/search`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error || `API error: ${res.status}`);
  }

  return res.json();
}

const server = new McpServer({
  name: "shopclaw",
  version: "1.0.0",
});

// Tool: search_products
server.tool(
  "search_products",
  "Search Shopify products across all indexed stores. Returns product titles, prices, URLs, images, and more.",
  {
    query: z.string().describe("Search query, e.g. 'wireless headphones', 'organic coffee'"),
    limit: z.number().min(1).max(50).default(5).describe("Number of results to return (limited by plan)"),
    vendor: z.string().optional().describe("Filter by vendor/brand name"),
    price_min: z.number().optional().describe("Minimum price filter"),
    price_max: z.number().optional().describe("Maximum price filter"),
  },
  async ({ query, limit, vendor, price_min, price_max }) => {
    const filters: Record<string, unknown> = {};
    if (vendor) filters.vendor = vendor;
    if (price_min !== undefined) filters.price_min = price_min;
    if (price_max !== undefined) filters.price_max = price_max;

    const data = await apiSearch({
      query,
      platform: "shopify",
      limit,
      filters,
    });

    const hits = data.hits?.hits || [];
    const total = data.hits?.total?.value || 0;
    const meta = data._meta;

    const products = hits.map((hit: Record<string, unknown>) => {
      const s = hit._source as Record<string, unknown>;
      const prices = (s.prices as { currency: string; price: number }[]) || [];
      const gallery = (s.gallery as { url: string }[]) || [];
      return {
        title: s.title,
        brand: s.brand || null,
        url: s.url,
        image: gallery[0]?.url || null,
        price: prices[0]?.price || null,
        currency: prices[0]?.currency || null,
        categories: s.category || [],
        hostnames: s.hostnames || [],
      };
    });

    const text = [
      `Found ${total.toLocaleString()} products (showing ${products.length})`,
      meta ? `Balance: $${meta.freeCredit} free + $${meta.balance} paid | Usage: ${meta.usageThisMonth} this month` : "",
      "",
      ...products.map(
        (p: Record<string, unknown>, i: number) =>
          `${i + 1}. ${p.title}${p.brand ? ` (${p.brand})` : ""}` +
          `${p.price ? ` — ${p.currency} ${p.price}` : ""}` +
          `\n   ${p.url}` +
          `${p.image ? `\n   Image: ${p.image}` : ""}`
      ),
    ]
      .filter(Boolean)
      .join("\n");

    return { content: [{ type: "text" as const, text }] };
  }
);

// Tool: get_product_fields
server.tool(
  "get_product_fields",
  "Get the available product index fields/mapping to understand what data is searchable.",
  {},
  async () => {
    return {
      content: [
        {
          type: "text" as const,
          text: [
            "ShopClaw.dev Product Search API",
            "",
            "Searchable fields: title, brand, category, vendor, product_type",
            "Filter fields: price (via price_min/price_max), vendor",
            "Returned fields: title, brand, url, image, price, currency, categories, hostnames",
            "",
            `API endpoint: ${API_BASE}/api/search`,
            `Docs: https://www.shopclaw.dev/docs`,
          ].join("\n"),
        },
      ],
    };
  }
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("ShopClaw.dev MCP server running on stdio");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
