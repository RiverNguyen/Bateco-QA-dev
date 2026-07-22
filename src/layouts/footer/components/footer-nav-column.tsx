import { Link } from '@/i18n/navigation'
import type { FooterColumn } from '@/layouts/footer/lib/types'
import { cn } from '@/lib/utils'

export function FooterNavColumn({ column }: { column: FooterColumn }) {
  return (
    <div>
      <h3 className='font-sans text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-brand-moss'>
        {column.title}
      </h3>
      <ul className='mt-[1rem] space-y-[0.55rem]'>
        {column.links.map((link, index) => (
          <li key={`${link.href}-${index}`}>
            <Link
              href={link.href}
              target={link.target}
              rel={link.target === '_blank' ? 'noopener noreferrer' : undefined}
              className={cn(
                'group/nav relative inline-block font-display text-[0.95rem] font-medium uppercase tracking-wide text-brand-ink/70',
                'transition-colors duration-300 hover:text-brand-ink',
              )}
            >
              {link.label}
              <span
                aria-hidden
                className={cn(
                  'absolute inset-x-0 -bottom-[0.12rem] h-px origin-left bg-brand-moss',
                  'scale-x-0 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]',
                  'group-hover/nav:scale-x-100',
                )}
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
