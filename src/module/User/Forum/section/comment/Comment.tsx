import CustomButton from "components/User/Button"
import { ToastNavigate } from "module/User/components/Toast/ToastNavigate"
import { useRouter } from "next/router"
import { useRef } from "react"
import { toast } from "react-hot-toast"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { routers } from "shared/constant/constant"
import { RootState } from "store/store"
import {
  DeleteActionType,
  IComment,
  LikeActionType,
  UpdateActionType
} from "types/Post"
import CommemtItem from "./CommemtItem"
interface Props {
  comments: IComment[]
  // eslint-disable-next-line no-unused-vars
  onCreateComment: (value: string) => void
  // eslint-disable-next-line no-unused-vars
  onCreateReply: (id: string, content: string) => void
  // eslint-disable-next-line no-unused-vars
  onDeleteComment: (data: DeleteActionType) => void
  // eslint-disable-next-line no-unused-vars
  updateComment: (data: UpdateActionType) => void
  // eslint-disable-next-line no-unused-vars
  onLikeComment: (data: LikeActionType) => void
}
const Comment = ({
  comments,
  onCreateComment,
  onCreateReply,
  onDeleteComment,
  onLikeComment,
  updateComment
}: Props) => {
  const router = useRouter()
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const { t } = useTranslation(["base", "forum"])
  const auth = useSelector((state: RootState) => state.auth)

  const handleSubmitComtent = () => {
    if (auth.user.userId) {
      if (inputRef.current) {
        onCreateComment(inputRef.current?.value || "")
        inputRef.current!.value = ""
      }
    } else {
      toast((t) => (
        <ToastNavigate
          url={routers.signIn}
          t={t}
          labelButton="Login"
          router={router}
          title="Please login to write comment"
        />
      ))
    }
  }
  return (
    <>
      <section className="py-4 bg-white md:py-6 ">
        <div className="w-full mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-900 lg:text-2xl ">
              {t("forum:discussion")} ({comments.length})
            </h2>
          </div>
          <form className="mb-6">
            <div className="w-full px-4 py-2 mb-4 bg-white border border-gray-200 border-solid rounded-lg rounded-t-lg ">
              <textarea
                ref={inputRef}
                id="comment"
                rows={6}
                className="w-full px-0 text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none "
                placeholder={t("forum:writeComment")}
                required
                defaultValue={""}
              />
            </div>
            <CustomButton
              kind="primary"
              size="small"
              className="!h-9"
              onClick={() => handleSubmitComtent()}
            >
              <span className="!text-[12px]">{t("forum:btnComment")}</span>
            </CustomButton>
          </form>
          {comments.length === 0 && <p>No comment on this post</p>}
          {comments.map((comment) => (
            <CommemtItem
              key={comment.id}
              comment={comment}
              onCreateReply={onCreateReply}
              onDeleteComment={onDeleteComment}
              updateComment={updateComment}
              onLikeComment={onLikeComment}
            />
          ))}
        </div>
      </section>
    </>
  )
}

export default Comment
