import { getTranslations } from 'next-intl/server'

import type { INewsItem, INewsPage, INewsTaxonomy } from '@/interfaces/news.interface'
import PartnerCta from '@/modules/about/components/partner-cta'
import ImportantEvents from '@/modules/home/important-events'
import NewsBanner from '@/modules/news/components/banner'
import NewsListing from '@/modules/news/components/listing'
import { mapNewsListToCards } from '@/modules/news/lib/page-data'

type NewsModuleProps = {
  acfData: INewsPage
  news?: INewsItem[]
  list?: INewsItem[]
  taxonomies?: INewsTaxonomy[]
  pageCount?: number
  searchQuery?: string
}

const NewsModule = async ({
  acfData,
  news = [],
  list = [],
  taxonomies = [],
  pageCount = 1,
  searchQuery,
}: NewsModuleProps) => {
  const t = await getTranslations('News')
  const articles = mapNewsListToCards(list, t('categoryFallback'))

  return (
    <>
      <NewsBanner data={acfData?.banner} />
      <ImportantEvents
        data={news}
        hideViewAll
        title={t('featuredTitle')}
        tone='light'
      />
      <NewsListing
        subtitle={t('listing.subtitle')}
        title={t('listing.title')}
        desc={t('listing.desc')}
        articles={articles}
        taxonomies={taxonomies}
        pageCount={pageCount}
        searchQuery={searchQuery}
      />
      <PartnerCta />
    </>
  )
}

export default NewsModule
