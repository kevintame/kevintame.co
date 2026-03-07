import glob from 'fast-glob'
import * as path from 'path'

async function importAdventure(adventureFilename) {
  let { meta, default: component } = await import(
    `../pages/adventure-log/${adventureFilename}`
  )
  return {
    slug: adventureFilename.replace(/(\/index)?\.mdx$/, ''),
    ...meta,
    component,
  }
}

export async function getAllAdventures() {
  let adventureFilenames = await glob(['*.mdx', '*/index.mdx'], {
    cwd: path.join(process.cwd(), 'src/pages/adventure-log'),
  })

  let adventures = await Promise.all(adventureFilenames.map(importAdventure))

  return adventures.sort((a, z) => new Date(z.date) - new Date(a.date))
}
