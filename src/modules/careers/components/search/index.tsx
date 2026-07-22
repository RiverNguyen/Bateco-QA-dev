'use client'

import { Search, X } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { parseAsInteger, parseAsString, useQueryState } from 'nuqs'
import { useEffect, useRef, useState } from 'react'

import { cn } from '@/lib/utils'
import { careersQueryOptions } from '@/modules/careers/lib/search-params'

const DEBOUNCE_MS = 400

export function CareersSearch() {
  const t = useTranslations('Careers')
  const tCommon = useTranslations('Common')
  const [q, setQ] = useQueryState('q', parseAsString.withOptions(careersQueryOptions))
  const [, setPage] = useQueryState(
    'page',
    parseAsInteger.withDefault(1).withOptions(careersQueryOptions),
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
        htmlFor='careers-search'
        className='sr-only'
      >
        {t('searchLabel')}
      </label>
      <Search
        aria-hidden
        className='pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-brand-ink/35'
        strokeWidth={1.35}
      />
      <input
        id='careers-search'
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
          'h-11 w-full border border-brand-ink/12 bg-white pr-10 pl-10',
          'font-sans text-[0.9rem] text-brand-ink placeholder:text-brand-ink/35',
          'outline-none transition-[border-color,background-color] duration-400 ease-[cubic-bezier(0.32,0.72,0,1)]',
          'hover:border-brand-ink/20 focus:border-brand-moss/50 focus:bg-[#f7f8f7]',
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
          className='absolute top-1/2 right-2.5 flex size-7 -translate-y-1/2 cursor-pointer items-center justify-center text-brand-ink/40 transition-colors hover:text-brand-ink'
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
