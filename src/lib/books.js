import { queryDatabase, getProp } from '@/lib/notion'

// Maps a raw Notion page → a clean book object.
// Schema: Title (title), Author (text), Rating (number), Genre (text),
// Notes (text), Publication Year (number), Cover Art URL (url),
// Rating Date (date), Complete (checkbox)
function transformBook(page) {
  return {
    id:              page.id,
    title:           getProp.title(page, 'Title'),
    author:          getProp.text(page, 'Author'),
    rating:          getProp.number(page, 'Rating'),
    review:          getProp.text(page, 'Notes'),
    genre:           getProp.text(page, 'Genre'),
    publicationYear: getProp.number(page, 'Publication Year'),
    coverArt:        getProp.url(page, 'Cover Art URL'),
    ratingDate:      getProp.date(page, 'Rating Date'),
  }
}

export async function getBooks() {
  const pages = await queryDatabase(process.env.NOTION_BOOKS_DB_ID, {
    sorts: [{ property: 'Rating Date', direction: 'descending' }],
    filter: {
      property: 'Complete',
      checkbox: { equals: true },
    },
  })
  return pages.map(transformBook)
}
