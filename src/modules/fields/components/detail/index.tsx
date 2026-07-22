import { getTranslations } from 'next-intl/server'

import { Reveal } from '@/components/shared/reveal'
import type { LocaleCode } from '@/i18n/locale-paths'
import type { IFieldsItem } from '@/interfaces/fields.interface'
import Container from '@/layouts/container'
import PartnerCta from '@/modules/about/components/partner-cta'
import { FieldDetail } from '@/modules/fields/components/field-detail'
import { FieldDetailContent } from '@/modules/fields/components/field-detail-content'
import { OverviewCard } from '@/modules/fields/components/overview/overview-card'

type FieldDetailModuleProps = {
  field: IFieldsItem
  related: IFieldsItem[]
  index: number
  locale: LocaleCode
}

export default async function FieldDetailModule({
  field,
  related,
  index,
  locale,
}: FieldDetailModuleProps) {
  const t = await getTranslations({ locale, namespace: 'Fields' })

  return (
    <>
      <FieldDetail
        field={field}
        index={index}
      />

      <FieldDetailContent
        field={field}
        locale={locale}
      />

      {related.length > 0 ? (
        <section
          className='border-t border-white/[0.06] bg-brand-ink text-white'
          aria-labelledby='related-fields-heading'
        >
          <Container className='px-4 py-[4rem] xsm:py-[2.75rem]'>
            <Reveal y={18}>
              <p className='text-[0.68rem] uppercase tracking-[0.22em] text-brand-moss'>
                {t('relatedEyebrow')}
              </p>
              <h2
                id='related-fields-heading'
                className='mt-2 font-display text-[2rem] font-semibold uppercase tracking-wide xsm:text-[1.45rem]'
              >
                {t('relatedTitle')}
              </h2>
            </Reveal>

            <div className='mt-[1.75rem] grid grid-cols-3 gap-[0.5rem] xsm:mt-[1.25rem] xsm:grid-cols-1'>
              {related.map((item, relatedIndex) => (
                <OverviewCard
                  key={item.id}
                  field={item}
                  index={relatedIndex}
                />
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      <PartnerCta locale={locale} />
    </>
  )
}
