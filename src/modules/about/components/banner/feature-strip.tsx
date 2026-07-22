'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'

import { InfiniteSlider } from '@/components/shared/infinite-slider'
import { IAboutBannerField } from '@/interfaces/about.interface'
import { cn } from '@/lib/utils'

function FeatureItem({ feature }: { feature: { label: string; icon: string } }) {
  return (
    <div className='flex items-center gap-[1rem]'>
      <div className='flex items-center gap-[0.65rem]'>
        <span
          className={cn(
            'inline-flex size-[2rem] shrink-0 items-center justify-center',
            'border border-white/35 text-white/80',
          )}
          aria-hidden
        >
          <Image
            src={feature?.icon || ''}
            alt={feature?.label}
            width={16}
            height={16}
            className='size-[1rem]'
          />
        </span>
        <span className='whitespace-nowrap font-sans text-[0.8rem] font-medium tracking-wide text-white/85 xsm:text-[0.75rem]'>
          {feature?.label}
        </span>
      </div>
      <span
        className='size-[0.28rem] shrink-0 rounded-full bg-white/35'
        aria-hidden
      />
    </div>
  )
}

export function FeatureStrip({ data }: { data: IAboutBannerField[] }) {
  const t = useTranslations('About')

  if (!data.length) return null

  return (
    <div
      className='relative z-10 border-t border-white/[0.1] bg-brand-ink/70 py-[1.1rem] backdrop-blur-md xsm:py-[0.95rem]'
      aria-label={t('capabilitiesAria')}
    >
      <InfiniteSlider
        gap={48}
        speed={40}
        speedOnHover={18}
      >
        {Array.isArray(data) &&
          data.length > 0 &&
          data?.map((feature) => (
            <FeatureItem
              key={feature.icon}
              feature={{
                label: feature.title,
                icon: feature.icon,
              }}
            />
          ))}
      </InfiniteSlider>
    </div>
  )
}
