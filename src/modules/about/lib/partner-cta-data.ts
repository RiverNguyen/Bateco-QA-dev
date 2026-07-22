export type AboutPartnerCtaData = {
  signal: string
  title: string
  description: string
  cta: {
    label: string
    href: string
  }
  image: string
}

export const ABOUT_PARTNER_CTA: AboutPartnerCtaData = {
  signal: 'ANQP · Hợp tác chiến lược',
  title: 'Đồng hành cùng các nhiệm vụ trọng yếu',
  description:
    'BATECO Quốc An cam kết mang đến những giải pháp công nghệ cao, đồng bộ, bảo mật – Sẵn sàng cho mọi nhiệm vụ.',
  cta: {
    label: 'Liên hệ hợp tác ngay',
    href: '/lien-he',
  },
  image: '/images/about/contact.png',
}
