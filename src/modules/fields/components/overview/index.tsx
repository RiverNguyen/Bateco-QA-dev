import { Reveal } from '@/components/shared/reveal'
import type { IFieldsItem } from '@/interfaces/fields.interface'
import Container from '@/layouts/container'
import { cn } from '@/lib/utils'
import { OverviewCard } from '@/modules/fields/components/overview/overview-card'

type FieldsOverviewProps = {
  subtitle: string
  title: string
  desc: string
  fields: IFieldsItem[]
}

export default function FieldsOverview({ subtitle, title, desc, fields }: FieldsOverviewProps) {
  return (
    <section
      id='fields-overview'
      className='relative scroll-mt-[calc(var(--header-height)+1rem)] overflow-hidden border-t border-white/[0.08] bg-brand-ink text-white'
      aria-labelledby='fields-overview-heading'
    >
      <div
        aria-hidden
        className='pointer-events-none absolute inset-0'
        style={{
          background:
            'radial-gradient(ellipse 50% 45% at 8% 0%, color-mix(in srgb, var(--brand-moss) 22%, transparent), transparent 68%), radial-gradient(ellipse 40% 35% at 92% 85%, color-mix(in srgb, var(--brand-moss) 12%, transparent), transparent 70%)',
        }}
      />
      <div
        aria-hidden
        className='pointer-events-none absolute inset-0 opacity-[0.1]'
        style={{
          backgroundImage:
            'linear-gradient(to right, color-mix(in srgb, var(--brand-moss) 40%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in srgb, var(--brand-moss) 40%, transparent) 1px, transparent 1px)',
          backgroundSize: '4.5rem 4.5rem',
          maskImage: 'radial-gradient(ellipse at 40% 20%, black 12%, transparent 70%)',
        }}
      />

      <Container className='relative px-4 py-[5.5rem] xsm:py-[3.25rem]'>
        <div
          className={cn(
            'mb-[3rem] grid grid-cols-[minmax(0,1fr)_minmax(0,24rem)] items-end gap-x-[3.5rem]',
            'xsm:mb-[2rem] xsm:grid-cols-1 xsm:gap-y-[1.1rem]',
          )}
        >
          <Reveal
            y={24}
            animation='rise'
          >
            <p className='text-[0.68rem] font-medium uppercase tracking-[0.24em] text-brand-moss'>
              {subtitle}
            </p>
            <h2
              id='fields-overview-heading'
              className='mt-[0.9rem] max-w-[30rem] font-display text-[3.15rem] font-semibold uppercase leading-[0.98] tracking-wide xsm:text-[1.9rem]'
            >
              {title}
            </h2>
            <span
              aria-hidden
              className='mt-[1.15rem] block h-[0.12rem] w-[2.75rem] bg-brand-moss'
            />
          </Reveal>

          <Reveal
            delay={0.1}
            y={20}
            animation='drift-left'
          >
            <p className='pb-[0.15rem] font-sans text-[0.95rem] leading-[1.75] text-white/55 xsm:pb-0'>
              {desc}
            </p>
          </Reveal>
        </div>

        <div className='grid grid-cols-3 gap-[0.65rem] xsm:grid-cols-1 xsm:gap-[0.5rem]'>
          {fields.map((field, index) => (
            <OverviewCard
              key={field.id}
              field={field}
              index={index}
            />
          ))}
        </div>
      </Container>
    </section>
  )
}
