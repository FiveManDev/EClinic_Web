import CustomButton from "components/User/Button"
import { useRef } from "react"
import { useTranslation } from "react-i18next"
import { DeleteActionType, IComment } from "types/Post"
import CommemtItem from "./CommemtItem"
interface Props {
  comments: IComment[]
  // eslint-disable-next-line no-unused-vars
  onCreateComment: (value: string) => void
  // eslint-disable-next-line no-unused-vars
  onCreateReply: (id: string, content: string) => void
  // eslint-disable-next-line no-unused-vars
  onDeleteComment: (data: DeleteActionType) => void
}
const Comment = ({
  comments,
  onCreateComment,
  onCreateReply,
  onDeleteComment
}: Props) => {
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const { t } = useTranslation(["base", "forum"])
  const handleSubmitComtent = () => {
    if (inputRef.current) {
      onCreateComment(inputRef.current?.value || "")
      inputRef.current!.value = ""
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
          {comments.map((comment) => (
            <CommemtItem
              key={comment.id}
              comment={comment}
              onCreateReply={onCreateReply}
              onDeleteComment={onDeleteComment}
            />
          ))}
        </div>
      </section>
    </>
  )
}

export default Comment
