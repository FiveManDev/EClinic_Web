import { Skeleton } from "@mui/material"
import classNames from "classnames"
import ImageCustom from "components/Common/ImageCustom"
import { dayformat } from "shared/helpers/helper"
import { Message } from "types/Chat"
interface IProps {
  kind?: "owner" | "other"
  message?: Message
  isLoading?: boolean
}
const TextMessage = ({
  kind = "other",
  message,
  isLoading = false
}: IProps) => {
  return (
    <div
      className={classNames(
        "flex items-end gap-x-2",
        kind === "owner" && "flex-row-reverse"
      )}
    >
      {isLoading ? (
        <Skeleton
          variant="circular"
          width={40}
          height={40}
          className="flex-shrink-0"
        />
      ) : (
        <div className="relative w-10 h-10 overflow-hidden rounded-full">
          <ImageCustom
            src={"/images/avatars/avatar_2.jpg"}
            fill
            alt="user-avatar"
            className="object-cover"
          />
        </div>
      )}

      <div
        className={classNames(
          "flex items-center gap-x-2",
          kind === "owner" && "flex-row-reverse"
        )}
      >
        <div className="flex flex-col">
          <time className="text-xs text-disable">
            {isLoading ? (
              <Skeleton variant="text" width={60} />
            ) : (
              dayformat(message?.createdAt)
            )}
          </time>

          {isLoading ? (
            <Skeleton variant="text" width={260} height={40} />
          ) : (
            <div
              className={classNames(
                "max-w-[266px] rounded-xl py-3 text-sm",
                kind === "other"
                  ? "rounded-bl-none pl-[10px] pr-7 bg-gray-100"
                  : "rounded-br-none pr-[10px] pl-7 bg-primary bg-opacity-80 text-white"
              )}
            >
              <p className="break-words break-all whitespace-normal">
                {message?.content}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default TextMessage
