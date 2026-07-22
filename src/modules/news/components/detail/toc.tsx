'use client'

import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'

import { cn } from '@/lib/utils'
import type { NewsTocItem } from '@/modules/news/lib/prepare-content'

type NewsArticleTocProps = {
  items: NewsTocItem[]
  className?: string
}

export function NewsArticleToc({ items, className }: NewsArticleTocProps) {
  const t = useTranslations('News')
  const [activeId, setActiveId] = useState(items[0]?.id ?? '')

  useEffect(() => {
    if (!items.length) return

    const headings = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => Boolean(el))

    if (!headings.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .toSorted((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (visible[0]?.target?.id) {
          setActiveId(visible[0].target.id)
        }
      },
      {
        rootMargin: '-18% 0px -58% 0px',
        threshold: [0, 0.25, 0.5, 1],
      },
    )

    headings.forEach((heading) => observer.observe(heading))
    return () => observer.disconnect()
  }, [items])

  if (!items.length) return null

  return (
    <nav
      aria-label={t('tocAria')}
      className={cn('sticky top-[calc(var(--header-height)+1.5rem)] self-start', className)}
    >
      <p className='text-[0.62rem] font-medium uppercase tracking-[0.22em] text-brand-moss'>
        {t('toc')}
      </p>

      <ol className='mt-5 space-y-1 border-l border-brand-ink/12'>
        {items.map((item, index) => {
          const isActive = activeId === item.id
          const number = String(index + 1).padStart(2, '0')

          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={cn(
                  'group/toc relative -ml-px flex gap-3 border-l-2 py-2.5 transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]',
                  item.level === 3 ? 'pl-6' : 'pl-4',
                  isActive
                    ? 'border-brand-moss text-brand-ink'
                    : 'border-transparent text-brand-ink/48 hover:border-brand-ink/20 hover:text-brand-ink/80',
                )}
              >
                <span
                  className={cn(
                    'shrink-0 text-[0.65rem] tabular-nums tracking-wider transition-colors duration-500',
                    isActive
                      ? 'text-brand-moss'
                      : 'text-brand-ink/28 group-hover/toc:text-brand-ink/45',
                  )}
                >
                  {number}
                </span>
                <span
                  className={cn(
                    'font-sans leading-snug',
                    item.level === 3 ? 'text-[0.82rem]' : 'text-[0.9rem]',
                    isActive && 'font-medium',
                  )}
                >
                  {item.text}
                </span>
              </a>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
