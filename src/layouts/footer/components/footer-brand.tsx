import Image from 'next/image'
import { getTranslations } from 'next-intl/server'

import { Link } from '@/i18n/navigation'

type FooterBrandProps = {
  logoSrc?: string
  description?: string
}

export async function FooterBrand({ logoSrc, description }: FooterBrandProps) {
  const t = await getTranslations('Common')

  return (
    <div className='max-w-[28rem]'>
      <Link
        href='/'
        className='inline-flex items-center gap-[0.7rem]'
        aria-label={t('brand')}
      >
        {logoSrc ? (
          <Image
            src={logoSrc}
            alt=''
            width={44}
            height={44}
            className='size-[2.5rem] object-contain'
            unoptimized
          />
        ) : null}
        <span className='font-display text-[1.35rem] font-semibold uppercase tracking-wide'>
          {t('brand')}
        </span>
      </Link>
      {description ? (
        <p className='mt-[1rem] font-sans text-[0.9rem] leading-relaxed text-brand-ink/60'>
          {description}
        </p>
      ) : null}
    </div>
  )
}
