import UserLayout from "layout/User/UserLayout"
import HomePage from "module/User/Home/HomePage"
import { NextPageWithLayout } from "./page"

const Home: NextPageWithLayout = () => {
  return <HomePage />
}
Home.getLayout = (page) => {
  return <UserLayout>{page}</UserLayout>
}
export default Home
