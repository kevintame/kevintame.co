import { Client } from '@notionhq/client'

// Shared Notion client — one instance reused across all database fetches
// Returns null when the API key is not configured (e.g. local dev without .env)
export const notion = process.env.NOTION_API_KEY
  ? new Client({ auth: process.env.NOTION_API_KEY })
  : null

// Generic data source query — used by each src/lib/<thing>.js
// Uses dataSources.query (v5 API — databases.query was removed in v5)
// Options: sorts, filter, page_size (default 100)
export async function queryDatabase(dataSourceId, options = {}) {
  if (!notion) return []
  const response = await notion.dataSources.query({
    data_source_id: dataSourceId,
    page_size: 100,
    ...options,
  })
  return response.results
}

// Property extractors — Notion's raw API nests values several levels deep.
// These helpers keep transform functions clean and readable.
export const getProp = {
  title:  (page, name) => page.properties[name]?.title[0]?.plain_text ?? '',
  text:   (page, name) => page.properties[name]?.rich_text[0]?.plain_text ?? '',
  number: (page, name) => page.properties[name]?.number ?? null,
  select: (page, name) => page.properties[name]?.select?.name ?? null,
  date:   (page, name) => page.properties[name]?.date?.start ?? null,
  url:    (page, name) => page.properties[name]?.url ?? null,
  checkbox: (page, name) => page.properties[name]?.checkbox ?? false,
}
