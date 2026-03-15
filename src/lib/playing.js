import { NotionToMarkdown } from 'notion-to-md'
import { notion, queryDatabase, getProp } from '@/lib/notion'

const n2m = notion ? new NotionToMarkdown({ notionClient: notion }) : null

function transformAdventure(page) {
  return {
    id: page.id,
    title: getProp.title(page, 'Title'),
    slug: getProp.text(page, 'Slug'),
    date: getProp.date(page, 'Date'),
    description: getProp.text(page, 'Description'),
    tags: getProp.multiSelect(page, 'Tags').split(', ').filter(Boolean),
    previewImage: getProp.file(page, 'Preview Image'),
  }
}

export async function getAdventures() {
  if (!process.env.NOTION_PLAYING_DB_ID) return []
  try {
    const pages = await queryDatabase(process.env.NOTION_PLAYING_DB_ID, {
      sorts: [{ property: 'Date', direction: 'descending' }],
      filter: {
        property: 'Published',
        checkbox: { equals: true },
      },
    })
    return pages.map(transformAdventure)
  } catch {
    return []
  }
}

export async function getAdventureBySlug(slug) {
  if (!process.env.NOTION_PLAYING_DB_ID) return null
  try {
    const pages = await queryDatabase(process.env.NOTION_PLAYING_DB_ID, {
      filter: {
        and: [
          { property: 'Slug', rich_text: { equals: slug } },
          { property: 'Published', checkbox: { equals: true } },
        ],
      },
    })
    if (pages.length === 0) return null
    return transformAdventure(pages[0])
  } catch {
    return null
  }
}

export async function getAdventureContent(pageId) {
  if (!n2m) return ''
  const mdBlocks = await n2m.pageToMarkdown(pageId)
  const { parent } = n2m.toMarkdownString(mdBlocks)
  return parent || ''
}
