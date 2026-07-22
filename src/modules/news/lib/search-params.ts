import { createSearchParamsCache, parseAsInteger, parseAsString } from 'nuqs/server'

export const newsSearchParams = {
  category: parseAsString,
  q: parseAsString,
  page: parseAsInteger.withDefault(1),
}

export const newsSearchParamsCache = createSearchParamsCache(newsSearchParams)

export const newsQueryOptions = {
  history: 'push' as const,
  shallow: false,
  scroll: false,
}
