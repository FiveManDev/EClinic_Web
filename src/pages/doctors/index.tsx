import UserLayout from "layout/User/UserLayout"
import DoctorPage from "module/User/Doctor/DoctorPage"
import { NextPageWithLayout } from "pages/page"

const Doctors: NextPageWithLayout = () => {
  return <DoctorPage />
}
Doctors.getLayout = (page) => {
  return <UserLayout>{page}</UserLayout>
}
export default Doctors
