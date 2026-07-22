import { IContactPageData } from '@/interfaces/contact.interface'
import ContactBanner from '@/modules/contact/components/banner'
import ContactFormSection from '@/modules/contact/components/contact-form'

const ContactModule = ({ data }: { data: IContactPageData }) => {
  return (
    <>
      <ContactBanner data={data?.banner} />
      <ContactFormSection data={data?.contact} />
    </>
  )
}

export default ContactModule
