'use client'

import { parseAsInteger, useQueryState } from 'nuqs'

import Pagination from '@/components/shared/pagination'
import { newsQueryOptions } from '@/modules/news/lib/search-params'

type NewsPaginationProps = {
  pageCount: number
}

export function NewsPagination({ pageCount }: NewsPaginationProps) {
  const [page, setPage] = useQueryState(
    'page',
    parseAsInteger.withDefault(1).withOptions(newsQueryOptions),
  )

  if (pageCount <= 1) return null

  return (
    <div className='mt-[2.75rem] pt-[1.75rem] xsm:mt-[2rem] xsm:pt-[1.35rem]'>
      <Pagination
        pageCurrent={page}
        pageCount={pageCount}
        variant='dark'
        onPageChange={(next) => {
          void setPage(next <= 1 ? null : next).then(() => {
            document
              .getElementById('news-listing')
              ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
          })
        }}
      />
    </div>
  )
}
