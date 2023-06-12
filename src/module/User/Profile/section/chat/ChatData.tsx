import ContainerChat from "components/Common/Chat/ContainerChat"
import { useGetAllRoomOfUserQuery } from "hooks/query/chat/room"
import React, { useState } from "react"
import { PAGE_SIZE } from "shared/constant/constant"

const ChatData = () => {
  const [pageIndex, setPageIndex] = useState(1)

  const { data, isLoading, isError } = useGetAllRoomOfUserQuery(
    pageIndex,
    PAGE_SIZE
  )
  if (isLoading) {
    return <p>Loading...</p>
  }
  if (isError) {
    return <p>Errrorr</p>
  }
  return <ContainerChat data={data?.data.data || []} />
}

export default ChatData
