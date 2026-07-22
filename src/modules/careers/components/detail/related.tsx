import { getTranslations } from 'next-intl/server'

import { Reveal } from '@/components/shared/reveal'
import type { LocaleCode } from '@/i18n/locale-paths'
import type { ICareersItem } from '@/interfaces/careers.interface'
import Container from '@/layouts/container'
import { JobCard } from '@/modules/careers/components/listing/job-card'

type CareerRelatedProps = {
  jobs: ICareersItem[]
  locale: LocaleCode
}

export async function CareerRelated({ jobs, locale }: CareerRelatedProps) {
  if (!jobs.length) return null

  const t = await getTranslations('Careers')

  return (
    <section
      className='border-t border-brand-ink/8 bg-[#f7f8f7] text-brand-ink'
      aria-labelledby='career-related-heading'
    >
      <Container className='px-4 py-[4.5rem] xsm:pb-[6.5rem] xsm:pt-[3rem]'>
        <Reveal y={18}>
          <p className='text-[0.68rem] uppercase tracking-[0.24em] text-brand-moss'>
            {t('relatedEyebrow')}
          </p>
          <h2
            id='career-related-heading'
            className='mt-[0.85rem] font-display text-[2.35rem] font-semibold uppercase tracking-wide text-brand-ink xsm:text-[1.65rem]'
          >
            {t('relatedTitle')}
          </h2>
          <span
            aria-hidden
            className='mt-[1.1rem] block h-[0.12rem] w-[2.75rem] bg-brand-moss'
          />
        </Reveal>

        <ul className='mt-[2.25rem] grid grid-cols-3 gap-[0.75rem] tablet:grid-cols-2 xsm:grid-cols-1'>
          {jobs.map((job, index) => (
            <JobCard
              key={job.id}
              job={job}
              index={index}
              locale={locale}
            />
          ))}
        </ul>
      </Container>
    </section>
  )
}
