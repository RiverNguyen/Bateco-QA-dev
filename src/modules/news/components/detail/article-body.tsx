import { getTranslations } from 'next-intl/server'

import type { LocaleCode } from '@/i18n/locale-paths'
import Container from '@/layouts/container'
import { cn } from '@/lib/utils'
import { NewsShare } from '@/modules/news/components/detail/share'
import { NewsArticleToc } from '@/modules/news/components/detail/toc'
import type { NewsTocItem } from '@/modules/news/lib/prepare-content'

type NewsArticleBodyProps = {
  html: string
  toc: NewsTocItem[]
  title?: string
  locale: LocaleCode
}

export async function NewsArticleBody({ html, toc, title, locale }: NewsArticleBodyProps) {
  const t = await getTranslations({ locale, namespace: 'News' })

  if (!html) return null

  return (
    <section
      className='relative border-t border-brand-ink/8 bg-[#e7ebe8] text-brand-ink'
      aria-label={t('articleAria')}
    >
      <div
        aria-hidden
        className='pointer-events-none absolute inset-x-0 top-0 h-[24rem]'
        style={{
          background:
            'radial-gradient(ellipse 45% 55% at 0% 0%, color-mix(in srgb, var(--brand-moss) 9%, transparent), transparent 70%)',
        }}
      />

      <Container className='relative px-4 py-[5rem] xsm:py-[3rem]'>
        <div
          className={cn(
            'grid items-start gap-x-[3.5rem]',
            toc.length > 0 ? 'grid-cols-[minmax(15rem,18rem)_minmax(0,1fr)]' : 'grid-cols-1',
            'xsm:grid-cols-1 xsm:gap-y-[1.75rem]',
          )}
        >
          {toc.length > 0 ? (
            <aside className='self-stretch xsm:hidden'>
              <NewsArticleToc items={toc} />
            </aside>
          ) : null}

          <div className='min-w-0 max-w-[64rem]'>
            {toc.length > 0 ? (
              <div className='mb-[2rem] hidden xsm:block'>
                <NewsArticleToc items={toc} />
              </div>
            ) : null}

            <article
              className={cn(
                'prose-news max-w-none font-sans text-[1.05rem] leading-[1.9] text-brand-ink/72',
                '[&_h2]:mt-[2.75rem] [&_h2]:scroll-mt-[calc(var(--header-height)+1.5rem)] [&_h2]:font-display [&_h2]:text-[1.75rem] [&_h2]:font-semibold [&_h2]:uppercase [&_h2]:tracking-wide [&_h2]:text-brand-ink',
                '[&_h3]:mt-[1.85rem] [&_h3]:scroll-mt-[calc(var(--header-height)+1.5rem)] [&_h3]:font-display [&_h3]:text-[1.3rem] [&_h3]:font-semibold [&_h3]:uppercase [&_h3]:tracking-wide [&_h3]:text-brand-ink',
                '[&_p]:mt-[1.15rem]',
                '[&_ul]:mt-[1.15rem] [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:marker:text-brand-moss',
                '[&_ol]:mt-[1.15rem] [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:marker:text-brand-moss',
                '[&_li]:mt-1.5',
                '[&_a]:text-brand-moss [&_a]:underline [&_a]:underline-offset-[0.28em] [&_a]:decoration-brand-moss/40 [&_a]:transition-colors hover:[&_a]:decoration-brand-moss',
                '[&_img]:my-[2rem] [&_img]:h-auto [&_img]:w-full [&_img]:object-cover',
                '[&_blockquote]:mt-[1.75rem] [&_blockquote]:border-l-2 [&_blockquote]:border-brand-moss [&_blockquote]:bg-white/55 [&_blockquote]:py-4 [&_blockquote]:pl-6 [&_blockquote]:pr-5 [&_blockquote]:text-brand-ink/65',
                '[&_figure]:my-[2rem]',
                '[&_figcaption]:mt-3 [&_figcaption]:text-[0.7rem] [&_figcaption]:uppercase [&_figcaption]:tracking-[0.14em] [&_figcaption]:text-brand-ink/40',
                '[&_h2:first-child]:mt-0 [&_h3:first-child]:mt-0 [&_p:first-child]:mt-0',
                'xsm:text-[0.95rem] xsm:[&_h2]:text-[1.4rem] xsm:[&_h3]:text-[1.15rem]',
              )}
              dangerouslySetInnerHTML={{ __html: html }}
            />

            <NewsShare title={title} />
          </div>
        </div>
      </Container>
    </section>
  )
}
