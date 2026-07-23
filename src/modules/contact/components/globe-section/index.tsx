'use client'

import dynamic from 'next/dynamic'
import { useTranslations } from 'next-intl'

import { Reveal } from '@/components/shared/reveal'
import Container from '@/layouts/container'
import {
  CONTACT_GLOBE_ARCS,
  CONTACT_GLOBE_CONFIG,
} from '@/modules/contact/lib/globe-data'

const World = dynamic(() => import('@/components/ui/globe').then((m) => m.World), {
  ssr: false,
  loading: () => (
    <div
      aria-hidden
      className='size-full animate-pulse bg-gradient-to-b from-brand-moss/10 to-transparent'
    />
  ),
})

export default function ContactGlobeSection() {
  const t = useTranslations('Contact.globe')

  return (
    <section
      className='relative overflow-hidden border-t border-white/[0.08] bg-brand-ink text-white'
      aria-labelledby='contact-globe-heading'
    >
      <div
        aria-hidden
        className='pointer-events-none absolute inset-0'
        style={{
          background:
            'radial-gradient(ellipse 55% 50% at 70% 45%, color-mix(in srgb, var(--brand-moss) 18%, transparent), transparent 65%)',
        }}
      />

      <Container className='relative grid grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] items-center gap-[2rem] px-4 py-[4.5rem] tablet:grid-cols-1 tablet:gap-[1.5rem] xsm:py-[3rem]'>
        <div className='max-w-[28rem] tablet:max-w-none'>
          <Reveal y={18}>
            <p className='text-[0.68rem] uppercase tracking-[0.24em] text-brand-moss'>
              {t('eyebrow')}
            </p>
          </Reveal>
          <Reveal
            delay={0.05}
            y={24}
          >
            <h2
              id='contact-globe-heading'
              className='mt-[0.85rem] font-display text-[2.65rem] font-semibold uppercase leading-[1.05] tracking-wide xsm:text-[1.75rem]'
            >
              {t('title')}
            </h2>
          </Reveal>
          <Reveal
            delay={0.1}
            y={18}
          >
            <p className='mt-[1.1rem] font-sans text-[0.95rem] leading-[1.75] text-white/65 xsm:text-[0.9rem]'>
              {t('description')}
            </p>
          </Reveal>
          <Reveal
            delay={0.14}
            y={12}
          >
            <span
              aria-hidden
              className='mt-[1.35rem] block h-[0.12rem] w-[2.75rem] bg-brand-moss'
            />
          </Reveal>
        </div>

        <Reveal
          delay={0.08}
          y={28}
          className='relative mx-auto aspect-[1.15/1] w-full max-w-[36rem] tablet:max-w-[28rem] xsm:max-w-[22rem]'
        >
          <div
            aria-hidden
            className='pointer-events-none absolute inset-[12%] rounded-full bg-brand-moss/10 blur-3xl'
          />
          <div className='absolute inset-0'>
            <World
              globeConfig={CONTACT_GLOBE_CONFIG}
              data={CONTACT_GLOBE_ARCS}
            />
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
