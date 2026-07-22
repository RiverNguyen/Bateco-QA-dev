import { useEffect, useState } from 'react'

export function useIsClient() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setIsClient(true)
    }, 0)
  }, [])

  return isClient
}
