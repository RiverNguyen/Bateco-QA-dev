import { notFound } from 'next/navigation'
import { getTranslations, setRequestLocale } from 'next-intl/server'

import type { LocaleCode } from '@/i18n/locale-paths'
import type { INewsItem, IPostDetail } from '@/interfaces/news.interface'
import NewsDetailModule from '@/modules/news/components/detail'
import { mapNewsListToCards } from '@/modules/news/lib/page-data'
import newsService from '@/services/news'

export async function generateStaticParams() {
  const list = await newsService.getData('vi', 50)
  const posts: INewsItem[] = list?.data ?? []
  return posts.map((post) => ({ slug: post.slug }))
}

const NewsDetailPage = async ({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) => {
  const { locale, slug } = await params
  if (locale !== 'vi') notFound()

  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'News' })

  const detailRes = await newsService.getDetail(slug, locale)
  const post = detailRes?.data as IPostDetail | undefined

  if (!post?.slug) notFound()

  const categorySlug = post.taxonomies?.categories_post?.[0]?.slug
  const relatedRes = await newsService.getPostData({
    limit: 9,
    paged: 1,
    lang: locale,
    orderby: 'date',
    order: 'DESC',
    ...(categorySlug ? { tax: 'categories_post' as const, categoryPost: categorySlug } : {}),
  })

  const related = mapNewsListToCards(
    (relatedRes?.data ?? []).filter((item: INewsItem) => item.slug !== slug).slice(0, 8),
    t('categoryFallback'),
  )

  return (
    <NewsDetailModule
      post={post}
      related={related}
      locale={locale as LocaleCode}
    />
  )
}

export default NewsDetailPage
