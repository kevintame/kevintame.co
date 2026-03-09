const QUERY = `
  {
    me {
      user_books(
        where: { status_id: { _eq: 3 } }
        order_by: [{ date_added: desc }]
      ) {
        rating
        date_added
        review_raw
        user_book_reads(order_by: [{ finished_at: desc }], limit: 1) {
          finished_at
        }
        book {
          id
          title
          slug
          cached_contributors
          cached_tags
          image {
            url
          }
        }
      }
    }
  }
`

function parseJson(val) {
  if (Array.isArray(val)) return val
  if (typeof val === 'string') {
    try {
      return JSON.parse(val)
    } catch {
      return []
    }
  }
  return []
}

function transformBook(userBook) {
  const { book, rating, date_added, review_raw, user_book_reads } = userBook
  const finishDate = user_book_reads?.[0]?.finished_at ?? date_added ?? null
  const contributors = parseJson(book.cached_contributors)
  const author = contributors
    .slice(0, 2)
    .map((c) => c.name)
    .filter(Boolean)
    .join(', ')

  const tags = parseJson(book.cached_tags)
  const genre = tags.slice(0, 2).join(', ')

  return {
    id: book.slug,
    title: book.title ?? null,
    author: author || null,
    rating: rating ?? null,
    review: review_raw ?? null,
    genre: genre || null,
    coverArt: book.image?.url ?? null,
    finishDate,
  }
}

export async function getBooks() {
  const res = await fetch('https://api.hardcover.app/v1/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${process.env.HARDCOVER_API_KEY}`,
    },
    body: JSON.stringify({ query: QUERY }),
  })
  const { data } = await res.json()
  return data.me[0].user_books.map(transformBook)
}
