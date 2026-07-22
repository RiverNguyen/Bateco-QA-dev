import { Reveal } from '@/components/shared/reveal'
import { IHomepageCoreValue } from '@/interfaces/homepage.interface'
import { cn } from '@/lib/utils'

type ValueRowProps = {
  item: IHomepageCoreValue
  index: number
  delay: number
}

export function ValueRow({ item, index, delay }: ValueRowProps) {
  return (
    <Reveal
      as='li'
      delay={delay}
      y={22}
      amount={0.4}
      className='border-t border-white/10'
    >
      <div
        className={cn(
          'group/row relative grid grid-cols-[5.5rem_1fr] items-center gap-x-[1.75rem]',
          'py-[1.65rem] pl-[0.85rem]',
          'transition-[opacity,background-color,border-color,padding] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]',
          'group-hover/values:opacity-35 hover:!opacity-100',
          'hover:border-brand-moss/50 hover:bg-white/[0.035]',
          'xsm:grid-cols-[3.5rem_1fr] xsm:gap-x-[1rem] xsm:py-[1.35rem] xsm:pl-[0.65rem]',
          'xsm:hover:pl-[0.9rem]',
        )}
      >
        <span
          aria-hidden
          className={cn(
            'pointer-events-none absolute inset-y-[0.85rem] left-0 w-[0.12rem] origin-center bg-brand-moss',
            'scale-y-0 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]',
            'group-hover/row:scale-y-100',
          )}
        />

        <span
          className={cn(
            'font-display text-[1.85rem] font-semibold leading-none tracking-wide text-brand-moss',
            'transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]',
            'group-hover/row:translate-x-[0.15rem] group-hover/row:text-[#9fc4ab]',
            'xsm:text-[1.35rem]',
          )}
        >
          {String(index + 1).padStart(2, '0')}
        </span>

        <div className='grid grid-cols-[minmax(0,18rem)_1fr_auto] items-center gap-x-[2rem] xsm:grid-cols-1 xsm:gap-y-[0.55rem]'>
          <h3
            className={cn(
              'font-display text-[1.55rem] font-semibold uppercase leading-[1.1] tracking-wide text-white',
              'transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]',
              'group-hover/row:translate-x-[0.2rem]',
              'xsm:text-[1.2rem]',
            )}
          >
            {item?.title}
          </h3>
          <p
            className={cn(
              'max-w-[28rem] font-sans text-[0.9rem] leading-relaxed text-white/50',
              'transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]',
              'group-hover/row:text-white/80',
              'xsm:text-[0.85rem]',
            )}
          >
            {item?.desc}
          </p>
        </div>
      </div>
    </Reveal>
  )
}
