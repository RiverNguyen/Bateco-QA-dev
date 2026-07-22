import type { ILink } from '@/interfaces/link.interface'

export interface IHomepageBannerSlide {
  subtitle: string
  title: string
  image: string
}

export interface IHomepageAboutDetail {
  title: string
  desc: string
}

export interface IHomepageAbout {
  subtitle: string
  title: string
  desc: string
  detail: IHomepageAboutDetail[]
  link: ILink
  image: string
}

export interface IHomepageCoreValue {
  title: string
  desc: string
}

export interface IHomepageCoreValues {
  subtitle: string
  title: string
  desc: string
  values: IHomepageCoreValue[]
}

export interface IHomepageAreaField {
  image: string
  title: string
  desc: string
  link: ILink
}

export interface IHomepageAreasOfOperation {
  title: string
  field: IHomepageAreaField[]
}

export interface IHomepageCustomer {
  subtitle: string
  title: string
  image: string
}

export interface IHomepageCustomers {
  subtitle: string
  title: string
  desc: string
  customer_array: IHomepageCustomer[]
}

export interface IHomepagePartner {
  subtitle: string
  title: string
  desc: string
  gallery: string[]
}

export interface IHomepageNews {
  id: number
  title: string
  slug: string
  published: string
  link: string
  thumbnail: { url: string }
  taxonomies: {
    categories_post: {
      id: number
      name: string
      slug: string
    }[]
  }
  post_excerpt: string
}

export interface IHomepage {
  banner: IHomepageBannerSlide[]
  about: IHomepageAbout
  core_values: IHomepageCoreValues
  areas_of_operation: IHomepageAreasOfOperation
  customers: IHomepageCustomers
  partner: IHomepagePartner
  news: IHomepageNews[]
}

/** WordPress page response when fetching `?_fields=acf` */
export interface IHomepagePageResponse {
  acf: IHomepage
}
