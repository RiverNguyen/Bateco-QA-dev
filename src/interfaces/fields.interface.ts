export interface IFieldResponse {
  id: number
  title: string
  slug: string
  type: string
  status: string
  published: string
  link: string
  thumbnail: {
    id: number
    url: string
  }
  post_excerpt: string
  subtitle: string
  description: string
  button_1: {
    url: string
    title: string
  }
  button_2: {
    url: string
    title: string
  }
}

export interface IFieldsSection {
  title: string
  paragraphs: string[]
}

export interface IFieldsBanner {
  subtitle: string
  title: string
  desc: string
  image: string
  button_1: {
    title: string
    url: string
    target?: string
  }
  button_2: {
    title: string
    url: string
    target?: string
  }
}

export interface IFieldsItem {
  id: string
  index: string
  title: string
  summary: string
  desc: string
  image: string
  highlights?: string[]
  sections?: IFieldsSection[]
  closing?: string
  htmlContent?: string
}

export interface IFieldsDetail {
  id: number
  title: string
  slug: string
  type: string
  status: string
  published: string
  link: string
  thumbnail: {
    id: number
    url: string
  }
  post_excerpt: string
  content: string
}
