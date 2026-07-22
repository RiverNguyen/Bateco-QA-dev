import { notFound } from 'next/navigation'

import { getNewsPageCount } from '@/interfaces/news.interface'
import NewsModule from '@/modules/news'
import { newsSearchParamsCache } from '@/modules/news/lib/search-params'
import newsService from '@/services/news'

const NEWS_PAGE_SIZE = 6

const NewsPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) => {
  const { locale } = await params
  if (locale !== 'vi') notFound()

  const { category: requestedCategory, page, q } = await newsSearchParamsCache.parse(searchParams)

  const searchQuery = q?.trim() || undefined

  const [acfData, response, taxonomiesResponse] = await Promise.all([
    newsService.getAcfData(locale),
    newsService.getData(locale),
    newsService.getTaxonomies(locale),
  ])

  const taxonomies = taxonomiesResponse?.data ?? []
  const activeCategory = taxonomies.some(
    (item: { slug: string }) => item.slug === requestedCategory,
  )
    ? (requestedCategory ?? undefined)
    : undefined

  const listResponse = await newsService.getPostData({
    limit: NEWS_PAGE_SIZE,
    paged: page,
    lang: locale,
    orderby: 'date',
    order: 'DESC',
    ...(activeCategory ? { tax: 'categories_post' as const, categoryPost: activeCategory } : {}),
    ...(searchQuery ? { search: searchQuery } : {}),
  })

  return (
    <NewsModule
      acfData={acfData?.acf}
      news={response?.data}
      list={listResponse?.data}
      taxonomies={taxonomies}
      pageCount={getNewsPageCount(listResponse, { limit: NEWS_PAGE_SIZE })}
      searchQuery={searchQuery}
    />
  )
}

export default NewsPage
