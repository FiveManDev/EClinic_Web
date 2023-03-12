import { IconButton } from "@mui/material"
import ImageCustom from "components/Common/ImageCustom"
import Popover from "components/User/Popover"
import useConfirm from "context/ComfirmContext"
import { useRef, useState } from "react"
import { toast } from "react-hot-toast"
import { useTranslation } from "react-i18next"
import { AiOutlineSend } from "react-icons/ai"
import { HiOutlineDotsHorizontal } from "react-icons/hi"
import { useSelector } from "react-redux"
import { combineName, dayformat } from "shared/helpers/helper"
import { RootState } from "store/store"
import { DeleteActionType, IComment } from "types/Post"

interface Props {
  comment: IComment
  // eslint-disable-next-line no-unused-vars
  onCreateReply: (id: string, content: string) => void
  // eslint-disable-next-line no-unused-vars
  onDeleteComment: (data: DeleteActionType) => void
}
const CommemtItem = ({ comment, onCreateReply, onDeleteComment }: Props) => {
  const { t } = useTranslation(["base", "forum"])
  const confirm = useConfirm()

  const [openRep, setOpenRep] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const createReply = () => {
    if (inputRef.current!.value) {
      onCreateReply(comment.id, inputRef.current!.value)
      inputRef.current!.value = ""
    } else {
      toast.error("Please enter your reply content")
    }
  }
  const handleDelete = async (data: DeleteActionType) => {
    if (confirm) {
      const choice = await confirm({
        title: "Delete Comment?",
        content: "Are you sure you want to delete this comment?"
      })
      if (choice) {
        onDeleteComment(data)
      }
    }
  }
  return (
    <>
      <article className="p-3 space-y-3 text-base bg-white rounded-lg md:p-6 ">
        <CommentContent
          comment={comment}
          handleDeleteComment={() =>
            handleDelete({
              CommentID: comment.id,
              ParentCommentID: null,
              kind: "reply"
            })
          }
        />
        <div className="flex items-center mt-4 space-x-4">
          <button
            onClick={() => setOpenRep(!openRep)}
            type="button"
            className="flex items-center text-sm text-gray-500 bg-transparent border-none outline-none cursor-pointer hover:underline"
          >
            <svg
              aria-hidden="true"
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            {t("forum:reply")}
          </button>
        </div>
        <div className="flex flex-col ml-6">
          {comment.replyCommentDtos.map((replyItem) => (
            <CommentReply
              key={replyItem.id}
              replyItem={replyItem}
              handleDeleteComment={() =>
                handleDelete({
                  CommentID: replyItem.id,
                  ParentCommentID: comment.id,
                  kind: "reply"
                })
              }
            />
          ))}
        </div>
        {openRep && (
          <div className="flex items-center mt-4 ml-4 gap-x-2">
            <CommentAvatar avatar="/images/default.jpeg" />
            <input
              ref={inputRef}
              defaultValue={""}
              type="text"
              placeholder="Write your reply comment here"
              className="w-full px-4 py-1.5 bg-white border border-gray-200 border-solid rounded-xl text-sm"
            />
            <IconButton size="small" onClick={createReply}>
              <AiOutlineSend />
            </IconButton>
          </div>
        )}
      </article>
    </>
  )
}

const CommentReply = ({
  replyItem,
  handleDeleteComment
}: {
  replyItem: IComment
  handleDeleteComment: () => void
}) => {
  return (
    <article className="w-full p-3 text-base bg-white rounded-lg md:p-6">
      <CommentContent
        handleDeleteComment={handleDeleteComment}
        comment={replyItem}
      />
    </article>
  )
}
const CommentContent = ({
  comment,
  handleDeleteComment = () => {}
}: {
  comment: IComment
  handleDeleteComment: () => void
}) => {
  const auth = useSelector((state: RootState) => state.auth)
  return (
    <>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <p className="inline-flex items-center mr-3 text-sm text-gray-900 ">
            <CommentAvatar avatar={comment.author.avatar} />
            <span>
              {combineName(comment.author.firstName, comment.author.lastName)}
            </span>
          </p>
          <p className="text-sm text-gray-600 ">
            <time dateTime={dayformat(comment.updatedAt)}>
              {dayformat(comment.updatedAt)}
            </time>
          </p>
        </div>
        {comment.author.userID === auth.user.userId && (
          <Popover
            position="left"
            className="w-fit"
            buttonTrigger={
              <button
                className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-400 bg-white border-none rounded-lg cursor-pointer hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50"
                type="button"
              >
                <HiOutlineDotsHorizontal className="text-xl" />
              </button>
            }
          >
            <ul className="py-2 bg-white rounded-md shadow">
              <li className="px-4 py-2 text-sm text-gray-500 transition-all cursor-pointer hover:bg-gray-200">
                Edit
              </li>
              <li
                className="px-4 py-2 text-sm text-red-500 transition-all cursor-pointer hover:bg-gray-200"
                onClick={() => handleDeleteComment()}
              >
                Delete
              </li>
            </ul>
          </Popover>
        )}
      </div>
      <p className="text-sm font-light leading-normal text-gray-500 md:text-base">
        {comment.content}
      </p>
    </>
  )
}
const CommentAvatar = ({ avatar = "" }) => {
  return (
    <div className="relative w-8 h-8 mr-2 ">
      <ImageCustom
        src={avatar || "/images/sample.png"}
        fill
        sizes="(max-width: 768px) 50vw,
      (max-width: 1200px) 30vw,
      20vw"
        alt="Michael Gough"
        className="object-cover rounded-full"
      />
    </div>
  )
}
export default CommemtItem
