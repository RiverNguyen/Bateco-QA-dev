'use client'

import { ReactLenis, useLenis } from 'lenis/react'
import { useEffect, useState, type ReactNode } from 'react'

import 'lenis/dist/lenis.css'

function LenisScrollLock() {
  const lenis = useLenis()

  useEffect(() => {
    if (!lenis) return

    const syncLock = () => {
      if (document.body.hasAttribute('data-scroll-locked')) {
        lenis.stop()
      } else {
        lenis.start()
      }
    }

    syncLock()

    const observer = new MutationObserver(syncLock)
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['data-scroll-locked'],
    })

    return () => observer.disconnect()
  }, [lenis])

  return null
}

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const isMobile = window.matchMedia('(max-width: 639px)')

    const sync = () => setEnabled(!reduceMotion.matches && !isMobile.matches)
    sync()

    reduceMotion.addEventListener('change', sync)
    isMobile.addEventListener('change', sync)
    return () => {
      reduceMotion.removeEventListener('change', sync)
      isMobile.removeEventListener('change', sync)
    }
  }, [])

  if (!enabled) return children

  return (
    <ReactLenis
      root
      options={{
        autoRaf: true,
        lerp: 0.1,
        duration: 1.2,
        smoothWheel: true,
        // Touch giữ native momentum (iOS/Android)
        syncTouch: false,
        anchors: true,
      }}
    >
      <LenisScrollLock />
      {children}
    </ReactLenis>
  )
}
