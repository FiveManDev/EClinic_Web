import { useGetAllMessageOfRoomQuery } from "hooks/query/chat/message"
import { OverlayScrollbarsComponent } from "overlayscrollbars-react"
import { useState } from "react"
import { useSelector } from "react-redux"
import { PAGE_SIZE } from "shared/constant/constant"
import { roomIdChatSelector } from "store/module/chat/chat-selector"
import { HeaderBox } from "./HeaderBox"
import InputMessage from "./InputMessage"
import TextMessage from "./TextMessage"
interface IProps {
  toggleInfo: () => void
}
const MessageBox = ({ toggleInfo }: IProps) => {
  const roomId = useSelector(roomIdChatSelector)
  const [pageIndex, setPageIndex] = useState(1)

  const messageOfRoom = useGetAllMessageOfRoomQuery(
    pageIndex,
    PAGE_SIZE,
    roomId
  )
  return (
    <div className="flex flex-col w-full border border-gray-200 border-solid border-y-0">
      <HeaderBox toggleInfo={toggleInfo} />
      <OverlayScrollbarsComponent
        defer
        options={{ scrollbars: { autoHide: "scroll" } }}
      >
        <div className="flex flex-col flex-1 h-full px-5 py-6 space-y-4">
          {messageOfRoom.data?.data.data.map((mess) => (
            <TextMessage
              message={mess}
              key={mess.chatMessageID}
              kind={mess.isMyChat ? "owner" : "other"}
            />
          ))}
          {/* <Divider className="flex items-center px-6">
            <time className="text-xs text-disable">
              {dayformat("Mon May 22 2023 18:17:57 GMT+0700 (Indochina Time)")}
            </time>
          </Divider> */}
        </div>
      </OverlayScrollbarsComponent>
      <InputMessage />
    </div>
  )
}

export default MessageBox
