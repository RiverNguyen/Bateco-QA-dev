import { Reveal } from '@/components/shared/reveal'
import { IAboutBanner } from '@/interfaces/about.interface'
import Container from '@/layouts/container'
import { BannerCta } from '@/modules/about/components/banner/banner-cta'

export function BannerComponent({ data }: { data: IAboutBanner }) {
  return (
    <Container className='relative z-10 flex flex-1 items-center pb-[3.5rem] pt-[4.5rem] xsm:pb-[2.5rem] xsm:pt-[3rem]'>
      <div className='max-w-[42rem] xsm:max-w-none'>
        <Reveal y={20}>
          <p className='mb-[0.75rem] font-sans text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-brand-moss'>
            {data?.subtitle}
          </p>
        </Reveal>

        <Reveal
          delay={0.06}
          y={28}
        >
          <h1
            id='about-banner-heading'
            className='font-display text-[3.25rem] font-semibold uppercase leading-[1.12] tracking-wide text-white xsm:text-[2.15rem]'
          >
            {data?.title}
          </h1>
        </Reveal>

        <Reveal
          delay={0.12}
          y={24}
        >
          <p className='mt-[1.15rem] max-w-[36rem] font-sans text-[1rem] leading-[1.7] text-white/85 xsm:mt-[0.9rem] xsm:text-[0.9rem] xsm:leading-[1.65]'>
            {data?.desc}
          </p>
        </Reveal>

        <Reveal
          delay={0.18}
          y={20}
          className='mt-[1.75rem] flex flex-wrap items-center gap-[0.75rem] xsm:mt-[1.35rem]'
        >
          <BannerCta
            href={data?.button_1?.url || ''}
            variant='solid'
          >
            {data?.button_1?.title}
          </BannerCta>
          <BannerCta
            href={data?.button_2?.url || ''}
            variant='ghost'
          >
            {data?.button_2?.title}
          </BannerCta>
        </Reveal>
      </div>
    </Container>
  )
}
