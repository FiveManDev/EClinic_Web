import { dehydrate, QueryClient } from "@tanstack/react-query"
import UserLayout from "layout/User/UserLayout"
import { GetStaticPaths, GetStaticProps } from "next"
import dynamic from "next/dynamic"
import { NextPageWithLayout } from "pages/page"
import { forumService } from "services/forum.service"
import { QUERY_KEYS } from "shared/constant/constant"
const DetailPageServer = dynamic(() => import("module/User/Forum/DetailPage"))
const Detail: NextPageWithLayout = () => {
  return <DetailPageServer />
}

Detail.getLayout = (page) => {
  return <UserLayout>{page}</UserLayout>
}
export const getStaticPaths: GetStaticPaths = async () => {
  let paths: any = []
  try {
    const data = await forumService.getAllPost(1, 10)
    paths = data.data.data.map((post) => {
      return {
        params: {
          id: post.id
        }
      }
    })
  } catch (error) {
    console.log("constgetStaticPaths:GetStaticPaths= ~ error:", error)
  }
  return {
    paths,
    fallback: true
  }
}
export const getStaticProps: GetStaticProps = async (context) => {
  const queryClient = new QueryClient()

  const id = context?.params?.id as string
  await queryClient.prefetchQuery([QUERY_KEYS.FORUM.POST, id], () =>
    forumService.getPostById(id)
  )
  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  }
}

export default Detail
