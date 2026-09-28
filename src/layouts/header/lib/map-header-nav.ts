import { mapPathnameForLocale, type LocaleCode } from '@/i18n/locale-paths'
import type { IHeaderNavigation, IHeaderParentLinkItem } from '@/interfaces/header.interface'
import type { ILink } from '@/interfaces/link.interface'
import { decodeHtmlEntities } from '@/lib/decode-html-entities'
import { resolveFieldSlug, type FieldRef } from '@/modules/fields/lib/resolve-field-slug'

export type HeaderNavLink = {
  label: string
  href: string
  target?: string
}

export type HeaderMegaPanel = {
  eyebrow: string
  description: string
  linksTitle: string
  links: HeaderNavLink[]
}

export type HeaderNavItem = {
  id: string
  label: string
  href: string
  target?: string
  mega?: HeaderMegaPanel
}

function linkTarget(target?: string | null): string | undefined {
  const value = target?.trim()
  return value || undefined
}

function navId(url: string, index: number): string {
  const slug = url.replace(/^\/+|\/+$/g, '') || 'home'
  return `${slug}-${index}`
}

function isLink(value: unknown): value is ILink {
  return Boolean(value && typeof value === 'object' && 'title' in value && 'url' in value)
}

/** Normalize CMS url → last path segment (menucon). */
function extractSlug(url: string): string {
  const raw = url?.trim()
  if (!raw || raw === '#') return ''

  let pathname = raw
  if (/^https?:\/\//i.test(raw)) {
    try {
      pathname = new URL(raw).pathname
    } catch {
      return ''
    }
  }

  const segments = pathname
    .replace(/^\/+|\/+$/g, '')
    .split('/')
    .filter(Boolean)
  return segments.at(-1) ?? ''
}

/** Build /menucha/menucon from parent href + child CMS url. */
export function joinParentChildHref(parentHref: string, childUrl: string): string {
  const parent = `/${parentHref.replace(/^\/+|\/+$/g, '')}`.replace(/\/$/, '') || '/'
  const slug = extractSlug(childUrl)

  if (!slug) return parent === '/' ? '/' : parent
  if (parent === '/') return `/${slug}`

  return `${parent}/${slug}`
}

function localizeHref(href: string, locale: LocaleCode): string {
  if (!href || href === '/' || href.startsWith('#') || /^https?:\/\//i.test(href)) {
    return href || '/'
  }

  const path = href.startsWith('/') ? href : `/${href}`
  return mapPathnameForLocale(path, locale)
}

function isFieldsParent(href: string) {
  const path = href.split('?')[0].replace(/\/$/, '')
  return path === '/linh-vuc' || path === '/fields'
}

function mapChildLinks(
  parentHref: string,
  link: IHeaderParentLinkItem[] | false | null | undefined,
  fields: FieldRef[],
): HeaderNavLink[] {
  if (!Array.isArray(link)) return []

  const links: HeaderNavLink[] = []
  const resolveFields = isFieldsParent(parentHref)

  for (const entry of link) {
    if (!isLink(entry?.item)) continue
    const label = decodeHtmlEntities(entry.item.title)
    const childUrl = resolveFields
      ? `/${resolveFieldSlug(label, entry.item.url || '', fields) || extractSlug(entry.item.url || '')}`
      : entry.item.url || ''
    links.push({
      label,
      href: joinParentChildHref(parentHref, childUrl),
      target: linkTarget(entry.item.target),
    })
  }

  return links
}

function mapNormalItem(link: ILink, index: number, locale: LocaleCode): HeaderNavItem {
  return {
    id: navId(link.url, index),
    label: decodeHtmlEntities(link.title),
    href: localizeHref(link.url || '/', locale),
    target: linkTarget(link.target),
  }
}

function mapParentItem(
  linkTitle: ILink,
  parent: NonNullable<IHeaderNavigation['parent']>,
  index: number,
  locale: LocaleCode,
  fields: FieldRef[],
): HeaderNavItem {
  const href = localizeHref(linkTitle.url || '/', locale)

  return {
    id: navId(linkTitle.url, index),
    label: decodeHtmlEntities(linkTitle.title),
    href,
    target: linkTarget(linkTitle.target),
    mega: {
      eyebrow: decodeHtmlEntities(parent.desc?.title),
      description: decodeHtmlEntities(parent.desc?.desc),
      linksTitle: decodeHtmlEntities(linkTitle.title),
      links: mapChildLinks(href, parent.link, fields),
    },
  }
}

/**
 * Maps CMS header navigations → UI nav items.
 * - `select: "parent"` => mega menu (child links = /menucha/menucon)
 * - `select: "normal"` => plain link
 */
export function mapHeaderNavigations(
  navigations: IHeaderNavigation[] | null | undefined,
  locale: LocaleCode = 'vi',
  fields: FieldRef[] = [],
): HeaderNavItem[] {
  if (!Array.isArray(navigations)) return []

  const items: HeaderNavItem[] = []

  navigations.forEach((nav, index) => {
    if (nav.select === 'parent') {
      const parent = nav.parent
      const linkTitle = parent?.link_title

      if (isLink(linkTitle)) {
        items.push(mapParentItem(linkTitle, parent, index, locale, fields))
      }
      return
    }

    if (nav.select === 'normal' && isLink(nav.normal)) {
      items.push(mapNormalItem(nav.normal, index, locale))
    }
  })

  return items
}
