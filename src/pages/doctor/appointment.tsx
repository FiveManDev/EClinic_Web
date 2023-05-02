import DoctorLayout from "layout/Management/DoctorLayout"
import AppoinmentPage from "module/Doctor/Appoinments/AppoinmentPage"
import QuestionsPage from "module/Doctor/Question/QuestionsPage"
import { NextPageWithLayout } from "pages/page"

const Page: NextPageWithLayout = () => {
  return <AppoinmentPage />
}
Page.getLayout = (page) => {
  return <DoctorLayout>{page}</DoctorLayout>
}

export default Page
