import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypePrism from 'rehype-prism-plus'

import { PlayingLayout } from '@/components/PlayingLayout'
import {
  getAdventures,
  getAdventureBySlug,
  getAdventureContent,
} from '@/lib/playing'

export default function PlayingPage({ adventure, content }) {
  const meta = {
    title: adventure.title,
    date: adventure.date,
    description: adventure.description,
  }

  return (
    <PlayingLayout meta={meta}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypePrism]}>
        {content}
      </ReactMarkdown>
    </PlayingLayout>
  )
}

export async function getStaticPaths() {
  const adventures = await getAdventures()
  return {
    paths: adventures.map((a) => ({ params: { slug: a.slug } })),
    fallback: 'blocking',
  }
}

export async function getStaticProps({ params }) {
  const adventure = await getAdventureBySlug(params.slug)
  if (!adventure) return { notFound: true }

  const content = await getAdventureContent(adventure.id)

  return {
    props: {
      adventure,
      content,
    },
    revalidate: 3600,
  }
}
