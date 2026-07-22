import { decode } from 'he'

/** Decodes HTML entities from CMS/API strings (e.g. &amp; → &). */
export function decodeHtmlEntities(text: string | undefined | null): string {
  if (text == null) return ''
  const s = String(text)
  return s === '' ? '' : decode(s)
}
