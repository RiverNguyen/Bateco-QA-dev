'use client'

import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

import { Link } from '@/i18n/navigation'
import { cn } from '@/lib/utils'

export type ArticleCardItem = {
  id: string
  title: string
  excerpt: string
  href: string
  image: string
  date: string
  category: string
}

type ArticleCardProps = {
  article: ArticleCardItem
  className?: string
  variant?: 'light' | 'dark'
}

export function ArticleCard({ article, className, variant = 'dark' }: ArticleCardProps) {
  const t = useTranslations('Common')
  const isDark = variant === 'dark'

  return (
    <Link
      href={article.href}
      className={cn('group/card block h-full', className)}
    >
      <article
        className={cn(
          'flex h-full flex-col overflow-hidden',
          'transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]',
          isDark
            ? 'border border-white/10 bg-brand hover:border-brand-moss/40'
            : 'border border-brand-ink/10 bg-white hover:border-brand-moss/50',
        )}
      >
        <div className='relative -mb-px aspect-[16/10] shrink-0 overflow-hidden'>
          <Image
            src={article.image}
            alt={article.title}
            fill
            sizes='(max-width: 639px) 100vw, 33vw'
            className='object-cover transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover/card:scale-[1.05]'
          />
          <div
            aria-hidden
            className='pointer-events-none absolute inset-x-0 bottom-0 h-[20%]'
          >
            <div
              className={cn(
                'absolute inset-0',
                isDark
                  ? 'bg-gradient-to-t from-brand to-transparent'
                  : 'bg-gradient-to-t from-white to-transparent',
              )}
            />
            <div
              className={cn('absolute inset-x-0 bottom-0 h-px', isDark ? 'bg-brand' : 'bg-white')}
            />
          </div>
        </div>

        <div className='flex flex-1 flex-col p-[1.15rem]'>
          <div className='flex items-center justify-between gap-[0.75rem]'>
            <span
              className={cn(
                'font-sans text-[0.7rem] font-semibold uppercase tracking-[0.14em]',
                isDark ? 'text-brand-moss' : 'text-brand-moss',
              )}
            >
              {article.category}
            </span>
            <time
              dateTime={article.date}
              className={cn(
                'font-sans text-[0.75rem] tabular-nums',
                isDark ? 'text-white/45' : 'text-brand-ink/45',
              )}
            >
              {article.date}
            </time>
          </div>

          <h3
            className={cn(
              'mt-[0.75rem] font-display text-[1.25rem] font-semibold uppercase leading-[1.12] tracking-wide',
              isDark ? 'text-white' : 'text-brand-ink',
              'xsm:text-[1.15rem]',
            )}
          >
            {article.title}
          </h3>

          <p
            className={cn(
              'mt-[0.65rem] line-clamp-2 flex-1 font-sans text-[0.875rem] leading-relaxed',
              isDark ? 'text-white/60' : 'text-brand-ink/60',
            )}
          >
            {article.excerpt}
          </p>

          <span
            className={cn(
              'mt-[1rem] inline-flex items-center gap-[0.3rem] font-sans text-[0.8rem] font-medium',
              isDark ? 'text-white/70' : 'text-brand-ink/70',
              'transition-colors duration-500 group-hover/card:text-brand-moss',
            )}
          >
            {t('viewDetails')}
            <ArrowUpRight
              className='size-[0.9rem] transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover/card:translate-x-[0.08rem] group-hover/card:-translate-y-[0.08rem]'
              strokeWidth={1.5}
            />
          </span>
        </div>
      </article>
    </Link>
  )
}
