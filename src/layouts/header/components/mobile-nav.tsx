'use client'

import { useTranslations } from 'next-intl'
import { useState } from 'react'

import { Link } from '@/i18n/navigation'
import type { HeaderNavItem } from '@/layouts/header/lib/map-header-nav'
import { isNavActive } from '@/layouts/header/lib/utils'
import { cn } from '@/lib/utils'

type MobileNavProps = {
  items: HeaderNavItem[]
  pathname: string
  onNavigate: () => void
}

export function MobileNav({ items, pathname, onNavigate }: MobileNavProps) {
  const t = useTranslations('Header')
  const [openGroupId, setOpenGroupId] = useState<string | null>(null)

  return (
    <nav
      aria-label='Mobile'
      className='flex h-full flex-col gap-[0.35rem] overflow-y-auto overscroll-contain px-[0.25rem] pb-[2rem] pt-[1rem]'
    >
      {items.map((item) => {
        const isActive = isNavActive(pathname, item.href)
        const hasMega = Boolean(item.mega?.links.length)
        const isOpen = openGroupId === item.id

        if (!hasMega || !item.mega) {
          return (
            <Link
              key={item.id}
              href={item.href}
              target={item.target}
              rel={item.target === '_blank' ? 'noopener noreferrer' : undefined}
              onClick={onNavigate}
              className={cn(
                'border-b border-white/10 py-[1rem] font-display text-[1.35rem] font-semibold uppercase tracking-wide',
                'transition-colors duration-300',
                isActive ? 'text-white' : 'text-white/75 hover:text-white',
              )}
            >
              {item.label}
            </Link>
          )
        }

        return (
          <div
            key={item.id}
            className='border-b border-white/10'
          >
            <div className='flex items-center gap-[0.5rem] py-[1rem]'>
              <Link
                href={item.href}
                target={item.target}
                rel={item.target === '_blank' ? 'noopener noreferrer' : undefined}
                onClick={onNavigate}
                className={cn(
                  'min-w-0 flex-1 font-display text-[1.35rem] font-semibold uppercase tracking-wide',
                  'transition-colors duration-300',
                  isActive ? 'text-white' : 'text-white/75 hover:text-white',
                )}
              >
                {item.label}
              </Link>
              <button
                type='button'
                aria-label={
                  isOpen
                    ? t('collapseItem', { label: item.label })
                    : t('expandItem', { label: item.label })
                }
                aria-expanded={isOpen}
                onClick={() => setOpenGroupId(isOpen ? null : item.id)}
                className='flex size-[2.25rem] shrink-0 items-center justify-center text-brand-moss'
              >
                <span
                  aria-hidden
                  className={cn(
                    'block text-[1.5rem] leading-none transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]',
                    isOpen && 'rotate-45',
                  )}
                >
                  +
                </span>
              </button>
            </div>

            <div
              className={cn(
                'grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]',
                isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
              )}
            >
              <div className='min-h-0 overflow-hidden'>
                <ul className='flex flex-col gap-[0.15rem] pb-[1rem]'>
                  {item.mega.links.map((link, linkIndex) => (
                    <li key={`${link.href}-${linkIndex}`}>
                      <Link
                        href={link.href}
                        target={link.target}
                        rel={link.target === '_blank' ? 'noopener noreferrer' : undefined}
                        onClick={onNavigate}
                        className='flex items-baseline gap-[0.45rem] py-[0.55rem] font-display text-[1.05rem] uppercase tracking-wide text-white/70 transition-colors duration-300 hover:text-white'
                      >
                        <span className='text-brand-moss'>+</span>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )
      })}
    </nav>
  )
}
