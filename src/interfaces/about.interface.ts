import type { ILink } from '@/interfaces/link.interface'

export interface IAboutBannerField {
  icon: string
  title: string
}

export interface IAboutBanner {
  image: string
  subtitle: string
  title: string
  desc: string
  button_1: ILink
  button_2: ILink
  field: IAboutBannerField[]
}

export interface IAboutUsParameter {
  number: string
  title: string
}

export interface IAboutUs {
  subtitle: string
  title: string
  desc: string
  image: string
  parameter: IAboutUsParameter[]
}

export interface IAboutEnterpriseChartItem {
  year: string
  industry: string
  trade: string
  defense: string
  other: string
}

export interface IAboutEnterprise {
  title: string
  desc: string
  label: string
  chart: IAboutEnterpriseChartItem[]
}

export interface IAboutCertification {
  image: string
  subtitle: string
  title: string
  year: string
}

export interface IAboutPage {
  banner: IAboutBanner
  about_us: IAboutUs
  enterprise: IAboutEnterprise
  certification: IAboutCertification[]
  featured_image: string | null
}

/** WordPress page response when fetching `?_fields=acf` */
export interface IAboutPageResponse {
  acf: IAboutPage
}
