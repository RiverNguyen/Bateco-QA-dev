'use client'

import { Search, X } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { parseAsInteger, parseAsString, useQueryState } from 'nuqs'
import { useEffect, useRef, useState } from 'react'

import { cn } from '@/lib/utils'
import { newsQueryOptions } from '@/modules/news/lib/search-params'

const DEBOUNCE_MS = 400

export function NewsSearch() {
  const t = useTranslations('News')
  const tCommon = useTranslations('Common')
  const [q, setQ] = useQueryState('q', parseAsString.withOptions(newsQueryOptions))
  const [, setPage] = useQueryState(
    'page',
    parseAsInteger.withDefault(1).withOptions(newsQueryOptions),
  )
  const [draft, setDraft] = useState<string | null>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const value = draft ?? q ?? ''

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  const commit = async (next: string) => {
    const trimmed = next.trim()
    await Promise.all([setQ(trimmed || null), setPage(null)])
    setDraft(null)
  }

  const scheduleCommit = (next: string) => {
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      void commit(next)
    }, DEBOUNCE_MS)
  }

  return (
    <form
      role='search'
      className='relative w-full max-w-[22rem] xsm:max-w-none'
      onSubmit={(e) => {
        e.preventDefault()
        if (timerRef.current) clearTimeout(timerRef.current)
        void commit(value)
      }}
    >
      <label
        htmlFor='news-search'
        className='sr-only'
      >
        {t('searchLabel')}
      </label>
      <Search
        aria-hidden
        className='pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-white/40'
        strokeWidth={1.35}
      />
      <input
        id='news-search'
        type='search'
        value={value}
        placeholder={t('searchPlaceholder')}
        autoComplete='off'
        onChange={(e) => {
          const next = e.target.value
          setDraft(next)
          scheduleCommit(next)
        }}
        className={cn(
          'h-11 w-full border border-white/12 bg-white/[0.04] pr-10 pl-10',
          'font-sans text-[0.9rem] text-white placeholder:text-white/35',
          'outline-none transition-[border-color,background-color] duration-400 ease-[cubic-bezier(0.32,0.72,0,1)]',
          'hover:border-white/20 focus:border-brand-moss/55 focus:bg-white/[0.06]',
          '[&::-webkit-search-cancel-button]:hidden',
        )}
      />
      {value ? (
        <button
          type='button'
          aria-label={tCommon('clearSearch')}
          onClick={() => {
            if (timerRef.current) clearTimeout(timerRef.current)
            setDraft('')
            void commit('')
          }}
          className='absolute top-1/2 right-2.5 flex size-7 -translate-y-1/2 cursor-pointer items-center justify-center text-white/45 transition-colors hover:text-white'
        >
          <X
            className='size-3.5'
            strokeWidth={1.35}
          />
        </button>
      ) : null}
    </form>
  )
}
