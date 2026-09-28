'use client'

import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useLocale, useTranslations } from 'next-intl'

import { ArrowLink } from '@/components/shared/arrow-link'
import { getLocalePath, type LocaleCode } from '@/i18n/locale-paths'
import { Link } from '@/i18n/navigation'
import { IHomepageNews } from '@/interfaces/homepage.interface'
import { cn } from '@/lib/utils'
import { EASE } from '@/modules/home/important-events/lib/constants'

const copyItemVariants = {
  enter: { opacity: 0, y: 16, filter: 'blur(8px)' },
  center: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.45, ease: EASE },
  },
  exit: { opacity: 0, y: -8, filter: 'blur(6px)', transition: { duration: 0.25 } },
}

function FeaturedCopyInner({
  article,
  animated = false,
  tone = 'dark',
}: {
  article: IHomepageNews
  animated?: boolean
  tone?: 'dark' | 'light'
}) {
  const locale = useLocale() as LocaleCode
  const newsHref = getLocalePath('news', locale)
  const href = getLocalePath('news', locale, article?.slug)
  const category = article?.taxonomies?.categories_post?.[0]
  const t = useTranslations('Common')
  const isLight = tone === 'light'
  const Wrapper = animated ? motion.div : 'div'
  const wrapperProps = animated ? { variants: copyItemVariants } : {}

  return (
    <>
      <Wrapper
        {...wrapperProps}
        className='flex items-center gap-[0.75rem]'
      >
        <time
          dateTime={article?.published}
          className={cn(
            'font-sans text-[0.8rem] font-semibold tabular-nums tracking-wide',
            isLight ? 'text-brand-ink' : 'text-white',
          )}
        >
          {article?.published}
        </time>
        <span
          aria-hidden
          className='h-px w-[1.25rem] bg-brand-moss'
        />
        {category?.name ? (
          <Link
            href={`${newsHref}?category=${category.slug}`}
            className='font-sans text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-brand-moss'
          >
            {category.name}
          </Link>
        ) : null}
      </Wrapper>

      <Wrapper
        {...wrapperProps}
        className='mt-[1.15rem] max-w-[28rem]'
      >
        <Link
          href={href}
          className={cn(
            'font-display text-[2.15rem] font-semibold uppercase leading-[1.08] tracking-wide transition-colors duration-300 hover:text-brand-moss xsm:text-[1.45rem]',
            isLight ? 'text-brand-ink' : 'text-white',
          )}
        >
          <h3 className='line-clamp-3'>{article?.title}</h3>
        </Link>
      </Wrapper>

      <Wrapper
        {...wrapperProps}
        className={cn(
          'mt-[0.9rem] max-w-[26rem] font-sans text-[0.95rem] leading-relaxed',
          isLight ? 'text-brand-ink/70' : 'text-white/75',
        )}
      >
        <p className='line-clamp-3'>{article?.post_excerpt}</p>
      </Wrapper>

      <Wrapper
        {...wrapperProps}
        className='mt-[1.5rem]'
      >
        <ArrowLink
          href={href}
          variant={isLight ? 'ink' : 'light'}
        >
          {t('viewDetails')}
        </ArrowLink>
      </Wrapper>
    </>
  )
}

export function FeaturedCopy({
  article,
  direction,
  tone = 'dark',
}: {
  article: IHomepageNews
  direction: 1 | -1
  tone?: 'dark' | 'light'
}) {
  const reduceMotion = useReducedMotion()

  if (reduceMotion) {
    return (
      <div className='flex flex-col justify-center py-[0.5rem]'>
        <FeaturedCopyInner
          article={article}
          tone={tone}
        />
      </div>
    )
  }

  return (
    <AnimatePresence
      mode='wait'
      custom={direction}
    >
      <motion.div
        key={article?.id}
        custom={direction}
        initial='enter'
        animate='center'
        exit='exit'
        variants={{
          enter: (dir: 1 | -1) => ({
            opacity: 0,
            x: dir * -36,
            y: 18,
            filter: 'blur(10px)',
          }),
          center: {
            opacity: 1,
            x: 0,
            y: 0,
            filter: 'blur(0px)',
            transition: {
              duration: 0.55,
              ease: EASE,
              staggerChildren: 0.07,
              delayChildren: 0.06,
            },
          },
          exit: (dir: 1 | -1) => ({
            opacity: 0,
            x: dir * 28,
            y: -12,
            filter: 'blur(8px)',
            transition: { duration: 0.35, ease: EASE },
          }),
        }}
        className='flex flex-col justify-center py-[0.5rem]'
      >
        <FeaturedCopyInner
          article={article}
          animated
          tone={tone}
        />
      </motion.div>
    </AnimatePresence>
  )
}
