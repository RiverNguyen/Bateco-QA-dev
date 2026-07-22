import { getTranslations } from 'next-intl/server'

import type { ICareersItem, ICareersTaxonomy } from '@/interfaces/careers.interface'
import PartnerCta from '@/modules/about/components/partner-cta'
import CareersBanner from '@/modules/careers/components/banner'
import CareersListing from '@/modules/careers/components/listing'
import { CAREERS_PAGE_DATA } from '@/modules/careers/lib/careers-data'

export default async function CareersModule({
  data,
  taxonomies,
  pageCount = 1,
  searchQuery,
}: {
  data: ICareersItem[]
  taxonomies: ICareersTaxonomy[]
  pageCount?: number
  searchQuery?: string
}) {
  const t = await getTranslations('Careers.banner')

  return (
    <>
      <CareersBanner
        data={{
          badge: t('badge'),
          title: t('title'),
          desc: t('desc'),
          image: CAREERS_PAGE_DATA.banner.image,
        }}
      />
      <CareersListing
        data={data}
        taxonomies={taxonomies}
        pageCount={pageCount}
        searchQuery={searchQuery}
      />
      <PartnerCta />
    </>
  )
}
