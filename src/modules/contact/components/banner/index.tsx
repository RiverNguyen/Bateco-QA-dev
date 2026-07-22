'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'

import { Reveal } from '@/components/shared/reveal'
import { IContactPageData } from '@/interfaces/contact.interface'
import Container from '@/layouts/container'
import { cn } from '@/lib/utils'
import { BannerCta } from '@/modules/about/components/banner/banner-cta'

const CONTACT_HERO_HEIGHT =
  'min-h-[calc(72dvh-var(--header-height))] tablet:min-h-[calc(58dvh-var(--header-height))]'

export default function ContactBanner({ data }: { data: IContactPageData['banner'] }) {
  const t = useTranslations('Contact')

  return (
    <section
      className={cn(
        'relative -mt-[var(--header-height)] flex flex-col overflow-hidden bg-brand-ink pt-[var(--header-height)] text-white',
        CONTACT_HERO_HEIGHT,
      )}
      aria-labelledby='contact-banner-heading'
    >
      <div className='absolute inset-0'>
        <Image
          src={data.image_background}
          alt={data.title}
          fill
          priority
          sizes='100vw'
          className='scale-[1.02] object-cover object-center'
        />
        <div
          aria-hidden
          className='absolute inset-0 bg-gradient-to-r from-brand-ink via-brand-ink/70 to-brand-ink/30'
        />
        <div
          aria-hidden
          className='absolute inset-0 bg-gradient-to-t from-brand-ink via-brand-ink/35 to-brand-ink/50'
        />
        <div
          aria-hidden
          className='pointer-events-none absolute inset-0 opacity-[0.09]'
          style={{
            backgroundImage:
              'linear-gradient(to right, color-mix(in srgb, var(--brand-moss) 45%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in srgb, var(--brand-moss) 45%, transparent) 1px, transparent 1px)',
            backgroundSize: '5rem 5rem',
            maskImage: 'radial-gradient(ellipse at 20% 75%, black 10%, transparent 68%)',
          }}
        />
      </div>

      <Container className='relative z-10 flex flex-1 items-end px-4 pb-[4rem] pt-[3rem] xsm:pb-[2.75rem] xsm:pt-[2rem]'>
        <div className='max-w-[46rem]'>
          <Reveal y={18}>
            <div className='mb-[1rem] inline-flex items-center gap-3 border border-white/12 bg-brand-ink/40 px-3 py-1.5 backdrop-blur-sm'>
              <span
                aria-hidden
                className='size-1.5 rounded-full bg-brand-moss'
              />
              <span className='text-[0.65rem] uppercase tracking-[0.24em] text-brand-moss'>
                {data?.sub_title}
              </span>
            </div>
          </Reveal>

          <Reveal
            delay={0.06}
            y={28}
          >
            <h1
              id='contact-banner-heading'
              className='font-display text-[4rem] font-semibold uppercase leading-[0.95] tracking-wide text-white xsm:text-[2.35rem]'
            >
              {data?.title}
            </h1>
          </Reveal>

          <Reveal
            delay={0.1}
            y={20}
          >
            <p className='mt-[1.15rem] max-w-[34rem] font-sans text-[1.05rem] leading-[1.75] text-white/72 xsm:mt-[0.9rem] xsm:text-[0.9rem]'>
              {data?.desc}
            </p>
          </Reveal>

          <Reveal
            delay={0.14}
            y={16}
            className='mt-[1.75rem] flex flex-wrap items-center gap-3 xsm:mt-[1.35rem]'
          >
            <BannerCta
              href='#contact-form'
              variant='solid'
            >
              {data?.button}
            </BannerCta>
            <BannerCta
              href='tel:+84241234567'
              variant='ghost'
            >
              {t('callNow')}
            </BannerCta>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
