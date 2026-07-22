/** Localized public path segments (without locale prefix). */
export const LOCALE_PATHS = {
  about: { vi: '/gioi-thieu', en: '/about' },
  contact: { vi: '/lien-he', en: '/contact' },
  fields: { vi: '/linh-vuc', en: '/fields' },
  news: { vi: '/tin-tuc', en: '/news' },
  careers: { vi: '/tuyen-dung', en: '/careers' },
} as const

export type LocaleCode = 'vi' | 'en'
export type RouteKey = keyof typeof LOCALE_PATHS

const DYNAMIC_SEGMENTS: RouteKey[] = ['fields', 'news', 'careers']

/** Map a pathname from one locale's slug scheme to another's. */
export function mapPathnameForLocale(pathname: string, targetLocale: LocaleCode): string {
  const normalized = pathname.startsWith('/') ? pathname : `/${pathname}`

  for (const key of Object.keys(LOCALE_PATHS) as RouteKey[]) {
    const sourceLocales: LocaleCode[] = targetLocale === 'vi' ? ['en'] : ['vi']
    for (const source of sourceLocales) {
      const from = LOCALE_PATHS[key][source]
      const to = LOCALE_PATHS[key][targetLocale]

      if (normalized === from) return to

      if (DYNAMIC_SEGMENTS.includes(key) && normalized.startsWith(`${from}/`)) {
        const rest = normalized.slice(from.length)
        return `${to}${rest}`
      }
    }
  }

  return normalized
}

export function getLocalePath(key: RouteKey, locale: LocaleCode, slug?: string): string {
  const base = LOCALE_PATHS[key][locale]
  return slug ? `${base}/${slug}` : base
}
