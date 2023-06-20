import {
  useCreateChatMessage,
  useGetAllMessageOfRoomQuery
} from "hooks/query/chat/message"
import { OverlayScrollbarsComponent } from "overlayscrollbars-react"
import { useState } from "react"
import { useSelector } from "react-redux"
import { PAGE_SIZE } from "shared/constant/constant"
import { roomIdChatSelector } from "store/module/chat/chat-selector"
import { HeaderBox } from "./HeaderBox"
import InputMessage from "./InputMessage"
import TextMessage from "./TextMessage"
import { toast } from "react-hot-toast"
interface IProps {
  toggleInfo: () => void
}
const MessageBox = ({ toggleInfo }: IProps) => {
  const roomId = useSelector(roomIdChatSelector)
  const [pageIndex, setPageIndex] = useState(1)
  const createMessage = useCreateChatMessage()

  const messageOfRoom = useGetAllMessageOfRoomQuery(
    pageIndex,
    PAGE_SIZE,
    roomId
  )
  const handleCreateMessage = (content: string) => {
    if (content) {
      createMessage.mutate(
        {
          roomId,
          content
        },
        {
          onSuccess: () => {
            messageOfRoom.refetch()
          },
          onError: () => {
            toast.error("Create message fail")
          }
        }
      )
    }
  }
  if (messageOfRoom.isLoading) {
    return <p>Loading...</p>
  }
  if (messageOfRoom.isError) {
    return <p>Errrorr</p>
  }
  return (
    <div className="flex flex-col w-full border border-gray-200 border-solid border-y-0">
      <HeaderBox
        author={messageOfRoom.data?.data.data.otherProfile}
        toggleInfo={toggleInfo}
      />
      <OverlayScrollbarsComponent
        defer
        options={{ scrollbars: { autoHide: "scroll" } }}
      >
        <div className="flex flex-col flex-1 h-full px-5 py-6 space-y-4">
          {messageOfRoom.data?.data.data.message &&
            messageOfRoom.data?.data?.data?.message.map((mess) => (
              <TextMessage
                message={mess}
                key={mess.chatMessageID}
                kind={mess.isMyChat ? "owner" : "other"}
              />
            ))}
        </div>
      </OverlayScrollbarsComponent>
      <InputMessage
        isLoading={createMessage.isLoading}
        onCreate={handleCreateMessage}
      />
    </div>
  )
}

export default MessageBox
