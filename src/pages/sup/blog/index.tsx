import SupporterLayout from "layout/Management/SupporterLayout"
import ManageBlog from "module/Supporter/Blog/ManageBlog"
import { NextPageWithLayout } from "pages/page"

const Create: NextPageWithLayout = () => {
  return <ManageBlog />
}
Create.getLayout = (page) => {
  return <SupporterLayout>{page}</SupporterLayout>
}
export default Create
