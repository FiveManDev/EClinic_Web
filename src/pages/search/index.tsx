import UserLayout from "layout/User/UserLayout"
import SearchPage from "module/User/Search/SearchPage"
import { NextPageWithLayout } from "pages/page"
import React from "react"

const Search: NextPageWithLayout = () => {
  return <SearchPage />
}
Search.getLayout = (page) => {
  return <UserLayout>{page}</UserLayout>
}
export default Search
