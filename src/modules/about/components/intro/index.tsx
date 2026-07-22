import Image from 'next/image'

import { Reveal } from '@/components/shared/reveal'
import { IAboutUs } from '@/interfaces/about.interface'
import Container from '@/layouts/container'
import { cn } from '@/lib/utils'
import { IntroStats } from '@/modules/about/components/intro/intro-stats'

export default function AboutIntro({ data }: { data: IAboutUs }) {
  return (
    <section
      className='bg-[#e7ebe8] text-brand-ink'
      aria-labelledby='about-page-intro-heading'
    >
      <Container className='py-[4.5rem] xsm:py-[3rem]'>
        <div
          className={cn(
            'grid grid-cols-[minmax(0,1fr)_minmax(0,0.92fr)] items-start gap-x-[3.5rem]',
            'xsm:grid-cols-1 xsm:gap-y-[1.75rem]',
          )}
        >
          <div>
            <Reveal y={20}>
              <p className='font-sans text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-brand-moss'>
                {data?.subtitle}
              </p>
            </Reveal>

            <Reveal
              delay={0.06}
              y={28}
            >
              <h2
                id='about-page-intro-heading'
                className='mt-[0.85rem] max-w-[34rem] font-display text-[2.85rem] font-semibold uppercase leading-[1.05] tracking-wide xsm:max-w-none xsm:text-[1.85rem]'
              >
                {data?.title}
              </h2>
            </Reveal>

            <Reveal
              delay={0.1}
              y={22}
            >
              <div
                className='mt-[1.25rem] max-w-[36rem] font-sans text-[1.05rem] leading-[1.7] text-brand-ink/80 xsm:mt-[1rem] xsm:text-[0.95rem]'
                dangerouslySetInnerHTML={{ __html: data?.desc || '' }}
              />
            </Reveal>

            {/* <div className='mt-[1.15rem] flex max-w-[36rem] flex-col gap-[0.9rem] xsm:mt-[0.9rem]'>
              {data.paragraphs.map((paragraph, index) => (
                <Reveal
                  key={index}
                  delay={0.14 + index * 0.05}
                  y={18}
                >
                  <p className='font-sans text-[0.95rem] leading-relaxed text-brand-ink/65'>
                    {paragraph}
                  </p>
                </Reveal>
              ))}
            </div> */}
          </div>

          <Reveal
            delay={0.12}
            y={36}
            className='relative min-h-[28rem] w-full overflow-hidden bg-brand-ink/10 xsm:min-h-[18rem]'
          >
            <Image
              src={data?.image || ''}
              alt={data?.title || ''}
              fill
              sizes='(max-width: 639px) 100vw, 46vw'
              className='object-cover'
            />
          </Reveal>
        </div>

        <IntroStats stats={data?.parameter || []} />
      </Container>
    </section>
  )
}
