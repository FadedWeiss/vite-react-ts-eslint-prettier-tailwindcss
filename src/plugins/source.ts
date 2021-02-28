import { Plugin } from 'vite'
import { promises as fs } from 'fs'

function SourcePlugin(): Plugin {
  const SOURCE_PREFIX = `@content/`
  return {
    name: `SourcePlugin`,
    async resolveId(id) {
      if (id.startsWith(SOURCE_PREFIX)) return id
    },
    async load(id) {
      if (id.startsWith(SOURCE_PREFIX)) {
        const glob = id.slice(SOURCE_PREFIX.length)
        const content = await fs.readdir(glob, 'utf-8')
        return `export const content = ${JSON.stringify(content)}`
      }
    },
  }
}

export default SourcePlugin
