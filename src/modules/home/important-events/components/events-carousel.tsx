'use client'

import Image from 'next/image'
import type { MutableRefObject } from 'react'
import type { Swiper as SwiperType } from 'swiper'
import { Autoplay, EffectFade } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import { Link } from '@/i18n/navigation'
import { IHomepageNews } from '@/interfaces/homepage.interface'
import { cn } from '@/lib/utils'
import { AUTOPLAY_DELAY_MS } from '@/modules/home/important-events/lib/constants'

import 'swiper/css'
import 'swiper/css/effect-fade'

type EventsCarouselProps = {
  data: IHomepageNews[]
  activeIndex: number
  onActiveIndexChange: (index: number) => void
  onDirectionChange: (direction: 1 | -1) => void
  swiperRef: MutableRefObject<SwiperType | null>
}

export function EventsCarousel({
  data,
  activeIndex,
  onActiveIndexChange,
  onDirectionChange,
  swiperRef,
}: EventsCarouselProps) {
  return (
    <Swiper
      modules={[Autoplay, EffectFade]}
      effect='fade'
      fadeEffect={{ crossFade: true }}
      autoplay={{
        delay: AUTOPLAY_DELAY_MS,
        disableOnInteraction: false,
      }}
      speed={900}
      loop={data?.length > 1}
      onSwiper={(swiper) => {
        swiperRef.current = swiper
      }}
      onSlideChange={(swiper) => {
        const nextIndex = swiper.realIndex
        if (nextIndex === activeIndex) return

        if (swiper.swipeDirection === 'prev') {
          onDirectionChange(-1)
        } else if (swiper.swipeDirection === 'next') {
          onDirectionChange(1)
        } else {
          const len = data?.length
          const goingPrev =
            (activeIndex === 0 && nextIndex === len - 1) || nextIndex === activeIndex - 1
          onDirectionChange(goingPrev ? -1 : 1)
        }

        onActiveIndexChange(nextIndex)
      }}
      className='h-full min-h-[22rem] xsm:min-h-[16rem] [&_.swiper-slide]:!h-auto'
    >
      {Array.isArray(data) &&
        data.length > 0 &&
        data?.map((article, index) => (
          <SwiperSlide
            key={article?.id}
            className='!h-full'
          >
            <Link
              href={`/tin-tuc/${article?.slug}`}
              className='group/img relative block min-h-[22rem] overflow-hidden xsm:min-h-[16rem]'
              aria-label={article?.title}
            >
              <Image
                src={article?.thumbnail?.url}
                alt={article?.title}
                fill
                sizes='(max-width: 639px) 100vw, 55vw'
                priority={index === 0}
                className={cn(
                  'object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.32,0.72,0,1)]',
                  index === activeIndex ? 'scale-100' : 'scale-[1.08]',
                  'group-hover/img:scale-[1.03]',
                )}
              />
            </Link>
          </SwiperSlide>
        ))}
    </Swiper>
  )
}
