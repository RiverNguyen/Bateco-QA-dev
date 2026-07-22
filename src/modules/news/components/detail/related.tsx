import { getTranslations } from 'next-intl/server'

import { ArrowLink } from '@/components/shared/arrow-link'
import type { ArticleCardItem } from '@/components/shared/article-card'
import { ArticleCarousel } from '@/components/shared/article-carousel'
import { Reveal } from '@/components/shared/reveal'
import Container from '@/layouts/container'

type NewsRelatedProps = {
  articles: ArticleCardItem[]
}

export async function NewsRelated({ articles }: NewsRelatedProps) {
  const t = await getTranslations('News')
  const tCommon = await getTranslations('Common')

  if (!articles.length) return null

  return (
    <section
      className='relative overflow-hidden border-t border-white/[0.08] bg-brand-ink text-white'
      aria-labelledby='news-related-heading'
    >
      <div
        aria-hidden
        className='pointer-events-none absolute inset-0'
        style={{
          background:
            'radial-gradient(ellipse 50% 40% at 8% 0%, color-mix(in srgb, var(--brand-moss) 16%, transparent), transparent 65%), radial-gradient(ellipse 40% 35% at 94% 90%, color-mix(in srgb, var(--brand-moss) 9%, transparent), transparent 70%)',
        }}
      />
      <div
        aria-hidden
        className='pointer-events-none absolute inset-0 opacity-[0.07]'
        style={{
          backgroundImage:
            'linear-gradient(to right, color-mix(in srgb, var(--brand-moss) 40%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in srgb, var(--brand-moss) 40%, transparent) 1px, transparent 1px)',
          backgroundSize: '4.5rem 4.5rem',
          maskImage: 'radial-gradient(ellipse at 70% 20%, black 10%, transparent 68%)',
        }}
      />

      <Container className='relative py-[5rem] xsm:py-[3rem]'>
        <Reveal y={18}>
          <div className='mb-[1.75rem] flex items-end justify-between gap-4 border-b border-white/10 pb-[1.15rem] xsm:mb-[1.25rem]'>
            <div>
              <p className='text-[0.68rem] font-medium uppercase tracking-[0.24em] text-brand-moss'>
                {t('relatedEyebrow')}
              </p>
              <h2
                id='news-related-heading'
                className='mt-[0.7rem] font-display text-[2.5rem] font-semibold uppercase leading-none tracking-wide xsm:text-[1.65rem]'
              >
                {t('relatedTitle')}
              </h2>
            </div>
            <ArrowLink
              href='/tin-tuc'
              variant='light'
              className='mb-[0.2rem] shrink-0'
            >
              {tCommon('viewAll')}
            </ArrowLink>
          </div>
        </Reveal>

        <Reveal
          delay={0.06}
          y={24}
        >
          <ArticleCarousel
            items={articles}
            variant='dark'
            className='gap-[0.75rem]'
          />
        </Reveal>
      </Container>
    </section>
  )
}
