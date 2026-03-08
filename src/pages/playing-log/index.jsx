import Head from 'next/head'

import { Card } from '@/components/Card'
import { SimpleLayout } from '@/components/SimpleLayout'
import { formatDate } from '@/lib/formatDate'
import { getAllAdventures } from '@/lib/getAllAdventures'

function Adventure({ adventure }) {
  return (
    <article className="md:grid md:grid-cols-4 md:items-baseline">
      <Card className="md:col-span-3">
        <Card.Title href={`/playing-log/${adventure.slug}`}>
          {adventure.title}
        </Card.Title>
        <Card.Eyebrow
          as="time"
          dateTime={adventure.date}
          className="md:hidden"
          decorate
        >
          {formatDate(adventure.date)}
        </Card.Eyebrow>
        <Card.Description>{adventure.description}</Card.Description>
        <Card.Cta>Read entry</Card.Cta>
      </Card>
      <Card.Eyebrow
        as="time"
        dateTime={adventure.date}
        className="mt-1 hidden md:block"
      >
        {formatDate(adventure.date)}
      </Card.Eyebrow>
    </article>
  )
}

export default function AdventureLogIndex({ adventures }) {
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
        <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
          <div className="flex max-w-3xl flex-col space-y-16">
            {adventures.map((adventure) => (
              <Adventure key={adventure.slug} adventure={adventure} />
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
      adventures: (await getAllAdventures()).map(
        ({ component, ...meta }) => meta,
      ),
    },
  }
}
