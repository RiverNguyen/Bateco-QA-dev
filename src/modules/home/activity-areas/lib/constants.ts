export const AREA_ORDER = ['a', 'b', 'c', 'd', 'e', 'f'] as const
export type AreaKey = (typeof AREA_ORDER)[number]

export const AREA_CLASS: Record<AreaKey, string> = {
  a: '[grid-area:a]',
  b: '[grid-area:b]',
  c: '[grid-area:c]',
  d: '[grid-area:d]',
  e: '[grid-area:e]',
  f: '[grid-area:f]',
}
