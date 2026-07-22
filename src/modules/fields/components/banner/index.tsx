import Image from 'next/image'

import { Reveal } from '@/components/shared/reveal'
import type { IFieldsBanner } from '@/interfaces/fields.interface'
import Container from '@/layouts/container'
import { cn } from '@/lib/utils'
import { BannerCta } from '@/modules/about/components/banner/banner-cta'
import { FIELDS_HERO_HEIGHT } from '@/modules/fields/lib/page-data'

export default function FieldsBanner({ data }: { data: IFieldsBanner }) {
  return (
    <section
      className={cn('relative flex flex-col overflow-hidden bg-brand-ink', FIELDS_HERO_HEIGHT)}
      aria-labelledby='fields-banner-heading'
    >
      <div className='absolute inset-0'>
        <Image
          src={data.image}
          alt=''
          fill
          priority
          sizes='100vw'
          className='object-cover object-center scale-[1.02]'
        />
        <div
          aria-hidden
          className='absolute inset-0 bg-gradient-to-r from-brand-ink via-brand-ink/20 to-brand-ink/15'
        />
        <div
          aria-hidden
          className='absolute inset-0 bg-gradient-to-t from-brand-ink via-brand-ink/10 to-brand-ink/20'
        />
        <div
          aria-hidden
          className='pointer-events-none absolute inset-0 opacity-[0.12]'
          style={{
            backgroundImage:
              'linear-gradient(to right, color-mix(in srgb, var(--brand-moss) 45%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in srgb, var(--brand-moss) 45%, transparent) 1px, transparent 1px)',
            backgroundSize: '5rem 5rem',
            maskImage: 'radial-gradient(ellipse at 30% 60%, black 10%, transparent 65%)',
          }}
        />
      </div>

      <Container className='relative z-10 flex flex-1 items-end pb-[4.5rem] pt-[5rem] xsm:items-end xsm:pb-[3rem] xsm:pt-[3.25rem]'>
        <div className='max-w-[48rem] xsm:max-w-none'>
          <Reveal y={18}>
            <div className='mb-[1rem] inline-flex items-center gap-3 border border-white/12 bg-brand-ink/35 px-3 py-1.5 backdrop-blur-sm'>
              <span
                aria-hidden
                className='size-1.5 rounded-full bg-brand-moss'
              />
              <span className='text-[0.65rem] uppercase tracking-[0.24em] text-brand-moss'>
                {data.subtitle}
              </span>
            </div>
          </Reveal>

          <Reveal
            delay={0.06}
            y={30}
          >
            <h1
              id='fields-banner-heading'
              className='font-display text-[4.25rem] font-semibold uppercase leading-[1.25] tracking-wide text-white xsm:text-[2.45rem]'
            >
              {data.title}
            </h1>
          </Reveal>

          <Reveal
            delay={0.12}
            y={22}
          >
            <p className='mt-[1.25rem] max-w-[34rem] font-sans text-[1.05rem] leading-[1.7] text-white/75 xsm:mt-[0.95rem] xsm:text-[0.9rem]'>
              {data.desc}
            </p>
          </Reveal>

          <Reveal
            delay={0.18}
            y={18}
            className='mt-[2rem] flex flex-wrap items-center gap-[0.75rem] xsm:mt-[1.45rem]'
          >
            <BannerCta
              href={data.button_1.url}
              variant='solid'
            >
              {data.button_1.title}
            </BannerCta>
            <BannerCta
              href={data.button_2.url}
              variant='ghost'
            >
              {data.button_2.title}
            </BannerCta>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
