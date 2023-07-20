import { SignalRCallContextProvider } from "context/SignalRCallContext"
import { SignalRMessageContextProvider } from "context/SignalRMessageContext"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { IRoom } from "types/Chat"
import EmtyData from "../Empty"
import ListHistory from "./ListHistory"
import MessageBox from "./MessageBox/MessageBox"
import UserProfile from "./UserProfile"
interface IProps {
  data: IRoom[]
  isLoading: boolean
}
const ContainerChat = ({ data, isLoading = true }: IProps) => {
  const { query } = useRouter()
  const roomId = query.roomId as string
  const [show, setShow] = useState(false)
  const [userId, setUserId] = useState<string | null>(null)
  useEffect(() => {
    if (roomId) {
      const author = data.find((item) => item.roomID === roomId)
      setUserId(author?.roomAuthor.userID!)
    }
  }, [data, roomId])
  return (
    <SignalRMessageContextProvider>
      <SignalRCallContextProvider>
        <div className="flex h-full p-0 background-primary">
          <ListHistory isLoading={isLoading} data={data} />
          {roomId && userId ? (
            <MessageBox
              key={roomId}
              userId={userId}
              toggleInfo={() => setShow(!show)}
            />
          ) : (
            <EmtyData
              message="Select a chat to conversation"
              className="flex-1 max-auto"
            />
          )}
          {show && roomId && (
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
