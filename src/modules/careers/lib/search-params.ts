import { createSearchParamsCache, parseAsInteger, parseAsString } from 'nuqs/server'

export const careersSearchParams = {
  category: parseAsString,
  q: parseAsString,
  page: parseAsInteger.withDefault(1),
}

export const careersSearchParamsCache = createSearchParamsCache(careersSearchParams)

export const careersQueryOptions = {
  history: 'push' as const,
  shallow: false,
  scroll: false,
}
