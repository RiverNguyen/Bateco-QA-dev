import { ArrowUpRight } from 'lucide-react'

import { Link } from '@/i18n/navigation'
import { cn } from '@/lib/utils'

type BannerCtaProps = {
  href: string
  children: React.ReactNode
  variant?: 'solid' | 'ghost'
}

export function BannerCta({ href, children, variant = 'solid' }: BannerCtaProps) {
  return (
    <Link
      href={href}
      className={cn(
        'group/cta inline-flex items-center gap-[0.45rem]',
        'px-[1.35rem] py-[0.85rem] font-display text-[0.85rem] font-semibold uppercase tracking-[0.1em]',
        'transition-[background-color,border-color,color,transform] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]',
        variant === 'solid'
          ? 'bg-brand-moss text-white hover:bg-brand'
          : 'border border-brand-moss/70 text-white hover:border-brand-moss hover:bg-brand-moss/10',
      )}
    >
      {children}
      <ArrowUpRight
        className='size-[0.9rem] transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover/cta:translate-x-[0.08rem] group-hover/cta:-translate-y-[0.08rem]'
        strokeWidth={1.35}
      />
    </Link>
  )
}
