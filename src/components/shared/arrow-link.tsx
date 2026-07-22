import { ArrowUpRight } from 'lucide-react'

import { Link } from '@/i18n/navigation'
import { cn } from '@/lib/utils'

type ArrowLinkProps = {
  href: string
  children: React.ReactNode
  className?: string
  variant?: 'ink' | 'light'
}

const variantClass = {
  ink: cn(
    'text-brand-ink',
    'underline decoration-brand-ink/35 underline-offset-[0.28rem]',
    'hover:decoration-brand-ink',
  ),
  light: cn(
    'text-white',
    'underline decoration-white/40 underline-offset-[0.28rem]',
    'hover:decoration-white',
  ),
} as const

export function ArrowLink({ href, children, className, variant = 'ink' }: ArrowLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        'group/link inline-flex items-center gap-[0.35rem] font-sans text-[0.875rem] tracking-wide',
        'transition-colors duration-300',
        variantClass[variant],
        className,
      )}
    >
      {children}
      <ArrowUpRight
        className='size-[0.95rem] transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover/link:translate-x-[0.1rem] group-hover/link:-translate-y-[0.1rem]'
        strokeWidth={1.5}
      />
    </Link>
  )
}
