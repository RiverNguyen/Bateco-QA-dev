'use client'

import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

import { Link } from '@/i18n/navigation'
import type { IContactSection } from '@/interfaces/contact.interface'
import { cn } from '@/lib/utils'

type ContactInfoProps = {
  data: IContactSection
  variant?: 'light' | 'dark'
  fillHeight?: boolean
  className?: string
}

function splitDescLines(desc: string) {
  return desc
    .split(/\n| {2,}/)
    .map((line) => line.trim())
    .filter(Boolean)
}

function getDescHref(title: string, desc: string) {
  const normalized = title.toLowerCase()
  if (normalized.includes('email') || desc.includes('@')) {
    return `mailto:${desc.trim()}`
  }
  if (
    normalized.includes('điện thoại') ||
    normalized.includes('phone') ||
    /^\+?\d/.test(desc.trim())
  ) {
    const phone = desc.replace(/[^\d+]/g, '')
    return phone ? `tel:${phone}` : undefined
  }
  return undefined
}

export default function ContactInfo({
  data,
  variant = 'dark',
  fillHeight = false,
  className,
}: ContactInfoProps) {
  const t = useTranslations('Contact')
  const isDark = variant === 'dark'
  const cardClass = isDark
    ? 'border border-white/10 bg-white/[0.03]'
    : 'border border-brand-ink/10 bg-white'
  const mapWrapClass = isDark
    ? 'border border-white/10 bg-brand-ink'
    : 'border border-brand-ink/10 bg-white'
  const mapFooterClass = isDark ? 'border-white/10' : 'border-brand-ink/10'
  const textMuted = isDark
    ? 'text-white/70 hover:text-white'
    : 'text-brand-ink/70 hover:text-brand-moss'
  const textStatic = isDark ? 'text-white/70' : 'text-brand-ink/70'
  const mapText = isDark ? 'text-white/55' : 'text-brand-ink/55'
  const mapLink = isDark
    ? 'text-white/45 hover:text-brand-moss'
    : 'text-brand-ink/45 hover:text-brand-moss'

  const items = data?.infor ?? []
  const map = data?.google_map

  return (
    <div
      aria-label={t('contactInfoAria')}
      className={cn(fillHeight && 'flex h-full flex-col', className)}
    >
      <div className='grid grid-cols-2 gap-[0.65rem] xsm:grid-cols-1'>
        {items.map((item) => {
          const lines = splitDescLines(item.desc)
          const href = lines.length === 1 ? getDescHref(item.title, lines[0]!) : undefined

          return (
            <article
              key={`${item.title}-${item.desc}`}
              className={cn('flex flex-col gap-2 p-4', cardClass)}
            >
              <div className='flex items-center gap-2'>
                {item.icon ? (
                  <Image
                    src={item.icon}
                    alt=''
                    width={14}
                    height={14}
                    className='size-3.5 object-contain'
                    unoptimized
                  />
                ) : null}
                <h3 className='text-[0.6rem] uppercase tracking-[0.2em] text-brand-moss'>
                  {item.title}
                </h3>
              </div>

              <div className='space-y-1'>
                {lines.map((line) =>
                  href ? (
                    <Link
                      key={line}
                      href={href}
                      className={cn(
                        'block font-sans text-[0.88rem] leading-snug transition-colors',
                        textMuted,
                      )}
                    >
                      {line}
                    </Link>
                  ) : (
                    <p
                      key={line}
                      className={cn('font-sans text-[0.88rem] leading-snug', textStatic)}
                    >
                      {line}
                    </p>
                  ),
                )}
              </div>
            </article>
          )
        })}
      </div>

      {map ? (
        <div
          className={cn(
            'mt-[0.65rem] overflow-hidden',
            fillHeight && 'flex min-h-0 flex-1 flex-col',
            mapWrapClass,
          )}
        >
          <iframe
            title={map.address || t('mapFallbackTitle')}
            src={map.image_url}
            loading='lazy'
            allowFullScreen
            referrerPolicy='no-referrer-when-downgrade'
            className={cn(
              'w-full border-0 grayscale-[0.25] contrast-[1.05]',
              fillHeight ? 'min-h-[14rem] flex-1 xsm:min-h-[12rem]' : 'h-[11.5rem]',
            )}
          />
          <div
            className={cn(
              'flex items-center justify-between gap-4 border-t px-4 py-3',
              mapFooterClass,
            )}
          >
            <p className={cn('min-w-0 truncate font-sans text-[0.82rem]', mapText)}>
              {map.address}
            </p>
            {map.link?.url ? (
              <Link
                href={map.link.url}
                target={map.link.target || '_blank'}
                rel='noreferrer'
                className={cn(
                  'group/map inline-flex shrink-0 items-center gap-1.5 text-[0.62rem] uppercase tracking-[0.16em] transition-colors',
                  mapLink,
                )}
              >
                {map.link.title || t('viewMap')}
                <ArrowUpRight
                  className='size-3.5 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover/map:translate-x-0.5 group-hover/map:-translate-y-0.5'
                  strokeWidth={1.35}
                />
              </Link>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  )
}
