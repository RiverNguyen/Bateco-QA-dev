export function SectionBackground() {
  return (
    <>
      <div
        aria-hidden
        className='pointer-events-none absolute inset-0'
        style={{
          background:
            'radial-gradient(ellipse 50% 42% at 90% 28%, color-mix(in srgb, var(--brand-moss) 22%, transparent), transparent 70%), radial-gradient(ellipse 42% 40% at 6% 88%, color-mix(in srgb, var(--brand-moss) 12%, transparent), transparent 65%)',
        }}
      />
      <div
        aria-hidden
        className='pointer-events-none absolute inset-0 opacity-[0.14]'
        style={{
          backgroundImage:
            'linear-gradient(to right, color-mix(in srgb, var(--brand-moss) 40%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in srgb, var(--brand-moss) 40%, transparent) 1px, transparent 1px)',
          backgroundSize: '4.5rem 4.5rem',
          maskImage: 'radial-gradient(ellipse at 55% 55%, black 18%, transparent 72%)',
        }}
      />
      <div
        aria-hidden
        className='pointer-events-none absolute -left-[12%] top-[32%] size-[28rem] rounded-full bg-brand-moss/[0.06] blur-[100px]'
      />
      <div
        aria-hidden
        className='pointer-events-none absolute -right-[8%] bottom-[10%] size-[22rem] rounded-full bg-brand-moss/[0.08] blur-[90px]'
      />
    </>
  )
}
