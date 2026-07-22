import Image from 'next/image'

import { Reveal } from '@/components/shared/reveal'
import { getLocalePath, type LocaleCode } from '@/i18n/locale-paths'
import { Link } from '@/i18n/navigation'
import type { IPostDetail } from '@/interfaces/news.interface'
import Container from '@/layouts/container'

type NewsDetailBannerProps = {
  post: IPostDetail
  locale: LocaleCode
}

export function NewsDetailBanner({ post, locale }: NewsDetailBannerProps) {
  const category = post.taxonomies?.categories_post?.[0]
  const image = post.thumbnail?.url
  const newsHref = getLocalePath('news', locale)

  return (
    <section
      className='relative flex min-h-[min(72vh,38rem)] flex-col overflow-hidden bg-brand-ink text-white xsm:min-h-[min(68vh,28rem)]'
      aria-labelledby='news-detail-heading'
    >
      {image ? (
        <div className='absolute inset-0'>
          <Image
            src={image}
            alt=''
            fill
            priority
            sizes='100vw'
            className='scale-[1.02] object-cover object-center'
          />
          <div
            aria-hidden
            className='absolute inset-0 bg-gradient-to-r from-brand-ink/85 via-brand-ink/35 to-transparent'
          />
          <div
            aria-hidden
            className='absolute inset-0 bg-gradient-to-t from-brand-ink/90 via-brand-ink/25 to-brand-ink/20'
          />
        </div>
      ) : (
        <div
          aria-hidden
          className='absolute inset-0'
          style={{
            background:
              'radial-gradient(ellipse 55% 45% at 85% 15%, color-mix(in srgb, var(--brand-moss) 22%, transparent), transparent 60%), radial-gradient(ellipse 40% 35% at 10% 90%, color-mix(in srgb, var(--brand-moss) 12%, transparent), transparent 70%)',
          }}
        />
      )}

      <div
        aria-hidden
        className='pointer-events-none absolute inset-0 opacity-[0.09]'
        style={{
          backgroundImage:
            'linear-gradient(to right, color-mix(in srgb, var(--brand-moss) 45%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in srgb, var(--brand-moss) 45%, transparent) 1px, transparent 1px)',
          backgroundSize: '5rem 5rem',
          maskImage: 'radial-gradient(ellipse at 20% 80%, black 10%, transparent 70%)',
        }}
      />

      <Container className='relative z-10 flex flex-1 flex-col justify-between px-4 pb-[3.75rem] pt-[5.5rem] xsm:pb-[2.5rem] xsm:pt-[4.25rem]'>
        <div className='mt-auto max-w-[64rem] pt-[3rem]'>
          <Reveal
            delay={0.04}
            y={18}
          >
            <div className='flex flex-wrap items-center gap-x-4 gap-y-2'>
              {category ? (
                <Link
                  href={`${newsHref}?category=${category.slug}`}
                  className='inline-flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.22em] text-brand-moss transition-colors hover:text-white'
                >
                  <span
                    aria-hidden
                    className='size-1.5 rounded-full bg-brand-moss'
                  />
                  {category.name}
                </Link>
              ) : null}
              <time
                dateTime={post.published}
                className='font-sans text-[0.85rem] tabular-nums text-white/50'
              >
                {post.published}
              </time>
            </div>
          </Reveal>

          <Reveal
            delay={0.08}
            y={28}
          >
            <h1
              id='news-detail-heading'
              className='mt-[1.15rem] font-display text-[3.85rem] font-semibold uppercase leading-[1.125] tracking-wide text-white xsm:text-[2.15rem]'
            >
              {post.title}
            </h1>
          </Reveal>

          {post.excerpt ? (
            <Reveal
              delay={0.12}
              y={20}
            >
              <div
                className='mt-[1.25rem] max-w-[34rem] font-sans text-[1.05rem] leading-[1.75] text-white/65 xsm:mt-[1rem] xsm:text-[0.92rem]'
                dangerouslySetInnerHTML={{ __html: post.excerpt }}
              />
            </Reveal>
          ) : null}

          <Reveal
            delay={0.16}
            y={12}
          >
            <span
              aria-hidden
              className='mt-[1.5rem] block h-[0.12rem] w-[2.75rem] bg-brand-moss'
            />
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
