'use client'

import { useTranslations } from 'next-intl'
import { parseAsInteger, parseAsString, useQueryState } from 'nuqs'

import { Reveal } from '@/components/shared/reveal'
import type { ICareersTaxonomy } from '@/interfaces/careers.interface'
import { cn } from '@/lib/utils'
import { careersQueryOptions } from '@/modules/careers/lib/search-params'

type CareersFilterTabsProps = {
  taxonomies: ICareersTaxonomy[]
}

export function CareersFilterTabs({ taxonomies }: CareersFilterTabsProps) {
  const t = useTranslations('Careers')
  const tCommon = useTranslations('Common')
  const [category, setCategory] = useQueryState(
    'category',
    parseAsString.withOptions(careersQueryOptions),
  )
  const [, setPage] = useQueryState(
    'page',
    parseAsInteger.withDefault(1).withOptions(careersQueryOptions),
  )

  if (!taxonomies.length) return null

  const tabs = [{ id: 0, name: tCommon('all'), slug: '' }, ...taxonomies]

  const selectTab = async (slug: string) => {
    await Promise.all([setCategory(slug || null), setPage(null)])
    document
      .getElementById('careers-listing')
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <Reveal
      y={16}
      delay={0.06}
    >
      <div
        className='hidden_scroll flex gap-2 overflow-auto xsm:gap-1.5'
        role='tablist'
        aria-label={t('filterAria')}
      >
        {tabs.map((tab) => {
          const isActive = tab.slug === '' ? !category : category === tab.slug

          return (
            <button
              key={tab.slug || 'all'}
              type='button'
              role='tab'
              aria-selected={isActive}
              onClick={() => void selectTab(tab.slug)}
              className={cn(
                'inline-flex flex-shrink-0 cursor-pointer items-center border px-4 py-2 text-[0.68rem] uppercase tracking-[0.16em]',
                'transition-[color,border-color,background-color] duration-400 ease-[cubic-bezier(0.32,0.72,0,1)]',
                'xsm:px-3 xsm:py-1.5 xsm:text-[0.62rem]',
                isActive
                  ? 'border-brand-moss/60 bg-brand-moss/12 text-brand-ink'
                  : 'border-brand-ink/12 text-brand-ink/50 hover:border-brand-moss/40 hover:text-brand-ink',
              )}
            >
              {tab.name}
            </button>
          )
        })}
      </div>
    </Reveal>
  )
}
