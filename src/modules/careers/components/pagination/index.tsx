'use client'

import { parseAsInteger, useQueryState } from 'nuqs'

import Pagination from '@/components/shared/pagination'
import { careersQueryOptions } from '@/modules/careers/lib/search-params'

type CareersPaginationProps = {
  pageCount: number
}

export function CareersPagination({ pageCount }: CareersPaginationProps) {
  const [page, setPage] = useQueryState(
    'page',
    parseAsInteger.withDefault(1).withOptions(careersQueryOptions),
  )

  if (pageCount <= 1) return null

  return (
    <div className='mt-[2.75rem] pt-[1.75rem] xsm:mt-[2rem] xsm:pt-[1.35rem]'>
      <Pagination
        pageCurrent={page}
        pageCount={pageCount}
        variant='light'
        onPageChange={(next) => {
          void setPage(next <= 1 ? null : next).then(() => {
            document
              .getElementById('careers-listing')
              ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
          })
        }}
      />
    </div>
  )
}
