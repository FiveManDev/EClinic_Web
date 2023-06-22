import { Skeleton } from "@mui/material"
import classNames from "classnames"
import { OverlayScrollbarsComponent } from "overlayscrollbars-react"
import { HiMagnifyingGlass } from "react-icons/hi2"
import { useDispatch, useSelector } from "react-redux"
import { combineName, dayformat } from "shared/helpers/helper"
import {
  roomIdChatSelector,
  searchChatSelector
} from "store/module/chat/chat-selector"
import { chatsSlice } from "store/module/chat/chat-slice"
import { IRoom } from "types/Chat"
import ImageCustom from "../ImageCustom"
import InputCustom from "../Input"
interface IProps {
  data: IRoom[]
  isLoading: boolean
}
const ListHistory = ({ data, isLoading = false }: IProps) => {
  const searchKeyword = useSelector(searchChatSelector)
  const dispatch = useDispatch()

  return (
    <div className="flex flex-col bg-gray-50 w-full max-w-[320px]">
      <div className="px-5 pt-10 pb-4">
        <h1 className="mb-3 text-2xl text-h1">Message</h1>
        <InputCustom
          value={searchKeyword}
          onChange={(e) => {
            dispatch(chatsSlice.actions.onSearch(e.target.value))
          }}
          icon={<HiMagnifyingGlass />}
          className="w-full md:max-w-[412px]"
          placeholder="Search for message"
        />
      </div>
      <OverlayScrollbarsComponent
        defer
        options={{ scrollbars: { autoHide: "scroll" } }}
      >
        <div className="h-full space-y-4">
          {isLoading &&
            Array(6)
              .fill(0)
              .map((_, index) => (
                <HistoryItem isLoading={isLoading} key={index} />
              ))}
          {data.length > 0 &&
            data.map((item, index) => <HistoryItem room={item} key={index} />)}
        </div>
      </OverlayScrollbarsComponent>
    </div>
  )
}
interface HistoryProps {
  room?: IRoom
  isLoading?: boolean
}
export const HistoryItem = ({ room, isLoading = false }: HistoryProps) => {
  const roomId = useSelector(roomIdChatSelector)
  const dispatch = useDispatch()
  const onClickItem = () => {
    if (room) {
      dispatch(chatsSlice.actions.onShowChatRoom(room.roomID))
    }
  }
  return (
    <div
      className={classNames(
        "flex gap-x-3 items-center bg-white px-5 py-[6px] cursor-pointer hover:bg-blue-100 transition-all",
        roomId === room?.roomID && "bg-carbon"
      )}
      onClick={onClickItem}
    >
      {isLoading && (
        <Skeleton
          variant="circular"
          width={40}
          height={40}
          className="flex-shrink-0"
        />
      )}
      {room?.roomAuthor && (
        <div className="relative flex-shrink-0 w-10 h-10">
          <ImageCustom
            src={room?.roomAuthor.avatar || "/images/avatars/avatar_2.jpg"}
            fill
            alt="user-avatar"
            className="object-cover rounded-full"
          />
        </div>
      )}

      <div className="flex flex-col justify-between flex-1">
        <div className="flex items-center justify-between">
          {isLoading && (
            <>
              <Skeleton variant="text" width={80} />
            </>
          )}
          <p className="text-sm font-medium text-h1 max-w-[110px] line-clamp-1">
            {room?.roomAuthor &&
              combineName(
                room?.roomAuthor.firstName,
                room?.roomAuthor?.lastName
              )}
          </p>
          <time className="text-xs align-top text-black2 ">
            {isLoading && <Skeleton variant="text" width={60} />}
            {room?.roomAuthor && dayformat(room?.createdAt)}
          </time>
        </div>
        <span className="text-xs text-disable line-clamp-1">
          {isLoading && <Skeleton variant="text" width={100} />}
          {room?.chatMessage && room?.chatMessage.content}
        </span>
      </div>
    </div>
  )
}
export default ListHistory
