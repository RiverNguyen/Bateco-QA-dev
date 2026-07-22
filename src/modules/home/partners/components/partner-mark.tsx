import Image from 'next/image'

import { cn } from '@/lib/utils'

type PartnerMarkProps = {
  partner: string
}

export function PartnerMark({ partner }: PartnerMarkProps) {
  return (
    <div
      className={cn(
        'group/mark flex h-auto w-[8rem] shrink-0 items-center justify-center',
        'xsm:h-[3.75rem] xsm:w-[9rem]',
      )}
    >
      <Image
        src={partner}
        alt={partner}
        width={168}
        height={56}
        className={cn(
          'h-auto w-[8rem] object-contain xsm:max-h-[2.1rem]',
          'grayscale opacity-55 transition-[filter,opacity] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]',
          'group-hover/mark:grayscale-0 group-hover/mark:opacity-100',
        )}
      />
    </div>
  )
}
