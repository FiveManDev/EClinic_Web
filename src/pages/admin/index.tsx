import AdminLayout from "layout/Admin/AdminLayout"
import HomePage from "module/Admin/Home/HomePage"
import { NextPageWithLayout } from "../page"

const Home: NextPageWithLayout = () => {
  return <HomePage />
}
Home.getLayout = (page) => {
  return <AdminLayout>{page}</AdminLayout>
}
export default Home
