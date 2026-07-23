import Image from 'next/image'

import { Reveal } from '@/components/shared/reveal'
import type { INewsPage } from '@/interfaces/news.interface'
import Container from '@/layouts/container'
import { cn } from '@/lib/utils'
import { NEWS_HERO_HEIGHT } from '@/modules/news/lib/page-data'

export default function NewsBanner({ data }: { data: INewsPage['banner'] }) {
  return (
    <section
      className={cn('relative flex flex-col overflow-hidden bg-brand-ink', NEWS_HERO_HEIGHT)}
      aria-labelledby='news-banner-heading'
    >
      <div className='absolute inset-0'>
        <Image
          src={data?.image}
          alt=''
          fill
          priority
          sizes='100vw'
          className='scale-[1.02] object-cover object-center'
        />
        <div
          aria-hidden
          className='absolute inset-0 bg-gradient-to-r from-brand-ink via-brand-ink/55 to-brand-ink/25'
        />
        <div
          aria-hidden
          className='absolute inset-0 bg-gradient-to-t from-brand-ink via-brand-ink/25 to-brand-ink/40'
        />
        <div
          aria-hidden
          className='pointer-events-none absolute inset-0 opacity-[0.1]'
          style={{
            backgroundImage:
              'linear-gradient(to right, color-mix(in srgb, var(--brand-moss) 45%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in srgb, var(--brand-moss) 45%, transparent) 1px, transparent 1px)',
            backgroundSize: '5rem 5rem',
            maskImage: 'radial-gradient(ellipse at 25% 70%, black 12%, transparent 68%)',
          }}
        />
      </div>

      <Container className='relative z-10 flex flex-1 items-end px-4 pb-[4rem] pt-[4.5rem] xsm:pb-[2.75rem] xsm:pt-[3rem]'>
        <div className='max-w-[42rem]'>
          <Reveal y={18}>
            <div className='mb-[1rem] inline-flex items-center gap-3 border border-white/12 bg-brand-ink/40 px-3 py-1.5 backdrop-blur-sm'>
              <span
                aria-hidden
                className='size-1.5 rounded-full bg-brand-moss'
              />
              <span className='text-[0.65rem] uppercase tracking-[0.24em] text-brand-moss'>
                {data?.badge}
              </span>
            </div>
          </Reveal>

          <Reveal
            delay={0.06}
            y={28}
          >
            <h1
              id='news-banner-heading'
              className='font-display text-[4rem] font-semibold uppercase leading-[1.25] tracking-wide text-white xsm:text-[2.35rem]'
            >
              {data?.title}
            </h1>
          </Reveal>

          <Reveal
            delay={0.12}
            y={20}
          >
            <p className='mt-[1.15rem] max-w-[32rem] font-sans text-[1.05rem] leading-[1.7] text-white/72 xsm:mt-[0.9rem] xsm:text-[0.9rem]'>
              {data?.desc}
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
