'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useRef } from 'react'
import type { Swiper as SwiperType } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import { ArticleCard, type ArticleCardItem } from '@/components/shared/article-card'
import { cn } from '@/lib/utils'

import 'swiper/css'

type ArticleCarouselProps = {
  items: ArticleCardItem[]
  variant?: 'light' | 'dark'
  className?: string
}

export function ArticleCarousel({ items, variant = 'dark', className }: ArticleCarouselProps) {
  const t = useTranslations('Common')
  const swiperRef = useRef<SwiperType | null>(null)

  if (items.length <= 3) {
    return (
      <div
        className={cn(
          'grid gap-[1rem]',
          items.length === 1 && 'max-w-[24rem] grid-cols-1',
          items.length === 2 && 'grid-cols-2',
          items.length === 3 && 'grid-cols-3',
          'xsm:max-w-none xsm:grid-cols-1',
          className,
        )}
      >
        {items.map((article) => (
          <ArticleCard
            key={article.id}
            article={article}
            variant={variant}
          />
        ))}
      </div>
    )
  }

  const navButtonClass = cn(
    'relative z-[2] flex size-[2.35rem] cursor-pointer items-center justify-center border transition-colors duration-300',
    variant === 'dark'
      ? 'border-white/15 text-white/70 hover:border-brand-moss/50 hover:text-white'
      : 'border-brand-ink/15 text-brand-ink/70 hover:text-brand-ink',
  )

  return (
    <div className={cn('relative', className)}>
      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper
        }}
        spaceBetween={16}
        slidesPerView={1.08}
        breakpoints={{
          640: { slidesPerView: 2.1 },
          1024: { slidesPerView: 3 },
        }}
        className='!overflow-visible'
      >
        {items.map((article) => (
          <SwiperSlide
            key={article.id}
            className='!h-auto'
          >
            <ArticleCard
              article={article}
              variant={variant}
              className='h-full'
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className='relative z-[2] mt-[1.25rem] flex items-center justify-end gap-[0.5rem]'>
        <button
          type='button'
          aria-label={t('previousArticle')}
          className={navButtonClass}
          onClick={() => swiperRef.current?.slidePrev()}
        >
          <ChevronLeft
            className='size-[1.1rem]'
            strokeWidth={1.5}
          />
        </button>
        <button
          type='button'
          aria-label={t('nextArticle')}
          className={navButtonClass}
          onClick={() => swiperRef.current?.slideNext()}
        >
          <ChevronRight
            className='size-[1.1rem]'
            strokeWidth={1.5}
          />
        </button>
      </div>
    </div>
  )
}
