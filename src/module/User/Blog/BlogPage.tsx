import { Container, Grid, Stack, Typography } from "@mui/material"
import InputCustom from "components/Common/Input"
import CustomButton from "components/User/Button"
import UserSecondaryLayout from "layout/User/UserSecondaryLayout"
import Head from "next/head"
import { useTranslation } from "react-i18next"
import { HiMagnifyingGlass } from "react-icons/hi2"
import { IBreadcrum } from "types/Base.type"
import { posts } from "../../../_mock/blog"
import BlogPostCard from "./components/BlogPostCard"
import BlogPostsSort from "./components/BlogPostsSort"
const SORT_OPTIONS = [
  { value: "latest", label: "Latest" },
  { value: "popular", label: "Popular" },
  { value: "oldest", label: "Oldest" }
]

export default function BlogPage() {
  const { t } = useTranslation(["base", "forum"])
  const breadrums: IBreadcrum[] = [
    { label: t("base:pages.home"), href: "/" },
    { label: t("base:pages.forum") }
  ]

  return (
    <>
      <Head>
        <title>Blog</title>
      </Head>
      <UserSecondaryLayout breadrums={breadrums}>
        <Container className="p-0">
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
                icon={<HiMagnifyingGlass />}
                className="w-full md:max-w-[400px]"
                placeholder={t("forum:search.input")}
              />
              <CustomButton kind="primary" className="!rounded-[5px]">
                Search
              </CustomButton>
            </div>
            <BlogPostsSort options={SORT_OPTIONS} />
          </Stack>

          <Grid container spacing={3}>
            {posts.map((post, index) => (
              <BlogPostCard key={post.id} post={post} index={index} />
            ))}
          </Grid>
        </Container>
      </UserSecondaryLayout>
    </>
  )
}
