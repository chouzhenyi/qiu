import { fileURLToPath, URL } from 'node:url'

type pageType = {
  chunk: string
  chunkName: string
  chunkUrl?: string
}

export const multiPages = [
  {
    chunk: 'main',
    chunkName: '主应用'
  },
  {
    chunk: 'external',
    chunkName: '外接独立页面'
  }
]
export const getEntryPath = (p: pageType[]): pageType[] => {
  return p.map((item) => {
    return {
      ...item,
      chunkUrl: fileURLToPath(new URL(`./${item.chunk}.html`, import.meta.url))
    }
  })
}
