import type { IHomepageNews } from '@/interfaces/homepage.interface'

export type INewsItem = IHomepageNews

export interface INewsPage {
  banner: {
    badge: string
    title: string
    desc: string
    image: string
  }
}

export interface INewsBanner {
  subtitle: string
  title: string
  desc: string
  image: string
}

export interface INewsTaxonomy {
  id: number
  name: string
  slug: string
  link: string
}

export interface INewsListResponse {
  data?: INewsItem[]
  total?: number
  total_pages?: number
  totalPages?: number
  max_num_pages?: number
  pagination?: {
    page?: number
    pageSize?: number
    totalItems?: number
    totalPages?: number
  }
}

export interface IPostDetail {
  id: number
  title: string
  slug: string
  published: string
  views?: number
  thumbnail?: {
    id?: number
    url: string
  }
  taxonomies: {
    categories_post: {
      id: number
      name: string
      slug: string
    }[]
  }
  content: string
  excerpt: string
}

export function getNewsPageCount(
  response?: INewsListResponse | null,
  options?: { limit?: number; fallback?: number },
) {
  const fallback = options?.fallback ?? 1
  const count =
    response?.pagination?.totalPages ??
    response?.total_pages ??
    response?.totalPages ??
    response?.max_num_pages

  if (typeof count === 'number' && count > 0) return count

  const totalItems = response?.pagination?.totalItems ?? response?.total
  const limit = options?.limit ?? response?.pagination?.pageSize
  if (typeof totalItems === 'number' && typeof limit === 'number' && limit > 0) {
    return Math.max(1, Math.ceil(totalItems / limit))
  }

  return fallback
}
