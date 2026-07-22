'use client'

import NumberFlow, { continuous } from '@number-flow/react'
import { useInView } from 'motion/react'
import { useEffect, useRef, useState } from 'react'

import { Reveal } from '@/components/shared/reveal'
import { IAboutUsParameter } from '@/interfaces/about.interface'
import { cn } from '@/lib/utils'

import type { AboutIntroStat } from '@/modules/about/lib/intro-data'

const FLOW_TIMING = {
  duration: 2200,
  easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
} as const

function StatValue({
  value,
  suffix,
  active,
}: Pick<AboutIntroStat, 'value' | 'suffix'> & { active: boolean }) {
  return (
    <span className='font-display text-[3.25rem] font-semibold leading-none tracking-wide text-brand-ink xsm:text-[2.5rem]'>
      <NumberFlow
        value={active ? value : 0}
        suffix={suffix}
        trend={1}
        plugins={[continuous]}
        spinTiming={FLOW_TIMING}
        transformTiming={FLOW_TIMING}
        opacityTiming={{ duration: 450, easing: 'ease-out' }}
      />
    </span>
  )
}

export function IntroStats({ stats }: { stats: IAboutUsParameter[] }) {
  const listRef = useRef<HTMLUListElement>(null)
  const inView = useInView(listRef, {
    once: true,
    amount: 0.45,
    margin: '0px 0px -18% 0px',
  })
  const [active, setActive] = useState(false)

  useEffect(() => {
    if (!inView) return

    const timer = window.setTimeout(() => setActive(true), 80)
    return () => window.clearTimeout(timer)
  }, [inView])

  if (!stats.length) return null

  return (
    <Reveal
      delay={0.2}
      y={24}
      className='mt-[3rem] border-t border-brand-ink/15 pt-[2rem] xsm:mt-[2.25rem] xsm:pt-[1.5rem]'
    >
      <ul
        ref={listRef}
        className={cn(
          'grid grid-cols-4 divide-x divide-brand-ink/15',
          'xsm:grid-cols-2 xsm:divide-x-0',
        )}
      >
        {Array.isArray(stats) &&
          stats.length > 0 &&
          stats.map((stat, index) => (
            <li
              key={stat.number}
              className={cn(
                'flex flex-col px-[1.5rem] first:pl-0 last:pr-0',
                'xsm:px-0 xsm:py-[1rem]',
                index % 2 === 1 && 'xsm:border-l xsm:border-brand-ink/15 xsm:pl-[1rem]',
                index >= 2 && 'xsm:border-t xsm:border-brand-ink/15',
              )}
            >
              <StatValue
                value={Number(stat.number)}
                active={active}
              />
              <span className='mt-[0.65rem] font-sans text-[0.8rem] font-medium uppercase tracking-[0.12em] text-brand-ink/55'>
                {stat?.title}
              </span>
            </li>
          ))}
      </ul>
    </Reveal>
  )
}
