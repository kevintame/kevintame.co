import { useState, useMemo } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import clsx from 'clsx'

import { SimpleLayout } from '@/components/SimpleLayout'
import { getBooks } from '@/lib/hardcover'

function RatingDots({ rating, max = 5 }) {
  return (
    <div className="flex items-center gap-1" aria-label={`${rating} out of ${max}`}>
      {Array.from({ length: max }).map((_, i) => {
        const full = i + 1 <= rating
        const half = !full && i < rating
        return (
          <span
            key={i}
            className="relative h-2 w-2 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-700"
          >
            {(full || half) && (
              <span
                className="absolute inset-y-0 left-0 bg-purple-500 dark:bg-purple-400"
                style={{ width: full ? '100%' : '50%' }}
              />
            )}
          </span>
        )
      })}
      <span className="ml-2 text-sm font-semibold text-purple-500 dark:text-purple-400">
        {rating}/5
      </span>
    </div>
  )
}

function BookCard({ book }) {
  return (
    <li className="group relative flex flex-col gap-4 rounded-2xl border border-zinc-100 p-6 transition hover:border-purple-500 dark:border-zinc-700/40 dark:hover:border-purple-400">
      <a
        href={`https://hardcover.app/books/${book.id}`}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute inset-0 rounded-2xl"
        aria-label={`View ${book.title} on Hardcover`}
      />
      <div className="flex items-start gap-4">
        {book.coverArt && (
          <div className="relative h-20 w-14 flex-none overflow-hidden rounded-lg shadow-md">
            <Image
              src={book.coverArt}
              alt={`${book.title} cover`}
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        )}
        <div className="min-w-0 flex-1">
          {book.genre && (
            <p className="mb-1 text-xs font-medium uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
              {book.genre}
            </p>
          )}
          <h2 className="text-base font-semibold text-zinc-800 dark:text-zinc-100">
            {book.title}
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            {book.author}
          </p>
        </div>
      </div>

      {book.rating !== null && (
        <RatingDots rating={book.rating} />
      )}

      {book.review && (
        <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          {book.review}
        </p>
      )}

      {book.finishDate && (
        <div className="mt-auto text-xs text-zinc-400 dark:text-zinc-500">
          Finished{' '}
          {new Date(book.finishDate).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
          })}
        </div>
      )}
    </li>
  )
}

const SORT_OPTIONS = [
  { key: 'finishDate', label: 'Date Finished' },
  { key: 'rating', label: 'Rating' },
  { key: 'title', label: 'Title' },
]

function sortBooks(books, sortKey) {
  return [...books].sort((a, b) => {
    if (sortKey === 'finishDate') {
      return new Date(b.finishDate ?? 0) - new Date(a.finishDate ?? 0)
    }
    if (sortKey === 'rating') {
      return (b.rating ?? 0) - (a.rating ?? 0)
    }
    if (sortKey === 'title') {
      return (a.title ?? '').localeCompare(b.title ?? '')
    }
    return 0
  })
}

export default function Reading({ books }) {
  const [sortKey, setSortKey] = useState('finishDate')
  const sorted = useMemo(() => sortBooks(books, sortKey), [books, sortKey])

  return (
    <>
      <Head>
        <title>Reading - Kevin Tame</title>
        <meta
          name="description"
          content="My ratings and reviews of books I've been reading."
        />
      </Head>
      <SimpleLayout
        title="Book Ratings"
        intro="Books I've been reading, ranked and reviewed."
      >
        <div className="mb-8 flex flex-wrap gap-2">
          {SORT_OPTIONS.map((opt) => (
            <button
              key={opt.key}
              onClick={() => setSortKey(opt.key)}
              className={clsx(
                'rounded-full px-4 py-1.5 text-sm font-medium transition',
                sortKey === opt.key
                  ? 'bg-purple-500 text-white dark:bg-purple-400 dark:text-zinc-900'
                  : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700',
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
        {sorted.length === 0 ? (
          <p className="text-zinc-500 dark:text-zinc-400">No books yet — check back soon.</p>
        ) : (
          <ul
            role="list"
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {sorted.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </ul>
        )}
      </SimpleLayout>
    </>
  )
}

export async function getStaticProps() {
  const books = await getBooks()

  return {
    props: { books },
    revalidate: 3600,
  }
}
