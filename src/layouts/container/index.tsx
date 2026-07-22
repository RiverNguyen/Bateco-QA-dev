import { cn } from '@/lib/utils'

type ContainerProps = {
  children: React.ReactNode
  className?: string
  as?: 'div' | 'section' | 'nav' | 'header' | 'footer'
}

export default function Container({ children, className, as: Tag = 'div' }: ContainerProps) {
  return <Tag className={cn('mx-auto w-full max-w-[95rem] xsm:px-4', className)}>{children}</Tag>
}
