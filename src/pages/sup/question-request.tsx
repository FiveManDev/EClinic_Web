import SupporterLayout from "layout/Management/SupporterLayout"
import QuestionRequest from "module/Supporter/Quesiton/QuestionRequest"
import { NextPageWithLayout } from "pages/page"

const Page: NextPageWithLayout = () => {
  return <QuestionRequest />
}
Page.getLayout = (page) => {
  return <SupporterLayout>{page}</SupporterLayout>
}

export default Page
