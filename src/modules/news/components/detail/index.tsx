import type { ArticleCardItem } from '@/components/shared/article-card'
import type { LocaleCode } from '@/i18n/locale-paths'
import type { IPostDetail } from '@/interfaces/news.interface'
import PartnerCta from '@/modules/about/components/partner-cta'
import { NewsArticleBody } from '@/modules/news/components/detail/article-body'
import { NewsDetailBanner } from '@/modules/news/components/detail/banner'
import { NewsRelated } from '@/modules/news/components/detail/related'
import { preparePostContent } from '@/modules/news/lib/prepare-content'

type NewsDetailModuleProps = {
  post: IPostDetail
  related: ArticleCardItem[]
  locale: LocaleCode
}

export default function NewsDetailModule({ post, related, locale }: NewsDetailModuleProps) {
  const { html, toc } = preparePostContent(post.content)

  return (
    <>
      <NewsDetailBanner post={post} />
      <NewsArticleBody
        html={html}
        toc={toc}
        title={post.title}
      />
      <NewsRelated articles={related} />
      <PartnerCta locale={locale} />
    </>
  )
}
