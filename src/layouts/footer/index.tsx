import type { IFooter } from '@/interfaces/footer.interface'
import Container from '@/layouts/container'
import { FooterBottom } from '@/layouts/footer/components/footer-bottom'
import { FooterBrand } from '@/layouts/footer/components/footer-brand'
import { FooterContactList } from '@/layouts/footer/components/footer-contact-list'
import { FooterCta } from '@/layouts/footer/components/footer-cta'
import { FooterNavColumn } from '@/layouts/footer/components/footer-nav-column'
import { mapFooterColumns, mapFooterContacts, mapTarget } from '@/layouts/footer/lib/map-footer'
import { decodeHtmlEntities } from '@/lib/decode-html-entities'
import { cn } from '@/lib/utils'

type FooterProps = {
  data?: IFooter | null
}

export default async function Footer({ data }: FooterProps) {
  if (!data) return null

  const year = new Date().getFullYear()
  const description = decodeHtmlEntities(data.desc)
  const contacts = mapFooterContacts(data)
  const columns = mapFooterColumns(data)
  const button1 = data.button_1
  const button2 = data.button_2

  return (
    <footer
      id='site-footer'
      className='relative overflow-hidden border-t border-brand-ink/10 bg-[#e7ebe8] text-brand-ink'
    >
      <Container className='relative z-[1] pt-[3.75rem] xsm:pt-[2.75rem]'>
        <div
          className={cn(
            'flex items-end justify-between gap-[2rem] border-b border-brand-ink/10 pb-[2rem]',
            'xsm:flex-col xsm:items-start xsm:gap-[1.5rem] xsm:pb-[1.5rem]',
          )}
        >
          <FooterBrand
            logoSrc={data.logo}
            description={description}
          />

          <div className='flex shrink-0 flex-wrap items-center gap-[0.65rem]'>
            {button1 ? (
              <FooterCta
                href={button1.url || '/'}
                target={mapTarget(button1.target)}
                variant='solid'
              >
                {decodeHtmlEntities(button1.title)}
              </FooterCta>
            ) : null}
            {button2 ? (
              <FooterCta
                href={button2.url || '/'}
                target={mapTarget(button2.target)}
                variant='ghost'
              >
                {decodeHtmlEntities(button2.title)}
              </FooterCta>
            ) : null}
          </div>
        </div>

        <div
          className={cn(
            'grid gap-x-[2.5rem] gap-y-[2rem] py-[2.25rem]',
            columns.length >= 2 ? 'grid-cols-3' : 'grid-cols-2',
            'xsm:grid-cols-1 xsm:gap-y-[1.75rem] xsm:py-[1.75rem]',
          )}
        >
          <FooterContactList contacts={contacts} />

          {columns.map((column) => (
            <FooterNavColumn
              key={column.title}
              column={column}
            />
          ))}
        </div>

        <FooterBottom year={year} />
      </Container>
    </footer>
  )
}
