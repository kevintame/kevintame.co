import { useState, useMemo } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import clsx from 'clsx'

import { SimpleLayout } from '@/components/SimpleLayout'
import { getAlbums } from '@/lib/albums'

function RatingDots({ rating, max = 10 }) {
  return (
    <div className="flex items-center gap-1" aria-label={`${rating} out of ${max}`}>
      {Array.from({ length: max }).map((_, i) => (
        <span
          key={i}
          className={clsx(
            'h-2 w-2 rounded-full',
            i < rating
              ? 'bg-purple-500 dark:bg-purple-400'
              : 'bg-zinc-200 dark:bg-zinc-700',
          )}
        />
      ))}
      <span className="ml-2 text-sm font-semibold text-purple-500 dark:text-purple-400">
        {rating}/10
      </span>
    </div>
  )
}

function AlbumCard({ album }) {
  return (
    <li className="group relative flex flex-col gap-4 rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
      <div className="flex items-start gap-4">
        {album.albumArt && (
          <div className="relative h-16 w-16 flex-none overflow-hidden rounded-lg shadow-md">
            <Image
              src={album.albumArt}
              alt={`${album.title} cover`}
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        )}
        <div className="min-w-0 flex-1">
          {album.genre && (
            <p className="mb-1 text-xs font-medium uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
              {album.genre}
            </p>
          )}
          <h2 className="text-base font-semibold text-zinc-800 dark:text-zinc-100">
            {album.title}
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            {album.artist}
          </p>
        </div>
      </div>

      {album.rating !== null && (
        <RatingDots rating={album.rating} />
      )}

      {album.review && (
        <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          {album.review}
        </p>
      )}

      <div className="mt-auto flex items-center gap-3 text-xs text-zinc-400 dark:text-zinc-500">
        {album.releaseDate && <span>{album.releaseDate}</span>}
        {album.releaseDate && album.ratingDate && <span>·</span>}
        {album.ratingDate && (
          <span>
            Rated{' '}
            {new Date(album.ratingDate).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
            })}
          </span>
        )}
      </div>
    </li>
  )
}

const SORT_OPTIONS = [
  { key: 'ratingDate', label: 'Date Rated' },
  { key: 'rating', label: 'Rating' },
  { key: 'title', label: 'Title' },
  { key: 'releaseDate', label: 'Release Year' },
]

function sortAlbums(albums, sortKey) {
  return [...albums].sort((a, b) => {
    if (sortKey === 'ratingDate') {
      return new Date(b.ratingDate ?? 0) - new Date(a.ratingDate ?? 0)
    }
    if (sortKey === 'rating') {
      return (b.rating ?? 0) - (a.rating ?? 0)
    }
    if (sortKey === 'title') {
      return (a.title ?? '').localeCompare(b.title ?? '')
    }
    if (sortKey === 'releaseDate') {
      return (a.releaseDate ?? 0) - (b.releaseDate ?? 0)
    }
    return 0
  })
}

export default function AlbumRatings({ albums }) {
  const [sortKey, setSortKey] = useState('ratingDate')
  const sorted = useMemo(() => sortAlbums(albums, sortKey), [albums, sortKey])

  return (
    <>
      <Head>
        <title>Album Ratings - Kevin Tame</title>
        <meta
          name="description"
          content="My ratings and reviews of albums I've been listening to."
        />
      </Head>
      <SimpleLayout
        title="Album Ratings"
        intro={
          <>
            Music I&apos;ve been listening to, ranked and reviewed. I&apos;m currently working
            through the{' '}
            <a
              href="https://1001albumsgenerator.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-500 hover:text-purple-600 dark:text-purple-400"
            >
              1001 albums
            </a>{' '}
            you must hear before you die.
          </>
        }
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
          <p className="text-zinc-500 dark:text-zinc-400">No albums yet — check back soon.</p>
        ) : (
          <ul
            role="list"
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {sorted.map((album) => (
              <AlbumCard key={album.id} album={album} />
            ))}
          </ul>
        )}
      </SimpleLayout>
    </>
  )
}

export async function getStaticProps() {
  const albums = await getAlbums()

  return {
    props: { albums },
    // Revalidate every hour — Notion edits appear on the live site
    // within 60 minutes without a redeploy.
    revalidate: 3600,
  }
}
