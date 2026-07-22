'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useTranslations } from 'next-intl'
import React from 'react'
import ReactPaginate from 'react-paginate'

import useIsMobile from '@/hooks/useIsMobile'
import { cn } from '@/lib/utils'

type PaginationProps = {
  pageCurrent: number
  pageCount: number
  className?: string
  onPageChange: (page: number) => void
  variant?: 'dark' | 'light'
}

const Pagination = ({
  pageCurrent,
  pageCount = 1,
  className,
  onPageChange,
  variant = 'dark',
}: PaginationProps) => {
  const t = useTranslations('Pagination')
  const isMobile = useIsMobile()
  const isDark = variant === 'dark'

  if (pageCount <= 1) return null

  const pageClass = cn(
    'size-[2.5rem] border text-[0.8rem] font-medium tabular-nums',
    'transition-[color,border-color,background-color] duration-400 ease-[cubic-bezier(0.32,0.72,0,1)]',
    '[&>a]:flex [&>a]:size-full [&>a]:cursor-pointer [&>a]:items-center [&>a]:justify-center select-none',
    isDark
      ? 'border-white/15 bg-transparent text-white/65 hover:border-brand-moss/50 hover:text-white'
      : 'border-brand-ink/15 bg-white text-brand-ink/65 hover:border-brand-moss/50 hover:text-brand-ink',
  )

  const navClass = cn(
    'flex h-[2.5rem] items-center gap-1.5 border px-3.5 text-[0.68rem] uppercase tracking-[0.14em]',
    'transition-[color,border-color,background-color] duration-400 ease-[cubic-bezier(0.32,0.72,0,1)]',
    '[&>a]:flex [&>a]:h-full [&>a]:cursor-pointer [&>a]:items-center [&>a]:gap-1.5 select-none',
    isDark
      ? 'border-white/15 text-white/65 hover:border-brand-moss/50 hover:text-white'
      : 'border-brand-ink/15 bg-white text-brand-ink/65 hover:border-brand-moss/50 hover:text-brand-ink',
  )

  const activeClass = isDark
    ? '!border-brand-moss/70 !bg-brand-moss/25 !text-white hover:!bg-brand-moss/25'
    : '!border-brand-moss/70 !bg-brand-moss/15 !text-brand-ink hover:!bg-brand-moss/15'

  const breakDot = isDark ? 'bg-white/40' : 'bg-brand-ink/35'

  return (
    <ReactPaginate
      activeClassName={activeClass}
      pageClassName={pageClass}
      previousLabel={
        <>
          <ChevronLeft
            className='size-4'
            strokeWidth={1.35}
          />
          <span className='xsm:hidden'>{t('previous')}</span>
        </>
      }
      nextLabel={
        <>
          <span className='xsm:hidden'>{t('next')}</span>
          <ChevronRight
            className='size-4'
            strokeWidth={1.35}
          />
        </>
      }
      previousClassName={navClass}
      nextClassName={navClass}
      disabledClassName='pointer-events-none opacity-35'
      breakClassName={cn(
        'pointer-events-none size-[2rem] select-none [&_a]:flex [&_a]:size-full [&_a]:items-center [&_a]:justify-center',
      )}
      breakLabel={
        <div className='flex size-full items-center justify-center gap-x-1'>
          <span className={cn('size-1 shrink-0 rounded-full', breakDot)} />
          <span className={cn('size-1 shrink-0 rounded-full', breakDot)} />
          <span className={cn('size-1 shrink-0 rounded-full', breakDot)} />
        </div>
      }
      onPageChange={(e: { selected: number }) => {
        onPageChange(Number(e?.selected) + 1)
      }}
      pageRangeDisplayed={1}
      pageCount={pageCount}
      renderOnZeroPageCount={null}
      marginPagesDisplayed={isMobile ? 1 : 2}
      forcePage={Math.max(0, pageCurrent - 1)}
      className={cn('mx-auto flex w-fit items-center gap-2', className)}
    />
  )
}

export default React.memo(Pagination)
