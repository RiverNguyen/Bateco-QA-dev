'use client'

import { AnimatePresence, motion } from 'motion/react'
import { useTranslations } from 'next-intl'

import { MegaMenuPanel } from '@/layouts/header/components/mega-menu-panel'
import { EASE } from '@/layouts/header/lib/constants'
import type { HeaderMegaPanel } from '@/layouts/header/lib/map-header-nav'
import { cn } from '@/lib/utils'

type MegaMenuDropdownProps = {
  isOpen: boolean
  visibleId: string | null
  visiblePanel: HeaderMegaPanel | null | undefined
  heightPanel: HeaderMegaPanel | null | undefined
  onKeepOpen: () => void
}

export function MegaMenuDropdown({
  isOpen,
  visibleId,
  visiblePanel,
  heightPanel,
  onKeepOpen,
}: MegaMenuDropdownProps) {
  return (
    <div
      className={cn(
        'grid transition-[grid-template-rows] duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] xsm:hidden',
        isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
      )}
    >
      <div
        className='min-h-0 overflow-hidden'
        onMouseEnter={onKeepOpen}
      >
        <div
          className={cn(
            'relative border-t transition-colors duration-300',
            isOpen ? 'border-white/10' : 'border-transparent',
          )}
        >
          <div
            className='pointer-events-none invisible'
            aria-hidden
          >
            {heightPanel ? <MegaMenuPanel panel={heightPanel} /> : null}
          </div>

          <AnimatePresence initial={false}>
            {isOpen && visibleId && visiblePanel ? (
              <motion.div
                key={visibleId}
                className='absolute inset-x-0 top-0'
                initial={{ opacity: 0, filter: 'blur(10px)', y: 6 }}
                animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                exit={{ opacity: 0, filter: 'blur(8px)', y: -4 }}
                transition={{ duration: 0.48, ease: EASE }}
              >
                <MegaMenuPanel panel={visiblePanel} />
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

type MegaMenuBackdropProps = {
  isOpen: boolean
  onClose: () => void
}

export function MegaMenuBackdrop({ isOpen, onClose }: MegaMenuBackdropProps) {
  const t = useTranslations('Header')

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.button
          type='button'
          aria-label={t('closeMenu')}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: EASE }}
          className='fixed inset-0 z-40 cursor-default bg-brand-ink/50 backdrop-blur-md xsm:hidden'
          onClick={onClose}
        />
      ) : null}
    </AnimatePresence>
  )
}
