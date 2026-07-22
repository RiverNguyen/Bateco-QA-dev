'use client'

import { motion, useReducedMotion, type TargetAndTransition } from 'motion/react'
import { useRef, useSyncExternalStore } from 'react'

import useIsMobile from '@/hooks/useIsMobile'
import { cn } from '@/lib/utils'

/** Apple-like deceleration — heavy settle, no bounce */
const EASE_OUT = [0.16, 1, 0.3, 1] as const
const emptySubscribe = () => () => {}

type RevealTag = 'div' | 'li' | 'article' | 'header' | 'section' | 'span'

export type RevealAnimation = 'rise' | 'sink' | 'drift-left' | 'drift-right' | 'soft-scale' | 'veil'

const ANIMATIONS: RevealAnimation[] = [
  'rise',
  'sink',
  'drift-left',
  'drift-right',
  'soft-scale',
  'veil',
]

type RevealProps = {
  children: React.ReactNode
  className?: string
  delay?: number
  /** Base travel distance in px @default 36 */
  y?: number
  as?: RevealTag
  once?: boolean
  amount?: number | 'some' | 'all'
  /** Specific motion, or `'random'` (default) */
  animation?: RevealAnimation | 'random'
  /** Skip scroll-in motion on viewports ≤639px */
  disableOnMobile?: boolean
}

const motionTags = {
  div: motion.div,
  li: motion.li,
  article: motion.article,
  header: motion.header,
  section: motion.section,
  span: motion.span,
} as const

type MotionPreset = {
  initial: TargetAndTransition
  animate: TargetAndTransition
  duration: number
}

function pickRandom(): RevealAnimation {
  const index = Math.floor(Math.random() * ANIMATIONS.length)
  return ANIMATIONS[index] ?? 'rise'
}

function getPreset(animation: RevealAnimation, distance: number): MotionPreset {
  const soft = distance * 0.55
  const blur = 'blur(12px)'
  const clear = 'blur(0px)'

  switch (animation) {
    case 'sink':
      return {
        initial: { opacity: 0, y: -soft, filter: blur },
        animate: { opacity: 1, y: 0, filter: clear },
        duration: 1.05,
      }
    case 'drift-left':
      return {
        initial: { opacity: 0, x: -distance * 0.7, y: soft * 0.35, filter: blur },
        animate: { opacity: 1, x: 0, y: 0, filter: clear },
        duration: 1.1,
      }
    case 'drift-right':
      return {
        initial: { opacity: 0, x: distance * 0.7, y: soft * 0.35, filter: blur },
        animate: { opacity: 1, x: 0, y: 0, filter: clear },
        duration: 1.1,
      }
    case 'soft-scale':
      return {
        initial: { opacity: 0, y: soft, scale: 0.96, filter: blur },
        animate: { opacity: 1, y: 0, scale: 1, filter: clear },
        duration: 1.15,
      }
    case 'veil':
      return {
        initial: {
          opacity: 0,
          y: soft * 0.5,
          clipPath: 'inset(18% 0 18% 0)',
          filter: blur,
        },
        animate: {
          opacity: 1,
          y: 0,
          clipPath: 'inset(0% 0 0% 0)',
          filter: clear,
        },
        duration: 1.2,
      }
    case 'rise':
    default:
      return {
        initial: { opacity: 0, y: distance, filter: blur },
        animate: { opacity: 1, y: 0, filter: clear },
        duration: 1.05,
      }
  }
}

function useRevealAnimation(animation: RevealAnimation | 'random'): RevealAnimation {
  const pickedRef = useRef<RevealAnimation | null>(null)

  return useSyncExternalStore(
    emptySubscribe,
    () => {
      if (animation !== 'random') return animation
      if (!pickedRef.current) pickedRef.current = pickRandom()
      return pickedRef.current
    },
    () => (animation === 'random' ? 'rise' : animation),
  )
}

export function Reveal({
  children,
  className,
  delay = 0,
  y = 36,
  as = 'div',
  once = true,
  amount = 0.2,
  animation = 'random',
  disableOnMobile = false,
}: RevealProps) {
  const reduceMotion = useReducedMotion()
  const isMobile = useIsMobile()
  const MotionTag = motionTags[as]
  const resolved = useRevealAnimation(animation)

  if (reduceMotion || (disableOnMobile && isMobile)) {
    const Tag = as
    return <Tag className={className}>{children}</Tag>
  }

  const { initial, animate, duration } = getPreset(resolved, y)

  return (
    <MotionTag
      className={cn(className)}
      initial={initial}
      whileInView={animate}
      viewport={{ once, amount, margin: '0px 0px -6% 0px' }}
      transition={{
        duration,
        delay,
        ease: EASE_OUT,
        opacity: { duration: duration * 0.85, delay, ease: EASE_OUT },
        filter: { duration: duration * 0.9, delay, ease: EASE_OUT },
      }}
    >
      {children}
    </MotionTag>
  )
}
