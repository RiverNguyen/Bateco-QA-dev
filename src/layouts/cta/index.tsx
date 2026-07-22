'use client'

import gsap from 'gsap'
import { useLenis } from 'lenis/react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useLayoutEffect, useRef } from 'react'

import { cn } from '@/lib/utils'

const SCROLL_THRESHOLD = 220

type CTAItem = {
  icon: string
  link: string
}

const ScrollToTopIcon = ({
  circleRef,
}: {
  circleRef: React.RefObject<SVGCircleElement | null>
}) => {
  return (
    <svg
      width='61'
      height='61'
      viewBox='0 0 61 61'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className='size-[3rem] xsm:size-[2.5rem]'
      aria-hidden
    >
      <g clipPath='url(#clip0_604_10721)'>
        <g className='text-brand-moss'>
          <circle
            id='circle'
            ref={circleRef}
            cx='30.4477'
            cy='30.3598'
            r='28.8142'
            stroke='currentColor'
            strokeWidth='1.82947'
          />
        </g>
        <g className='text-brand-ink'>
          <path
            d='M30.0777 41.7945L30.0777 21.6703'
            stroke='currentColor'
            strokeWidth='3.65894'
          />
          <path
            d='M20.9648 30.7812L30.0726 21.6735L39.1804 30.7812'
            stroke='currentColor'
            strokeWidth='3.65894'
          />
        </g>
      </g>
      <defs>
        <clipPath id='clip0_604_10721'>
          <rect
            width='59.4578'
            height='59.4578'
            fill='white'
            transform='translate(0.71875 0.630859)'
          />
        </clipPath>
      </defs>
    </svg>
  )
}

function getScrollTop(lenis: ReturnType<typeof useLenis>) {
  if (lenis) return lenis.scroll
  return window.scrollY || document.documentElement.scrollTop
}

const CTA = ({ data }: { data?: CTAItem[] }) => {
  const circleRef = useRef<SVGCircleElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const isVisibleRef = useRef(false)
  const lenis = useLenis()

  useLayoutEffect(() => {
    const el = containerRef.current
    if (!el) return

    gsap.set(el, {
      y: 24,
      x: 24,
      autoAlpha: 0,
      pointerEvents: 'none',
    })
  }, [])

  useEffect(() => {
    const circle = circleRef.current
    if (!circle) return

    const radius = circle.r.baseVal.value
    const circumference = 2 * Math.PI * radius

    circle.style.strokeDasharray = `${circumference} ${circumference}`
    circle.style.strokeDashoffset = `${circumference}`
    circle.style.transform = 'rotate(-90deg)'
    circle.style.transformOrigin = '50% 50%'

    let rafId: number | null = null

    const updateProgress = (scrollTop?: number) => {
      const top = scrollTop ?? getScrollTop(lenis)
      const height = document.documentElement.scrollHeight - window.innerHeight
      const progress = height > 0 ? Math.min(Math.max(top / height, 0), 1) : 0
      const offset = circumference - progress * circumference
      circle.style.strokeDashoffset = `${offset}`
      rafId = null
    }

    const onScroll = () => {
      if (rafId !== null) return
      rafId = requestAnimationFrame(() => updateProgress())
    }

    updateProgress()

    if (lenis) {
      const onLenisScroll = () => updateProgress(lenis.scroll)
      lenis.on('scroll', onLenisScroll)
      return () => {
        if (rafId !== null) cancelAnimationFrame(rafId)
        lenis.off('scroll', onLenisScroll)
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [lenis])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const setVisible = (nextVisible: boolean) => {
      if (isVisibleRef.current === nextVisible) return
      isVisibleRef.current = nextVisible

      gsap.killTweensOf(el)

      if (nextVisible) {
        gsap.to(el, {
          x: 0,
          y: 0,
          autoAlpha: 1,
          duration: 0.55,
          ease: 'power3.out',
          overwrite: true,
          onStart: () => {
            el.style.pointerEvents = 'auto'
          },
        })
      } else {
        gsap.to(el, {
          x: 24,
          y: 24,
          autoAlpha: 0,
          duration: 0.35,
          ease: 'power2.in',
          overwrite: true,
          onComplete: () => {
            el.style.pointerEvents = 'none'
          },
        })
      }
    }

    const update = (scrollTop?: number) => {
      const top = scrollTop ?? getScrollTop(lenis)
      setVisible(top > SCROLL_THRESHOLD)
    }

    if (lenis) {
      const onLenisScroll = () => update(lenis.scroll)
      onLenisScroll()
      lenis.on('scroll', onLenisScroll)
      return () => {
        lenis.off('scroll', onLenisScroll)
        gsap.killTweensOf(el)
      }
    }

    let rafId: number | null = null
    const onScroll = () => {
      if (rafId !== null) return
      rafId = requestAnimationFrame(() => {
        update()
        rafId = null
      })
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      gsap.killTweensOf(el)
    }
  }, [lenis])

  const handleScrollToTop = () => {
    if (lenis) {
      const distance = getScrollTop(lenis)
      const duration = Math.min(2.25, Math.max(1.35, distance / 1400))
      lenis.scrollTo(0, { duration })
      return
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        'fixed right-8 bottom-16 z-[49] flex flex-col items-center space-y-4 will-change-transform',
        'pointer-events-none opacity-0 xsm:right-4 xsm:bottom-20',
      )}
    >
      {data?.map((item, index) => (
        <Link
          href={item.link}
          target='_blank'
          key={item.link}
          className={cn(
            'relative flex size-[3rem] items-center justify-center rounded-full xsm:size-10',
            'bg-white/95 ring-1 ring-brand-ink/10 backdrop-blur-sm',
            'shadow-[0_6px_20px_color-mix(in_srgb,var(--brand-ink)_10%,transparent)]',
            'transition-[background-color,box-shadow,ring-color] duration-300',
            'hover:bg-[#f3f6f4] hover:ring-brand-moss/40',
          )}
        >
          {index === data?.length - 1 && <div className='ripple_video' />}
          <Image
            src={item.icon}
            alt={`Icon ${index + 1}`}
            width={24}
            height={24}
            unoptimized
            className='size-5 object-contain xsm:size-4'
          />
        </Link>
      ))}
      <button
        type='button'
        onClick={handleScrollToTop}
        aria-label='Scroll to top'
        className={cn(
          'relative flex size-[3rem] cursor-pointer items-center justify-center rounded-full xsm:size-10',
          'bg-white/95 ring-1 ring-brand-ink/10 backdrop-blur-sm',
          'shadow-[0_6px_20px_color-mix(in_srgb,var(--brand-ink)_10%,transparent)]',
          'transition-[background-color,box-shadow,ring-color] duration-300',
          'hover:bg-[#f3f6f4] hover:ring-brand-moss/35',
        )}
      >
        <ScrollToTopIcon circleRef={circleRef} />
      </button>
    </div>
  )
}

export default CTA
