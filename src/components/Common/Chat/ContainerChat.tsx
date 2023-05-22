import { useState } from "react"
import ListHistory from "./ListHistory"
import MessageBox from "./MessageBox/MessageBox"
import UserProfile from "./UserProfile"

const ContainerChat = () => {
  const [show, setShow] = useState(false)
  return (
    <div className="flex h-full max-h-[862px]">
      <ListHistory />
      <MessageBox toggleInfo={() => setShow(!show)} />
      {show && <UserProfile onClose={() => setShow(!show)} />}
    </div>
  )
}

export default ContainerChat
