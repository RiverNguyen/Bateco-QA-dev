'use client'

import { useTranslations } from 'next-intl'

import { cn } from '@/lib/utils'

type MenuToggleButtonProps = {
  open: boolean
  onClick: () => void
}

export function MenuToggleButton({ open, onClick }: MenuToggleButtonProps) {
  const t = useTranslations('Header')

  return (
    <button
      type='button'
      aria-label={open ? t('closeMenu') : t('openMenu')}
      aria-expanded={open}
      onClick={onClick}
      className='relative hidden size-[2.5rem] items-center justify-center xsm:inline-flex'
    >
      <span className='relative block h-[0.85rem] w-[1.35rem]'>
        <span
          aria-hidden
          className={cn(
            'absolute left-0 top-0 h-[0.1rem] w-full origin-center bg-white',
            'transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]',
            open && 'translate-y-[0.375rem] rotate-45',
          )}
        />
        <span
          aria-hidden
          className={cn(
            'absolute left-0 top-[0.375rem] h-[0.1rem] w-full bg-white',
            'transition-opacity duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]',
            open && 'opacity-0',
          )}
        />
        <span
          aria-hidden
          className={cn(
            'absolute left-0 top-[0.75rem] h-[0.1rem] w-full origin-center bg-white',
            'transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]',
            open && '-translate-y-[0.375rem] -rotate-45',
          )}
        />
      </span>
    </button>
  )
}
