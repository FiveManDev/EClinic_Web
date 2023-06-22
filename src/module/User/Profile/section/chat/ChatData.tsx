import ContainerChat from "components/Common/Chat/ContainerChat"
import { useGetAllRoomOfUserQuery } from "hooks/query/chat/room"
import React, { useState } from "react"
import { useSelector } from "react-redux"
import { PAGE_SIZE } from "shared/constant/constant"
import { searchChatSelector } from "store/module/chat/chat-selector"

const ChatData = () => {
  const [pageIndex, setPageIndex] = useState(1)
  const searchKeyword = useSelector(searchChatSelector)

  const { data, isLoading, isError } = useGetAllRoomOfUserQuery(
    pageIndex,
    PAGE_SIZE
  )
  if (isError) {
    return <p>Errrorr</p>
  }
  return <ContainerChat isLoading={isLoading} data={data?.data.data || []} />
}

export default ChatData
