import ListHistory from "./ListHistory"
import MessageBox from "./MessageBox/MessageBox"

const ContainerChat = () => {
  return (
    <div className="flex h-full max-h-[862px]">
      <ListHistory />
      <MessageBox />
      {/* <UserProfile /> */}
    </div>
  )
}

export default ContainerChat
