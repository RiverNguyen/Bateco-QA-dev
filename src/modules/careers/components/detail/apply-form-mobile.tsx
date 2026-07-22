'use client'

import { Send, X } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

import DrawerProvider from '@/components/providers/drawer-provider'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ApplyForm } from '@/modules/careers/components/detail/apply-form'

type ApplyFormMobileProps = {
  jobTitle: string
  url: string
}

export function ApplyFormMobile({ jobTitle, url }: ApplyFormMobileProps) {
  const t = useTranslations('Careers.apply')
  const [open, setOpen] = useState(false)

  return (
    <div className='hidden xsm:contents'>
      <div
        className={cn(
          'fixed inset-x-0 bottom-0 z-40 border-t border-brand-ink/10 bg-white/95 px-4 pt-3',
          'pb-[max(0.85rem,env(safe-area-inset-bottom))] backdrop-blur-md',
        )}
      >
        <Button
          type='button'
          onClick={() => setOpen(true)}
          className={cn(
            'group/cta h-[3rem] w-full rounded-none border-0',
            'bg-brand-ink font-display text-[0.85rem] font-semibold uppercase tracking-[0.1em] text-white',
            'transition-[background-color,transform] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]',
            'hover:bg-brand-moss active:scale-[0.99]',
          )}
        >
          {t('mobileCta')}
          <Send
            className='size-4 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover/cta:translate-x-0.5'
            strokeWidth={1.35}
          />
        </Button>
      </div>

      <DrawerProvider
        open={open}
        setOpen={setOpen}
        className={cn(
          'max-h-[88dvh] border-t border-brand-ink/10 px-0 pb-0 pt-0 text-brand-ink',
          '[&>div:first-child]:hidden',
        )}
      >
        <div className='border-b border-brand-ink/10 px-5 pb-4 pt-5'>
          <div className='flex items-start justify-between gap-4'>
            <div>
              <p className='text-[0.62rem] uppercase tracking-[0.2em] text-brand-moss'>
                {t('eyebrow')}
              </p>
              <h3 className='mt-1 font-display text-[1.45rem] font-semibold uppercase tracking-wide text-brand-ink'>
                {t('title')}
              </h3>
            </div>
            <button
              type='button'
              aria-label={t('drawerClose')}
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

        <div className='overflow-y-auto px-5 py-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]'>
          <ApplyForm
            jobTitle={jobTitle}
            url={url}
            embedded
            onSuccess={() => setOpen(false)}
          />
        </div>
      </DrawerProvider>
    </div>
  )
}
