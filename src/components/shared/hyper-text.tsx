'use client'

import {
  motion,
  type DOMMotionComponents,
  type HTMLMotionProps,
  type MotionProps,
} from 'motion/react'
import {
  useEffect,
  useRef,
  useState,
  type ComponentType,
  type ReactNode,
  type RefAttributes,
} from 'react'

import { cn } from '@/lib/utils'

type CharacterSet = string[] | readonly string[]

const motionElements = {
  article: motion.article,
  div: motion.div,
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  h4: motion.h4,
  h5: motion.h5,
  h6: motion.h6,
  li: motion.li,
  p: motion.p,
  section: motion.section,
  span: motion.span,
} as const

type MotionElementType = Extract<keyof DOMMotionComponents, keyof typeof motionElements>
type HyperTextMotionComponent = ComponentType<
  Omit<HTMLMotionProps<'div'>, 'ref'> & RefAttributes<HTMLElement>
>

interface HyperTextProps extends Omit<MotionProps, 'children'> {
  /** The text content to be animated */
  children: string
  /** Optional className for styling */
  className?: string
  /** Duration of the animation in milliseconds */
  duration?: number
  /** Delay before animation starts in milliseconds */
  delay?: number
  /** Component to render as - defaults to div */
  as?: MotionElementType
  /** Whether to start animation when element comes into view */
  startOnView?: boolean
  /** Whether to trigger animation on hover */
  animateOnHover?: boolean
  /** External trigger — when true, starts the scramble (skips mount auto-start) */
  trigger?: boolean
  /** Custom character set for scramble effect. Defaults to uppercase alphabet */
  characterSet?: CharacterSet
}

const DEFAULT_CHARACTER_SET = Object.freeze(
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split(''),
) as readonly string[]

const getRandomInt = (max: number): number => Math.floor(Math.random() * max)

function renderHyperTextCharacters(children: string, displayText: string[]): ReactNode[] {
  const nodes: ReactNode[] = []
  let charIndex = 0
  let nodeKey = 0

  for (const token of children.split(/(\s+)/)) {
    if (!token) continue

    if (/^\s+$/.test(token)) {
      nodes.push(<span key={`s-${nodeKey++}`}>{token}</span>)
      charIndex += token.length
      continue
    }

    nodes.push(
      <span
        key={`w-${nodeKey++}`}
        className='inline-block whitespace-nowrap'
      >
        {token.split('').map((_, offset) => {
          const index = charIndex + offset
          const letter = displayText[index] ?? children[index]
          const finalLetter = children[index] ?? letter

          return (
            <span
              key={index}
              className='relative inline-block'
            >
              <span
                className='invisible'
                aria-hidden
              >
                {finalLetter}
              </span>
              <span className='absolute inset-0 flex justify-center'>{letter}</span>
            </span>
          )
        })}
      </span>,
    )
    charIndex += token.length
  }

  return nodes
}

export function HyperText({
  children,
  className,
  duration = 800,
  delay = 0,
  as: Component = 'div',
  startOnView = false,
  animateOnHover = true,
  trigger,
  characterSet = DEFAULT_CHARACTER_SET,
  ...props
}: HyperTextProps) {
  const MotionComponent = motionElements[Component] as HyperTextMotionComponent
  const isControlled = trigger !== undefined

  const [displayText, setDisplayText] = useState<string[]>(() => children.split(''))
  const [isAnimating, setIsAnimating] = useState(false)
  const [prevTrigger, setPrevTrigger] = useState(trigger)
  const iterationCount = useRef(0)
  const elementRef = useRef<HTMLElement | null>(null)

  // Sync animation start/reset to `trigger` during render (avoid setState-in-effect)
  if (isControlled && trigger !== prevTrigger) {
    setPrevTrigger(trigger)
    setDisplayText(children.split(''))
    setIsAnimating(Boolean(trigger))
  }

  const handleAnimationTrigger = () => {
    if (animateOnHover && !isAnimating) {
      setDisplayText(children.split(''))
      setIsAnimating(true)
    }
  }

  // Uncontrolled: start on mount delay or when in view
  useEffect(() => {
    if (isControlled) return

    if (!startOnView) {
      const startTimeout = setTimeout(() => {
        setIsAnimating(true)
      }, delay)
      return () => clearTimeout(startTimeout)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsAnimating(true)
          }, delay)
          observer.disconnect()
        }
      },
      { threshold: 0.1, rootMargin: '-30% 0px -30% 0px' },
    )

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => observer.disconnect()
  }, [delay, startOnView, isControlled])

  // Scramble frames — setState only from rAF (external timing source)
  useEffect(() => {
    if (!isAnimating) return

    let animationFrameId: number | null = null
    const maxIterations = children.length
    const startTime = performance.now()
    iterationCount.current = 0

    let cancelled = false

    const animate = (currentTime: number) => {
      if (cancelled) return
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)

      iterationCount.current = progress * maxIterations

      setDisplayText((currentText) =>
        currentText.map((letter, index) => {
          const target = children[index]
          if (!target || target === ' ') return target ?? letter
          if (!/[A-Za-z]/.test(target)) return target
          return index <= iterationCount.current
            ? target
            : characterSet[getRandomInt(characterSet.length)]
        }),
      )

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate)
      } else {
        setIsAnimating(false)
      }
    }

    animationFrameId = requestAnimationFrame(animate)

    return () => {
      cancelled = true
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId)
      }
      setDisplayText(children.split(''))
      setIsAnimating(false)
    }
  }, [children, duration, isAnimating, characterSet])

  return (
    <MotionComponent
      ref={elementRef}
      className={cn('overflow-hidden', className)}
      onMouseEnter={handleAnimationTrigger}
      {...props}
    >
      {renderHyperTextCharacters(children, displayText)}
    </MotionComponent>
  )
}
