export function SectionBackground() {
  return (
    <div
      aria-hidden
      className='pointer-events-none absolute inset-0'
      style={{
        background:
          'radial-gradient(ellipse 55% 45% at 100% 0%, color-mix(in srgb, var(--brand-moss) 28%, transparent), transparent 70%), radial-gradient(ellipse 40% 50% at 0% 100%, color-mix(in srgb, var(--brand-moss) 12%, transparent), transparent 65%)',
      }}
    />
  )
}
