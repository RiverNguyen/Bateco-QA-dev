import { ArrowUpRight } from 'lucide-react'
import { getLocale, getTranslations } from 'next-intl/server'

import { Reveal } from '@/components/shared/reveal'
import { getLocalePath, type LocaleCode } from '@/i18n/locale-paths'
import { Link } from '@/i18n/navigation'
import { ICareersItem } from '@/interfaces/careers.interface'
import { cn } from '@/lib/utils'
import { formatCareerDate } from '@/modules/careers/lib/careers-data'

type JobCardProps = {
  job: ICareersItem
  index?: number
  locale?: LocaleCode
}

export async function JobCard({ job, index = 0, locale: localeProp }: JobCardProps) {
  const locale = localeProp ?? ((await getLocale()) as LocaleCode)
  const tCommon = await getTranslations('Common')
  const number = String(index + 1).padStart(2, '0')
  const postedAt = formatCareerDate(job?.acf?.date, locale)
  const href = getLocalePath('careers', locale, job?.slug)

  return (
    <Reveal
      delay={Math.min(index * 0.05, 0.2)}
      y={22}
      as='li'
    >
      <Link
        href={href}
        className='group/job block h-full'
      >
        <article
          className={cn(
            'flex h-full flex-col border border-brand-ink/10 bg-white p-[1.35rem]',
            'transition-[border-color,background-color] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]',
            'hover:border-brand-moss/45 hover:bg-[#f7f8f7]',
          )}
        >
          <div className='flex items-start justify-between gap-3'>
            <div className='min-w-0'>
              <p className='text-[0.62rem] uppercase tracking-[0.2em] text-brand-moss'>
                {job?.taxonomies?.careers_tax?.[0]?.name}
              </p>
              <h3 className='mt-2 font-display text-[1.45rem] font-semibold uppercase leading-[1.15] tracking-wide text-brand-ink transition-colors group-hover/job:text-brand-moss xsm:text-[1.25rem]'>
                {job?.title}
              </h3>
            </div>
            <span className='shrink-0 text-[0.7rem] tabular-nums text-brand-ink/30'>{number}</span>
          </div>

          <p className='mt-3 line-clamp-2 flex-1 font-sans text-[0.9rem] leading-[1.65] text-brand-ink/55'>
            {job?.post_excerpt}
          </p>

          <p className='mt-4 font-display text-[1.15rem] font-semibold tracking-wide text-brand-moss'>
            {job?.acf?.wage}
          </p>

          <div className='mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-brand-ink/8 pt-4'>
            <span
              aria-hidden
              className='size-1 rounded-full bg-brand-ink/20'
            />
            <span className='font-sans text-[0.78rem] text-brand-ink/55'>{job?.acf?.type}</span>
          </div>

          <div className='mt-3 flex items-center justify-between gap-3'>
            <time
              dateTime={job?.acf?.date}
              className='font-sans text-[0.75rem] tabular-nums text-brand-ink/40'
            >
              {tCommon('postedOn', { date: postedAt })}
            </time>
            <span className='inline-flex items-center gap-1 text-[0.62rem] uppercase tracking-[0.16em] text-brand-ink/45 transition-colors group-hover/job:text-brand-moss'>
              {tCommon('details')}
              <ArrowUpRight
                className='size-3.5 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover/job:translate-x-0.5 group-hover/job:-translate-y-0.5'
                strokeWidth={1.35}
              />
            </span>
          </div>
        </article>
      </Link>
    </Reveal>
  )
}
