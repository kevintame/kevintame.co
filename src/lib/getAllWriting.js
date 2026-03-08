import glob from 'fast-glob'
import * as path from 'path'

async function importWriting(writingFilename) {
  let { meta, default: component } = await import(
    `../pages/writing/${writingFilename}`
  )
  return {
    slug: writingFilename.replace(/(\/index)?\.mdx$/, ''),
    ...meta,
    component,
  }
}

export async function getAllWriting() {
  let writingFilenames = await glob(['*.mdx', '*/index.mdx'], {
    cwd: path.join(process.cwd(), 'src/pages/writing'),
  })

  let writing = await Promise.all(writingFilenames.map(importWriting))

  return writing.sort((a, z) => new Date(z.date) - new Date(a.date))
}
