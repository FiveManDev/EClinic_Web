import { IconButton } from "@mui/material"
import ImageCustom from "components/Common/ImageCustom"
import { useRef, useState } from "react"
import { toast } from "react-hot-toast"
import { useTranslation } from "react-i18next"
import { AiOutlineSend } from "react-icons/ai"
import { combineName, dayformat } from "shared/helpers/helper"
import { IComment } from "types/Post"

interface Props {
  comment: IComment
  // eslint-disable-next-line no-unused-vars
  onCreateReply: (id: string, content: string) => void
}
const CommemtItem = ({ comment, onCreateReply }: Props) => {
  console.log("CommemtItem ~ comment:", comment)
  const { t } = useTranslation(["base", "forum"])
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
  return (
    <>
      <article className="p-3 space-y-3 text-base bg-white rounded-lg md:p-6 ">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <p className="inline-flex items-center mr-3 text-sm text-gray-900 ">
              <CommentAvatar avatar={comment.author.avatar} />
              <span>
                {" "}
                {combineName(comment.author.firstName, comment.author.lastName)}
              </span>
            </p>
            <p className="text-sm text-gray-600 ">
              <time dateTime={dayformat(comment.updatedAt)}>
                {dayformat(comment.updatedAt)}
              </time>
            </p>
          </div>
          <button
            id="dropdownComment1Button"
            data-dropdown-toggle="dropdownComment1"
            className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-400 bg-white border-none rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 "
            type="button"
          >
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path>
            </svg>
            <span className="sr-only">Comment settings</span>
          </button>
        </div>
        <p className="text-sm font-light leading-normal text-gray-500 md:text-base">
          {comment.content}
        </p>
        <div className="flex items-center mt-4 space-x-4">
          <button
            onClick={() => setOpenRep(!openRep)}
            type="button"
            className="flex items-center text-sm text-gray-500 bg-transparent border-none outline-none hover:underline "
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
            <CommtentReply key={replyItem.id} replyItem={replyItem} />
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
const CommentAvatar = ({ avatar = "" }) => {
  return (
    <div className="relative w-6 h-6 mr-2 ">
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
const CommtentReply = ({ replyItem }: { replyItem: IComment }) => {
  return (
    <article className="w-full p-3 text-base bg-white rounded-lg md:p-6">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <p className="inline-flex items-center mr-3 text-sm text-gray-900 ">
            <CommentAvatar avatar={replyItem.author.avatar} />
            <span>
              {" "}
              {combineName(
                replyItem.author.firstName,
                replyItem.author.lastName
              )}
            </span>
          </p>
          <p className="text-sm text-gray-600 ">
            <time dateTime={dayformat(replyItem.updatedAt)}>
              {dayformat(replyItem.updatedAt)}
            </time>
          </p>
        </div>
        <button
          id="dropdownComment1Button"
          data-dropdown-toggle="dropdownComment1"
          className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-400 bg-white border-none rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 "
          type="button"
        >
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path>
          </svg>
          <span className="sr-only">Comment settings</span>
        </button>
      </div>
      <p className="text-sm font-light leading-normal text-gray-500 md:text-base">
        {replyItem.content}
      </p>
    </article>
  )
}
export default CommemtItem
