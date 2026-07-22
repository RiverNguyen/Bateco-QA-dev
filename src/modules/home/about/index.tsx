import Image from 'next/image'
import { getTranslations } from 'next-intl/server'

import { ArrowLink } from '@/components/shared/arrow-link'
import { Reveal } from '@/components/shared/reveal'
import { IHomepageAbout } from '@/interfaces/homepage.interface'
import Container from '@/layouts/container'
import { cn } from '@/lib/utils'
import { AboutDetails } from '@/modules/home/about/components/about-details'

export default async function AboutIntro({ data }: { data: IHomepageAbout }) {
  const t = await getTranslations('Home')

  return (
    <section
      className='bg-[#e7ebe8] text-brand-ink'
      aria-labelledby='about-intro-heading'
    >
      <Container className='py-[3.5rem] xsm:py-[2.5rem]'>
        <Reveal
          as='header'
          className='flex items-end justify-between gap-[1.5rem] border-b border-brand-ink/15 pb-[1.15rem]'
        >
          <h2
            id='about-intro-heading'
            className='font-display text-[2.75rem] font-semibold uppercase leading-none tracking-wide xsm:text-[1.85rem]'
          >
            {t('aboutEyebrow')}
          </h2>
          <ArrowLink
            href={data?.link?.url}
            variant='ink'
            className='mb-[0.35rem] shrink-0 xsm:mb-[0.15rem]'
          >
            {data?.link?.title}
          </ArrowLink>
        </Reveal>

        <div
          className={cn(
            'grid grid-cols-2 items-start gap-x-[3.5rem] pt-[2.25rem]',
            'xsm:grid-cols-1 xsm:gap-y-[1.75rem] xsm:pt-[1.75rem]',
          )}
        >
          <Reveal
            className='flex flex-col'
            delay={0.08}
          >
            <p className='font-sans text-[0.75rem] font-medium uppercase tracking-[0.12em] text-brand-ink/55'>
              {data?.subtitle}
            </p>

            <h3 className='mt-[1rem] max-w-[28rem] font-display text-[2.15rem] font-semibold uppercase leading-[1.08] tracking-wide xsm:text-[1.55rem]'>
              {data?.title}
            </h3>

            <div className='mt-[1.25rem] flex max-w-[34rem] flex-col gap-[1rem]'>
              <div
                className='font-sans text-[0.95rem] leading-relaxed text-brand-ink/75'
                dangerouslySetInnerHTML={{ __html: data?.desc }}
              />
            </div>

            <AboutDetails details={data?.detail} />
          </Reveal>

          <Reveal
            className='relative h-full min-h-[22rem] w-full overflow-hidden bg-brand-ink/10 xsm:min-h-[18rem]'
            delay={0.16}
            y={36}
          >
            <Image
              src={data?.image}
              alt={data?.title}
              fill
              sizes='(max-width: 639px) 100vw, 48vw'
              className='object-cover'
            />
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
