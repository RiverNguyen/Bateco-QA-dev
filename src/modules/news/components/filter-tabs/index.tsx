'use client'

import { useTranslations } from 'next-intl'
import { parseAsInteger, parseAsString, useQueryState } from 'nuqs'

import { Reveal } from '@/components/shared/reveal'
import type { INewsTaxonomy } from '@/interfaces/news.interface'
import { cn } from '@/lib/utils'
import { newsQueryOptions } from '@/modules/news/lib/search-params'

type NewsFilterTabsProps = {
  taxonomies: INewsTaxonomy[]
}

export function NewsFilterTabs({ taxonomies }: NewsFilterTabsProps) {
  const t = useTranslations('News')
  const tCommon = useTranslations('Common')
  const [category, setCategory] = useQueryState(
    'category',
    parseAsString.withOptions(newsQueryOptions),
  )
  const [, setPage] = useQueryState(
    'page',
    parseAsInteger.withDefault(1).withOptions(newsQueryOptions),
  )

  if (!taxonomies.length) return null

  const tabs = [{ id: 0, name: tCommon('all'), slug: '' }, ...taxonomies]

  const selectTab = async (slug: string) => {
    await Promise.all([setCategory(slug || null), setPage(null)])
    document.getElementById('news-listing')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <Reveal
      y={16}
      delay={0.06}
    >
      <div
        className='flex hidden_scroll overflow-auto gap-2 xsm:gap-1.5'
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
                'inline-flex cursor-pointer flex-shrink-0 items-center border px-4 py-2 text-[0.68rem] uppercase tracking-[0.16em]',
                'transition-[color,border-color,background-color] duration-400 ease-[cubic-bezier(0.32,0.72,0,1)]',
                'xsm:px-3 xsm:py-1.5 xsm:text-[0.62rem]',
                isActive
                  ? 'border-brand-moss/70 bg-brand-moss/20 text-white'
                  : 'border-white/12 text-white/55 hover:border-brand-moss/40 hover:text-white',
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
