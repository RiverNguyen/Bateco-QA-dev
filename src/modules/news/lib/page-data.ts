import type { ArticleCardItem } from '@/components/shared/article-card'
import type { INewsBanner, INewsItem } from '@/interfaces/news.interface'

export const NEWS_HERO_HEIGHT =
  'min-h-[calc(80dvh-var(--header-height))] tablet:min-h-[calc(48dvh-var(--header-height))]'

const FALLBACK_IMAGE = '/images/about/banner.jpg'

export const NEWS_PAGE_DATA = {
  banner: {
    subtitle: 'Thông tin & sự kiện',
    title: 'Tin tức',
    desc: 'Cập nhật hoạt động, dự án và năng lực triển khai của BATECO Quốc An trong lĩnh vực An ninh – Quốc phòng.',
    image: FALLBACK_IMAGE,
  } satisfies INewsBanner,
  listing: {
    subtitle: 'Bản tin',
    title: 'Mới nhất từ BATECO',
    desc: 'Theo dõi các sự kiện nổi bật, thông cáo và dấu mốc triển khai giải pháp công nghệ cao.',
  },
}

export function getNewsHref(slug: string) {
  return `/tin-tuc/${slug}`
}

export function mapNewsToCard(item: INewsItem, categoryFallback = 'News'): ArticleCardItem {
  return {
    id: String(item.id),
    title: item.title,
    excerpt: item.post_excerpt || '',
    href: getNewsHref(item.slug),
    image: item.thumbnail?.url || FALLBACK_IMAGE,
    date: item.published || '',
    category: item.taxonomies?.categories_post?.[0]?.name || categoryFallback,
  }
}

export function mapNewsListToCards(
  items: INewsItem[] = [],
  categoryFallback = 'News',
): ArticleCardItem[] {
  return items.map((item) => mapNewsToCard(item, categoryFallback))
}
