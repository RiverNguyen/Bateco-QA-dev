'use client'

import { AnimatePresence, motion } from 'motion/react'

import type { IHomepageBannerSlide } from '@/interfaces/homepage.interface'
import { EASE } from '@/modules/home/banner/lib/constants'

type HeroCopyProps = {
  slide: IHomepageBannerSlide
  activeIndex: number
  direction: 1 | -1
  reduceMotion: boolean | null
}

export function HeroCopy({ slide, activeIndex, direction, reduceMotion }: HeroCopyProps) {
  if (reduceMotion) {
    return (
      <div>
        <p className='mb-[0.65rem] font-sans text-[0.75rem] xsm:text-[0.5rem] font-semibold uppercase tracking-[0.18em] text-brand-moss'>
          {slide?.subtitle}
        </p>
        <h2 className='line-clamp-2 font-display text-[3.25rem] font-semibold uppercase leading-[1.3] tracking-wide text-white xsm:text-[1.5rem]'>
          {slide?.title}
        </h2>
      </div>
    )
  }

  return (
    <AnimatePresence
      mode='wait'
      custom={direction}
    >
      <motion.div
        key={activeIndex}
        custom={direction}
        initial='enter'
        animate='center'
        exit='exit'
        variants={{
          enter: (dir: 1 | -1) => ({
            opacity: 0,
            y: 28,
            x: dir * -20,
            filter: 'blur(14px)',
          }),
          center: {
            opacity: 1,
            y: 0,
            x: 0,
            filter: 'blur(0px)',
            transition: {
              duration: 0.7,
              ease: EASE,
              staggerChildren: 0.1,
              delayChildren: 0.12,
            },
          },
          exit: (dir: 1 | -1) => ({
            opacity: 0,
            y: -18,
            x: dir * 16,
            filter: 'blur(10px)',
            transition: { duration: 0.4, ease: EASE },
          }),
        }}
      >
        <motion.p
          variants={{
            enter: { opacity: 0, y: 12, filter: 'blur(8px)' },
            center: {
              opacity: 1,
              y: 0,
              filter: 'blur(0px)',
              transition: { duration: 0.5, ease: EASE },
            },
            exit: { opacity: 0, filter: 'blur(6px)' },
          }}
          className='mb-[0.65rem] font-sans text-[0.75rem] xsm:text-[0.5rem] font-semibold uppercase tracking-[0.18em] text-brand-moss'
        >
          {slide?.subtitle}
        </motion.p>
        <motion.h2
          variants={{
            enter: { opacity: 0, y: 22, filter: 'blur(12px)' },
            center: {
              opacity: 1,
              y: 0,
              filter: 'blur(0px)',
              transition: { duration: 0.65, ease: EASE },
            },
            exit: { opacity: 0, y: -10, filter: 'blur(8px)' },
          }}
          className='line-clamp-2 font-display text-[3.25rem] font-semibold uppercase leading-[1.3] tracking-wide text-white xsm:text-[1.5rem]'
        >
          {slide?.title}
        </motion.h2>
      </motion.div>
    </AnimatePresence>
  )
}
