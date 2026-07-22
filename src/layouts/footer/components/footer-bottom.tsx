import { getTranslations } from 'next-intl/server'

type FooterBottomProps = {
  year: number
}

export async function FooterBottom({ year }: FooterBottomProps) {
  const t = await getTranslations('Footer')
  const tCommon = await getTranslations('Common')

  return (
    <div className='flex items-center justify-between gap-[1rem] border-t border-brand-ink/10 py-[1.25rem] xsm:flex-col xsm:items-start xsm:gap-[0.5rem]'>
      <p className='font-sans text-[0.7rem] uppercase tracking-[0.1em] text-brand-ink/40'>
        {t('copyright', { year })}
      </p>
      <p className='font-sans text-[0.7rem] uppercase tracking-[0.1em] text-brand-ink/35'>
        {tCommon('brandTagline')}
      </p>
    </div>
  )
}
