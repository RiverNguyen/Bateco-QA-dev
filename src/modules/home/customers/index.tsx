'use client'

import { Reveal } from '@/components/shared/reveal'
import { IHomepageCustomers } from '@/interfaces/homepage.interface'
import Container from '@/layouts/container'
import { cn } from '@/lib/utils'
import { IdentityPlate } from '@/modules/home/customers/components/identity-plate'

export default function Customers({ data }: { data: IHomepageCustomers }) {
  return (
    <section
      className='relative overflow-hidden bg-[#e7ebe8] text-brand-ink'
      aria-labelledby='customers-heading'
    >
      <Container className='relative z-[1] pt-[3.25rem] xsm:pt-[2.75rem]'>
        <Reveal
          className={cn(
            'mb-[1.75rem] grid grid-cols-[1fr_auto] items-end gap-[1.5rem]',
            'xsm:mb-[1.5rem] xsm:grid-cols-1 xsm:gap-[0.85rem]',
          )}
        >
          <div>
            <p className='mb-[0.45rem] font-sans text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-brand-moss'>
              {data?.subtitle}
            </p>
            <h2
              id='customers-heading'
              className='max-w-[26rem] font-display text-[2.5rem] font-semibold uppercase leading-[1.02] tracking-wide text-brand-ink xsm:max-w-none xsm:text-[1.75rem]'
            >
              {data?.title}
            </h2>
          </div>
          <p className='max-w-[24rem] pb-[0.2rem] text-right font-sans text-[0.875rem] leading-relaxed text-brand-ink/55 xsm:max-w-none xsm:pb-0 xsm:text-left'>
            {data?.desc}
          </p>
        </Reveal>
      </Container>

      <div className='relative z-[1] mx-auto w-full max-w-[95rem] overflow-hidden pb-[3.5rem] xsm:overflow-visible xsm:pb-[3rem]'>
        <div
          className={cn(
            'flex border-y border-brand-ink/10',
            'hidden_scroll xsm:gap-[0.75rem] xsm:overflow-x-auto xsm:border-y-0 xsm:px-4 xsm:pb-[0.15rem]',
            'xsm:snap-x xsm:snap-mandatory',
          )}
        >
          {Array.isArray(data?.customer_array) &&
            data?.customer_array.length > 0 &&
            data?.customer_array?.map((customer, index) => (
              <IdentityPlate
                key={index}
                customer={customer}
                index={index}
                delay={index * 0.14}
              />
            ))}
        </div>
      </div>
    </section>
  )
}
