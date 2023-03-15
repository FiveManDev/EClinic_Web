import DoctorLayout from "layout/ManagementLayout/DocterLayout"
import QuestionsPage from "module/Doctor/Question/QuestionsPage"
import { NextPageWithLayout } from "pages/page"

const Page: NextPageWithLayout = () => {
  return <QuestionsPage />
}
Page.getLayout = (page) => {
  return <DoctorLayout>{page}</DoctorLayout>
}

export default Page
