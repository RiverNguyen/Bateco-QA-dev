import { Reveal } from '@/components/shared/reveal'
import { IHomepageCoreValues } from '@/interfaces/homepage.interface'
import Container from '@/layouts/container'
import { cn } from '@/lib/utils'
import { SectionBackground } from '@/modules/home/core-values/components/section-background'
import { ValueRow } from '@/modules/home/core-values/components/value-row'

export default function CoreValues({ data }: { data: IHomepageCoreValues }) {
  return (
    <section
      className='relative overflow-hidden bg-brand-ink'
      aria-labelledby='core-values-heading'
    >
      <SectionBackground />

      <Container className='relative py-[5rem] pb-[5.5rem] xsm:py-[3rem] xsm:pb-[3.25rem]'>
        <div
          className={cn(
            'grid grid-cols-[minmax(0,34rem)_1fr] items-start gap-x-[3rem]',
            'xsm:grid-cols-1 xsm:gap-y-[2rem]',
          )}
        >
          <Reveal
            as='header'
            className='sticky top-[calc(var(--header-height)+1.5rem)] xsm:static'
          >
            <p className='font-sans text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-brand-moss'>
              {data?.subtitle}
            </p>
            <h2
              id='core-values-heading'
              className='mt-[0.85rem] max-w-[28rem] font-display text-[2.85rem] font-semibold uppercase leading-[1.02] tracking-wide text-white xsm:max-w-none xsm:text-[1.85rem]'
            >
              {data?.title}
            </h2>
            <p className='mt-[1.15rem] max-w-[26rem] font-sans text-[0.9rem] leading-relaxed text-white/50 xsm:max-w-none'>
              {data?.desc}
            </p>
            <span
              aria-hidden
              className='mt-[1.75rem] block h-[0.12rem] w-[2.5rem] bg-brand-moss xsm:mt-[1.25rem]'
            />
          </Reveal>

          <ol className='group/values list-none border-b border-white/10'>
            {Array.isArray(data?.values) &&
              data?.values.length > 0 &&
              data?.values?.map((item, index) => (
                <ValueRow
                  key={index}
                  item={item}
                  delay={0.06 + index * 0.07}
                  index={index}
                />
              ))}
          </ol>
        </div>
      </Container>
    </section>
  )
}
