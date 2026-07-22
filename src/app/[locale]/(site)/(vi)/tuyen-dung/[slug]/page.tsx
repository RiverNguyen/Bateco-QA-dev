import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getTranslations, setRequestLocale } from 'next-intl/server'

import type { LocaleCode } from '@/i18n/locale-paths'
import type { ICareersDetail, ICareersItem } from '@/interfaces/careers.interface'
import CareersDetailModule from '@/modules/careers/components/detail'
import careersService from '@/services/careers'

export async function generateStaticParams() {
  const list = await careersService.getCareersData({
    limit: 50,
    paged: 1,
    lang: 'vi',
    orderby: 'date',
    order: 'DESC',
  })
  const jobs: ICareersItem[] = list?.data ?? []
  return jobs.map((job) => ({ slug: job.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params
  const t = await getTranslations({ locale, namespace: 'Metadata' })
  const detailRes = await careersService.getDetail(slug, locale)
  const job = detailRes?.data as ICareersDetail | undefined

  if (!job?.slug) {
    return { title: t('careersFallback') }
  }

  return {
    title: `${job.title} | ${t('careersFallback')}`,
    description: job.post_excerpt || job.title,
  }
}

export default async function CareerDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params

  if (locale !== 'vi') notFound()

  setRequestLocale(locale)

  const detailRes = await careersService.getDetail(slug, locale)
  const job = detailRes?.data as ICareersDetail | undefined

  if (!job?.slug) notFound()

  const categorySlug = job.taxonomies?.careers_tax?.[0]?.slug
  const relatedRes = await careersService.getCareersData({
    limit: 6,
    paged: 1,
    lang: locale,
    orderby: 'date',
    order: 'DESC',
    ...(categorySlug ? { tax: 'careers_tax' as const, categoryCareers: categorySlug } : {}),
  })

  const related = ((relatedRes?.data ?? []) as ICareersItem[])
    .filter((item) => item.slug !== slug)
    .slice(0, 3)

  return (
    <CareersDetailModule
      job={job}
      related={related}
      locale={locale as LocaleCode}
    />
  )
}
