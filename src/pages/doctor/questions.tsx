import DoctorLayout from "layout/Management/DoctorLayout"
import QuestionsPage from "module/Doctor/Question/QuestionsPage"
import { NextPageWithLayout } from "pages/page"

const Page: NextPageWithLayout = () => {
  return <QuestionsPage />
}
Page.getLayout = (page) => {
  return <DoctorLayout>{page}</DoctorLayout>
}

export default Page
