'use client'

import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import { useLocale } from 'next-intl'
import { useState } from 'react'

import { Reveal } from '@/components/shared/reveal'
import type { LocaleCode } from '@/i18n/locale-paths'
import { Link } from '@/i18n/navigation'
import type { IFieldsItem } from '@/interfaces/fields.interface'
import { cn } from '@/lib/utils'
import { getFieldHref } from '@/modules/fields/lib/page-data'

type OverviewCardProps = {
  field: IFieldsItem
  index: number
}

export function OverviewCard({ field, index }: OverviewCardProps) {
  const locale = useLocale() as LocaleCode
  const [hovered, setHovered] = useState(false)

  return (
    <Reveal
      delay={0.05 + index * 0.07}
      y={36}
      amount={0.25}
      animation='soft-scale'
      className='h-full'
    >
      <Link
        href={getFieldHref(field.id, locale)}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        className={cn(
          'group relative isolate flex h-full min-h-[24rem] flex-col justify-end overflow-hidden xsm:min-h-[19rem]',
          'border border-white/[0.1] bg-brand-ink',
          'transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]',
          'hover:-translate-y-1 hover:border-brand-moss/55',
          'hover:shadow-[0_24px_60px_rgba(0,0,0,0.35)]',
        )}
      >
        <Image
          src={field.image}
          alt={field.title}
          fill
          sizes='(max-width: 639px) 100vw, 33vw'
          className={cn(
            'object-cover brightness-[0.92] contrast-[1.05] transition-all duration-[1200ms] ease-[cubic-bezier(0.32,0.72,0,1)] will-change-transform',
            hovered ? 'scale-[1.08] brightness-110' : 'scale-100',
          )}
        />

        <div
          aria-hidden
          className='absolute inset-0 bg-gradient-to-t from-brand-ink via-brand-ink/35 to-transparent'
        />
        <div
          aria-hidden
          className={cn(
            'absolute inset-0 bg-gradient-to-br from-brand-moss/20 via-transparent to-transparent',
            'opacity-0 transition-opacity duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]',
            'group-hover:opacity-100',
          )}
        />

        {/* Corner marks */}
        <span
          aria-hidden
          className='pointer-events-none absolute left-3 top-3 size-3 border-l border-t border-white/25 transition-colors duration-500 group-hover:border-brand-moss/70'
        />
        <span
          aria-hidden
          className='pointer-events-none absolute right-3 top-3 size-3 border-r border-t border-white/25 transition-colors duration-500 group-hover:border-brand-moss/70'
        />
        <span
          aria-hidden
          className='pointer-events-none absolute bottom-3 left-3 size-3 border-b border-l border-white/25 transition-colors duration-500 group-hover:border-brand-moss/70'
        />
        <span
          aria-hidden
          className='pointer-events-none absolute bottom-3 right-3 size-3 border-b border-r border-white/25 transition-colors duration-500 group-hover:border-brand-moss/70'
        />

        <span
          aria-hidden
          className={cn(
            'pointer-events-none absolute right-5 top-4 font-display text-[4.25rem] font-semibold leading-none tracking-wide text-white/[0.1]',
            'transition-[color,transform] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]',
            'group-hover:translate-x-1 group-hover:text-brand-moss/30',
            'xsm:text-[3.25rem]',
          )}
        >
          {field.index}
        </span>

        <div
          aria-hidden
          className={cn(
            'absolute bottom-0 left-0 h-[0.12rem] w-0 bg-brand-moss',
            'transition-[width] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]',
            'group-hover:w-full',
          )}
        />

        <div className='relative z-[1] flex items-end justify-between gap-3 p-5 xsm:p-4'>
          <div className='min-w-0 flex-1'>
            <h3 className='mt-2 font-display text-[1.45rem] font-semibold uppercase leading-[1.08] tracking-wide text-white xsm:text-[1.25rem]'>
              {field.title}
            </h3>
            <p
              className={cn(
                'mt-2.5 max-h-0 overflow-hidden font-sans text-[0.85rem] leading-relaxed text-white/75 line-clamp-3',
                'opacity-0 transition-[max-height,opacity,margin] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]',
                'group-hover:mt-2.5 group-hover:max-h-24 group-hover:opacity-100',
                'xsm:mt-2 xsm:max-h-24 xsm:opacity-100',
              )}
            >
              {field.summary}
            </p>
          </div>

          <span
            aria-hidden
            className={cn(
              'mb-0.5 flex size-9 shrink-0 items-center justify-center border border-white/20 text-white/70',
              'translate-y-1 opacity-0 transition-[opacity,transform,border-color,background-color,color] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]',
              'group-hover:translate-y-0 group-hover:opacity-100 group-hover:border-brand-moss/60 group-hover:bg-brand-moss/15 group-hover:text-white',
              'xsm:translate-y-0 xsm:opacity-100',
            )}
          >
            <ArrowUpRight
              className='size-4 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5'
              strokeWidth={1.35}
            />
          </span>
        </div>
      </Link>
    </Reveal>
  )
}
