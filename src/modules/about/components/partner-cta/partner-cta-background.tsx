export function PartnerCtaBackground() {
  return (
    <>
      <div
        aria-hidden
        className='pointer-events-none absolute inset-0 bg-gradient-to-r from-brand-ink via-brand-ink/88 to-brand-ink/45'
      />
      <div
        aria-hidden
        className='pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-ink via-transparent to-brand-ink/55'
      />
      <div
        aria-hidden
        className='pointer-events-none absolute inset-0 opacity-[0.16]'
        style={{
          backgroundImage:
            'linear-gradient(to right, color-mix(in srgb, var(--brand-moss) 45%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in srgb, var(--brand-moss) 45%, transparent) 1px, transparent 1px)',
          backgroundSize: '3.5rem 3.5rem',
          maskImage: 'linear-gradient(to right, black 35%, transparent 92%)',
        }}
      />
      <div
        aria-hidden
        className='pointer-events-none absolute -left-[10%] top-[18%] size-[24rem] rounded-full bg-brand-moss/[0.07] blur-[90px]'
      />
    </>
  )
}
