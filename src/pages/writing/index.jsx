import Head from 'next/head'

import { Card } from '@/components/Card'
import { SimpleLayout } from '@/components/SimpleLayout'
import { formatDate } from '@/lib/formatDate'
import { getAllWriting } from '@/lib/getAllWriting'

function Writing({ writing }) {
  return (
    <article className="md:grid md:grid-cols-4 md:items-baseline">
      <Card className="md:col-span-3">
        <Card.Title href={`/writing/${writing.slug}`}>
          {writing.title}
        </Card.Title>
        <Card.Eyebrow
          as="time"
          dateTime={writing.date}
          className="md:hidden"
          decorate
        >
          {formatDate(writing.date)}
        </Card.Eyebrow>
        <Card.Description>{writing.description}</Card.Description>
        <Card.Cta>Read article</Card.Cta>
      </Card>
      <Card.Eyebrow
        as="time"
        dateTime={writing.date}
        className="mt-1 hidden md:block"
      >
        {formatDate(writing.date)}
      </Card.Eyebrow>
    </article>
  )
}

export default function WritingIndex({ writing }) {
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
        <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
          <div className="flex max-w-3xl flex-col space-y-16">
            {writing.map((item) => (
              <Writing key={item.slug} writing={item} />
            ))}
          </div>
        </div>
      </SimpleLayout>
    </>
  )
}

export async function getStaticProps() {
  return {
    props: {
      writing: (await getAllWriting()).map(({ component, ...meta }) => meta),
    },
  }
}
