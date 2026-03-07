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
        {album.cover && (
          <div className="relative h-16 w-16 flex-none overflow-hidden rounded-lg shadow-md">
            <Image
              src={album.cover}
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
          <h2 className="truncate text-base font-semibold text-zinc-800 dark:text-zinc-100">
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

      {album.date && (
        <p className="mt-auto text-xs text-zinc-400 dark:text-zinc-500">
          Reviewed{' '}
          {new Date(album.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
          })}
        </p>
      )}
    </li>
  )
}

export default function AlbumRatings({ albums }) {
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
        intro="Music I've been listening to, ranked and reviewed. Updated directly from my Notion database."
      >
        {albums.length === 0 ? (
          <p className="text-zinc-500 dark:text-zinc-400">No albums yet — check back soon.</p>
        ) : (
          <ul
            role="list"
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {albums.map((album) => (
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
