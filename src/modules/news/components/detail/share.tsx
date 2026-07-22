'use client'

import { Check, Copy, Facebook, Linkedin, Twitter } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useState, useSyncExternalStore } from 'react'
import { toast } from 'sonner'

import { cn } from '@/lib/utils'

type NewsShareProps = {
  title?: string
  className?: string
}

function useClientUrl() {
  return useSyncExternalStore(
    () => () => {},
    () => window.location.href,
    () => '',
  )
}

const SHARE_BUTTON_CLASS = cn(
  'inline-flex size-10 items-center justify-center border border-brand-ink/12 bg-white/70 text-brand-ink/55',
  'transition-[color,border-color,background-color,transform] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]',
  'hover:border-brand-moss/45 hover:bg-white hover:text-brand-moss',
  'active:scale-[0.97]',
)

export function NewsShare({ title, className }: NewsShareProps) {
  const t = useTranslations('News')
  const url = useClientUrl()
  const [copied, setCopied] = useState(false)

  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title ?? '')

  const socialLinks = [
    {
      href: `https://facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      label: 'Facebook',
      icon: Facebook,
    },
    {
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      label: 'LinkedIn',
      icon: Linkedin,
    },
    {
      href: `https://x.com/intent/post?url=${encodedUrl}${
        encodedTitle ? `&text=${encodedTitle}` : ''
      }`,
      label: 'X',
      icon: Twitter,
    },
  ] as const

  const handleCopyLink = async () => {
    const liveUrl = window.location.href
    try {
      await navigator.clipboard.writeText(liveUrl)
      setCopied(true)
      toast.success(t('share.copied'))
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      toast.error(t('share.copyFailed'))
    }
  }

  return (
    <div
      className={cn(
        'mt-[3rem] flex flex-wrap items-center justify-between gap-4 border-t border-brand-ink/10 pt-[1.5rem]',
        'xsm:mt-[2.25rem] xsm:flex-col xsm:items-start xsm:gap-3 xsm:pt-[1.25rem]',
        className,
      )}
    >
      <div>
        <p className='text-[0.62rem] uppercase tracking-[0.22em] text-brand-moss'>
          {t('share.eyebrow')}
        </p>
        <p className='mt-1.5 font-sans text-[0.95rem] text-brand-ink/55'>
          {t('share.description')}
        </p>
      </div>

      <div className='flex items-center gap-2'>
        <button
          type='button'
          onClick={handleCopyLink}
          className={SHARE_BUTTON_CLASS}
          aria-label={t('share.copyLink')}
        >
          {copied ? (
            <Check
              className='size-4 text-brand-moss'
              strokeWidth={1.5}
            />
          ) : (
            <Copy
              className='size-4'
              strokeWidth={1.5}
            />
          )}
        </button>

        {socialLinks.map((item) => (
          <a
            key={item.label}
            href={item.href}
            target='_blank'
            rel='noreferrer'
            className={SHARE_BUTTON_CLASS}
            aria-label={t('share.shareVia', { network: item.label })}
          >
            <item.icon
              className='size-4'
              strokeWidth={1.5}
            />
          </a>
        ))}
      </div>
    </div>
  )
}
