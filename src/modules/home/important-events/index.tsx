'use client'

import { useLocale, useTranslations } from 'next-intl'
import { useRef, useState } from 'react'
import type { Swiper as SwiperType } from 'swiper'

import { ArrowLink } from '@/components/shared/arrow-link'
import { Reveal } from '@/components/shared/reveal'
import { IHomepageNews } from '@/interfaces/homepage.interface'
import Container from '@/layouts/container'
import { cn } from '@/lib/utils'
import { CarouselControls } from '@/modules/home/important-events/components/carousel-controls'
import { EventsCarousel } from '@/modules/home/important-events/components/events-carousel'
import { FeaturedCopy } from '@/modules/home/important-events/components/featured-copy'
import { SectionBackground } from '@/modules/home/important-events/components/section-background'

type ImportantEventsProps = {
  data: IHomepageNews[]
  /** Ẩn link "Xem tất cả" khi đã ở trang /tin-tuc */
  hideViewAll?: boolean
  title?: string
  tone?: 'dark' | 'light'
}

export default function ImportantEvents({
  data,
  hideViewAll = false,
  title,
  tone = 'dark',
}: ImportantEventsProps) {
  const t = useTranslations('Home')
  const tCommon = useTranslations('Common')
  const locale = useLocale()
  const swiperRef = useRef<SwiperType | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState<1 | -1>(1)
  const activeArticle = data[activeIndex] ?? data[0]
  const isLight = tone === 'light'
  const resolvedTitle = title ?? t('eventsDefaultTitle')
  const href = locale === 'vi' ? '/tin-tuc' : '/news'

  if (!data?.length) return null

  const goTo = (next: boolean) => {
    setDirection(next ? 1 : -1)
    if (next) swiperRef.current?.slideNext()
    else swiperRef.current?.slidePrev()
  }

  return (
    <section
      className={cn(
        'relative overflow-hidden',
        isLight
          ? 'border-t border-brand-ink/10 bg-[#e7ebe8] text-brand-ink'
          : 'bg-brand-ink text-white',
      )}
      aria-labelledby='important-events-heading'
    >
      <SectionBackground tone={tone} />

      <Container className='relative z-[1] py-[4rem] xsm:py-[2.75rem]'>
        <Reveal
          className={cn(
            'mb-[1.75rem] flex items-end justify-between gap-[1.5rem] border-b pb-[1.15rem] xsm:mb-[1.25rem]',
            isLight ? 'border-brand-ink/10' : 'border-white/10',
          )}
        >
          <h2
            id='important-events-heading'
            className={cn(
              'font-display text-[2.5rem] font-semibold uppercase leading-[1.5] tracking-wide xsm:text-[1.75rem]',
              isLight ? 'text-brand-ink' : 'text-white',
            )}
          >
            {resolvedTitle}
          </h2>
          {!hideViewAll ? (
            <ArrowLink
              href={href}
              variant={isLight ? 'ink' : 'light'}
              className='mb-[0.25rem] shrink-0'
            >
              {tCommon('viewAll')}
            </ArrowLink>
          ) : null}
        </Reveal>

        <div
          className={cn(
            'grid grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] items-stretch gap-[2.5rem]',
            'xsm:grid-cols-1 xsm:gap-[1.25rem]',
          )}
        >
          <Reveal
            className='relative min-h-[18rem] overflow-hidden xsm:order-2 xsm:min-h-[16rem]'
            delay={0.08}
            y={32}
          >
            <FeaturedCopy
              article={activeArticle}
              direction={direction}
              tone={tone}
            />
          </Reveal>

          <Reveal
            className={cn(
              'relative min-h-[22rem] overflow-hidden xsm:order-1 xsm:min-h-[16rem]',
              isLight ? 'bg-brand-ink/5' : 'bg-brand/40',
            )}
            delay={0.14}
            y={36}
          >
            <EventsCarousel
              data={data}
              activeIndex={activeIndex}
              onActiveIndexChange={setActiveIndex}
              onDirectionChange={setDirection}
              swiperRef={swiperRef}
            />
          </Reveal>
        </div>

        {data?.length > 1 ? (
          <CarouselControls
            activeIndex={activeIndex}
            total={data.length}
            onPrev={() => goTo(false)}
            onNext={() => goTo(true)}
            tone={tone}
          />
        ) : null}
      </Container>
    </section>
  )
}
