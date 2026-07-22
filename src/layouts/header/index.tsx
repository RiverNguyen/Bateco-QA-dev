'use client'

import Image from 'next/image'
import { useLocale, useTranslations } from 'next-intl'
import { useEffect, useMemo, useRef, useState, useTransition } from 'react'

import SheetProvider from '@/components/providers/sheet-provider'
import { useScrollHeader } from '@/hooks/useScrollHeader'
import { mapPathnameForLocale } from '@/i18n/locale-paths'
import { Link, usePathname, useRouter } from '@/i18n/navigation'
import type { IHeader } from '@/interfaces/header.interface'
import Container from '@/layouts/container'
import { DesktopNav } from '@/layouts/header/components/desktop-nav'
import { LanguageSwitch } from '@/layouts/header/components/language-switch'
import { MegaMenuBackdrop, MegaMenuDropdown } from '@/layouts/header/components/mega-menu-dropdown'
import { MenuToggleButton } from '@/layouts/header/components/menu-toggle-button'
import { MobileNav } from '@/layouts/header/components/mobile-nav'
import { FALLBACK_LOGO, type LocaleCode } from '@/layouts/header/lib/constants'
import { mapHeaderNavigations, type HeaderMegaPanel } from '@/layouts/header/lib/map-header-nav'
import { cn } from '@/lib/utils'

type HeaderProps = {
  data?: IHeader | null
  className?: string
}

export default function Header({ data, className }: HeaderProps) {
  const t = useTranslations('Header')
  const tCommon = useTranslations('Common')
  const [isPending, startTransition] = useTransition()
  const [openMegaId, setOpenMegaId] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const locale = useLocale() as LocaleCode
  const pathname = usePathname()
  const router = useRouter()
  const headerRef = useRef<HTMLElement>(null)

  const navItems = useMemo(
    () => mapHeaderNavigations(data?.navigations ?? [], locale),
    [data?.navigations, locale],
  )
  const logoSrc = data?.logo || FALLBACK_LOGO

  const openMega = openMegaId ? navItems.find((item) => item.id === openMegaId)?.mega : undefined

  const [cachedMega, setCachedMega] = useState<{ id: string; panel: HeaderMegaPanel } | null>(null)
  if (openMegaId && openMega && cachedMega?.id !== openMegaId) {
    setCachedMega({ id: openMegaId, panel: openMega })
  }

  const isMegaOpen = Boolean(openMegaId && openMega)
  const activeMega = openMegaId && openMega ? { id: openMegaId, panel: openMega } : cachedMega
  const heightPanel = activeMega?.panel
  const visibleId = isMegaOpen ? openMegaId : null
  const visiblePanel = isMegaOpen ? openMega : null

  const clearCloseTimer = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current)
      closeTimerRef.current = null
    }
  }

  const openMenu = (id: string) => {
    clearCloseTimer()
    setOpenMegaId(id)
  }

  const scheduleClose = () => {
    clearCloseTimer()
    closeTimerRef.current = setTimeout(() => {
      setOpenMegaId(null)
    }, 180)
  }

  const closeMenu = () => {
    clearCloseTimer()
    setOpenMegaId(null)
  }

  const [prevPathname, setPrevPathname] = useState(pathname)
  if (pathname !== prevPathname) {
    setPrevPathname(pathname)
    if (openMegaId) setOpenMegaId(null)
    if (mobileOpen) setMobileOpen(false)
  }

  useEffect(() => {
    if (!openMegaId) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        clearCloseTimer()
        setOpenMegaId(null)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [openMegaId])

  useEffect(() => {
    return () => clearCloseTimer()
  }, [])

  const switchLocale = (nextLocale: LocaleCode) => {
    if (nextLocale === locale) return
    const nextPath = mapPathnameForLocale(pathname, nextLocale)
    startTransition(() => {
      router.replace(nextPath, { locale: nextLocale })
    })
  }

  const setMobileMenuOpen = (open: boolean) => {
    setMobileOpen(open)
    if (open) closeMenu()
  }

  useScrollHeader(headerRef as React.RefObject<HTMLElement>)

  return (
    <>
      <header
        ref={headerRef}
        onMouseLeave={scheduleClose}
        style={{ viewTransitionName: 'site-header' }}
        className={cn(
          'fixed inset-x-0 top-0 z-50 w-full border-b border-brand-moss/25 bg-brand-ink/55 backdrop-blur-md transition-[background-color,transform] duration-500',
          openMegaId && 'bg-brand-ink/95 backdrop-blur-xl',
          mobileOpen && 'z-[60] bg-brand-ink/95 backdrop-blur-xl',
          className,
        )}
      >
        <Container className='grid h-[var(--header-height)] grid-cols-[1fr_auto_1fr] items-center xsm:grid-cols-[1fr_auto]'>
          <Link
            href='/'
            className='relative flex shrink-0 items-center justify-self-start'
            aria-label={tCommon('brand')}
            onMouseEnter={scheduleClose}
          >
            <Image
              src={logoSrc}
              alt={tCommon('brand')}
              width={56}
              height={56}
              className='size-[4.5rem] object-contain xsm:size-[3.5rem]'
              priority
              unoptimized
            />
          </Link>

          <DesktopNav
            items={navItems}
            pathname={pathname}
            openMegaId={openMegaId}
            onOpenMega={openMenu}
            onScheduleClose={scheduleClose}
          />

          <div
            className='flex items-center justify-self-end gap-[1.25rem] xsm:gap-[0.65rem]'
            onMouseEnter={scheduleClose}
          >
            <LanguageSwitch
              locale={locale}
              isPending={isPending}
              onSwitch={switchLocale}
            />
            <MenuToggleButton
              open={mobileOpen}
              onClick={() => setMobileMenuOpen(!mobileOpen)}
            />
          </div>
        </Container>

        <MegaMenuDropdown
          isOpen={isMegaOpen}
          visibleId={visibleId}
          visiblePanel={visiblePanel}
          heightPanel={heightPanel}
          onKeepOpen={clearCloseTimer}
        />
      </header>

      <MegaMenuBackdrop
        isOpen={isMegaOpen}
        onClose={closeMenu}
      />

      <SheetProvider
        open={mobileOpen}
        setOpen={setMobileMenuOpen}
        side='right'
        title={t('navMenu')}
        hideCloseButton
        overlayClassName='top-[var(--header-height)] z-[45]'
        className={cn(
          'z-[45] border-0 bg-brand-ink p-0 text-white shadow-none',
          '!inset-x-0 !bottom-0 !top-[var(--header-height)] !h-[calc(100dvh-var(--header-height))]',
          '!w-full !max-w-none',
        )}
      >
        <div className='flex h-full flex-col px-4 pt-[0.5rem]'>
          <MobileNav
            items={navItems}
            pathname={pathname}
            onNavigate={() => setMobileMenuOpen(false)}
          />
        </div>
      </SheetProvider>
    </>
  )
}
