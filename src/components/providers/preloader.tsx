'use client'

import { motion, useReducedMotion } from 'motion/react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { useEffect, useMemo, useState } from 'react'

import { cn } from '@/lib/utils'

const STORAGE_KEY = 'bateco-preloader-seen'
const EASE = [0.16, 1, 0.3, 1] as const

const STATUS_STEP_KEYS = ['init', 'secure', 'sync', 'ready'] as const

type Phase = 'loading' | 'leaving' | 'done'

function hasSeenPreloader() {
  try {
    return sessionStorage.getItem(STORAGE_KEY) === '1'
  } catch {
    return false
  }
}

function markPreloaderSeen() {
  try {
    sessionStorage.setItem(STORAGE_KEY, '1')
  } catch {
    /* private mode */
  }
  document.documentElement.dataset.preloader = 'done'
}

function OrbitalRings({ progress }: { progress: number }) {
  const circumference = 2 * Math.PI * 92
  const sweep = Math.min(1, progress / 100)

  return (
    <div
      aria-hidden
      className='pointer-events-none absolute inset-[-2.4rem]'
    >
      <svg
        viewBox='0 0 200 200'
        className='size-full -rotate-90'
      >
        <circle
          cx='100'
          cy='100'
          r='78'
          fill='none'
          stroke='rgba(255,255,255,0.07)'
          strokeWidth='0.6'
          strokeDasharray='2 7'
        />
        <circle
          cx='100'
          cy='100'
          r='92'
          fill='none'
          stroke='rgba(107,144,120,0.2)'
          strokeWidth='0.55'
        />
        <circle
          cx='100'
          cy='100'
          r='92'
          fill='none'
          stroke='var(--brand-moss)'
          strokeWidth='1.35'
          strokeLinecap='butt'
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - sweep)}
          className='transition-[stroke-dashoffset] duration-150 ease-out'
        />
      </svg>

      <motion.div
        className='absolute inset-0'
        animate={{ rotate: 360 }}
        transition={{ duration: 10, ease: 'linear', repeat: Infinity }}
      >
        <span className='absolute left-1/2 top-[0.15rem] size-[0.32rem] -translate-x-1/2 bg-brand-moss shadow-[0_0_12px_var(--brand-moss)]' />
      </motion.div>
    </div>
  )
}

