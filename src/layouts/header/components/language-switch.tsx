import type { LocaleCode } from '@/layouts/header/lib/constants'
import { cn } from '@/lib/utils'

type LanguageSwitchProps = {
  locale: LocaleCode
  isPending: boolean
  onSwitch: (next: LocaleCode) => void
  className?: string
}

export function LanguageSwitch({ locale, isPending, onSwitch, className }: LanguageSwitchProps) {
  return (
    <div
      className={cn(
        'flex items-center gap-[0.45rem] font-display text-[0.95rem] font-semibold uppercase tracking-[0.06em]',
        isPending && 'pointer-events-none opacity-70',
        className,
      )}
      aria-label='Language'
    >
      <button
        type='button'
        onClick={() => onSwitch('vi')}
        aria-pressed={locale === 'vi'}
        className={cn(
          'cursor-pointer transition-opacity duration-300 hover:opacity-100',
          locale === 'vi' ? 'text-white' : 'text-white/55',
        )}
      >
        VN
      </button>
      <span
        aria-hidden
        className='text-white/40'
      >
        |
      </span>
      <button
        type='button'
        onClick={() => onSwitch('en')}
        aria-pressed={locale === 'en'}
        className={cn(
          'cursor-pointer transition-opacity duration-300 hover:opacity-100',
          locale === 'en' ? 'text-white' : 'text-white/55',
        )}
      >
        EN
      </button>
    </div>
  )
}
