'use client'

import { useSyncExternalStore } from 'react'

const MOBILE_QUERY = '(max-width: 639px)'

const useIsMobile = () => {
  return useSyncExternalStore(
    (onStoreChange) => {
      const mq = window.matchMedia(MOBILE_QUERY)
      const handler = () => onStoreChange()
      mq.addEventListener('change', handler)
      return () => mq.removeEventListener('change', handler)
    },
    () => window.matchMedia(MOBILE_QUERY).matches,
    () => false,
  )
}

export default useIsMobile
