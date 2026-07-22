'use client'

import * as React from 'react'

import { usePathname } from '@/i18n/navigation'

type ViewTransitionProps = {
  children?: React.ReactNode
  enter?: string
  exit?: string
  default?: string
  name?: string
}

type ReactWithViewTransition = typeof React & {
  ViewTransition?: React.ComponentType<ViewTransitionProps>
}

/**
 * Wraps page content so route changes run a Zoom Blur view transition.
 * Requires `experimental.viewTransition: true` in next.config (already on).
 */
export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const ViewTransition = (React as ReactWithViewTransition).ViewTransition

  if (!ViewTransition) {
    return <div className='contents'>{children}</div>
  }

  return (
    <ViewTransition
      key={pathname}
      enter='zoom-blur'
      exit='zoom-blur'
    >
      {children}
    </ViewTransition>
  )
}
