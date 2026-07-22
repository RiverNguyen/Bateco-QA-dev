import { z } from 'zod'

const MAX_CV_SIZE = 25 * 1024 * 1024
const ACCEPTED_CV_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]

type TranslateFn = (key: string) => string

export function createApplyFormSchema(t: TranslateFn) {
  return z.object({
    jobTitle: z.string().trim().min(1),
    url: z.string().trim().min(1),
    fullName: z.string().trim().min(1, t('fullNameRequired')).min(2, t('fullNameMin')),
    email: z.string().trim().min(1, t('emailRequired')).email(t('emailInvalid')),
    phone: z
      .string()
      .trim()
      .min(1, t('phoneRequired'))
      .regex(/^(\+84|0)[0-9\s().-]{8,14}$/, t('phoneInvalid')),
    cv: z
      .custom<File[] | null>((value) => Array.isArray(value) && value.length > 0, {
        message: t('cvRequired'),
      })
      .refine((files) => files !== null && files[0]!.size <= MAX_CV_SIZE, {
        message: t('cvTooLarge'),
      })
      .refine(
        (files) =>
          files !== null &&
          (ACCEPTED_CV_TYPES.includes(files[0]!.type) || /\.(pdf|doc|docx)$/i.test(files[0]!.name)),
        {
          message: t('cvInvalidType'),
        },
      ),
  })
}

export type ApplyFormValues = z.infer<ReturnType<typeof createApplyFormSchema>>

export const applyFormDefaultValues: ApplyFormValues = {
  jobTitle: '',
  url: '',
  fullName: '',
  email: '',
  phone: '',
  cv: null,
}

export const CV_DROPZONE_OPTIONS = {
  accept: {
    'application/pdf': ['.pdf'],
    'application/msword': ['.doc'],
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
  },
  maxFiles: 1,
  maxSize: MAX_CV_SIZE,
  multiple: false,
} as const
