import { Client } from '@notionhq/client'

// Shared Notion client — one instance reused across all database fetches
// Returns null when the API key is not configured (e.g. local dev without .env)
export const notion = process.env.NOTION_API_KEY
  ? new Client({ auth: process.env.NOTION_API_KEY })
  : null

// Generic database query — used by each src/lib/<thing>.js
// Options: sorts, filter, page_size (default 100)
export async function queryDatabase(databaseId, options = {}) {
  if (!notion) return []
  const response = await notion.databases.query({
    database_id: databaseId,
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
