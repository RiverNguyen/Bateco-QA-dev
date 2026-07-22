'use client'

import { InfiniteSlider } from '@/components/shared/infinite-slider'
import { Reveal } from '@/components/shared/reveal'
import useIsMobile from '@/hooks/useIsMobile'
import { IHomepagePartner } from '@/interfaces/homepage.interface'
import Container from '@/layouts/container'
import { PartnerMark } from '@/modules/home/partners/components/partner-mark'

export default function Partners({ data }: { data: IHomepagePartner }) {
  const isMobile = useIsMobile()

  return (
    <section
      className='relative overflow-hidden bg-[#e7ebe8] text-brand-ink'
      aria-labelledby='partners-heading'
    >
      <Container className='relative pt-[3rem] xsm:pt-[3rem]'>
        <Reveal className='mb-[1.35rem] flex items-end justify-between gap-[1.5rem] xsm:mb-[1.15rem] xsm:flex-col xsm:items-start xsm:gap-[0.85rem]'>
          <div>
            <p className='mb-[0.4rem] font-sans text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-brand-moss'>
              {data?.subtitle}
            </p>
            <h2
              id='partners-heading'
              className='font-display text-[2.25rem] font-semibold uppercase leading-none tracking-wide xsm:text-[1.65rem]'
            >
              {data?.title}
            </h2>
          </div>
          <p className='max-w-[22rem] pb-[0.1rem] text-right font-sans text-[0.875rem] leading-relaxed text-brand-ink/50 xsm:max-w-none xsm:text-left'>
            {data?.desc}
          </p>
        </Reveal>
      </Container>

      <Reveal
        y={20}
        delay={0.1}
        className='relative border-brand-ink/10 py-[1.75rem] xsm:py-[1.35rem]'
      >
        <div
          aria-hidden
          className='pointer-events-none absolute inset-y-0 left-0 z-[2] w-[5rem] bg-gradient-to-r from-[#e7ebe8] to-transparent xsm:w-[2.5rem]'
        />
        <div
          aria-hidden
          className='pointer-events-none absolute inset-y-0 right-0 z-[2] w-[5rem] bg-gradient-to-l from-[#e7ebe8] to-transparent xsm:w-[2.5rem]'
        />

        <InfiniteSlider
          gap={isMobile ? 0 : 160}
          speed={90}
          speedOnHover={40}
        >
          {Array.isArray(data?.gallery) &&
            data?.gallery.length > 0 &&
            data?.gallery?.map((partner, index) => (
              <PartnerMark
                key={index}
                partner={partner}
              />
            ))}
        </InfiniteSlider>
      </Reveal>

      <div
        className='h-[2.75rem] xsm:h-[2rem]'
        aria-hidden
      />
    </section>
  )
}
