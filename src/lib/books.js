import { queryDatabase, getProp } from '@/lib/notion'

// Maps a raw Notion page → a clean book object.
// Schema: 📖 Books DB
// Title (title), Author(s) (multi_select), Rating (1-10) (number),
// Genre (multi_select), Notes (text), Year Published (number),
// Cover (file), Finish Date (date), Status (select)
function transformBook(page) {
  return {
    id:              page.id,
    title:           getProp.title(page, 'Title'),
    author:          getProp.multiSelect(page, 'Author(s)'),
    rating:          getProp.number(page, 'Rating (1-10)'),
    review:          getProp.text(page, 'Notes'),
    genre:           getProp.multiSelect(page, 'Genre'),
    publicationYear: getProp.number(page, 'Year Published'),
    coverArt:        getProp.file(page, 'Cover'),
    finishDate:      getProp.date(page, 'Finish Date'),
  }
}

export async function getBooks() {
  const pages = await queryDatabase(process.env.NOTION_BOOKS_DB_ID, {
    sorts: [{ property: 'Finish Date', direction: 'descending' }],
    filter: {
      property: 'Status',
      select: { equals: 'Finished' },
    },
  })
  return pages.map(transformBook)
}
