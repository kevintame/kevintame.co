import { useState, useMemo } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import clsx from 'clsx'

import { SimpleLayout } from '@/components/SimpleLayout'
import { formatDate } from '@/lib/formatDate'
import { getArticles } from '@/lib/writing'

function Writing({ writing }) {
  return (
    <article className="group relative flex flex-col sm:flex-row">
      <div className="absolute -inset-6 z-0 scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 dark:bg-zinc-800/50 sm:-inset-6 sm:rounded-xl" />
      <Link href={`/writing/${writing.slug}`} className="absolute -inset-6 z-20 sm:-inset-6 sm:rounded-xl" />
      {writing.previewImage && (
        <img
          src={writing.previewImage}
          alt=""
          className="relative z-10 mb-6 aspect-[3/2] w-full rounded-lg object-cover sm:mb-0 sm:mr-6 sm:w-40 sm:flex-none"
        />
      )}
      <div className="relative z-10 flex-1">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
            {writing.title}
          </h2>
          <time
            dateTime={writing.date}
            className="flex-none text-sm text-zinc-400 dark:text-zinc-500"
          >
            {formatDate(writing.date)}
          </time>
        </div>
        <p className="relative z-10 mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          {writing.description}
        </p>
        {writing.tags.length > 0 && (
          <div className="relative z-10 mt-2 flex flex-wrap gap-1.5">
            {writing.tags.map((tag) => (
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
          Read article
          <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="ml-1 h-4 w-4 stroke-current">
            <path d="M6.75 5.75 9.25 8l-2.5 2.25" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </article>
  )
}

export default function WritingIndex({ writing }) {
  const [activeTag, setActiveTag] = useState(null)

  const allTags = useMemo(() => {
    const tagSet = new Set(writing.flatMap((w) => w.tags))
    return [...tagSet].sort()
  }, [writing])

  const filtered = useMemo(
    () =>
      activeTag
        ? writing.filter((w) => w.tags.includes(activeTag))
        : writing,
    [writing, activeTag],
  )

  return (
    <>
      <Head>
        <title>Writing - Kevin Tame</title>
        <meta
          name="description"
          content="All of my long-form thoughts on things I'm interested in. Collected in chronological order."
        />
      </Head>
      <SimpleLayout
        title="Writing on leadership, design, company building, games, and my many adventures."
        intro="All of my long-form thoughts on things I'm interested in. Collected in chronological order."
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
          {filtered.map((item) => (
            <div key={item.slug} className="border-b border-zinc-100 py-14 first:pt-0 last:border-b-0 dark:border-zinc-700/40">
              <Writing writing={item} />
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
      writing: await getArticles(),
    },
    revalidate: 3600,
  }
}
