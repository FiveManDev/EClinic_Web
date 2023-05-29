import DoctorLayout from "layout/Management/DoctorLayout"
import ChatPage from "module/Doctor/Chat/ChatPage"
import { NextPageWithLayout } from "pages/page"

const Page: NextPageWithLayout = () => {
  return <ChatPage />
}
Page.getLayout = (page) => {
  return <DoctorLayout>{page}</DoctorLayout>
}

export default Page
