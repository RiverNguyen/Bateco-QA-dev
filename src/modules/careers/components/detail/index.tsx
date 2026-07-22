import { getLocalePath, type LocaleCode } from '@/i18n/locale-paths'
import type { ICareersDetail, ICareersItem } from '@/interfaces/careers.interface'
import Container from '@/layouts/container'
import PartnerCta from '@/modules/about/components/partner-cta'
import { ApplyForm } from '@/modules/careers/components/detail/apply-form'
import { ApplyFormMobile } from '@/modules/careers/components/detail/apply-form-mobile'
import { CareerDetailBanner } from '@/modules/careers/components/detail/banner'
import { CareerDetailContent } from '@/modules/careers/components/detail/content'
import { CareerRelated } from '@/modules/careers/components/detail/related'

type CareersDetailModuleProps = {
  job: ICareersDetail
  related: ICareersItem[]
  locale: LocaleCode
}

export default async function CareersDetailModule({
  job,
  related,
  locale,
}: CareersDetailModuleProps) {
  const applyUrl = job.link || getLocalePath('careers', locale, job.slug)

  return (
    <>
      <CareerDetailBanner
        job={job}
        locale={locale}
      />

      <section className='border-t border-brand-ink/8 bg-white text-brand-ink'>
        <Container className='px-4 py-[4.5rem] xsm:pb-[6.5rem] xsm:pt-[2.5rem]'>
          <div className='grid grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] items-start gap-[2.5rem] tablet:grid-cols-1 tablet:gap-[2rem] xsm:grid-cols-1 xsm:gap-[1.5rem]'>
            <CareerDetailContent job={job} />
            <div className='sticky top-[calc(var(--header-height)+1.25rem)] xsm:hidden'>
              <ApplyForm
                jobTitle={job.title}
                url={applyUrl}
              />
            </div>
          </div>
        </Container>
      </section>

      <ApplyFormMobile
        jobTitle={job.title}
        url={applyUrl}
      />

      <CareerRelated
        jobs={related}
        locale={locale}
      />
      <PartnerCta locale={locale} />
    </>
  )
}
