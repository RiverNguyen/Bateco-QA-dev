'use client'

import { useCallback, useEffect, useRef } from 'react'

import { useIsClient } from '@/hooks/useIsClient'

export function useScrollHeader(headerRef: React.RefObject<HTMLElement>) {
  const lastScrollY = useRef(0)
  const ticking = useRef(false)
  const isClient = useIsClient()

  useEffect(() => {
    if (!isClient) return

    const headerSearchEl = document.getElementById('header-search')

    if (window.location.pathname === '/' && window.innerWidth > 639) {
      headerRef.current?.classList.add('transparent')
    }

    if (headerSearchEl) {
      headerSearchEl.style.transform = 'translateY(-150%)'
    }
  }, [headerRef, isClient])

  const updateScrollDirection = useCallback(() => {
    if (!isClient) return

    const el = headerRef.current
    const headerSearchEl = document.getElementById('header-search')
    const filterSection = document.getElementById('filter')

    if (!el) return
    if (ticking.current) return

    const scrollY = window.scrollY
    ticking.current = true

    requestAnimationFrame(() => {
      const direction = scrollY > lastScrollY.current ? 'down' : 'up'
      const diff = Math.abs(scrollY - lastScrollY.current)

      if (diff > 15) {
        const hasPassedFilter = filterSection
          ? filterSection.getBoundingClientRect().bottom < 0
          : true

        if (direction === 'down') {
          el.style.transform = 'translateY(-150%)'
          el.classList.remove('transparent')

          if (headerSearchEl) {
            headerSearchEl.style.transform = hasPassedFilter
              ? 'translateY(150%)'
              : 'translateY(-150%)'
          }
        } else {
          el.style.transform = 'translateY(0)'

          if (
            scrollY <= window.innerHeight / 4 &&
            window.location.pathname === '/' &&
            window.innerWidth > 639
          ) {
            el.classList.add('transparent')
          } else {
            el.classList.remove('transparent')
          }

          if (headerSearchEl) {
            headerSearchEl.style.transform = hasPassedFilter ? 'translateY(0)' : 'translateY(-150%)'
          }
        }

        lastScrollY.current = scrollY > 0 ? scrollY : 0
      }

      ticking.current = false
    })
  }, [headerRef, isClient])

  useEffect(() => {
    if (!isClient) return

    window.addEventListener('scroll', updateScrollDirection, {
      passive: true,
    })

    return () => {
      window.removeEventListener('scroll', updateScrollDirection)
    }
  }, [updateScrollDirection, isClient])

  return headerRef
}
