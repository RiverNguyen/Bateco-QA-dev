/* eslint-disable indent */
import type { IFooter } from '@/interfaces/footer.interface'
import type { FooterColumn, FooterContact } from '@/layouts/footer/lib/types'
import { decodeHtmlEntities } from '@/lib/decode-html-entities'
import { rewriteFieldHref, type FieldRef } from '@/modules/fields/lib/resolve-field-slug'

export function mapTarget(target: string): string | undefined {
  const value = target?.trim()
  return value || undefined
}

export function mapFooterColumns(data?: IFooter | null, fields: FieldRef[] = []): FooterColumn[] {
  if (!Array.isArray(data?.menu)) return []

  return data.menu.map((section) => ({
    title: decodeHtmlEntities(section.title),
    links: Array.isArray(section.link_array)
      ? section.link_array.map(({ link }) => {
          const label = decodeHtmlEntities(link.title)
          return {
            label,
            href: rewriteFieldHref(link.url || '/', label, fields),
            target: mapTarget(link.target),
          }
        })
      : [],
  }))
}

export function mapFooterContacts(data?: IFooter | null): FooterContact[] {
  if (!Array.isArray(data?.contact)) return []

  return data.contact.map((item) => ({
    title: decodeHtmlEntities(item.title),
    label: decodeHtmlEntities(item.link.title),
    href: item.link.url || '/',
    target: mapTarget(item.link.target),
  }))
}
