type SectionBackgroundProps = {
  tone?: 'dark' | 'light'
}

export function SectionBackground({ tone = 'dark' }: SectionBackgroundProps) {
  const isLight = tone === 'light'

  return (
    <>
      <div
        aria-hidden
        className='pointer-events-none absolute inset-0'
        style={{
          background: isLight
            ? 'radial-gradient(ellipse 55% 45% at 100% 0%, color-mix(in srgb, var(--brand-moss) 16%, transparent), transparent 65%), radial-gradient(ellipse 40% 40% at 0% 100%, color-mix(in srgb, var(--brand-moss) 10%, transparent), transparent 60%)'
            : 'radial-gradient(ellipse 60% 55% at 100% 0%, color-mix(in srgb, var(--brand-moss) 32%, transparent), transparent 65%), radial-gradient(ellipse 45% 50% at 0% 100%, color-mix(in srgb, var(--brand-moss) 16%, transparent), transparent 60%)',
        }}
      />
      <div
        aria-hidden
        className={
          isLight
            ? 'pointer-events-none absolute inset-0 opacity-[0.1]'
            : 'pointer-events-none absolute inset-0 opacity-[0.18]'
        }
        style={{
          backgroundImage: isLight
            ? 'linear-gradient(to right, color-mix(in srgb, var(--brand-ink) 18%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in srgb, var(--brand-ink) 18%, transparent) 1px, transparent 1px)'
            : 'linear-gradient(to right, color-mix(in srgb, var(--brand-moss) 35%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in srgb, var(--brand-moss) 35%, transparent) 1px, transparent 1px)',
          backgroundSize: '4.5rem 4.5rem',
          maskImage: 'radial-gradient(ellipse at 70% 40%, black 15%, transparent 72%)',
        }}
      />
    </>
  )
}
