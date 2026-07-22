import { IAboutPageResponse } from '@/interfaces/about.interface'
import { IHomepageAreasOfOperation } from '@/interfaces/homepage.interface'
import AboutBanner from '@/modules/about/components/banner'
import Certifications from '@/modules/about/components/certifications'
import AboutIntro from '@/modules/about/components/intro'
import PartnerCta from '@/modules/about/components/partner-cta'
import RevenueChart from '@/modules/about/components/revenue-chart'
import ActivityAreas from '@/modules/home/activity-areas'

const AboutModule = ({
  areasOfOperation,
  data,
}: {
  areasOfOperation: IHomepageAreasOfOperation
  data: IAboutPageResponse
}) => {
  return (
    <>
      <AboutBanner data={data?.acf?.banner} />
      <AboutIntro data={data?.acf?.about_us} />
      <ActivityAreas data={areasOfOperation} />
      <RevenueChart data={data?.acf?.enterprise} />
      <Certifications data={data?.acf?.certification} />
      <PartnerCta />
    </>
  )
}

export default AboutModule
