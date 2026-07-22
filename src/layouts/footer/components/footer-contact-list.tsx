import { getTranslations } from 'next-intl/server'

import type { FooterContact } from '@/layouts/footer/lib/types'

export async function FooterContactList({ contacts }: { contacts: FooterContact[] }) {
  const t = await getTranslations('Footer')

  return (
    <div>
      <h3 className='font-sans text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-brand-moss'>
        {t('contact')}
      </h3>
      <dl className='mt-[1rem] space-y-[1rem]'>
        {contacts.map((item, index) => (
          <div key={`${item.href}-${index}`}>
            <dt className='font-sans text-[0.65rem] uppercase tracking-[0.12em] text-brand-ink/40'>
              {item.title}
            </dt>
            <dd className='mt-[0.3rem]'>
              <a
                href={item.href}
                target={item.target}
                rel={item.target === '_blank' ? 'noopener noreferrer' : undefined}
                className='font-sans text-[0.875rem] leading-relaxed text-brand-ink/75 transition-colors duration-300 hover:text-brand-ink'
              >
                {item.label}
              </a>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
