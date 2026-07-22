import { getTranslations } from 'next-intl/server'

import { Reveal } from '@/components/shared/reveal'
import type { ICareersItem, ICareersTaxonomy } from '@/interfaces/careers.interface'
import Container from '@/layouts/container'
import { cn } from '@/lib/utils'
import { CareersFilterTabs } from '@/modules/careers/components/filter-tabs'
import { JobCard } from '@/modules/careers/components/listing/job-card'
import { CareersPagination } from '@/modules/careers/components/pagination'
import { CareersSearch } from '@/modules/careers/components/search'

type CareersListingProps = {
  data: ICareersItem[]
  taxonomies?: ICareersTaxonomy[]
  pageCount?: number
  searchQuery?: string
}

export default async function CareersListing({
  data,
  taxonomies = [],
  pageCount = 1,
  searchQuery,
}: CareersListingProps) {
  const t = await getTranslations('Careers')
  const tCommon = await getTranslations('Common')
  const jobs = Array.isArray(data) ? data : []

  return (
    <section
      id='careers-listing'
      className='relative scroll-mt-[calc(var(--header-height)+1rem)] overflow-hidden border-t border-brand-ink/8 bg-white text-brand-ink'
      aria-labelledby='careers-listing-heading'
    >
      <div
        aria-hidden
        className='pointer-events-none absolute inset-x-0 top-0 h-[18rem]'
        style={{
          background:
            'radial-gradient(ellipse 45% 55% at 100% 0%, color-mix(in srgb, var(--brand-moss) 8%, transparent), transparent 70%)',
        }}
      />

      <Container className='relative px-4 py-[5rem] xsm:py-[3rem]'>
        <div
          className={cn(
            'mb-[1.25rem] grid grid-cols-[minmax(0,1fr)_minmax(0,24rem)] items-end gap-x-[3rem]',
            'xsm:mb-[1rem] xsm:grid-cols-1 xsm:gap-y-[1rem]',
          )}
        >
          <Reveal y={22}>
            <p className='text-[0.68rem] uppercase tracking-[0.24em] text-brand-moss'>
              {t('listingEyebrow')}
            </p>
            <h2
              id='careers-listing-heading'
              className='mt-[0.85rem] max-w-[28rem] font-display text-[2.85rem] font-semibold uppercase leading-[0.98] tracking-wide text-brand-ink xsm:text-[1.75rem]'
            >
              {t('listingTitle')}
            </h2>
            <span
              aria-hidden
              className='mt-[1.1rem] block h-[0.12rem] w-[2.75rem] bg-brand-moss'
            />
          </Reveal>

          <Reveal
            delay={0.08}
            y={18}
          >
            <p className='font-sans text-[0.95rem] leading-[1.75] text-brand-ink/60'>
              {t('listingDescription')}
            </p>
          </Reveal>
        </div>

        <div
          className={cn(
            'mt-[1.75rem] flex items-start justify-between gap-4',
            'xsm:mt-[1.35rem] xsm:flex-col-reverse xsm:items-stretch xsm:gap-3',
          )}
        >
          <CareersFilterTabs taxonomies={taxonomies} />
          <Reveal
            delay={0.08}
            y={14}
            className='shrink-0 xsm:w-full'
          >
            <CareersSearch />
          </Reveal>
        </div>

        {searchQuery ? (
          <p className='mt-4 font-sans text-[0.85rem] text-brand-ink/45'>
            {tCommon('resultsFor', { query: searchQuery })}
          </p>
        ) : null}

        {jobs.length > 0 ? (
          <ul className='mt-[2rem] grid grid-cols-3 gap-[0.75rem] tablet:grid-cols-2 xsm:mt-[1.5rem] xsm:grid-cols-1'>
            {jobs.map((job, index) => (
              <JobCard
                key={job.id}
                job={job}
                index={index}
              />
            ))}
          </ul>
        ) : (
          <p className='mt-[2rem] border border-brand-ink/10 bg-[#f7f8f7] px-5 py-8 font-sans text-[0.95rem] text-brand-ink/55'>
            {searchQuery ? t('emptySearch', { query: searchQuery }) : t('emptyCategory')}
          </p>
        )}

        <CareersPagination pageCount={pageCount} />
      </Container>
    </section>
  )
}
