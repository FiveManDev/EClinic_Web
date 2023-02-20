import UserLayout from "layout/User/UserLayout"
import DetailPage from "module/User/Forum/DetailPage"
import { NextPageWithLayout } from "pages/page"

const Detail: NextPageWithLayout = () => {
  return <DetailPage />
}

Detail.getLayout = (page) => {
  return <UserLayout>{page}</UserLayout>
}
export default Detail
