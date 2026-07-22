import Image from 'next/image'

import { Reveal } from '@/components/shared/reveal'
import type { IFieldsItem } from '@/interfaces/fields.interface'
import Container from '@/layouts/container'
import { cn } from '@/lib/utils'

type FieldDetailProps = {
  field: IFieldsItem
  index: number
}

export function FieldDetail({ field, index }: FieldDetailProps) {
  const alignEnd = index % 2 === 1

  return (
    <section
      id={field.id}
      className='relative min-h-[min(91.5dvh,50rem)] scroll-mt-[var(--header-height)] overflow-hidden border-t border-white/[0.08] bg-brand-ink text-white xsm:min-h-[32rem]'
      aria-labelledby={`field-${field.id}-heading`}
    >
      <div className='absolute inset-0'>
        <Image
          src={field.image}
          alt=''
          fill
          sizes='100vw'
          className='object-cover object-center brightness-[1.08] contrast-[1.05]'
        />
        {/* Soft overall wash — keep scene visible */}
        <div
          aria-hidden
          className='absolute inset-0 bg-brand-ink/25'
        />
        {/* Text-side scrim only */}
        <div
          aria-hidden
          className={cn(
            'absolute inset-y-0 w-[58%] xsm:inset-x-0 xsm:w-full',
            alignEnd
              ? 'right-0 bg-gradient-to-l from-brand-ink/88 via-brand-ink/55 to-transparent'
              : 'left-0 bg-gradient-to-r from-brand-ink/88 via-brand-ink/55 to-transparent',
          )}
        />
        <div
          aria-hidden
          className='absolute inset-x-0 bottom-0 h-[35%] bg-gradient-to-t from-brand-ink/50 to-transparent'
        />
      </div>

      <span
        aria-hidden
        className={cn(
          'pointer-events-none absolute top-[16%] font-display text-[13rem] font-semibold leading-none tracking-wide text-white/[0.07]',
          'xsm:top-[10%] xsm:text-[6.5rem]',
          alignEnd ? 'right-[5%]' : 'left-[4%]',
        )}
      >
        {field.index}
      </span>

      <Container
        className={cn(
          'relative z-10 flex min-h-[min(88dvh,50rem)] items-end px-4 py-[4.25rem]',
          'xsm:min-h-[32rem] xsm:py-[2.5rem]',
          alignEnd ? 'justify-end' : 'justify-start',
        )}
      >
        <div className={cn('w-full max-w-[34rem]', alignEnd && 'text-right xsm:text-left')}>
          <Reveal
            delay={0.06}
            y={28}
          >
            <h2
              id={`field-${field.id}-heading`}
              className='mt-[1.1rem] font-display text-[3rem] font-semibold uppercase leading-[1.02] tracking-wide drop-shadow-[0_2px_24px_rgba(0,0,0,0.45)] xsm:mt-[0.8rem] xsm:text-[1.8rem]'
            >
              {field.title}
            </h2>
          </Reveal>

          <Reveal
            delay={0.1}
            y={22}
          >
            <p
              className={cn(
                'mt-[1rem] font-sans text-[1rem] leading-[1.75] text-white/88',
                'xsm:mt-[0.8rem] xsm:text-[0.9rem]',
                alignEnd ? 'ml-auto xsm:ml-0' : '',
              )}
            >
              {field.desc}
            </p>
          </Reveal>

          <Reveal
            delay={0.14}
            y={18}
          >
            <ul
              className={cn(
                'mt-[1.65rem] grid gap-[0.7rem] border-t border-white/18 pt-[1.25rem]',
                'xsm:mt-[1.25rem] xsm:pt-[1rem]',
                alignEnd && 'justify-items-end xsm:justify-items-start',
              )}
            >
              {(field.highlights ?? []).map((item) => (
                <li
                  key={item}
                  className={cn(
                    'flex items-center gap-3',
                    alignEnd && 'flex-row-reverse xsm:flex-row',
                  )}
                >
                  <span
                    aria-hidden
                    className='h-px w-5 shrink-0 bg-brand-moss'
                  />
                  <span className='font-sans text-[0.85rem] tracking-wide text-white/92'>
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
