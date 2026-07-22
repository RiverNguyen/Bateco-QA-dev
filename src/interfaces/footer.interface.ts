import type { ILink } from '@/interfaces/link.interface'

export interface IFooterContactItem {
  title: string
  link: ILink
}

export interface IFooterMenuLinkItem {
  link: ILink
}

export interface IFooterMenuSection {
  title: string
  link_array: IFooterMenuLinkItem[]
}

export interface IFooter {
  logo: string
  desc: string
  button_1: ILink
  button_2: ILink
  contact: IFooterContactItem[]
  menu: IFooterMenuSection[]
}
