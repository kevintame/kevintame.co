import { queryDatabase, getProp } from '@/lib/notion'

// Maps a raw Notion page → a clean album object.
// Schema: 💽 1001 Albums - Ratings Chart
// Artist (title), Title (text), Rating (number), Genre (text),
// Notes (text), Release Date (number/year), Run Time (text),
// Album Art URL (url), Rating Date (date), Complete (checkbox)
function transformAlbum(page) {
  return {
    id:          page.id,
    artist:      getProp.title(page, 'Artist'),
    title:       getProp.text(page, 'Title'),
    rating:      getProp.number(page, 'Rating'),
    review:      getProp.text(page, 'Notes'),
    genre:       getProp.text(page, 'Genre'),
    releaseDate: getProp.number(page, 'Release Date'),
    runTime:     getProp.text(page, 'Run Time'),
    albumArt:    getProp.url(page, 'Album Art URL'),
    ratingDate:  getProp.date(page, 'Rating Date'),
  }
}

export async function getAlbums() {
  const pages = await queryDatabase(process.env.NOTION_ALBUMS_DB_ID, {
    sorts: [{ property: 'Rating Date', direction: 'descending' }],
    filter: {
      property: 'Complete',
      checkbox: { equals: true },
    },
  })
  return pages.map(transformAlbum)
}
