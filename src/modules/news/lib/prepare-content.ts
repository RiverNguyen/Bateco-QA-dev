import he from 'he'

export type NewsTocItem = {
  id: string
  text: string
  level: 2 | 3
}

function stripHtml(html: string) {
  return he
    .decode(html.replace(/<br\s*\/?>/gi, ' ').replace(/<[^>]+>/g, ' '))
    .replace(/\s+/g, ' ')
    .trim()
}

function slugifyHeading(text: string, index: number) {
  const base = text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/đ/g, 'd')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

  return base ? `muc-${base}` : `muc-${index + 1}`
}

/** Gắn id vào h2/h3 và trả về mục lục */
export function preparePostContent(html?: string): {
  html: string
  toc: NewsTocItem[]
} {
  if (!html?.trim()) return { html: '', toc: [] }

  const toc: NewsTocItem[] = []
  let counter = 0

  const headingPattern = /<h([23])([^>]*)>([\s\S]*?)<\/h\1>/gi
  const nextHtml = html.replace(headingPattern, (full, level, attrs, inner) => {
    const text = stripHtml(inner)
    if (!text) return full

    const idMatch = attrs.match(/\sid=["']([^"']+)["']/i)
    const id = idMatch?.[1] || slugifyHeading(text, counter)
    counter += 1

    toc.push({
      id,
      text,
      level: Number(level) as 2 | 3,
    })

    if (idMatch) return full
    return `<h${level}${attrs} id="${id}">${inner}</h${level}>`
  })

  return { html: nextHtml, toc }
}
