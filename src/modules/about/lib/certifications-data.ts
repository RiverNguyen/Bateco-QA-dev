export type CertificationItem = {
  id: string
  title: string
  issuer: string
  year: string
  code: string
  image: string
}

export type CertificationsData = {
  title: string
  description: string
  items: CertificationItem[]
}

export const CERTIFICATIONS_DATA: CertificationsData = {
  title: 'Chứng nhận & tiêu chuẩn',
  description:
    'Hệ thống quản lý và chứng nhận được duy trì liên tục, bảo đảm năng lực triển khai theo chuẩn quốc tế và quy định chuyên ngành.',
  items: [
    {
      id: 'iso-9001',
      code: 'ISO 9001',
      title: 'Hệ thống quản lý chất lượng',
      issuer: 'Tổ chức chứng nhận quốc tế',
      year: '2023',
      image: 'https://picsum.photos/seed/bqa-cert-iso9001/640/480',
    },
    {
      id: 'iso-14001',
      code: 'ISO 14001',
      title: 'Hệ thống quản lý môi trường',
      issuer: 'Tổ chức chứng nhận quốc tế',
      year: '2023',
      image: 'https://picsum.photos/seed/bqa-cert-iso14001/640/480',
    },
    {
      id: 'iso-45001',
      code: 'ISO 45001',
      title: 'An toàn và sức khỏe nghề nghiệp',
      issuer: 'Tổ chức chứng nhận quốc tế',
      year: '2024',
      image: 'https://picsum.photos/seed/bqa-cert-iso45001/640/480',
    },
    {
      id: 'iso-27001',
      code: 'ISO 27001',
      title: 'Hệ thống quản lý an toàn thông tin',
      issuer: 'Tổ chức chứng nhận quốc tế',
      year: '2024',
      image: 'https://picsum.photos/seed/bqa-cert-iso27001/640/480',
    },
    {
      id: 'defense-license',
      code: 'ANQP',
      title: 'Đủ điều kiện kinh doanh vật tư kỹ thuật quốc phòng',
      issuer: 'Cơ quan có thẩm quyền',
      year: '2022',
      image: 'https://picsum.photos/seed/bqa-cert-anqp/640/480',
    },
    {
      id: 'authorized-agent',
      code: 'OEM',
      title: 'Chứng nhận đại lý ủy quyền',
      issuer: 'Đối tác công nghệ quốc tế',
      year: '2025',
      image: 'https://picsum.photos/seed/bqa-cert-oem/640/480',
    },
  ],
}
