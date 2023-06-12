import { useState } from "react"
import ListHistory from "./ListHistory"
import MessageBox from "./MessageBox/MessageBox"
import UserProfile from "./UserProfile"
import { IRoom } from "types/Chat"
interface IProps {
  data: IRoom[]
}
const ContainerChat = ({ data }: IProps) => {
  const [show, setShow] = useState(false)
  return (
    <div className="flex h-full max-h-[620px] p-0 background-primary">
      <ListHistory data={data} />
      <MessageBox toggleInfo={() => setShow(!show)} />
      {show && <UserProfile onClose={() => setShow(!show)} />}
    </div>
  )
}

export default ContainerChat
