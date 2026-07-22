export type FooterLink = {
  label: string
  href: string
  target?: string
}

export type FooterColumn = {
  title: string
  links: FooterLink[]
}

export type FooterContact = {
  title: string
  label: string
  href: string
  target?: string
}
