import { NotionToMarkdown } from 'notion-to-md'
import { notion, queryDatabase, getProp } from '@/lib/notion'

const n2m = notion ? new NotionToMarkdown({ notionClient: notion }) : null

function transformArticle(page) {
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

export async function getArticles() {
  if (!process.env.NOTION_WRITING_DB_ID) return []
  const pages = await queryDatabase(process.env.NOTION_WRITING_DB_ID, {
    sorts: [{ property: 'Date', direction: 'descending' }],
    filter: {
      property: 'Published',
      checkbox: { equals: true },
    },
  })
  return pages.map(transformArticle)
}

export async function getArticleBySlug(slug) {
  if (!process.env.NOTION_WRITING_DB_ID) return null
  const pages = await queryDatabase(process.env.NOTION_WRITING_DB_ID, {
    filter: {
      and: [
        { property: 'Slug', rich_text: { equals: slug } },
        { property: 'Published', checkbox: { equals: true } },
      ],
    },
  })
  if (pages.length === 0) return null
  return transformArticle(pages[0])
}

export async function getArticleContent(pageId) {
  if (!n2m) return ''
  const mdBlocks = await n2m.pageToMarkdown(pageId)
  const { parent } = n2m.toMarkdownString(mdBlocks)
  return parent || ''
}
