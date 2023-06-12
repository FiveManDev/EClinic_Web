import React, { useEffect } from "react"
import InputCustom from "../Input"
import { HiMagnifyingGlass } from "react-icons/hi2"
import ImageCustom from "../ImageCustom"
import { OverlayScrollbarsComponent } from "overlayscrollbars-react"
import { IRoom } from "types/Chat"
import { combineName, dayformat } from "shared/helpers/helper"
import { useDispatch } from "react-redux"
import { chatsSlice } from "store/module/chat/chat-slice"
interface IProps {
  data: IRoom[]
}
const ListHistory = ({ data }: IProps) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(chatsSlice.actions.onShowChatRoom(data[0].roomID))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div className="flex flex-col bg-gray-50 w-full max-w-[320px]">
      <div className="px-5 pt-10 pb-4">
        <h1 className="mb-3 text-2xl text-h1">Message</h1>
        <InputCustom
          onChange={(e) => {}}
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
          {data.map((item, index) => (
            <HistoryItem room={item} key={index} />
          ))}
        </div>
      </OverlayScrollbarsComponent>
    </div>
  )
}
interface HistoryProps {
  room: IRoom
}
export const HistoryItem = ({ room }: HistoryProps) => {
  const dispatch = useDispatch()
  const onClickItem = () => {
    dispatch(chatsSlice.actions.onShowChatRoom(room.roomID))
  }
  return (
    <div
      className="flex gap-x-3 items-center bg-white px-5 py-[6px] cursor-pointer hover:bg-blue-100 transition-all"
      onClick={onClickItem}
    >
      <div className="relative flex-shrink-0 w-10 h-10">
        <ImageCustom
          src={room?.roomAuthor.avatar || "/images/avatars/avatar_2.jpg"}
          fill
          alt="user-avatar"
          className="object-cover rounded-full"
        />
      </div>
      <div className="flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-h1">
            {combineName(
              room?.roomAuthor.firstName,
              room?.roomAuthor?.lastName
            )}
          </span>
          <time className="text-xs align-top text-black2 ">
            {dayformat(room.createdAt)}
          </time>
        </div>
        <span className="text-xs text-disable line-clamp-1">
          {room.chatMessage.content}
        </span>
      </div>
    </div>
  )
}
export default ListHistory
