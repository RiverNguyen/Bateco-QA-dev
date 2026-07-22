import { getLocalePath, type LocaleCode } from '@/i18n/locale-paths'
import type { IFieldResponse, IFieldsDetail, IFieldsItem } from '@/interfaces/fields.interface'
import { FIELDS_CONTENT } from '@/modules/fields/lib/field-content'
import { parseFieldContent } from '@/modules/fields/lib/parse-field-content'

export const FIELDS_HERO_HEIGHT =
  'min-h-[calc(100dvh-var(--header-height))] tablet:min-h-[calc(70dvh-var(--header-height))]'

const FALLBACK_IMAGE = '/images/about/banner.jpg'

/** Copy chi tiết theo hồ sơ BQA Profile 2026 — ảnh ưu tiên lấy từ homepage ACF */
export const FIELDS_PAGE_DATA = {
  banner: {
    subtitle: 'Năng lực chuyên sâu',
    title: 'Lĩnh vực hoạt động',
    desc: 'Sáu lĩnh vực công nghệ cao và vật tư An ninh – Quốc phòng, đồng bộ từ nghiên cứu, cung ứng đến triển khai thực địa.',
    image: FALLBACK_IMAGE,
    button_1: {
      title: 'Khám phá lĩnh vực',
      url: '#fields-overview',
      target: '',
    },
    button_2: {
      title: 'Liên hệ hợp tác',
      url: '/lien-he',
      target: '',
    },
  },
  overview: {
    subtitle: 'Khả năng triển khai',
    title: 'Sáu trụ cột năng lực',
    desc: 'Từ dẫn đường quán tính, thông tin liên lạc đến sonar, quang điện tử, tác chiến điện tử và vật tư ANQP — BATECO Quốc An cung cấp giải pháp và sản phẩm với mạng lưới đối tác hàng đầu thế giới.',
  },
}

export function getFieldHref(slug: string, locale: LocaleCode = 'vi') {
  return getLocalePath('fields', locale, slug)
}

export function mapApiFieldsToItems(fields: IFieldResponse[] = []): IFieldsItem[] {
  return fields.map((field, index) => {
    const content = FIELDS_CONTENT[field.slug]

    return {
      id: field.slug,
      index: String(index + 1).padStart(2, '0'),
      title: field.title,
      summary: field.post_excerpt || field.subtitle || content?.summary || field.description,
      desc: field.description || content?.desc || field.post_excerpt,
      image: field.thumbnail?.url || FALLBACK_IMAGE,
      highlights: content?.highlights,
      sections: content?.sections,
      closing: content?.closing,
    }
  })
}

export function mapApiFieldDetailToItem(
  detail: IFieldsDetail,
  index = 0,
  sectionFallback?: string,
): IFieldsItem {
  const fallback = FIELDS_CONTENT[detail.slug]
  const parsedSections = parseFieldContent(detail.content, sectionFallback)

  return {
    id: detail.slug,
    index: String(index + 1).padStart(2, '0'),
    title: detail.title,
    summary: detail.post_excerpt || fallback?.summary || '',
    desc: detail.post_excerpt || fallback?.desc || '',
    image: detail.thumbnail?.url || FALLBACK_IMAGE,
    highlights: fallback?.highlights,
    sections: parsedSections.length ? parsedSections : fallback?.sections,
    closing: fallback?.closing,
    htmlContent: parsedSections.length ? undefined : detail.content || undefined,
  }
}

export function getFieldBySlug(slug: string, fields: IFieldsItem[]) {
  return fields.find((field) => field.id === slug) ?? null
}

export function getFieldSlugs(fields: IFieldsItem[]) {
  return fields.map((field) => field.id)
}
