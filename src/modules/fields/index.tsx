import { getLocale, getTranslations } from 'next-intl/server'

import { getLocalePath, type LocaleCode } from '@/i18n/locale-paths'
import type { IFieldResponse } from '@/interfaces/fields.interface'
import PartnerCta from '@/modules/about/components/partner-cta'
import FieldsBanner from '@/modules/fields/components/banner'
import FieldsOverview from '@/modules/fields/components/overview'
import { FIELDS_PAGE_DATA, mapApiFieldsToItems } from '@/modules/fields/lib/page-data'

const FieldsModule = async ({ fields }: { fields?: IFieldResponse[] }) => {
  const locale = (await getLocale()) as LocaleCode
  const t = await getTranslations('Fields')
  const items = mapApiFieldsToItems(fields)
  const banner = {
    subtitle: t('banner.subtitle'),
    title: t('banner.title'),
    desc: t('banner.desc'),
    image: fields?.[0]?.thumbnail?.url || FIELDS_PAGE_DATA.banner.image,
    button_1: {
      title: t('banner.explore'),
      url: FIELDS_PAGE_DATA.banner.button_1.url,
      target: FIELDS_PAGE_DATA.banner.button_1.target,
    },
    button_2: {
      title: t('banner.contact'),
      url: getLocalePath('contact', locale),
      target: FIELDS_PAGE_DATA.banner.button_2.target,
    },
  }

  return (
    <>
      <FieldsBanner data={banner} />
      <FieldsOverview
        subtitle={t('overview.subtitle')}
        title={t('overview.title')}
        desc={t('overview.desc')}
        fields={items}
      />
      <PartnerCta />
    </>
  )
}

export default FieldsModule
