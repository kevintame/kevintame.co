import { queryDatabase, getProp } from '@/lib/notion'

// Maps a raw Notion page → a clean album object.
// Property names here must match your Notion database column names exactly.
function transformAlbum(page) {
  return {
    id:     page.id,
    title:  getProp.title(page, 'Name'),
    artist: getProp.text(page, 'Artist'),
    rating: getProp.number(page, 'Rating'),
    review: getProp.text(page, 'Review'),
    genre:  getProp.select(page, 'Genre'),
    date:   getProp.date(page, 'Date'),
    cover:  getProp.url(page, 'Cover'),
  }
}

export async function getAlbums() {
  const pages = await queryDatabase(process.env.NOTION_ALBUMS_DB_ID, {
    sorts: [{ property: 'Rating', direction: 'descending' }],
  })
  return pages.map(transformAlbum)
}
