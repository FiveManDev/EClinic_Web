import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { roomIdChatSelector } from "store/module/chat/chat-selector"
import { IRoom } from "types/Chat"
import ListHistory from "./ListHistory"
import MessageBox from "./MessageBox/MessageBox"
import UserProfile from "./UserProfile"
import { SignalRMessageContextProvider } from "context/SignalRMessageContext"
import { SignalRCallContextProvider } from "context/SignalRCallContext"
interface IProps {
  data: IRoom[]
  isLoading: boolean
}
const ContainerChat = ({ data, isLoading = true }: IProps) => {
  const [show, setShow] = useState(false)
  const [userId, setUserId] = useState<string | null>(null)
  const roomId = useSelector(roomIdChatSelector)
  useEffect(() => {
    if (roomId) {
      const newuUserId = data.find((item) => item.roomID === roomId)
      setUserId(newuUserId?.roomAuthor.userID!)
    }
  }, [data, roomId])
  return (
    <SignalRMessageContextProvider>
      <SignalRCallContextProvider>
        <div className="flex h-full p-0 background-primary">
          <ListHistory isLoading={isLoading} data={data} />
          {roomId && (
            <MessageBox key={roomId} toggleInfo={() => setShow(!show)} />
          )}
          {show && (
            <UserProfile
              roomId={roomId}
              userId={userId!}
              onClose={() => setShow(!show)}
            />
          )}
        </div>
      </SignalRCallContextProvider>
    </SignalRMessageContextProvider>
  )
}

export default ContainerChat
