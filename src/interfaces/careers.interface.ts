export interface ICareersItem {
  id: number
  title: string
  slug: string
  published: string
  link: string
  taxonomies: {
    careers_tax: {
      id: number
      name: string
      slug: string
    }[]
  }
  post_excerpt: string
  acf: { wage: string; type: string; date: string }
}

export interface ICareersTaxonomy {
  id: number
  name: string
  slug: string
  link: string
}

export interface ICareersDetail {
  id: number
  title: string
  slug: string
  published: string
  link: string
  thumbnail?: {
    id?: number | null
    url?: string | null
  } | null
  taxonomies: {
    careers_tax: {
      id: number
      name: string
      slug: string
    }[]
  }
  acf: {
    wage: string
    type: string
    date: string
  }
  post_excerpt: string
  content: string
}

export type ICareersListResponse = {
  data?: ICareersItem[]
  total?: number
  total_pages?: number
  totalPages?: number
  max_num_pages?: number
  pagination?: {
    totalPages?: number
    totalItems?: number
    pageSize?: number
  }
}

export function getCareersPageCount(
  response?: ICareersListResponse | null,
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
