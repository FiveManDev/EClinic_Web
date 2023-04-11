import UserLayout from "layout/User/UserLayout"
import DoctorDetailPage from "module/User/Doctor/DoctorDetailPage"
import DoctorPage from "module/User/Doctor/DoctorPage"
import { NextPageWithLayout } from "pages/page"

const Doctors: NextPageWithLayout = () => {
  return <DoctorDetailPage />
}
Doctors.getLayout = (page) => {
  return <UserLayout>{page}</UserLayout>
}
export default Doctors
