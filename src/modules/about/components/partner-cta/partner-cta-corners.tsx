import { cn } from '@/lib/utils'

const CORNER = 'pointer-events-none absolute size-[0.85rem] border-brand-moss/55 xsm:size-[0.7rem]'

export function PartnerCtaCorners() {
  return (
    <>
      <span
        aria-hidden
        className={cn(
          CORNER,
          'left-[1.25rem] top-[1.25rem] border-l border-t xsm:left-4 xsm:top-4',
        )}
      />
      <span
        aria-hidden
        className={cn(
          CORNER,
          'right-[1.25rem] top-[1.25rem] border-r border-t xsm:right-4 xsm:top-4',
        )}
      />
      <span
        aria-hidden
        className={cn(
          CORNER,
          'bottom-[1.25rem] left-[1.25rem] border-b border-l xsm:bottom-4 xsm:left-4',
        )}
      />
      <span
        aria-hidden
        className={cn(
          CORNER,
          'bottom-[1.25rem] right-[1.25rem] border-b border-r xsm:bottom-4 xsm:right-4',
        )}
      />
    </>
  )
}
