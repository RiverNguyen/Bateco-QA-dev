'use client'

import Image from 'next/image'

import { Reveal } from '@/components/shared/reveal'
import useIsMobile from '@/hooks/useIsMobile'
import { IHomepageCustomer } from '@/interfaces/homepage.interface'
import { cn } from '@/lib/utils'

type IdentityPlateProps = {
  customer: IHomepageCustomer
  index: number
  delay: number
}

export function IdentityPlate({ customer, index, delay }: IdentityPlateProps) {
  const isMobile = useIsMobile()

  const className = cn(
    'group relative flex min-h-[26rem] min-w-[15rem] flex-1 flex-col justify-between overflow-hidden',
    'border-r border-brand-ink/10 last:border-r-0',
    'bg-white',
    'transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]',
    'hover:bg-[#f3f6f4]',
    'xsm:min-h-[21rem] xsm:w-[78vw] xsm:min-w-[78vw] xsm:shrink-0 xsm:snap-center',
    'xsm:border xsm:border-brand-ink/10 xsm:last:border-r',
  )

  const content = (
    <>
      <span
        aria-hidden
        className={cn(
          'pointer-events-none absolute -bottom-[0.55rem] right-[-0.1rem]',
          'font-display text-[8.5rem] font-semibold leading-none tracking-tight text-brand-ink/[0.05]',
          'transition-colors duration-500 group-hover:text-brand-moss/20',
          'xsm:text-[6.5rem]',
        )}
      >
        {String(index + 1).padStart(2, '0')}
      </span>

      <div className='relative z-[1] flex items-start justify-between px-[1.15rem] pt-[1.15rem] xsm:px-[1rem] xsm:pt-[1rem]'>
        <span className='font-sans text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-brand-moss'>
          {customer?.subtitle}
        </span>
      </div>

      <div className='relative z-[1] flex flex-1 items-center justify-center px-[1.25rem]'>
        <div
          className={cn(
            'flex size-[8.5rem] items-center justify-center',
            'transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]',
            'group-hover:scale-[1.05]',
            'xsm:size-[6.75rem]',
          )}
        >
          <Image
            src={customer?.image}
            alt={customer?.title}
            width={160}
            height={120}
            className='h-full w-full object-contain'
          />
        </div>
      </div>

      <div className='relative z-[1] px-[1.15rem] pb-[1.35rem] xsm:px-[1rem] xsm:pb-[1.15rem]'>
        <h3 className='max-w-[11rem] font-display text-[1.2rem] font-semibold uppercase leading-[1.15] tracking-wide text-brand-ink xsm:max-w-[12rem] xsm:text-[1.1rem]'>
          {customer?.title}
        </h3>
        <span
          aria-hidden
          className={cn(
            'mt-[0.85rem] block h-[0.12rem] w-[2rem] origin-left bg-brand-moss',
            'scale-x-50 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]',
            'group-hover:scale-x-100',
            'xsm:mt-[0.7rem]',
          )}
        />
      </div>
    </>
  )

  if (isMobile) {
    return <article className={className}>{content}</article>
  }

  return (
    <Reveal
      as='article'
      animation='drift-right'
      delay={delay}
      y={48}
      amount={0.12}
      className={className}
    >
      {content}
    </Reveal>
  )
}
