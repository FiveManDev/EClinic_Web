import UserLayout from "layout/User/UserLayout"
import ServicesPage from "module/User/Services/ServicesPage"
// import { GetServerSideProps } from "next"
import { NextPageWithLayout } from "./page"

const Services: NextPageWithLayout = () => {
  return <ServicesPage />
}
Services.getLayout = (page) => {
  return <UserLayout>{page}</UserLayout>
}
export default Services
