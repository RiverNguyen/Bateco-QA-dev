import { getTranslations } from 'next-intl/server'

import { ArticleCard, type ArticleCardItem } from '@/components/shared/article-card'
import { Reveal } from '@/components/shared/reveal'
import type { INewsTaxonomy } from '@/interfaces/news.interface'
import Container from '@/layouts/container'
import { cn } from '@/lib/utils'
import { NewsFilterTabs } from '@/modules/news/components/filter-tabs'
import { NewsPagination } from '@/modules/news/components/pagination'
import { NewsSearch } from '@/modules/news/components/search'

type NewsListingProps = {
  subtitle: string
  title: string
  desc: string
  articles: ArticleCardItem[]
  taxonomies?: INewsTaxonomy[]
  pageCount?: number
  searchQuery?: string
}

export default async function NewsListing({
  subtitle,
  title,
  desc,
  articles,
  taxonomies = [],
  pageCount = 1,
  searchQuery,
}: NewsListingProps) {
  const t = await getTranslations('News')
  const tCommon = await getTranslations('Common')

  return (
    <section
      id='news-listing'
      className='relative scroll-mt-[calc(var(--header-height)+1rem)] overflow-hidden border-t border-white/[0.08] bg-brand-ink text-white'
      aria-labelledby='news-listing-heading'
    >
      <div
        aria-hidden
        className='pointer-events-none absolute inset-0'
        style={{
          background:
            'radial-gradient(ellipse 50% 40% at 8% 0%, color-mix(in srgb, var(--brand-moss) 18%, transparent), transparent 65%), radial-gradient(ellipse 40% 35% at 94% 90%, color-mix(in srgb, var(--brand-moss) 10%, transparent), transparent 70%)',
        }}
      />
      <div
        aria-hidden
        className='pointer-events-none absolute inset-0 opacity-[0.08]'
        style={{
          backgroundImage:
            'linear-gradient(to right, color-mix(in srgb, var(--brand-moss) 40%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in srgb, var(--brand-moss) 40%, transparent) 1px, transparent 1px)',
          backgroundSize: '4.5rem 4.5rem',
          maskImage: 'radial-gradient(ellipse at 35% 15%, black 12%, transparent 70%)',
        }}
      />

      <Container className='relative py-[5rem] xsm:py-[3rem]'>
        <div
          className={cn(
            'mb-[1.25rem] grid grid-cols-[minmax(0,1fr)_minmax(0,22rem)] items-end gap-x-[3rem]',
            'xsm:mb-[1rem] xsm:grid-cols-1 xsm:gap-y-[1rem]',
          )}
        >
          <Reveal
            y={22}
            animation='rise'
          >
            <p className='text-[0.68rem] font-medium uppercase tracking-[0.24em] text-brand-moss'>
              {subtitle}
            </p>
            <h2
              id='news-listing-heading'
              className='mt-[0.85rem] max-w-[28rem] font-display text-[2.85rem] font-semibold uppercase leading-[0.98] tracking-wide text-white xsm:text-[1.75rem]'
            >
              {title}
            </h2>
            <span
              aria-hidden
              className='mt-[1.1rem] block h-[0.12rem] w-[2.75rem] bg-brand-moss'
            />
          </Reveal>

          <Reveal
            delay={0.08}
            y={18}
            animation='drift-left'
          >
            <p className='font-sans text-[0.95rem] leading-[1.75] text-white/55'>{desc}</p>
          </Reveal>
        </div>

        <div
          className={cn(
            'mt-[2rem] flex items-start justify-between gap-4',
            'xsm:mt-[1.5rem] xsm:flex-col-reverse xsm:items-stretch xsm:gap-3',
          )}
        >
          <NewsFilterTabs taxonomies={taxonomies} />
          <Reveal
            delay={0.08}
            y={14}
            className='shrink-0 xsm:w-full'
          >
            <NewsSearch />
          </Reveal>
        </div>

        {searchQuery ? (
          <p className='mt-4 font-sans text-[0.85rem] text-white/45'>
            {tCommon('resultsFor', { query: searchQuery })}
          </p>
        ) : null}

        {articles.length > 0 ? (
          <div className='mt-[2rem] grid grid-cols-3 gap-[0.75rem] xsm:mt-[1.5rem] xsm:grid-cols-1 xsm:gap-[0.65rem]'>
            {articles.map((article, index) => (
              <Reveal
                key={article.id}
                delay={0.04 + Math.min(index, 5) * 0.06}
                y={32}
                animation='soft-scale'
                className='h-full'
              >
                <ArticleCard article={article} />
              </Reveal>
            ))}
          </div>
        ) : (
          <p className='mt-[2rem] border border-white/10 bg-white/[0.03] px-5 py-8 font-sans text-[0.95rem] text-white/55'>
            {searchQuery ? t('emptySearch', { query: searchQuery }) : t('emptyCategory')}
          </p>
        )}

        <NewsPagination pageCount={pageCount} />
      </Container>
    </section>
  )
}
