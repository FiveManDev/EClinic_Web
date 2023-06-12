import ContainerChat from "components/Common/Chat/ContainerChat"
import { useGetAllRoomOfDoctorQuery } from "hooks/query/chat/room"
import MainHeadingLayout from "layout/Management/MainHeadingLayout"
import Head from "next/head"
import { useState } from "react"
import { PAGE_SIZE } from "shared/constant/constant"

const ChatPage = () => {
  const [pageIndex, setPageIndex] = useState(1)

  const { data, isLoading, isError } = useGetAllRoomOfDoctorQuery(
    pageIndex,
    PAGE_SIZE
  )
  if (isLoading) {
    return <p>Loading...</p>
  }
  if (isError) {
    return <p>Errrorr</p>
  }
  return (
    <>
      <Head>
        <title>Chat</title>
      </Head>
      <MainHeadingLayout heading="Chat with paintent">
        <ContainerChat data={data?.data.data || []} />
      </MainHeadingLayout>
    </>
  )
}

export default ChatPage
