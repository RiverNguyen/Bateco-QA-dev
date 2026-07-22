'use client'

import Image from 'next/image'

import { Reveal } from '@/components/shared/reveal'
import { IAboutCertification } from '@/interfaces/about.interface'
import { cn } from '@/lib/utils'

export function CertificationCard({ item, index }: { item: IAboutCertification; index: number }) {
  return (
    <Reveal
      as='article'
      delay={0.05 + index * 0.06}
      y={24}
      amount={0.15}
      disableOnMobile
      className='group h-full'
    >
      <div
        className={cn(
          'flex h-full flex-col overflow-hidden border border-white/10 bg-white',
          'shadow-[0_14px_40px_rgba(0,0,0,0.18)]',
          'transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]',
          'xsm:transition-none',
          'group-hover:-translate-y-1 group-hover:shadow-[0_22px_50px_rgba(0,0,0,0.24)]',
          'xsm:group-hover:translate-y-0 xsm:group-hover:shadow-[0_14px_40px_rgba(0,0,0,0.18)]',
        )}
      >
        <div className='relative aspect-[3/4] overflow-hidden bg-[#eef1ef]'>
          <Image
            src={item?.image || ''}
            alt={item?.title || ''}
            fill
            sizes='(max-width: 639px) 78vw, 33vw'
            className='object-contain p-3 transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.02] xsm:transition-none xsm:group-hover:scale-100'
          />
        </div>

        <div className='flex flex-1 flex-col px-4 py-3.5 text-brand-ink'>
          <p className='font-sans text-[0.72rem] uppercase tracking-[0.12em] text-brand-ink/45'>
            {item?.subtitle}
          </p>
          <h3 className='mt-1.5 font-display text-[1rem] font-semibold uppercase leading-tight tracking-wide'>
            {item?.title}
          </h3>
          <div className='mt-auto flex items-center justify-between gap-3 pt-3'>
            <span className='font-sans text-[0.75rem] text-brand-ink/55'>{item?.year}</span>
          </div>
        </div>
      </div>
    </Reveal>
  )
}
