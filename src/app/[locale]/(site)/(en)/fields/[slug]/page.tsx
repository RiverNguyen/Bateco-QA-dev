import { notFound } from 'next/navigation'
import { getTranslations, setRequestLocale } from 'next-intl/server'

import type { LocaleCode } from '@/i18n/locale-paths'
import FieldDetailModule from '@/modules/fields/components/detail'
import {
  getFieldSlugs,
  mapApiFieldDetailToItem,
  mapApiFieldsToItems,
} from '@/modules/fields/lib/page-data'
import fieldService from '@/services/field'

export async function generateStaticParams() {
  const fields = await fieldService.getData('en')
  return getFieldSlugs(mapApiFieldsToItems(fields?.data)).map((slug) => ({ slug }))
}

const FieldDetailPage = async ({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) => {
  const { locale, slug } = await params
  if (locale !== 'en') notFound()

  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'Fields' })

  const [detailRes, listRes] = await Promise.all([
    fieldService.getDetail(locale, slug),
    fieldService.getData(locale),
  ])

  if (!detailRes?.data) notFound()

  const allFields = mapApiFieldsToItems(listRes?.data ?? [])
  const index = allFields.findIndex((item) => item.id === slug)
  const field = mapApiFieldDetailToItem(detailRes.data, Math.max(index, 0), t('sectionFallback'))
  const related = allFields.filter((item) => item.id !== slug).slice(0, 3)

  return (
    <FieldDetailModule
      field={field}
      related={related}
      index={Math.max(index, 0)}
      locale={locale as LocaleCode}
    />
  )
}

export default FieldDetailPage
