import { ArrowUpRight } from 'lucide-react'

import { Link } from '@/i18n/navigation'
import { cn } from '@/lib/utils'

type PartnerCtaActionProps = {
  href: string
  label: string
}

export function PartnerCtaAction({ href, label }: PartnerCtaActionProps) {
  return (
    <div className='border border-white/12 bg-brand-ink/35 p-[0.2rem] backdrop-blur-md'>
      <Link
        href={href}
        className={cn(
          'group/cta relative flex w-full min-w-[15.5rem] items-center justify-between gap-4 overflow-hidden',
          'border border-brand-moss/55 bg-transparent px-5 py-4',
          'font-display text-[0.8rem] font-semibold uppercase tracking-[0.12em] text-white',
          'transition-[border-color,transform] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]',
          'hover:border-brand-moss active:scale-[0.99]',
          'xsm:min-w-0',
        )}
      >
        <span
          aria-hidden
          className={cn(
            'pointer-events-none absolute inset-0 bg-brand-moss',
            'opacity-10 transition-opacity duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]',
            'group-hover/cta:opacity-100',
          )}
        />
        <span className='relative'>{label}</span>
        <span
          aria-hidden
          className={cn(
            'relative flex size-8 shrink-0 items-center justify-center border border-white/20',
            'transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]',
            'group-hover/cta:border-white/35 group-hover/cta:bg-white/10',
            'group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5',
          )}
        >
          <ArrowUpRight
            className='size-4'
            strokeWidth={1.35}
          />
        </span>
      </Link>
    </div>
  )
}
