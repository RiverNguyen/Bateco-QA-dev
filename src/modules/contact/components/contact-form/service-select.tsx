'use client'

import { Check, ChevronDown, X } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { forwardRef, useState } from 'react'

import DrawerProvider from '@/components/providers/drawer-provider'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import useIsMobile from '@/hooks/useIsMobile'
import { cn } from '@/lib/utils'

type ServiceOption = {
  value: string
  label: string
}

type ServiceSelectProps = Omit<React.ComponentPropsWithoutRef<'button'>, 'onChange' | 'value'> & {
  options: readonly ServiceOption[]
  value: string
  onValueChange: (value: string) => void
}

const ServiceSelect = forwardRef<HTMLButtonElement, ServiceSelectProps>(
  ({ className, options, value, onValueChange, ...triggerProps }, ref) => {
    const t = useTranslations('Contact')
    const tCommon = useTranslations('Common')
    const isMobile = useIsMobile()
    const [open, setOpen] = useState(false)
    const selectedOption = options.find((option) => option.value === value)
    const placeholder = t('fields.servicePlaceholder')

    if (!isMobile) {
      return (
        <div className='w-full'>
          <Select
            value={value}
            onValueChange={onValueChange}
          >
            <SelectTrigger
              ref={ref}
              className={cn('w-full', className)}
              {...triggerProps}
            >
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent
              position='popper'
              sideOffset={4}
            >
              {options.map((option) => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )
    }

    const selectOption = (nextValue: string) => {
      onValueChange(nextValue)
      setOpen(false)
    }

    return (
      <div className='w-full'>
        <button
          ref={ref}
          type='button'
          className={cn('flex w-full items-center justify-between text-left', className)}
          onClick={() => setOpen(true)}
          {...triggerProps}
        >
          <span className={cn(!selectedOption && 'text-brand-ink/35')}>
            {selectedOption?.label ?? placeholder}
          </span>
          <ChevronDown
            aria-hidden
            className='size-4 shrink-0 text-brand-ink/40'
          />
        </button>

        <DrawerProvider
          open={open}
          setOpen={setOpen}
          className={cn(
            'max-h-[72dvh] border-t border-brand-ink/10 px-0 pb-0 pt-0 text-brand-ink',
            '[&>div:first-child]:hidden',
          )}
        >
          <div className='border-b border-brand-ink/10 px-5 pb-4 pt-5'>
            <div className='flex items-start justify-between gap-4'>
              <div>
                <p className='text-[0.62rem] uppercase tracking-[0.2em] text-brand-moss'>
                  {t('serviceDrawer.eyebrow')}
                </p>
                <h3 className='mt-1 font-display text-[1.35rem] font-semibold uppercase tracking-wide text-brand-ink'>
                  {t('serviceDrawer.title')}
                </h3>
              </div>
              <button
                type='button'
                aria-label={tCommon('close')}
                onClick={() => setOpen(false)}
                className='inline-flex size-9 shrink-0 items-center justify-center border border-brand-ink/10 text-brand-ink/55 transition-colors hover:border-brand-moss/35 hover:text-brand-moss'
              >
                <X
                  className='size-4'
                  strokeWidth={1.35}
                />
              </button>
            </div>
          </div>

          <ol className='space-y-0 overflow-y-auto px-5 py-3 pb-[max(1.25rem,env(safe-area-inset-bottom))]'>
            {options.map((option, index) => {
              const isSelected = option.value === value
              const number = String(index + 1).padStart(2, '0')

              return (
                <li key={option.value}>
                  <button
                    type='button'
                    className={cn(
                      'flex w-full items-center gap-3 border-l-2 py-3.5 pl-4 pr-2 text-left transition-colors duration-300',
                      isSelected
                        ? 'border-brand-moss bg-brand-moss/8 text-brand-ink'
                        : 'border-transparent text-brand-ink/65 hover:border-brand-ink/15 hover:bg-[#f7f8f7]',
                    )}
                    onClick={() => selectOption(option.value)}
                  >
                    <span
                      className={cn(
                        'shrink-0 text-[0.65rem] tabular-nums tracking-wider',
                        isSelected ? 'text-brand-moss' : 'text-brand-ink/30',
                      )}
                    >
                      {number}
                    </span>
                    <span
                      className={cn('flex-1 font-sans text-[0.95rem]', isSelected && 'font-medium')}
                    >
                      {option.label}
                    </span>
                    {isSelected ? (
                      <Check
                        aria-hidden
                        className='size-4 shrink-0 text-brand-moss'
                        strokeWidth={1.5}
                      />
                    ) : null}
                  </button>
                </li>
              )
            })}
          </ol>
        </DrawerProvider>
      </div>
    )
  },
)
ServiceSelect.displayName = 'ServiceSelect'

export default ServiceSelect
