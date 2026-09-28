'use client'

import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import { useLocale } from 'next-intl'
import { useState } from 'react'

import { HyperText } from '@/components/shared/hyper-text'
import { Reveal } from '@/components/shared/reveal'
import { getLocalePath, type LocaleCode } from '@/i18n/locale-paths'
import { Link } from '@/i18n/navigation'
import { IHomepageAreaField } from '@/interfaces/homepage.interface'
import { cn } from '@/lib/utils'
import { AREA_CLASS, type AreaKey } from '@/modules/home/activity-areas/lib/constants'
import { resolveFieldSlug, type FieldRef } from '@/modules/fields/lib/resolve-field-slug'

export type ActivityFieldRef = FieldRef

type ActivityCardProps = {
  item: IHomepageAreaField
  area: AreaKey
  delay: number
  fields: ActivityFieldRef[]
}

export function ActivityCard({ item, area, delay, fields }: ActivityCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const locale = useLocale() as LocaleCode
  const slug = resolveFieldSlug(item?.title ?? '', item?.link?.url, fields)
  const href = slug ? getLocalePath('fields', locale, slug) : getLocalePath('fields', locale)

  return (
    <Reveal
      delay={delay}
      y={32}
      amount={0.2}
      className={cn('min-h-[16rem] xsm:min-h-[18rem] xsm:[grid-area:auto]', AREA_CLASS[area])}
    >
      <Link
        href={href}
        onPointerEnter={() => setIsHovered(true)}
        onPointerLeave={() => setIsHovered(false)}
        className='group relative isolate block h-full min-h-[16rem] overflow-hidden bg-brand-ink xsm:min-h-[18rem]'
      >
        <Image
          src={item?.image}
          alt={item?.title}
          fill
          sizes='(max-width: 639px) 100vw, 40vw'
          className='pointer-events-none object-cover transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.06]'
        />
        <div
          aria-hidden
          className='pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-brand-ink/90 via-brand-ink/30 to-transparent'
        />
        <div
          aria-hidden
          className='pointer-events-none absolute inset-0 z-[2] bg-black/45 opacity-0 transition-opacity duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:opacity-100'
        />

        <span
          aria-hidden
          className={cn(
            'pointer-events-none absolute bottom-[1.25rem] right-[1.25rem] z-[4] flex items-center text-white',
            'opacity-0 transition-opacity duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]',
            'group-hover:opacity-100',
          )}
        >
          <ArrowUpRight
            className='size-[1.55rem]'
            strokeWidth={1.25}
          />
        </span>

        <div className='absolute inset-x-0 bottom-0 z-[3] overflow-hidden p-[1.1rem] pr-[3.5rem]'>
          <div
            className={cn(
              'transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]',
              'translate-y-[calc(100%-1.35rem)]',
              'group-hover:translate-y-0',
              'xsm:translate-y-[calc(100%-1.5rem)]',
            )}
          >
            <h3 className='font-display text-[1.35rem] font-semibold uppercase leading-none tracking-wide text-white xsm:text-[1.5rem]'>
              {item?.title}
            </h3>
            <HyperText
              as='p'
              duration={550}
              trigger={isHovered}
              animateOnHover={false}
              className={cn(
                'mt-[0.65rem] max-w-[25rem] py-0 font-sans text-[0.875rem] font-normal leading-relaxed text-white/85',
                'opacity-0 transition-opacity duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]',
                'group-hover:opacity-100',
              )}
            >
              {item?.desc}
            </HyperText>
          </div>
        </div>
      </Link>
    </Reveal>
  )
}
