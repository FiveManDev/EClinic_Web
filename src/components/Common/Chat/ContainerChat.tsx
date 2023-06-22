import { useState } from "react"
import { useSelector } from "react-redux"
import { roomIdChatSelector } from "store/module/chat/chat-selector"
import { IRoom } from "types/Chat"
import ListHistory from "./ListHistory"
import MessageBox from "./MessageBox/MessageBox"
import UserProfile from "./UserProfile"
interface IProps {
  data: IRoom[]
  isLoading: boolean
}
const ContainerChat = ({ data, isLoading = true }: IProps) => {
  const [show, setShow] = useState(false)
  const roomId = useSelector(roomIdChatSelector)
  return (
    <div className="flex h-full md:h-[620px] p-0 background-primary">
      <ListHistory isLoading={isLoading} data={data} />
      {roomId && <MessageBox key={roomId} toggleInfo={() => setShow(!show)} />}
      {show && <UserProfile onClose={() => setShow(!show)} />}
    </div>
  )
}

export default ContainerChat
