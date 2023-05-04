import UserLayout from "layout/User/UserLayout"
import BlogDetailPage from "module/User/Blog/BlogDetailPage"
import { NextPageWithLayout } from "../page"
const Page: NextPageWithLayout = () => {
  return <BlogDetailPage />
}
Page.getLayout = (page) => {
  return <UserLayout>{page}</UserLayout>
}
export default Page
