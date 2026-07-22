'use client'

import { useLocale, useTranslations } from 'next-intl'
import { useMemo, useState } from 'react'
import { Bar, BarChart, CartesianGrid, Cell, LabelList, XAxis, YAxis } from 'recharts'

import { Reveal } from '@/components/shared/reveal'
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  type ChartConfig,
} from '@/components/ui/chart'
import type { IAboutEnterprise } from '@/interfaces/about.interface'
import Container from '@/layouts/container'
import { cn } from '@/lib/utils'
import {
  getChartDomain,
  mapEnterpriseChart,
  type RevenueChartPoint,
} from '@/modules/about/lib/revenue-chart-data'

const SEGMENT_ORDER = ['industry', 'trade', 'defense', 'other'] as const
const INACTIVE_BAR_OPACITY = 0.38
const HOVER_TRANSITION =
  'transition-[fill-opacity,opacity] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] motion-reduce:transition-none motion-reduce:duration-0'

type TooltipPayloadItem = {
  dataKey?: string
  value?: number
  type?: string
}

type RevenueChartTooltipProps = {
  active?: boolean
  payload?: TooltipPayloadItem[]
  label?: string
  chartConfig: ChartConfig
  formatBillion: (value: number) => string
  yearLabel: (label: string) => string
}

function RevenueChartTooltip({
  active,
  payload,
  label,
  chartConfig,
  formatBillion,
  yearLabel,
}: RevenueChartTooltipProps) {
  if (!active || !payload?.length || !label) return null

  const rows = SEGMENT_ORDER.map((key) => {
    const item = payload.find((entry) => entry.dataKey === key && entry.type !== 'none')
    if (!item?.value) return null

    return {
      key,
      label: String(chartConfig[key].label ?? key),
      color: String(chartConfig[key].color ?? ''),
      value: Number(item.value),
    }
  }).filter((row): row is NonNullable<typeof row> => row !== null)

  if (!rows.length) return null

  const total = rows.reduce((sum, row) => sum + row.value, 0)

  return (
    <div className='min-w-[11.5rem] rounded-xl border border-brand-ink/10 bg-white px-3.5 py-3 shadow-[0_16px_40px_rgba(19,32,24,0.14)]'>
      <div className='mb-2.5 flex items-baseline justify-between gap-4 border-b border-brand-ink/8 pb-2.5'>
        <p className='font-display text-[0.8rem] font-semibold uppercase tracking-[0.08em] text-brand-ink'>
          {yearLabel(label)}
        </p>
        <p className='text-[0.8rem] font-semibold tabular-nums text-brand-moss'>
          {formatBillion(total)}
        </p>
      </div>

      <ul className='grid gap-2'>
        {rows.map((row) => (
          <li
            key={row.key}
            className='flex items-center justify-between gap-4'
          >
            <span className='flex min-w-0 items-center gap-2'>
              <span
                aria-hidden
                className='size-2 shrink-0 rounded-full'
                style={{ backgroundColor: row.color }}
              />
              <span className='truncate font-sans text-[0.75rem] text-brand-ink/70'>
                {row.label}
              </span>
            </span>
            <span className='shrink-0 text-[0.75rem] font-medium tabular-nums text-brand-ink'>
              {formatBillion(row.value)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

type TotalBarLabelProps = {
  x?: number
  y?: number
  width?: number
  index?: number
  activeIndex?: number
  points: RevenueChartPoint[]
  locale: string
}

function TotalBarLabel({ x, y, width, index, activeIndex, points, locale }: TotalBarLabelProps) {
  if (x === undefined || y === undefined || width === undefined || index === undefined) {
    return null
  }

  const total = points[index]?.total
  if (!total) return null

  const isDimmed = activeIndex !== undefined && activeIndex !== index

  return (
    <text
      x={x + width / 2}
      y={y - 10}
      textAnchor='middle'
      fillOpacity={isDimmed ? 0.35 : 1}
      className={cn('fill-brand-ink font-display text-[0.8rem] font-semibold', HOVER_TRANSITION)}
    >
      {total.toLocaleString(locale)}
    </text>
  )
}

export default function RevenueChart({ data }: { data: IAboutEnterprise }) {
  const t = useTranslations('About')
  const locale = useLocale()
  const [activeIndex, setActiveIndex] = useState<number | undefined>(undefined)

  const chartConfig = {
    industry: {
      label: t('chart.industry'),
      color: '#132018',
    },
    trade: {
      label: t('chart.commerce'),
      color: '#243a31',
    },
    defense: {
      label: 'ANQP',
      color: '#6b9078',
    },
    other: {
      label: t('chart.other'),
      color: '#a8c4b4',
    },
  } satisfies ChartConfig

  const formatBillion = (value: number) =>
    t('chart.billion', { value: value.toLocaleString(locale) })
  const yearLabel = (label: string) => t('chart.year', { label })
  const formatAxisValue = (value: number) => value.toLocaleString(locale)

  const points = useMemo(() => mapEnterpriseChart(data), [data])
  const { domain, ticks } = useMemo(() => getChartDomain(points), [points])

  if (!data || !points.length) return null

  return (
    <section
      className='bg-[#e7ebe8] text-brand-ink'
      aria-labelledby='revenue-chart-heading'
    >
      <Container className='py-[4rem] xsm:py-[2.75rem]'>
        <Reveal
          y={20}
          className='mb-[2rem] max-w-[40rem] xsm:mb-[1.5rem]'
        >
          <h2
            id='revenue-chart-heading'
            className='font-display text-[2.35rem] font-semibold uppercase leading-[1.05] tracking-wide xsm:text-[1.65rem]'
          >
            {data.title}
          </h2>
          <p className='mt-[0.85rem] font-sans text-[0.95rem] leading-relaxed text-brand-ink/65'>
            {data.desc}
          </p>
        </Reveal>

        <Reveal
          delay={0.08}
          y={28}
        >
          <div className='border border-brand-ink/10 bg-white/90 p-[1.25rem] shadow-[0_18px_50px_rgba(19,32,24,0.06)] backdrop-blur-sm xsm:p-[0.85rem]'>
            <ChartContainer
              config={chartConfig}
              className={cn(
                'aspect-auto h-[24rem] w-full',
                '[&_.recharts-cartesian-axis-tick_text]:fill-brand-ink/45',
                '[&_.recharts-cartesian-grid_line]:stroke-brand-ink/10',
                '[&_.recharts-bar-rectangle]:transition-[fill-opacity,opacity]',
                '[&_.recharts-bar-rectangle]:duration-500',
                '[&_.recharts-bar-rectangle]:ease-[cubic-bezier(0.32,0.72,0,1)]',
                'motion-reduce:[&_.recharts-bar-rectangle]:transition-none',
                '[&_.recharts-rectangle.recharts-tooltip-cursor]:!fill-[rgba(107,144,120,0.07)]',
                '[&_.recharts-rectangle.recharts-tooltip-cursor]:transition-[fill-opacity,opacity]',
                '[&_.recharts-rectangle.recharts-tooltip-cursor]:duration-500',
                '[&_.recharts-rectangle.recharts-tooltip-cursor]:ease-[cubic-bezier(0.32,0.72,0,1)]',
                'motion-reduce:[&_.recharts-rectangle.recharts-tooltip-cursor]:transition-none',
                'xsm:h-[20rem]',
              )}
            >
              <BarChart
                data={points}
                margin={{ top: 28, right: 8, left: 4, bottom: 8 }}
                barCategoryGap='18%'
                onMouseMove={(state) => {
                  setActiveIndex(
                    typeof state?.activeTooltipIndex === 'number'
                      ? state.activeTooltipIndex
                      : undefined,
                  )
                }}
                onMouseLeave={() => setActiveIndex(undefined)}
              >
                <CartesianGrid
                  vertical={false}
                  strokeDasharray='4 6'
                />
                <XAxis
                  dataKey='year'
                  tickLine={false}
                  axisLine={false}
                  tickMargin={12}
                  className='font-sans text-[0.75rem]'
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  domain={domain}
                  ticks={ticks}
                  tickFormatter={formatAxisValue}
                  className='text-[0.7rem] tabular-nums'
                />
                <ChartTooltip
                  shared
                  cursor={{ fill: 'rgba(107, 144, 120, 0.07)' }}
                  content={
                    <RevenueChartTooltip
                      chartConfig={chartConfig}
                      formatBillion={formatBillion}
                      yearLabel={yearLabel}
                    />
                  }
                />
                <ChartLegend
                  verticalAlign='top'
                  align='center'
                  content={<ChartLegendContent className='justify-center gap-5 pt-0 pb-4' />}
                />

                {SEGMENT_ORDER.map((key, index) => {
                  const isTop = index === SEGMENT_ORDER.length - 1

                  return (
                    <Bar
                      key={key}
                      dataKey={key}
                      stackId='revenue'
                      fill={`var(--color-${key})`}
                      radius={isTop ? [3, 3, 0, 0] : [0, 0, 0, 0]}
                      maxBarSize={72}
                    >
                      {points.map((_, cellIndex) => (
                        <Cell
                          key={`${key}-${cellIndex}`}
                          fillOpacity={
                            activeIndex === undefined || activeIndex === cellIndex
                              ? 1
                              : INACTIVE_BAR_OPACITY
                          }
                        />
                      ))}
                      {isTop ? (
                        <LabelList
                          content={
                            <TotalBarLabel
                              activeIndex={activeIndex}
                              points={points}
                              locale={locale}
                            />
                          }
                        />
                      ) : null}
                    </Bar>
                  )
                })}
              </BarChart>
            </ChartContainer>

            <p className='mt-[0.35rem] text-center font-sans text-[0.8rem] italic text-brand-ink/45'>
              {data.label}
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
