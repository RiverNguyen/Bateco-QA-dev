import type { IAboutEnterprise, IAboutEnterpriseChartItem } from '@/interfaces/about.interface'

export type RevenueChartSegmentKey = 'industry' | 'trade' | 'defense' | 'other'

export type RevenueChartPoint = {
  year: string
  industry: number
  trade: number
  defense: number
  other: number
  total: number
}

function toNumber(value: string | number | undefined) {
  const parsed = typeof value === 'number' ? value : Number(value)
  return Number.isFinite(parsed) ? parsed : 0
}

export function mapEnterpriseChartItem(item: IAboutEnterpriseChartItem): RevenueChartPoint {
  const industry = toNumber(item.industry)
  const trade = toNumber(item.trade)
  const defense = toNumber(item.defense)
  const other = toNumber(item.other)

  return {
    year: item.year,
    industry,
    trade,
    defense,
    other,
    total: industry + trade + defense + other,
  }
}

export function mapEnterpriseChart(data?: IAboutEnterprise | null): RevenueChartPoint[] {
  if (!Array.isArray(data?.chart)) return []
  return data.chart.map(mapEnterpriseChartItem)
}

export function getChartDomain(points: RevenueChartPoint[]) {
  const maxTotal = points.reduce((max, point) => Math.max(max, point.total), 0)
  if (maxTotal <= 0) return { domain: [0, 500] as [number, number], ticks: [0, 250, 500] }

  const step = maxTotal <= 1000 ? 250 : maxTotal <= 2000 ? 500 : 500
  const ceiling = Math.ceil(maxTotal / step) * step
  const ticks = Array.from({ length: Math.floor(ceiling / step) + 1 }, (_, index) => index * step)

  return { domain: [0, ceiling] as [number, number], ticks }
}
