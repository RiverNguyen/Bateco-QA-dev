'use client'

import { Reveal } from '@/components/shared/reveal'
import { IHomepageAreasOfOperation } from '@/interfaces/homepage.interface'
import { cn } from '@/lib/utils'
import {
  ActivityCard,
  type ActivityFieldRef,
} from '@/modules/home/activity-areas/components/activity-card'
import { SectionBackground } from '@/modules/home/activity-areas/components/section-background'
import { AREA_ORDER } from '@/modules/home/activity-areas/lib/constants'

export default function ActivityAreas({
  data,
  fields = [],
}: {
  data: IHomepageAreasOfOperation
  fields?: ActivityFieldRef[]
}) {
  return (
    <section
      id='activity-areas-heading'
      className='relative overflow-hidden border-t border-white/[0.08] bg-brand-ink'
      aria-labelledby='activity-areas-title'
    >
      <SectionBackground />

      <div className='relative z-[1] mx-auto w-full max-w-[95rem] pb-[4rem] pt-[3.25rem] xsm:pt-[2.25rem] xsm:pb-0'>
        <Reveal
          as='header'
          y={20}
        >
          <h2
            id='activity-areas-title'
            className='mb-[1.5rem] font-display text-[2rem] font-semibold uppercase tracking-wide text-white xsm:mb-[1.1rem] xsm:text-[1.5rem] xsm:px-4'
          >
            {data?.title}
          </h2>
        </Reveal>

        <div
          className={cn(
            'grid gap-[0.4rem] xsm:gap-0',
            'min-h-[42rem] grid-cols-3 grid-rows-3',
            "[grid-template-areas:'a_b_c'_'d_e_e'_'d_f_f']",
            'xsm:min-h-0 xsm:grid-cols-1 xsm:grid-rows-none xsm:[grid-template-areas:none]',
          )}
        >
          {Array.isArray(data?.field) &&
            data?.field.length > 0 &&
            data?.field?.map((item, index) => (
              <ActivityCard
                key={index}
                item={item}
                area={AREA_ORDER[index] ?? 'a'}
                delay={0.04 + index * 0.06}
                fields={fields}
              />
            ))}
        </div>
      </div>
    </section>
  )
}
