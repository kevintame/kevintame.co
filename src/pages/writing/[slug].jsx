import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypePrism from 'rehype-prism-plus'

import { WritingLayout } from '@/components/WritingLayout'
import { getArticles, getArticleBySlug, getArticleContent } from '@/lib/writing'

export default function WritingPage({ article, content, previousPathname }) {
  const meta = {
    title: article.title,
    date: article.date,
    description: article.description,
  }

  return (
    <WritingLayout meta={meta} previousPathname={previousPathname}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypePrism]}>
        {content}
      </ReactMarkdown>
    </WritingLayout>
  )
}

export async function getStaticPaths() {
  const articles = await getArticles()
  return {
    paths: articles.map((a) => ({ params: { slug: a.slug } })),
    fallback: 'blocking',
  }
}

export async function getStaticProps({ params }) {
  const article = await getArticleBySlug(params.slug)
  if (!article) return { notFound: true }

  const content = await getArticleContent(article.id)

  return {
    props: {
      article,
      content,
    },
    revalidate: 3600,
  }
}
