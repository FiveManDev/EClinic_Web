import {
  Container,
  Grid,
  SpeedDial,
  SpeedDialAction,
  Typography
} from "@mui/material"
import UserSecondaryLayout from "layout/User/UserSecondaryLayout"
import Head from "next/head"
import Image from "next/image"
import { useTranslation } from "react-i18next"
import { AiOutlineInstagram } from "react-icons/ai"
import { HiOutlineShare } from "react-icons/hi2"
import { dayformat } from "shared/helpers/helper"
import { IBreadcrum } from "types/Base.type"
import BlogPostCard from "./components/BlogPostCard"
import { recentPosts } from "../../../_mock/blog"

const actions = [
  {
    icon: (
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          aria-hidden="true"
          role="img"
          className="MuiBox-root css-xe43za iconify iconify--eva"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
        >
          <g id="iconifyReact1530">
            <g id="iconifyReact1531">
              <path
                id="iconifyReact1532"
                fill="currentColor"
                d="M17 3.5a.5.5 0 0 0-.5-.5H14a4.77 4.77 0 0 0-5 4.5v2.7H6.5a.5.5 0 0 0-.5.5v2.6a.5.5 0 0 0 .5.5H9v6.7a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-6.7h2.62a.5.5 0 0 0 .49-.37l.72-2.6a.5.5 0 0 0-.48-.63H13V7.5a1 1 0 0 1 1-.9h2.5a.5.5 0 0 0 .5-.5Z"
              />
            </g>
          </g>
        </svg>
      </>
    ),
    name: "Facebook"
  },
  {
    icon: <AiOutlineInstagram />,
    name: "Instagram"
  }
]

const BlogDetailPage = () => {
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
        <Container className="flex-1 p-0">
          <div className="w-full h-full bg-background-primary">
            <div className="w-full h-[648px] relative rounded-tr-2xl rounded-tl-2xl overflow-hidden">
              <Image fill src={"/images/covers/cover_1.jpg"} alt="thumbnails" />
              <div className="absolute inset-0 z-10 backdrop-brightness-50"></div>

              <h1 className="absolute top-0 z-20 p-20 text-5xl font-bold leading-snug text-snow">
                Apply These 7 Secret Techniques To Improve Event
              </h1>
              <div className="absolute bottom-0 z-20 flex items-center justify-between w-full p-20">
                <div className="flex items-center gap-x-3">
                  <div className="relative w-12 h-12 overflow-hidden rounded-full">
                    <Image
                      src={"/images/avatars/avatar_1.jpg"}
                      fill
                      alt="avatart"
                    />
                  </div>
                  <div className="flex flex-col gap-y-1">
                    <h3 className="text-base font-bold leading-normal text-snow">
                      Jayvion Simon
                    </h3>
                    <Typography
                      gutterBottom
                      variant="caption"
                      sx={{
                        color: "text.disabled",
                        display: "block",
                        cursor: "pointer"
                      }}
                    >
                      {dayformat("03 May 2023")}
                    </Typography>
                  </div>
                </div>
                <SpeedDial
                  direction="left"
                  ariaLabel="SpeedDial basic example"
                  icon={<HiOutlineShare />}
                >
                  {actions.map((action) => (
                    <SpeedDialAction
                      key={action.name}
                      icon={action.icon}
                      tooltipTitle={action.name}
                    />
                  ))}
                </SpeedDial>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <h3 className="my-10 text-2xl font-semibold text-h1">
              Recent posts
            </h3>
            <Grid container spacing={3}>
              {recentPosts.map((post, index) => (
                <BlogPostCard key={post.id} post={post} index={index + 1} />
              ))}
            </Grid>
          </div>
        </Container>
      </UserSecondaryLayout>
    </>
  )
}

export default BlogDetailPage
