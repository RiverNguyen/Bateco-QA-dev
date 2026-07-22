import { z } from 'zod'

type TranslateFn = (key: string) => string

export function createContactFormSchema(t: TranslateFn) {
  return z.object({
    fullName: z.string().trim().min(1, t('fullNameRequired')).min(2, t('fullNameMin')),
    company: z.string().trim(),
    position: z.string().trim(),
    email: z.string().trim().min(1, t('emailRequired')).email(t('emailInvalid')),
    phone: z
      .string()
      .trim()
      .min(1, t('phoneRequired'))
      .regex(/^(\+84|0)[0-9\s().-]{8,14}$/, t('phoneInvalid')),
    service: z.string().trim().min(1, t('serviceRequired')),
    message: z.string().trim(),
  })
}

export type ContactFormValues = z.infer<ReturnType<typeof createContactFormSchema>>

export const contactFormDefaultValues: ContactFormValues = {
  fullName: '',
  company: '',
  position: '',
  email: '',
  phone: '',
  service: '',
  message: '',
}
