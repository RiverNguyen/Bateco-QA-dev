'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { CloudUpload, FileText, Send } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { Reveal } from '@/components/shared/reveal'
import { Button } from '@/components/ui/button'
import {
  FileInput,
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
} from '@/components/ui/file-upload'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import ENDPOINTS from '@/configs/endpoints'
import CF7Request from '@/fetches/cf7Request'
import { cn } from '@/lib/utils'
import {
  applyFormDefaultValues,
  createApplyFormSchema,
  CV_DROPZONE_OPTIONS,
  type ApplyFormValues,
} from '@/modules/careers/lib/apply-form-schema'

type ApplyFormProps = {
  jobTitle: string
  url: string
  className?: string
  /** Skip outer card chrome (e.g. inside mobile drawer) */
  embedded?: boolean
  onSuccess?: () => void
}

const fieldClassName = cn(
  'h-[2.85rem] rounded-none border border-brand-ink/12 bg-white px-3',
  'font-sans text-[0.9rem] text-brand-ink shadow-none placeholder:text-brand-ink/35',
  'focus-visible:border-brand-moss/50 focus-visible:ring-brand-moss/15',
)

const labelClassName = 'font-sans text-[0.78rem] font-medium text-brand-ink/75'

export function ApplyForm({
  jobTitle,
  url,
  className,
  embedded = false,
  onSuccess,
}: ApplyFormProps) {
  const t = useTranslations('Careers.apply')
  const tValidation = useTranslations('Careers.validation')
  const tCommon = useTranslations('Common')

  const schema = useMemo(() => createApplyFormSchema(tValidation), [tValidation])

  const form = useForm<ApplyFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      ...applyFormDefaultValues,
      jobTitle,
      url,
    },
  })

  const onSubmit = async (values: ApplyFormValues) => {
    try {
      const cvFile = values.cv?.[0]
      if (!cvFile) {
        toast.error(t('cvRequiredToast'))
        return
      }

      const cf7 = new CF7Request({
        jobTitle: values.jobTitle,
        url: values.url,
        fullName: values.fullName,
        email: values.email,
        phone: values.phone,
        cv: cvFile,
      })

      const response = await cf7.send({
        id: ENDPOINTS.careers.form_id,
        unitTag: ENDPOINTS.careers.unit_tag,
      })

      if (response?.status === 'mail_sent') {
        toast.success(t('success'))
        form.reset({
          ...applyFormDefaultValues,
          jobTitle,
          url,
        })
        onSuccess?.()
        return
      }

      toast.error(t('error'))
    } catch {
      toast.error(t('network'))
    }
  }

  const content = (
    <>
      {!embedded ? (
        <div>
          <p className='text-[0.62rem] uppercase tracking-[0.2em] text-brand-moss'>
            {t('eyebrow')}
          </p>
          <h2 className='mt-2 font-display text-[1.85rem] font-semibold uppercase tracking-wide text-brand-ink xsm:text-[1.5rem]'>
            {t('title')}
          </h2>
        </div>
      ) : null}

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={cn(embedded ? 'space-y-4' : 'mt-6 space-y-4')}
          noValidate
        >
          <input
            type='hidden'
            {...form.register('jobTitle')}
          />
          <input
            type='hidden'
            {...form.register('url')}
          />

          <FormField
            control={form.control}
            name='fullName'
            render={({ field }) => (
              <FormItem>
                <FormLabel className={labelClassName}>
                  {t('fullName')} <span className='text-brand-moss'>*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    autoComplete='name'
                    placeholder={t('fullNamePlaceholder')}
                    className={fieldClassName}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className='grid grid-cols-2 gap-4 xsm:grid-cols-1'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={labelClassName}>
                    {t('email')} <span className='text-brand-moss'>*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type='email'
                      inputMode='email'
                      autoComplete='email'
                      placeholder={t('emailPlaceholder')}
                      className={fieldClassName}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='phone'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={labelClassName}>
                    {t('phone')} <span className='text-brand-moss'>*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type='tel'
                      inputMode='tel'
                      autoComplete='tel'
                      placeholder={t('phonePlaceholder')}
                      className={fieldClassName}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name='cv'
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel className={labelClassName}>
                  {t('cv')} <span className='text-brand-moss'>*</span>
                </FormLabel>
                <FileUploader
                  value={field.value}
                  onValueChange={field.onChange}
                  dropzoneOptions={CV_DROPZONE_OPTIONS}
                  className='relative'
                >
                  <FileInput
                    className={cn(
                      'border border-dashed border-brand-ink/15 bg-[#f7f8f7]',
                      'transition-colors duration-300 hover:border-brand-moss/40',
                      fieldState.error && 'border-destructive/50',
                    )}
                  >
                    <div className='flex flex-col items-center justify-center gap-2 px-4 py-6 text-center xsm:py-5'>
                      <CloudUpload
                        className='size-8 text-brand-moss'
                        strokeWidth={1.25}
                      />
                      <p className='font-sans text-[0.92rem] font-medium text-brand-ink'>
                        {t('cvHint')}
                      </p>
                      <p className='font-sans text-[0.78rem] text-brand-ink/45'>{t('cvFormats')}</p>
                    </div>
                  </FileInput>

                  <FileUploaderContent>
                    {field.value?.map((file, index) => (
                      <FileUploaderItem
                        key={`${file.name}-${file.lastModified}`}
                        index={index}
                        className='h-auto min-h-10 rounded-none border border-brand-ink/10 bg-white px-3 py-2.5 pr-10'
                      >
                        <FileText
                          className='size-4 shrink-0 text-brand-moss'
                          strokeWidth={1.35}
                        />
                        <span className='truncate font-sans text-[0.85rem] text-brand-ink'>
                          {file.name}
                        </span>
                      </FileUploaderItem>
                    ))}
                  </FileUploaderContent>
                </FileUploader>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type='submit'
            disabled={form.formState.isSubmitting}
            className={cn(
              'group/submit mt-2 h-[3rem] w-full rounded-none border-0',
              'bg-brand-ink font-display text-[0.85rem] font-semibold uppercase tracking-[0.1em] text-white',
              'transition-[background-color,transform] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]',
              'hover:bg-brand-moss active:scale-[0.99]',
              'disabled:pointer-events-none disabled:opacity-60',
            )}
          >
            {form.formState.isSubmitting ? tCommon('submitting') : t('submit')}
            <Send
              className='size-4 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover/submit:translate-x-0.5'
              strokeWidth={1.35}
            />
          </Button>
        </form>
      </Form>
    </>
  )

  if (embedded) {
    return <div className={cn(className)}>{content}</div>
  }

  return (
    <Reveal
      y={22}
      className={cn(
        'border border-brand-ink/10 bg-white p-[1.75rem] shadow-[0_18px_50px_rgba(19,32,24,0.06)] xsm:p-[1.25rem]',
        className,
      )}
    >
      {content}
    </Reveal>
  )
}
