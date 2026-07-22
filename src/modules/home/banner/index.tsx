'use client'

import { useReducedMotion } from 'motion/react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { useEffect, useRef, useState } from 'react'
import type { Swiper as SwiperType } from 'swiper'
import { Autoplay, EffectFade } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import type { IHomepageBannerSlide } from '@/interfaces/homepage.interface'
import Container from '@/layouts/container'
import { cn } from '@/lib/utils'
import { HeroCopy } from '@/modules/home/banner/components/hero-copy'
import { SlideIndicators } from '@/modules/home/banner/components/slide-indicators'
import { AUTOPLAY_DELAY_MS, HERO_HEIGHT } from '@/modules/home/banner/lib/constants'

import 'swiper/css'
import 'swiper/css/effect-fade'

export default function HeroBanner({ data }: { data: IHomepageBannerSlide[] }) {
  const t = useTranslations('Home')
  const tCommon = useTranslations('Common')
  const swiperRef = useRef<SwiperType | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState<1 | -1>(1)
  const reduceMotion = useReducedMotion()
  const active = data[activeIndex] ?? data[0]

  useEffect(() => {
    const swiper = swiperRef.current
    if (!swiper?.autoplay) return

    if (reduceMotion) {
      swiper.autoplay.stop()
      return
    }

    swiper.autoplay.start()
  }, [reduceMotion])

  useEffect(() => {
    if (reduceMotion) return

    const restartAutoplay = () => {
      const swiper = swiperRef.current
      if (!swiper?.autoplay) return
      swiper.autoplay.stop()
      swiper.autoplay.start()
    }

    if (document.documentElement.dataset.preloader !== 'active') return

    const observer = new MutationObserver(() => {
      if (document.documentElement.dataset.preloader === 'done') {
        restartAutoplay()
        observer.disconnect()
      }
    })

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-preloader'],
    })

    return () => observer.disconnect()
  }, [reduceMotion])

  const syncDirection = (swiper: SwiperType, nextIndex: number) => {
    if (swiper.swipeDirection === 'prev') setDirection(-1)
    else if (swiper.swipeDirection === 'next') setDirection(1)
    else {
      const len = data.length
      const goingPrev =
        (activeIndex === 0 && nextIndex === len - 1) || nextIndex === activeIndex - 1
      setDirection(goingPrev ? -1 : 1)
    }
  }

  return (
    <section
      className={cn('relative overflow-hidden bg-brand-ink', HERO_HEIGHT)}
      aria-label={t('bannerAria')}
    >
      <h1 className='sr-only'>{tCommon('brand')}</h1>
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect='fade'
        fadeEffect={{ crossFade: true }}
        speed={1100}
        loop={data.length > 1}
        autoplay={{
          delay: AUTOPLAY_DELAY_MS,
          disableOnInteraction: false,
          waitForTransition: true,
        }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper
          if (!reduceMotion) {
            swiper.autoplay?.start()
          }
        }}
        onSlideChange={(swiper) => {
          const nextIndex = swiper.realIndex
          if (nextIndex === activeIndex) return
          syncDirection(swiper, nextIndex)
          setActiveIndex(nextIndex)
        }}
        className={cn('!absolute inset-0 !h-full !w-full', '[&_.swiper-wrapper]:!h-full')}
      >
        {Array.isArray(data) &&
          data.length > 0 &&
          data?.map((slide, index) => (
            <SwiperSlide
              key={index}
              className='!relative !h-full !w-full'
            >
              <div className='absolute inset-0 overflow-hidden'>
                <Image
                  src={slide?.image}
                  alt={slide?.title}
                  fill
                  priority={index === 0}
                  sizes='100vw'
                  className={cn(
                    'object-cover transition-transform duration-[1800ms] ease-[cubic-bezier(0.32,0.72,0,1)] will-change-transform',
                    index === activeIndex ? 'scale-100' : 'scale-[1.08]',
                  )}
                />
                <div
                  aria-hidden
                  className='absolute inset-0 bg-gradient-to-t from-brand-ink via-brand-ink/10 to-transparent'
                />
                <div
                  aria-hidden
                  className='absolute inset-0 bg-brand-ink/10'
                />
              </div>
            </SwiperSlide>
          ))}
      </Swiper>

      <Container
        className={cn(
          'pointer-events-none relative z-10 flex items-end pb-[4rem] xsm:pb-[2.75rem]',
          HERO_HEIGHT,
        )}
      >
        <div className='pointer-events-auto max-w-full overflow-hidden'>
          <HeroCopy
            slide={active}
            activeIndex={activeIndex}
            direction={direction}
            reduceMotion={reduceMotion}
          />
        </div>
      </Container>

      <SlideIndicators
        slides={data}
        activeIndex={activeIndex}
        swiperRef={swiperRef}
        onSelect={(index) => setDirection(index > activeIndex ? 1 : -1)}
      />
    </section>
  )
}
