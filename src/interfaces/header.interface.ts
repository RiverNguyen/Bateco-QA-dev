import type { ILink } from '@/interfaces/link.interface'

export interface IHeaderDesc {
  title: string
  desc: string
}

export interface IHeaderParentLinkItem {
  item: ILink
}

/** Parent block when `select` is `"normal"` */
export interface IHeaderParentInactive {
  link_title: null
  link: false
  desc: IHeaderDesc
}

/** Parent block when `select` is `"parent"` (mega menu). CMS may leave fields empty. */
export interface IHeaderParentActive {
  link_title: ILink | null
  link: IHeaderParentLinkItem[] | false
  desc: IHeaderDesc
}

export type IHeaderParent = IHeaderParentInactive | IHeaderParentActive

export interface IHeaderNavigationNormal {
  select: 'normal'
  normal: ILink
  parent: IHeaderParentInactive
}

export interface IHeaderNavigationParent {
  select: 'parent'
  normal: null
  parent: IHeaderParentActive
}

export type IHeaderNavigation = IHeaderNavigationNormal | IHeaderNavigationParent

export interface IHeader {
  logo: string
  navigations: IHeaderNavigation[]
}
