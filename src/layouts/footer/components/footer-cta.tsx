import { ArrowUpRight } from 'lucide-react'

import { Link } from '@/i18n/navigation'
import { cn } from '@/lib/utils'

type FooterCtaProps = {
  href: string
  target?: string
  children: React.ReactNode
  variant?: 'solid' | 'ghost'
}

export function FooterCta({ href, target, children, variant = 'solid' }: FooterCtaProps) {
  return (
    <Link
      href={href}
      target={target}
      rel={target === '_blank' ? 'noopener noreferrer' : undefined}
      className={cn(
        'group/cta inline-flex items-center gap-[0.4rem]',
        'px-[1.2rem] py-[0.75rem] font-display text-[0.8rem] font-semibold uppercase tracking-[0.1em]',
        'transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]',
        variant === 'solid'
          ? 'bg-brand-ink text-white hover:bg-brand'
          : 'border border-brand-ink/25 text-brand-ink hover:border-brand-moss hover:text-brand-moss',
      )}
    >
      {children}
      <ArrowUpRight
        className='size-[0.85rem] transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover/cta:translate-x-[0.08rem] group-hover/cta:-translate-y-[0.08rem]'
        strokeWidth={1.35}
      />
    </Link>
  )
}
