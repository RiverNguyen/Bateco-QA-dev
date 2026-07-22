import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'

import { getCareersPageCount, type ICareersTaxonomy } from '@/interfaces/careers.interface'
import CareersModule from '@/modules/careers'
import { careersSearchParamsCache } from '@/modules/careers/lib/search-params'
import careersService from '@/services/careers'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Metadata')

  return {
    title: t('careersTitle'),
    description: t('careersDescription'),
  }
}

const CAREERS_PAGE_SIZE = 6

export default async function CareersPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const { locale } = await params
  if (locale !== 'en') notFound()

  const {
    category: requestedCategory,
    page,
    q,
  } = await careersSearchParamsCache.parse(searchParams)

  const searchQuery = q?.trim() || undefined

  const taxonomiesResponse = await careersService.getTaxonomies(locale)
  const taxonomies: ICareersTaxonomy[] = taxonomiesResponse?.data ?? []

  const activeCategory = taxonomies.some((item) => item.slug === requestedCategory)
    ? (requestedCategory ?? undefined)
    : undefined

  const careersData = await careersService.getCareersData({
    limit: CAREERS_PAGE_SIZE,
    paged: page,
    lang: locale,
    orderby: 'date',
    order: 'DESC',
    ...(activeCategory ? { tax: 'careers_tax' as const, categoryCareers: activeCategory } : {}),
    ...(searchQuery ? { search: searchQuery } : {}),
  })

  return (
    <CareersModule
      data={careersData?.data ?? []}
      taxonomies={taxonomies}
      pageCount={getCareersPageCount(careersData, { limit: CAREERS_PAGE_SIZE })}
      searchQuery={searchQuery}
    />
  )
}
