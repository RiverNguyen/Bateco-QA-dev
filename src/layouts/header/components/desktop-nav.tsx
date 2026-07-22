import { NavItemLink } from '@/layouts/header/components/nav-item-link'
import type { HeaderNavItem } from '@/layouts/header/lib/map-header-nav'
import { isNavActive } from '@/layouts/header/lib/utils'

type DesktopNavProps = {
  items: HeaderNavItem[]
  pathname: string
  openMegaId: string | null
  onOpenMega: (id: string) => void
  onScheduleClose: () => void
}

export function DesktopNav({
  items,
  pathname,
  openMegaId,
  onOpenMega,
  onScheduleClose,
}: DesktopNavProps) {
  return (
    <nav
      aria-label='Main'
      className='flex items-center gap-[2rem] justify-self-center xsm:hidden'
    >
      {items.map((item) => {
        const isActive = isNavActive(pathname, item.href)
        const isOpen = openMegaId === item.id
        const hasMega = Boolean(item.mega)

        if (!hasMega) {
          return (
            <NavItemLink
              key={item.id}
              item={item}
              isActive={isActive}
              onMouseEnter={onScheduleClose}
            />
          )
        }

        return (
          <div
            key={item.id}
            className='relative'
            onMouseEnter={() => onOpenMega(item.id)}
          >
            <NavItemLink
              item={item}
              isActive={isActive}
              isOpen={isOpen}
            />
          </div>
        )
      })}
    </nav>
  )
}
