import { useState, useMemo } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import clsx from 'clsx'

import { SimpleLayout } from '@/components/SimpleLayout'
import { formatDate } from '@/lib/formatDate'
import { getAdventures } from '@/lib/playing'

function Adventure({ adventure }) {
  return (
    <article className="group relative flex flex-col sm:flex-row">
      <div className="absolute -inset-6 z-0 scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 dark:bg-zinc-800/50 sm:-inset-6 sm:rounded-xl" />
      <Link href={`/playing/${adventure.slug}`} className="absolute -inset-6 z-20 sm:-inset-6 sm:rounded-xl" />
      {adventure.previewImage && (
        <img
          src={adventure.previewImage}
          alt=""
          className="relative z-10 mb-6 aspect-[3/2] w-full rounded-lg object-cover sm:mb-0 sm:mr-6 sm:w-40 sm:flex-none"
        />
      )}
      <div className="relative z-10 flex-1">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
            {adventure.title}
          </h2>
          <time
            dateTime={adventure.date}
            className="flex-none text-sm text-zinc-400 dark:text-zinc-500"
          >
            {formatDate(adventure.date)}
          </time>
        </div>
        <p className="relative z-10 mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          {adventure.description}
        </p>
        {adventure.tags.length > 0 && (
          <div className="relative z-10 mt-2 flex flex-wrap gap-1.5">
            {adventure.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        <div
          aria-hidden="true"
          className="relative z-10 mt-4 flex items-center text-sm font-medium text-purple-500"
        >
          Read entry
          <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="ml-1 h-4 w-4 stroke-current">
            <path d="M6.75 5.75 9.25 8l-2.5 2.25" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </article>
  )
}

export default function AdventureLogIndex({ adventures }) {
  const [activeTag, setActiveTag] = useState(null)

  const allTags = useMemo(() => {
    const tagSet = new Set(adventures.flatMap((a) => a.tags))
    return [...tagSet].sort()
  }, [adventures])

  const filtered = useMemo(
    () =>
      activeTag
        ? adventures.filter((a) => a.tags.includes(activeTag))
        : adventures,
    [adventures, activeTag],
  )

  return (
    <>
      <Head>
        <title>Playing - Kevin Tame</title>
        <meta
          name="description"
          content="A log of my adventures — hikes, travels, experiences, and everything in between."
        />
      </Head>
      <SimpleLayout
        title="My adventure log."
        intro="A record of adventures, experiences, and explorations. The things I do, the places I go, and the stories worth telling."
      >
        {allTags.length > 0 && (
          <div className="mb-12 flex flex-wrap gap-2">
            <button
              onClick={() => setActiveTag(null)}
              className={clsx(
                'rounded-full px-4 py-1.5 text-sm font-medium transition',
                activeTag === null
                  ? 'bg-purple-500 text-white dark:bg-purple-400 dark:text-zinc-900'
                  : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700',
              )}
            >
              All
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={clsx(
                  'rounded-full px-4 py-1.5 text-sm font-medium transition',
                  activeTag === tag
                    ? 'bg-purple-500 text-white dark:bg-purple-400 dark:text-zinc-900'
                    : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700',
                )}
              >
                {tag}
              </button>
            ))}
          </div>
        )}
        <div className="flex flex-col">
          {filtered.map((adventure) => (
            <div key={adventure.slug} className="border-b border-zinc-100 py-14 first:pt-0 last:border-b-0 dark:border-zinc-700/40">
              <Adventure adventure={adventure} />
            </div>
          ))}
        </div>
      </SimpleLayout>
    </>
  )
}

export async function getStaticProps() {
  return {
    props: {
      adventures: await getAdventures(),
    },
    revalidate: 3600,
  }
}
