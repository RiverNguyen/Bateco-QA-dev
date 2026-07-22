import { getTranslations } from 'next-intl/server'

import { Reveal } from '@/components/shared/reveal'
import { IAboutCertification } from '@/interfaces/about.interface'
import Container from '@/layouts/container'
import { cn } from '@/lib/utils'
import { CertificationCard } from '@/modules/about/components/certifications/certification-card'

export default async function Certifications({ data }: { data: IAboutCertification[] }) {
  const t = await getTranslations('About.certifications')

  return (
    <section
      className='bg-brand-ink text-white'
      aria-labelledby='certifications-heading'
    >
      <Container className='py-[4rem] xsm:py-[2.75rem]'>
        <Reveal
          y={20}
          disableOnMobile
          className={cn(
            'mb-[2.5rem] grid grid-cols-[1fr_auto] items-end gap-[2rem]',
            'xsm:mb-[1.75rem] xsm:grid-cols-1 xsm:gap-[0.85rem]',
          )}
        >
          <div>
            <h2
              id='certifications-heading'
              className='max-w-[28rem] font-display text-[2.35rem] font-semibold uppercase leading-[1.05] tracking-wide xsm:max-w-none xsm:text-[1.65rem]'
            >
              {t('title')}
            </h2>
          </div>
          <p className='max-w-[24rem] pb-[0.15rem] text-right font-sans text-[0.9rem] leading-relaxed text-white/55 xsm:max-w-none xsm:pb-0 xsm:text-left'>
            {t('description')}
          </p>
        </Reveal>

        <div
          className={cn(
            'grid grid-cols-3 gap-[0.85rem]',
            'xsm:flex xsm:snap-x xsm:snap-mandatory xsm:gap-3 xsm:overflow-x-auto xsm:pb-1',
          )}
        >
          {Array.isArray(data) &&
            data.length > 0 &&
            data.map((item, index) => (
              <div
                key={index}
                className='xsm:min-w-[78vw] xsm:snap-center'
              >
                <CertificationCard
                  item={item}
                  index={index}
                />
              </div>
            ))}
        </div>
      </Container>
    </section>
  )
}
