import { dehydrate, QueryClient } from "@tanstack/react-query"
import UserLayout from "layout/User/UserLayout"
import DetailPage from "module/User/Forum/DetailPage"
import { GetStaticPaths, GetStaticProps } from "next"
import { NextPageWithLayout } from "pages/page"
import { forumService } from "services/forum.service"
import { QUERY_KEYS } from "shared/constant/constant"

// type PageProps = InferGetStaticPropsType<typeof getStaticProps>

const Detail: NextPageWithLayout = () => {
  return <DetailPage />
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
