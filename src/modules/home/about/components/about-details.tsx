import { IHomepageAbout } from '@/interfaces/homepage.interface'

type AboutDetailsProps = {
  details: IHomepageAbout['detail']
}

export function AboutDetails({ details }: AboutDetailsProps) {
  return (
    <div className='mt-[1.75rem] grid grid-cols-2 gap-[1.5rem] xsm:grid-cols-1 xsm:gap-[1.25rem]'>
      {Array.isArray(details) &&
        details.length > 0 &&
        details.map((item) => (
          <div key={item?.title}>
            <h4 className='font-sans text-[0.8rem] font-semibold uppercase tracking-[0.1em] text-brand-moss'>
              {item?.title}
            </h4>
            <p className='mt-[0.55rem] font-sans text-[0.875rem] leading-relaxed text-brand-ink/70'>
              {item?.desc}
            </p>
          </div>
        ))}
    </div>
  )
}
