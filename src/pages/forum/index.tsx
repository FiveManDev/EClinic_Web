import UserLayout from "layout/User/UserLayout"
import ForumPage from "module/User/Forum/ForumPage"
import { NextPageWithLayout } from "pages/page"
import React from "react"

const Forum: NextPageWithLayout = () => {
  return <ForumPage />
}

Forum.getLayout = (page) => {
  return <UserLayout>{page}</UserLayout>
}
export default Forum
