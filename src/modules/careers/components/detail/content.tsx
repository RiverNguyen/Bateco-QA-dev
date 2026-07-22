import { getTranslations } from 'next-intl/server'

import { Reveal } from '@/components/shared/reveal'
import type { ICareersDetail } from '@/interfaces/careers.interface'
import { cn } from '@/lib/utils'

type CareerDetailContentProps = {
  job: ICareersDetail
  className?: string
}

export async function CareerDetailContent({ job, className }: CareerDetailContentProps) {
  const t = await getTranslations('Careers')
  const hasContent = Boolean(job.content?.trim())

  return (
    <div className={cn('min-w-0', className)}>
      <Reveal
        y={16}
        disableOnMobile
      >
        <p className='text-[0.65rem] uppercase tracking-[0.2em] text-brand-moss'>
          {t('jobDescription')}
        </p>
        {job.post_excerpt ? (
          <p className='mt-3 font-sans text-[1.05rem] leading-[1.8] text-brand-ink/70'>
            {job.post_excerpt}
          </p>
        ) : null}
      </Reveal>

      {hasContent ? (
        <Reveal
          delay={0.06}
          y={20}
          disableOnMobile
          className='mt-8'
        >
          <article
            className={cn(
              'max-w-none font-sans text-[1.02rem] leading-[1.85] text-brand-ink/72',
              '[&_h2]:mt-[2.25rem] [&_h2]:font-display [&_h2]:text-[1.55rem] [&_h2]:font-semibold [&_h2]:uppercase [&_h2]:tracking-wide [&_h2]:text-brand-ink',
              '[&_h3]:mt-[1.65rem] [&_h3]:font-display [&_h3]:text-[1.25rem] [&_h3]:font-semibold [&_h3]:uppercase [&_h3]:tracking-wide [&_h3]:text-brand-ink',
              '[&_p]:mt-[1.05rem]',
              '[&_ul]:mt-[1.05rem] [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:marker:text-brand-moss',
              '[&_ol]:mt-[1.05rem] [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:marker:text-brand-moss',
              '[&_li]:mt-1.5',
              '[&_a]:text-brand-moss [&_a]:underline [&_a]:underline-offset-[0.28em] [&_a]:decoration-brand-moss/40',
              '[&_h2:first-child]:mt-0 [&_h3:first-child]:mt-0 [&_p:first-child]:mt-0',
              'xsm:text-[0.95rem] xsm:[&_h2]:text-[1.35rem] xsm:[&_h3]:text-[1.1rem]',
            )}
            dangerouslySetInnerHTML={{ __html: job.content }}
          />
        </Reveal>
      ) : null}
    </div>
  )
}
