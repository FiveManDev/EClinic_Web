import UserLayout from "layout/User/UserLayout"
import ForumPage from "module/User/Forum/ForumPage"
import React from "react"
import { NextPageWithLayout } from "./page"

const Forum: NextPageWithLayout = () => {
  return <ForumPage />
}

Forum.getLayout = (page) => {
  return <UserLayout>{page}</UserLayout>
}
export default Forum
