import { mapPathnameForLocale, type LocaleCode } from '@/i18n/locale-paths'
import type { IHeaderNavigation, IHeaderParentLinkItem } from '@/interfaces/header.interface'
import type { ILink } from '@/interfaces/link.interface'
import { decodeHtmlEntities } from '@/lib/decode-html-entities'

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

function mapChildLinks(
  parentHref: string,
  link: IHeaderParentLinkItem[] | false | null | undefined,
): HeaderNavLink[] {
  if (!Array.isArray(link)) return []

  const links: HeaderNavLink[] = []

  for (const entry of link) {
    if (!isLink(entry?.item)) continue
    links.push({
      label: decodeHtmlEntities(entry.item.title),
      href: joinParentChildHref(parentHref, entry.item.url || ''),
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
      links: mapChildLinks(href, parent.link),
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
): HeaderNavItem[] {
  if (!Array.isArray(navigations)) return []

  const items: HeaderNavItem[] = []

  navigations.forEach((nav, index) => {
    if (nav.select === 'parent') {
      const parent = nav.parent
      const linkTitle = parent?.link_title

      if (isLink(linkTitle)) {
        items.push(mapParentItem(linkTitle, parent, index, locale))
      }
      return
    }

    if (nav.select === 'normal' && isLink(nav.normal)) {
      items.push(mapNormalItem(nav.normal, index, locale))
    }
  })

  return items
}
