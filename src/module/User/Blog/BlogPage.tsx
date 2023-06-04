import { Grid, Stack, Typography } from "@mui/material"
import InputCustom from "components/Common/Input"
import PaginationCustom from "components/Common/Pagination"
import { useSearchPostsBlog } from "hooks/query/blog/useBlog"
import useDebounce from "hooks/useDebounce"
import UserSecondaryLayout from "layout/User/UserSecondaryLayout"
import Head from "next/head"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { HiMagnifyingGlass } from "react-icons/hi2"
import { PAGE_SIZE } from "shared/constant/constant"
import { getDataPaginate } from "shared/helpers/helper"
import { IBreadcrum } from "types/Base.type"
import { IHashtag } from "types/Post"
import BlogPostCard from "./components/BlogPostCard"
import BlogPostsSort from "./components/BlogPostsSort"

const SORT_OPTIONS = [
  { value: "latest", label: "Latest" },
  { value: "popular", label: "Popular" },
  { value: "oldest", label: "Oldest" }
]

export default function BlogPage() {
  const [pageIndex, setPageIndex] = useState(1)

  const [searchData, setSearchData] = useState({
    searchText: "",
    tags: [] as IHashtag[]
  })
  const searchTextDebounce = useDebounce(searchData.searchText, 1500)

  const { t } = useTranslation(["base", "forum"])
  const breadrums: IBreadcrum[] = [
    { label: t("base:pages.home"), href: "/" },
    { label: t("base:pages.forum") }
  ]
  const postsBlog = useSearchPostsBlog(
    searchTextDebounce,
    pageIndex,
    PAGE_SIZE,
    searchData.tags.map((item) => item.hashtagID)
  )
  const paginateData = getDataPaginate(postsBlog.data)

  return (
    <>
      <Head>
        <title>Blog</title>
      </Head>
      <UserSecondaryLayout breadrums={breadrums}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Blog
          </Typography>
        </Stack>

        <Stack
          mb={5}
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <div className="flex flex-1 gap-x-1">
            <InputCustom
              value={searchData.searchText}
              onChange={(e) =>
                setSearchData({ ...searchData, searchText: e.target.value })
              }
              icon={<HiMagnifyingGlass />}
              className="w-full md:max-w-[400px] h-[46px]"
              placeholder={t("forum:search.input")}
            />
          </div>
          <BlogPostsSort options={SORT_OPTIONS} />
        </Stack>

        <Grid container spacing={3}>
          {postsBlog.data?.data.data.map((post, index) => (
            <BlogPostCard key={post.id} post={post} index={index} />
          ))}
        </Grid>
        <Stack>
          <PaginationCustom
            onPageChange={(value) => setPageIndex(value)}
            pagination={paginateData}
            color="primary"
            className="pt-6 md:ml-auto md:w-fit"
            shape="rounded"
          />
        </Stack>
      </UserSecondaryLayout>
    </>
  )
}
