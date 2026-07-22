import he from 'he'

import type { IFieldsSection } from '@/interfaces/fields.interface'

function stripHtml(html: string) {
  return he
    .decode(html.replace(/<br\s*\/?>/gi, '\n').replace(/<[^>]+>/g, ' '))
    .replace(/\s+/g, ' ')
    .trim()
}

export function parseFieldContent(html?: string, sectionFallback = 'Chi tiết'): IFieldsSection[] {
  if (!html?.trim()) return []

  const sections: IFieldsSection[] = []
  const headingRegex = /<h([23])[^>]*>([\s\S]*?)<\/h\1>/gi
  const headings = [...html.matchAll(headingRegex)]

  if (headings.length === 0) {
    const paragraphs = [...html.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)]
      .map((match) => stripHtml(match[1]))
      .filter(Boolean)

    return paragraphs.length ? [{ title: sectionFallback, paragraphs }] : []
  }

  for (let i = 0; i < headings.length; i += 1) {
    const title = stripHtml(headings[i][2])
    const start = (headings[i].index ?? 0) + headings[i][0].length
    const end = i + 1 < headings.length ? (headings[i + 1].index ?? html.length) : html.length
    const block = html.slice(start, end)
    const paragraphs = [...block.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)]
      .map((match) => stripHtml(match[1]))
      .filter(Boolean)

    if (title && paragraphs.length) {
      sections.push({ title, paragraphs })
    }
  }

  return sections
}
