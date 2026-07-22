import { ILink } from '@/interfaces/link.interface'

export interface IContactBanner {
  image_background: string
  image_small: string
  sub_title: string
  title: string
  desc: string
  button: string
}

export interface IContactInfoItem {
  icon: string
  title: string
  desc: string
}

export interface IContactGoogleMap {
  image_url: string
  link: ILink
  address: string
}

export interface IContactSection {
  title: string
  google_map: IContactGoogleMap
  infor: IContactInfoItem[]
}

export interface IContactPageData {
  banner: IContactBanner
  contact: IContactSection
}
