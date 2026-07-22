import { IHomepage, IHomepageNews } from '@/interfaces/homepage.interface'
import AboutIntro from '@/modules/home/about'
import ActivityAreas from '@/modules/home/activity-areas'
import HeroBanner from '@/modules/home/banner'
import CoreValues from '@/modules/home/core-values'
import Customers from '@/modules/home/customers'
import ImportantEvents from '@/modules/home/important-events'
import Partners from '@/modules/home/partners'

const HomepageModule = ({ data, news }: { data: IHomepage; news: IHomepageNews[] }) => {
  return (
    <>
      <HeroBanner data={data?.banner} />
      <AboutIntro data={data?.about} />
      <CoreValues data={data?.core_values} />
      <ActivityAreas data={data?.areas_of_operation} />
      <Customers data={data?.customers} />
      <Partners data={data?.partner} />
      <ImportantEvents data={news} />
    </>
  )
}

export default HomepageModule
