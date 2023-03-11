import ChipCustom from "components/Common/Chip/Chip"
import Favorite from "components/Common/Favorite"
import ImageCustom from "components/Common/ImageCustom"
import {
  useCreateCommentForumMutation,
  useCreateReplyCommentForumMutation,
  useGetAllCommentForumQuery
} from "hooks/query/forum/useForum"
import Info from "module/User/components/Info/Info"
import dynamic from "next/dynamic"
import { toast } from "react-hot-toast"
import { useTranslation } from "react-i18next"
import { IPost } from "types/Post"
import ListCardForum from "../list/ListCardForum"

const Comment = dynamic(
  () => import("../comment").then((module) => module.default),
  {
    ssr: false
  }
)
interface Props {
  post: IPost
}
const DetailForum = ({ post }: Props) => {
  const { t } = useTranslation(["base", "forum"])
  const { data, isLoading, isError, refetch } = useGetAllCommentForumQuery(
    post.id
  )
  const createCommentForumMutation = useCreateCommentForumMutation()
  const createReplyCommentForumMutation = useCreateReplyCommentForumMutation()
  if (isLoading) {
    return <p>Loading...</p>
  }
  if (isError) {
    return <p>Error.....</p>
  }
  const handleCreateComment = (value: string) => {
    if (value) {
      console.log("handleCreateComment ~ post:", post)
      createCommentForumMutation.mutate(
        {
          postId: post.id,
          content: value,
          author: post.author
        },
        {
          onSuccess: () => {
            refetch()
            toast.success("Comment sucessfully!")
          },
          onError: () => {
            toast.error("Create comment failed!")
          }
        }
      )
    } else {
      toast.error("Please enter your content of comment")
    }
  }
  const handleCreateReply = (id: string, value: string) => {
    createReplyCommentForumMutation.mutate(
      {
        postId: id,
        content: value,
        author: post.author
      },
      {
        onSuccess: () => {
          refetch()
          toast.success("Reply Comment sucessfully!")
        },
        onError: () => {
          toast.error("Create comment failed!")
        }
      }
    )
  }
  return (
    <>
      <div className="flex flex-col justify-start gap-y-4 background-primary">
        <h3 className="text-xl">{post.title}</h3>
        <div className="relative w-full overflow-hidden rounded-lg h-96">
          <ImageCustom
            src={"/images/sample.png"}
            fill
            alt="image"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <div className="flex justify-between">
            <h4 className="text-lg">{t("forum:question")}</h4>
            <Favorite content={`${post.likes} Cảm ơn`} />
          </div>
          <p className="text-[#696974] text-sm leading-loose">{post.content}</p>
        </div>
        <div className="w-full h-[1px] bg-slate-200 my-3"></div>
        <div className="flex flex-col space-y-2">
          <h4 className="text-lg">{t("forum:anwers")}</h4>
          <div className="flex flex-col gap-y-2">
            <Info data={post.author} />
            <p className="text-[#696974] text-sm leading-loose">
              {post.content}
            </p>
          </div>
        </div>
        <div className="flex items-center w-full gap-2 mt-4">
          <h4 className="text-lg ">{t("forum:tags")}:</h4>
          <ul className="flex items-center w-full space-x-4 overflow-auto list-none">
            {new Array(3).fill(null).map((_, index) => (
              <li key={index}>
                <ChipCustom label="Covid-19" />
              </li>
            ))}
          </ul>
        </div>
        <Comment
          comments={data.data}
          onCreateComment={handleCreateComment}
          onCreateReply={handleCreateReply}
        />
      </div>
      <div className="col-span-3 space-y-4 md:col-span-2 background-primary">
        <ListCardForum title={t("forum:related")} />
      </div>
    </>
  )
}

export default DetailForum
