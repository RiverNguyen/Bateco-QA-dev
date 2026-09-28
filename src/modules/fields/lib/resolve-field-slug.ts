export type FieldRef = {
  slug: string
  title: string
}

export function slugFromPath(url?: string) {
  if (!url) return ''
  const path = url.startsWith('http') ? new URL(url).pathname : url
  return decodeURIComponent(path.split('?')[0].split('/').filter(Boolean).pop() ?? '')
}

function normalizeTitle(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/gi, 'd')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '')
}

/** Prefer a published field slug. Fall back to the CMS path, then the matching title. */
export function resolveFieldSlug(title: string, url: string | undefined, fields: FieldRef[]) {
  const fromLink = slugFromPath(url)
  if (fromLink && fields.some((field) => field.slug === fromLink)) return fromLink

  const normalized = normalizeTitle(title)
  const matched = normalized
    ? fields.find((field) => normalizeTitle(field.title) === normalized)
    : undefined

  return matched?.slug || fromLink
}

const FIELD_HREF = /^(.*\/(?:linh-vuc|fields))\/([^/?#]+)\/?$/

/** Rewrite /linh-vuc/<slug> when the CMS slug does not match a published field. */
export function rewriteFieldHref(href: string, title: string, fields: FieldRef[]) {
  const match = href.split('?')[0].match(FIELD_HREF)
  if (!match) return href

  const slug = resolveFieldSlug(title, match[2], fields)
  if (!slug || slug === match[2]) return href
  return `${match[1]}/${slug}`
}
