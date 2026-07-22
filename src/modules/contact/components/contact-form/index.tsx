'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowUpRight } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { Reveal } from '@/components/shared/reveal'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import ENDPOINTS from '@/configs/endpoints'
import CF7Request from '@/fetches/cf7Request'
import type { IContactSection } from '@/interfaces/contact.interface'
import Container from '@/layouts/container'
import { cn } from '@/lib/utils'
import ContactInfo from '@/modules/contact/components/contact-info'
import {
  contactFormDefaultValues,
  createContactFormSchema,
  type ContactFormValues,
} from '@/modules/contact/lib/contact-form-schema'

import ServiceSelect from './service-select'

const fieldClassName = cn(
  'h-[2.85rem] rounded-none border border-brand-ink/12 bg-white px-3',
  'font-sans text-[0.9rem] text-brand-ink shadow-none placeholder:text-brand-ink/35',
  'focus-visible:border-brand-moss/50 focus-visible:ring-brand-moss/15',
)

const labelClassName = 'font-sans text-[0.78rem] font-medium text-brand-ink/75'

export default function ContactFormSection({ data }: { data: IContactSection }) {
  const t = useTranslations('Contact')
  const tFields = useTranslations('Contact.fields')
  const tToast = useTranslations('Contact.toast')
  const tValidation = useTranslations('Contact.validation')
  const tCommon = useTranslations('Common')

  const schema = useMemo(() => createContactFormSchema(tValidation), [tValidation])

  const SERVICE_OPTIONS = [
    { value: 'Công nghệ quốc phòng', label: t('services.defense') },
    { value: 'Chuyển đổi số', label: t('services.digital') },
    { value: 'Tư vấn công nghệ', label: t('services.consulting') },
  ]

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(schema),
    defaultValues: contactFormDefaultValues,
  })

  const onSubmit = async (values: ContactFormValues) => {
    try {
      const cf7 = new CF7Request({
        fullName: values.fullName,
        company: values.company,
        position: values.position,
        phone: values.phone,
        email: values.email,
        service: values.service,
        message: values.message,
      })

      const response = await cf7.send({
        id: ENDPOINTS.contact.form_id,
        unitTag: ENDPOINTS.contact.unit_tag,
      })

      if (response?.status === 'mail_sent') {
        toast.success(tToast('success'))
        form.reset(contactFormDefaultValues)
        return
      }

      toast.error(tToast('error'))
    } catch {
      toast.error(tToast('network'))
    }
  }

  return (
    <section
      id='contact-form'
      className='relative scroll-mt-[var(--header-height)] overflow-hidden border-t border-brand-ink/8 bg-white text-brand-ink'
      aria-labelledby='contact-form-heading'
    >
      <div
        aria-hidden
        className='pointer-events-none absolute inset-x-0 top-0 h-[18rem]'
        style={{
          background:
            'radial-gradient(ellipse 45% 55% at 100% 0%, color-mix(in srgb, var(--brand-moss) 8%, transparent), transparent 70%)',
        }}
      />

      <Container className='relative px-4 py-[5rem] xsm:py-[3rem]'>
        <div className='mb-[2.5rem] xsm:mb-[2rem]'>
          <Reveal y={22}>
            <p className='text-[0.68rem] uppercase tracking-[0.24em] text-brand-moss'>
              {t('formEyebrow')}
            </p>
            <h2
              id='contact-form-heading'
              className='mt-[0.85rem] max-w-[28rem] font-display text-[2.85rem] font-semibold uppercase leading-[0.98] tracking-wide text-brand-ink xsm:text-[1.75rem]'
            >
              {data?.title}
            </h2>
            <span
              aria-hidden
              className='mt-[1.1rem] block h-[0.12rem] w-[2.75rem] bg-brand-moss'
            />
          </Reveal>
        </div>

        <div
          className={cn(
            'grid items-stretch gap-[0.75rem]',
            'grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]',
            'xsm:grid-cols-1',
          )}
        >
          <Reveal
            delay={0.06}
            y={28}
            className='h-full border border-brand-ink/10 bg-[#f7f8f7] p-[2.25rem] xsm:p-[1.25rem]'
          >
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='w-full space-y-4'
                noValidate
              >
                <div className='grid grid-cols-2 gap-4 tablet:grid-cols-1 xsm:grid-cols-1'>
                  <FormField
                    control={form.control}
                    name='fullName'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className={labelClassName}>
                          {tFields('fullName')} <span className='text-brand-moss'>*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            autoComplete='name'
                            placeholder={tFields('fullNamePlaceholder')}
                            className={fieldClassName}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name='company'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className={labelClassName}>{tFields('company')}</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            autoComplete='organization'
                            placeholder={tFields('companyPlaceholder')}
                            className={fieldClassName}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className='grid grid-cols-2 gap-4 tablet:grid-cols-1 xsm:grid-cols-1'>
                  <FormField
                    control={form.control}
                    name='position'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className={labelClassName}>{tFields('position')}</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            autoComplete='organization-title'
                            placeholder={tFields('positionPlaceholder')}
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
                          {tFields('phone')} <span className='text-brand-moss'>*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type='tel'
                            inputMode='tel'
                            autoComplete='tel'
                            placeholder={tFields('phonePlaceholder')}
                            className={fieldClassName}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className='grid grid-cols-2 gap-4 tablet:grid-cols-1 xsm:grid-cols-1'>
                  <FormField
                    control={form.control}
                    name='email'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className={labelClassName}>
                          {tFields('email')} <span className='text-brand-moss'>*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type='email'
                            inputMode='email'
                            autoComplete='email'
                            placeholder={tFields('emailPlaceholder')}
                            className={fieldClassName}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name='service'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className={labelClassName}>
                          {tFields('service')} <span className='text-brand-moss'>*</span>
                        </FormLabel>
                        <FormControl>
                          <ServiceSelect
                            ref={field.ref}
                            name={field.name}
                            value={field.value}
                            options={SERVICE_OPTIONS}
                            onBlur={field.onBlur}
                            onValueChange={field.onChange}
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
                  name='message'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={labelClassName}>{tFields('message')}</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          rows={5}
                          placeholder={tFields('messagePlaceholder')}
                          className={cn(fieldClassName, 'min-h-[7.5rem] resize-none py-3')}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type='submit'
                  disabled={form.formState.isSubmitting}
                  className={cn(
                    'group/submit mt-2 h-[3rem] w-full rounded-none border-0',
                    'bg-brand-moss font-display text-[0.85rem] font-semibold uppercase tracking-[0.1em] text-white',
                    'transition-[background-color,transform] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]',
                    'hover:bg-brand active:scale-[0.99]',
                    'disabled:pointer-events-none disabled:opacity-60',
                  )}
                >
                  {form.formState.isSubmitting ? tCommon('submitting') : t('submit')}
                  <ArrowUpRight
                    className='size-4 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover/submit:translate-x-0.5 group-hover/submit:-translate-y-0.5'
                    strokeWidth={1.35}
                  />
                </Button>
              </form>
            </Form>
          </Reveal>

          <Reveal
            delay={0.1}
            y={24}
            className='h-full'
          >
            <ContactInfo
              data={data}
              variant='light'
              fillHeight
              className='h-full'
            />
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