export default function Preloader() {
  const t = useTranslations('Preloader')
  const tCommon = useTranslations('Common')
  const reduceMotion = useReducedMotion()
  const [phase, setPhase] = useState<Phase>('loading')
  const [progress, setProgress] = useState(0)

  const shouldSkip =
    Boolean(reduceMotion) ||
    (typeof window !== 'undefined' &&
      (document.documentElement.dataset.preloader === 'done' || hasSeenPreloader()))

  // Derive skip → done during render (avoid sync setState in effect)
  if (shouldSkip && phase !== 'done') {
    setPhase('done')
  }

  const statusIndex = useMemo(() => {
    if (progress < 28) return 0
    if (progress < 55) return 1
    if (progress < 82) return 2
    return 3
  }, [progress])

  const statusLine = t(`steps.${STATUS_STEP_KEYS[statusIndex]}`)

  useEffect(() => {
    if (phase === 'done') {
      markPreloaderSeen()
      return
    }

    if (phase !== 'loading') return

    document.documentElement.dataset.preloader = 'active'
    document.body.setAttribute('data-scroll-locked', '')

    let leaveTimer = 0
    let raf = 0
    const duration = 2500
    const start = performance.now()

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      const eased = t < 0.82 ? (t / 0.82) * 0.9 : 0.9 + ((t - 0.82) / 0.18) * 0.1
      const curved = 1 - (1 - Math.min(1, eased)) ** 1.55
      setProgress(Math.round(curved * 100))

      if (t < 1) {
        raf = requestAnimationFrame(tick)
        return
      }

      leaveTimer = window.setTimeout(() => setPhase('leaving'), 280)
    }

    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      window.clearTimeout(leaveTimer)
      document.body.removeAttribute('data-scroll-locked')
    }
  }, [phase])

  useEffect(() => {
    if (phase !== 'leaving') return

    const timer = window.setTimeout(
      () => {
        markPreloaderSeen()
        document.body.removeAttribute('data-scroll-locked')
        setPhase('done')
      },
      reduceMotion ? 0 : 950,
    )

    return () => window.clearTimeout(timer)
  }, [phase, reduceMotion])

  if (phase === 'done') return null

  const pct = String(progress).padStart(2, '0')
  const leaving = phase === 'leaving'

  return (
    <motion.div
      data-preloader-root
      role='status'
      aria-live='polite'
      aria-label={t('loadingAria')}
      className='fixed inset-0 z-[200] overflow-hidden bg-brand-ink text-white'
      initial={false}
      animate={
        leaving
          ? {
              clipPath: 'inset(0 50% 0 50%)',
              filter: 'blur(10px)',
            }
          : {
              clipPath: 'inset(0 0% 0 0%)',
              filter: 'blur(0px)',
            }
      }
      transition={{ duration: 0.9, ease: EASE }}
    >
      <div
        aria-hidden
        className='pointer-events-none absolute inset-0'
        style={{
          background:
            'radial-gradient(ellipse 70% 55% at 50% 42%, color-mix(in srgb, var(--brand-moss) 26%, transparent), transparent 68%), radial-gradient(ellipse 40% 35% at 88% 92%, color-mix(in srgb, var(--brand-moss) 14%, transparent), transparent 70%)',
        }}
      />

      <div
        aria-hidden
        className='pointer-events-none absolute inset-0 opacity-[0.2]'
        style={{
          backgroundImage:
            'linear-gradient(to right, color-mix(in srgb, var(--brand-moss) 45%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in srgb, var(--brand-moss) 45%, transparent) 1px, transparent 1px)',
          backgroundSize: '4.5rem 4.5rem',
          maskImage: 'radial-gradient(ellipse at 50% 45%, black 8%, transparent 70%)',
        }}
      />

      <motion.div
        aria-hidden
        className='pointer-events-none absolute inset-x-0 h-[20%] bg-gradient-to-b from-transparent via-brand-moss/25 to-transparent mix-blend-screen'
        animate={leaving ? { opacity: 0 } : { top: ['-20%', '110%'], opacity: [0, 1, 1, 0] }}
        transition={
          leaving
            ? { duration: 0.25 }
            : { duration: 2.6, ease: 'linear', times: [0, 0.1, 0.88, 1], repeat: Infinity }
        }
      />

      <motion.p
        aria-hidden
        className={cn(
          'pointer-events-none absolute inset-x-0 top-[11%] z-0 text-center',
          'font-display text-[min(18vw,12rem)] font-semibold leading-none tracking-tight text-white/[0.04]',
          'xsm:top-[15%]',
        )}
        initial={{ opacity: 0, scale: 1.04 }}
        animate={{ opacity: leaving ? 0 : 1, scale: leaving ? 1.08 : 1 }}
        transition={{ duration: 1.1, ease: EASE }}
      >
        BQA
      </motion.p>

      {(
        [
          'left-[1.25rem] top-[1.25rem] border-l border-t',
          'right-[1.25rem] top-[1.25rem] border-r border-t',
          'bottom-[1.25rem] left-[1.25rem] border-b border-l',
          'bottom-[1.25rem] right-[1.25rem] border-b border-r',
        ] as const
      ).map((pos, i) => (
        <motion.span
          key={pos}
          aria-hidden
          className={cn(
            'pointer-events-none absolute z-[2] size-[0.9rem] border-brand-moss/55',
            pos,
          )}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: leaving ? 0 : 1, scale: 1 }}
          transition={{ duration: 0.55, delay: 0.1 + i * 0.06, ease: EASE }}
        />
      ))}

      <div className='relative z-[1] flex min-h-full flex-col items-center justify-center px-[1.5rem] pb-[5rem]'>
        <motion.div
          className='relative mb-[2.35rem] flex size-[5.75rem] items-center justify-center xsm:mb-[1.85rem] xsm:size-[4.75rem]'
          initial={{ opacity: 0, scale: 0.84, filter: 'blur(12px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.05, ease: EASE }}
        >
          <OrbitalRings progress={progress} />
          <div className='relative size-[3.5rem] xsm:size-[3.15rem]'>
            <Image
              src='/images/logo.png'
              alt=''
              fill
              priority
              unoptimized
              className='object-contain'
            />
          </div>
        </motion.div>

        <motion.p
          className='mb-[0.6rem] font-sans text-[0.68rem] font-semibold uppercase tracking-[0.3em] text-brand-moss'
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
        >
          {t('systemName')}
        </motion.p>

        <div className='overflow-hidden'>
          <motion.h1
            className='text-center font-display text-[clamp(2rem,5.2vw,3.35rem)] font-semibold uppercase leading-[0.95] tracking-wide'
            initial={{ y: '115%' }}
            animate={{ y: '0%' }}
            transition={{ duration: 0.95, delay: 0.2, ease: EASE }}
          >
            {tCommon('brand')}
          </motion.h1>
        </div>

        <motion.div
          className='mt-[1.15rem] flex items-center gap-[0.75rem]'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.4, ease: EASE }}
        >
          <span className='h-px w-[1.75rem] bg-brand-moss/60' />
          <p className='font-sans text-[0.78rem] tracking-wide text-white/40'>{t('tagline')}</p>
          <span className='h-px w-[1.75rem] bg-brand-moss/60' />
        </motion.div>
      </div>

      <div className='absolute inset-x-0 bottom-0 z-[2] px-[1.5rem] pb-[1.65rem] xsm:pb-[1.25rem]'>
        <div className='mx-auto flex w-full max-w-[95rem] items-end justify-between gap-[1.25rem]'>
          <div className='min-w-0'>
            <p className='mb-[0.35rem] font-sans text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-white/28'>
              {t('status')}
            </p>
            <div className='relative h-[1.15rem] overflow-hidden'>
              <motion.p
                key={statusLine}
                className='font-sans text-[0.84rem] text-white/78'
                initial={{ y: 16, opacity: 0, filter: 'blur(5px)' }}
                animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                transition={{ duration: 0.4, ease: EASE }}
              >
                {statusLine}
              </motion.p>
            </div>
          </div>

          <div className='shrink-0 text-right'>
            <p className='mb-[0.1rem] font-sans text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-white/28'>
              {t('progress')}
            </p>
            <p className='font-display text-[2.85rem] font-semibold leading-none tabular-nums tracking-wide xsm:text-[2.15rem]'>
              {pct}
              <span className='text-brand-moss'>%</span>
            </p>
          </div>
        </div>

        <div className='mx-auto mt-[1rem] h-[0.14rem] w-full max-w-[95rem] overflow-hidden bg-white/[0.07]'>
          <div
            className='relative h-full origin-left bg-brand-moss transition-transform duration-150 ease-out'
            style={{ transform: `scaleX(${progress / 100})` }}
          >
            <span className='absolute inset-y-0 right-0 w-[2px] bg-white/80' />
          </div>
        </div>
      </div>
    </motion.div>
  )
}
