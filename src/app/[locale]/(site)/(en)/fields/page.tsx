import { notFound } from 'next/navigation'

import FieldsModule from '@/modules/fields'
import fieldService from '@/services/field'

export const dynamicParams = false

export function generateStaticParams() {
  return [{ locale: 'en' }]
}

const FieldsPage = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params
  if (locale !== 'en') notFound()

  const fields = await fieldService.getData(locale)

  return <FieldsModule fields={fields?.data} />
}

export default FieldsPage
