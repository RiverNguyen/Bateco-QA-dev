'use client'

import { useTranslations } from 'next-intl'
import type { MutableRefObject } from 'react'
import type { Swiper as SwiperType } from 'swiper'

import type { IHomepageBannerSlide } from '@/interfaces/homepage.interface'
import Container from '@/layouts/container'
import { cn } from '@/lib/utils'

type SlideIndicatorsProps = {
  slides: IHomepageBannerSlide[]
  activeIndex: number
  swiperRef: MutableRefObject<SwiperType | null>
  onSelect: (index: number) => void
}

export function SlideIndicators({
  slides,
  activeIndex,
  swiperRef,
  onSelect,
}: SlideIndicatorsProps) {
  const t = useTranslations('Home')

  if (!Array.isArray(slides) || slides.length <= 1) return null

  return (
    <div className='pointer-events-none absolute inset-x-0 bottom-[1.5rem] z-20 xsm:bottom-[1rem]'>
      <Container className='pointer-events-auto flex items-center justify-end gap-[0.45rem]'>
        {slides.map((_, index) => (
          <button
            key={index}
            type='button'
            aria-label={t('goToSlide', { n: index + 1 })}
            aria-current={index === activeIndex}
            onClick={() => {
              onSelect(index)
              swiperRef.current?.slideToLoop(index)
            }}
            className={cn(
              'h-[0.16rem] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]',
              index === activeIndex
                ? 'w-[2.25rem] bg-brand-moss'
                : 'w-[0.85rem] bg-white/35 hover:bg-white/60',
            )}
          />
        ))}
      </Container>
    </div>
  )
}
