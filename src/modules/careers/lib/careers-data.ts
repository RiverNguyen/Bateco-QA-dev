export const CAREERS_PAGE_DATA = {
  banner: {
    badge: 'Tuyển dụng',
    title: 'Gia nhập Bateco Quốc An',
    desc: 'Cùng xây dựng năng lực công nghệ quốc phòng và chuyển đổi số — nơi chuyên môn được phát huy trong môi trường chuẩn mực, dài hạn.',
    image: '/images/contact/Background Image with Overlay.png',
  },
  listing: {
    subtitle: 'Vị trí đang tuyển',
    title: 'Cơ hội nghề nghiệp',
    desc: 'Khám phá các vị trí mở và ứng tuyển trực tiếp. Hồ sơ của bạn sẽ được đội ngũ nhân sự xem xét trong vòng 5–7 ngày làm việc.',
  },
}

export function formatCareerDate(value?: string | null, locale = 'vi') {
  if (!value) return ''
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return date.toLocaleDateString(locale === 'en' ? 'en-GB' : 'vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}
