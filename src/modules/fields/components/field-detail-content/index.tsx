import { getTranslations } from 'next-intl/server'

import { Reveal } from '@/components/shared/reveal'
import type { LocaleCode } from '@/i18n/locale-paths'
import type { IFieldsItem } from '@/interfaces/fields.interface'
import Container from '@/layouts/container'
import { cn } from '@/lib/utils'

type FieldDetailContentProps = {
  field: IFieldsItem
  locale: LocaleCode
}

export async function FieldDetailContent({ field, locale }: FieldDetailContentProps) {
  const t = await getTranslations({ locale, namespace: 'Fields' })
  const tCommon = await getTranslations({ locale, namespace: 'Common' })

  if (field.htmlContent) {
    return (
      <section
        className='border-t border-brand-ink/10 bg-[#e7ebe8] text-brand-ink'
        aria-labelledby={`field-${field.id}-content-heading`}
      >
        <Container className='px-4 py-[4.5rem] xsm:py-[2.75rem]'>
          <Reveal y={20}>
            <p className='text-[0.68rem] uppercase tracking-[0.22em] text-brand-moss'>
              {t('detailEyebrow')}
            </p>
            <h2
              id={`field-${field.id}-content-heading`}
              className='mt-2 max-w-[40rem] font-display text-[2.35rem] font-semibold uppercase leading-[1.05] tracking-wide xsm:text-[1.55rem]'
            >
              {field.title}
            </h2>
            <span
              aria-hidden
              className='mt-[1rem] block h-[0.12rem] w-[2.75rem] bg-brand-moss'
            />
          </Reveal>

          <Reveal
            delay={0.08}
            y={22}
          >
            <div
              className={cn(
                'prose-field mt-[2.5rem] max-w-[42rem] font-sans text-[0.98rem] leading-[1.8] text-brand-ink/72',
                '[&_h2]:mt-[2rem] [&_h2]:font-display [&_h2]:text-[1.35rem] [&_h2]:font-semibold [&_h2]:uppercase [&_h2]:tracking-wide [&_h2]:text-brand-ink',
                '[&_h3]:mt-[1.5rem] [&_h3]:font-display [&_h3]:text-[1.15rem] [&_h3]:font-semibold [&_h3]:uppercase [&_h3]:tracking-wide [&_h3]:text-brand-ink',
                '[&_p]:mt-[0.9rem]',
                '[&_ul]:mt-[0.9rem] [&_ul]:list-disc [&_ul]:pl-5',
              )}
              dangerouslySetInnerHTML={{ __html: field.htmlContent }}
            />
          </Reveal>
        </Container>
      </section>
    )
  }

  if (!field.sections?.length) return null

  return (
    <section
      className='border-t border-brand-ink/10 bg-[#e7ebe8] text-brand-ink'
      aria-labelledby={`field-${field.id}-content-heading`}
    >
      <Container className='px-4 py-[4.5rem] xsm:py-[2.75rem]'>
        <Reveal y={20}>
          <p className='text-[0.68rem] uppercase tracking-[0.22em] text-brand-moss'>
            {t('detailEyebrow')}
          </p>
          <h2
            id={`field-${field.id}-content-heading`}
            className='mt-2 max-w-[40rem] font-display text-[2.35rem] font-semibold uppercase leading-[1.05] tracking-wide xsm:text-[1.55rem]'
          >
            {field.title}
          </h2>
          <span
            aria-hidden
            className='mt-[1rem] block h-[0.12rem] w-[2.75rem] bg-brand-moss'
          />
        </Reveal>

        <div className='mt-[2.75rem] grid grid-cols-[minmax(0,1fr)_minmax(0,60rem)] gap-x-[4rem] gap-y-[2.5rem] xsm:mt-[2rem] xsm:grid-cols-1'>
          <nav
            aria-label={t('tocAria')}
            className='sticky top-[calc(var(--header-height)+1.5rem)] self-start xsm:static'
          >
            <ol className='space-y-2 border-l border-brand-ink/15 pl-4'>
              {field.sections.map((section, index) => (
                <li key={section.title}>
                  <a
                    href={`#${field.id}-section-${index}`}
                    className='text-[0.68rem] uppercase tracking-[0.16em] text-brand-ink/45 transition-colors hover:text-brand-moss'
                  >
                    {String(index + 1).padStart(2, '0')} / {section.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className='min-w-0 space-y-[2.75rem] xsm:space-y-[2rem]'>
            {field.sections.map((section, index) => (
              <Reveal
                key={section.title}
                delay={0.04 + index * 0.04}
                y={22}
              >
                <article
                  id={`${field.id}-section-${index}`}
                  className='scroll-mt-[calc(var(--header-height)+1rem)]'
                >
                  <h3 className='font-display text-[1.35rem] font-semibold uppercase tracking-wide text-brand-ink xsm:text-[1.15rem]'>
                    {section.title}
                  </h3>
                  <div className='mt-[1rem] space-y-[0.9rem]'>
                    {section.paragraphs.map((paragraph) => (
                      <p
                        key={paragraph.slice(0, 48)}
                        className='font-sans text-[0.95rem] leading-[1.8] text-brand-ink/72'
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </article>
              </Reveal>
            ))}

            {field.closing ? (
              <Reveal
                delay={0.12}
                y={18}
              >
                <aside
                  className={cn('border border-brand-moss/25 bg-brand-moss/[0.08] p-5', 'xsm:p-4')}
                >
                  <p className='text-[0.65rem] uppercase tracking-[0.2em] text-brand-moss'>
                    {tCommon('brand')}
                  </p>
                  <p className='mt-3 font-sans text-[0.92rem] leading-[1.75] text-brand-ink/78'>
                    {field.closing}
                  </p>
                </aside>
              </Reveal>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  )
}
