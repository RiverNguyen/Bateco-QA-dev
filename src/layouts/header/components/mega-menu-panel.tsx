import { Link } from '@/i18n/navigation'
import Container from '@/layouts/container'
import type { HeaderMegaPanel } from '@/layouts/header/lib/map-header-nav'
import { cn } from '@/lib/utils'

export function MegaMenuPanel({ panel }: { panel: HeaderMegaPanel }) {
  return (
    <Container className='grid grid-cols-[minmax(0,22rem)_1fr] gap-x-[4rem] py-[2.25rem] xsm:grid-cols-1 xsm:gap-y-[1.5rem] xsm:py-[1.5rem]'>
      <div>
        {panel.eyebrow ? (
          <p className='font-sans text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-brand-moss'>
            {panel.eyebrow}
          </p>
        ) : null}
        {panel.description ? (
          <p className='mt-[0.85rem] max-w-[20rem] font-sans text-[0.9rem] leading-relaxed text-white/60'>
            {panel.description}
          </p>
        ) : null}
      </div>

      <div>
        <p className='font-sans text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-white/40'>
          {panel.linksTitle}
        </p>
        <ul className='mt-[0.85rem] columns-2 gap-x-[3rem] xsm:columns-1'>
          {panel.links.map((link, linkIndex) => (
            <li
              key={`${link.href}-${linkIndex}`}
              className='mb-[0.55rem] break-inside-avoid'
            >
              <Link
                href={link.href}
                target={link.target}
                rel={link.target === '_blank' ? 'noopener noreferrer' : undefined}
                className={cn(
                  'group/mega inline-flex items-baseline gap-[0.45rem]',
                  'font-display text-[1.05rem] font-medium uppercase tracking-wide text-white/80',
                  'transition-colors duration-300 hover:text-white',
                )}
              >
                <span className='text-brand-moss transition-transform duration-300'>+</span>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Container>
  )
}
