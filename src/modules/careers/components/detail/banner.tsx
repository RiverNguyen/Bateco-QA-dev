import { Banknote, BriefcaseBusiness, Clock } from 'lucide-react'
import Image from 'next/image'

import { Reveal } from '@/components/shared/reveal'
import { getLocalePath, type LocaleCode } from '@/i18n/locale-paths'
import { Link } from '@/i18n/navigation'
import type { ICareersDetail } from '@/interfaces/careers.interface'
import Container from '@/layouts/container'
import { formatCareerDate } from '@/modules/careers/lib/careers-data'

type CareerDetailBannerProps = {
  job: ICareersDetail
  locale: LocaleCode
}

export async function CareerDetailBanner({ job, locale }: CareerDetailBannerProps) {
  const category = job.taxonomies?.careers_tax?.[0]
  const image = job.thumbnail?.url
  const careersHref = getLocalePath('careers', locale)

  return (
    <section
      className='relative -mt-[var(--header-height)] overflow-hidden bg-brand-ink pt-[var(--header-height)] text-white'
      aria-labelledby='career-detail-heading'
    >
      {image ? (
        <div className='absolute inset-0'>
          <Image
            src={image}
            alt=''
            fill
            priority
            sizes='100vw'
            className='scale-[1.02] object-cover object-center'
          />
          <div
            aria-hidden
            className='absolute inset-0 bg-gradient-to-r from-brand-ink/90 via-brand-ink/55 to-brand-ink/35'
          />
          <div
            aria-hidden
            className='absolute inset-0 bg-gradient-to-t from-brand-ink/90 via-brand-ink/30 to-brand-ink/25'
          />
        </div>
      ) : (
        <div
          aria-hidden
          className='absolute inset-0'
          style={{
            background:
              'radial-gradient(ellipse 55% 45% at 85% 15%, color-mix(in srgb, var(--brand-moss) 22%, transparent), transparent 60%), radial-gradient(ellipse 40% 35% at 10% 90%, color-mix(in srgb, var(--brand-moss) 12%, transparent), transparent 70%)',
          }}
        />
      )}

      <div
        aria-hidden
        className='pointer-events-none absolute inset-0 opacity-[0.09]'
        style={{
          backgroundImage:
            'linear-gradient(to right, color-mix(in srgb, var(--brand-moss) 45%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in srgb, var(--brand-moss) 45%, transparent) 1px, transparent 1px)',
          backgroundSize: '5rem 5rem',
          maskImage: 'radial-gradient(ellipse at 20% 80%, black 10%, transparent 70%)',
        }}
      />

      <Container className='relative z-10 px-4 pb-[3.5rem] pt-[3.25rem] xsm:pb-[2.5rem] xsm:pt-[2.25rem]'>
        <Reveal
          delay={0.05}
          y={18}
          disableOnMobile
        >
          <div className='mt-5 flex flex-wrap items-center gap-x-4 gap-y-2'>
            {category ? (
              <Link
                href={`${careersHref}?category=${category.slug}`}
                className='inline-flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.22em] text-brand-moss transition-colors hover:text-white'
              >
                <span
                  aria-hidden
                  className='size-1.5 rounded-full bg-brand-moss'
                />
                {category.name}
              </Link>
            ) : null}
          </div>
        </Reveal>

        <Reveal
          delay={0.08}
          y={28}
          disableOnMobile
        >
          <h1
            id='career-detail-heading'
            className='mt-[1.1rem] max-w-[48rem] font-display text-[3.5rem] font-semibold uppercase leading-[1.05] tracking-wide text-white xsm:text-[2.1rem]'
          >
            {job.title}
          </h1>
        </Reveal>

        {job.post_excerpt ? (
          <Reveal
            delay={0.12}
            y={18}
            disableOnMobile
          >
            <p className='mt-[1.15rem] max-w-[36rem] font-sans text-[1.02rem] leading-[1.75] text-white/65 xsm:text-[0.92rem]'>
              {job.post_excerpt}
            </p>
          </Reveal>
        ) : null}

        <Reveal
          delay={0.16}
          y={14}
          disableOnMobile
        >
          <ul className='mt-[1.75rem] flex flex-wrap gap-2'>
            {job.acf?.wage ? (
              <li className='inline-flex items-center gap-1.5 border border-brand-moss/35 bg-brand-moss/15 px-3 py-1.5 font-sans text-[0.8rem] text-brand-moss'>
                <Banknote
                  className='size-3.5'
                  strokeWidth={1.35}
                />
                {job.acf.wage}
              </li>
            ) : null}
            {job.acf?.type ? (
              <li className='inline-flex items-center gap-1.5 border border-white/12 bg-white/[0.04] px-3 py-1.5 font-sans text-[0.8rem] text-white/70'>
                <BriefcaseBusiness
                  className='size-3.5 text-brand-moss'
                  strokeWidth={1.35}
                />
                {job.acf.type}
              </li>
            ) : null}
            {job.acf?.date ? (
              <li className='inline-flex items-center gap-1.5 border border-white/12 bg-white/[0.04] px-3 py-1.5 font-sans text-[0.8rem] text-white/70'>
                <Clock
                  className='size-3.5 text-brand-moss'
                  strokeWidth={1.35}
                />
                {formatCareerDate(job.acf.date, locale)}
              </li>
            ) : null}
          </ul>
        </Reveal>
      </Container>
    </section>
  )
}
