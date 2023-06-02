import UserLayout from "layout/User/UserLayout"
import dynamic from "next/dynamic"
import { NextPageWithLayout } from "pages/page"
const DoctorDetailPage = dynamic(() => import("module/User/Doctor/DoctorPage"))

const Doctors: NextPageWithLayout = () => {
  return <DoctorDetailPage />
}
Doctors.getLayout = (page) => {
  return <UserLayout>{page}</UserLayout>
}
export default Doctors
