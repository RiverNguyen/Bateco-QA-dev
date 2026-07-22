import { Link } from '@/i18n/navigation'
import type { HeaderNavItem } from '@/layouts/header/lib/map-header-nav'
import { cn } from '@/lib/utils'

type NavItemLinkProps = {
  item: HeaderNavItem
  isActive: boolean
  isOpen?: boolean
  onMouseEnter?: () => void
}

export function NavItemLink({ item, isActive, isOpen, onMouseEnter }: NavItemLinkProps) {
  return (
    <Link
      href={item.href}
      target={item.target}
      rel={item.target === '_blank' ? 'noopener noreferrer' : undefined}
      aria-expanded={item.mega ? isOpen : undefined}
      aria-haspopup={item.mega ? true : undefined}
      onMouseEnter={onMouseEnter}
      className={cn(
        'group relative py-[0.35rem] font-display text-[0.9375rem] font-medium uppercase tracking-wide text-white/90',
        'transition-colors duration-300 hover:text-white',
        (isActive || isOpen) && 'font-semibold text-white',
      )}
    >
      {item.label}
      <span
        aria-hidden
        className={cn(
          'absolute inset-x-0 -bottom-[0.15rem] mx-auto h-[0.15rem] w-[70%] origin-center rounded-full bg-brand-moss',
          'scale-x-0 transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]',
          'group-hover:scale-x-100',
          (isActive || isOpen) && 'scale-x-100',
        )}
      />
    </Link>
  )
}
