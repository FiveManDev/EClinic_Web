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
  if (isError) {
    return <p>Errorr....</p>
  }
  return (
    <>
      <Head>
        <title>Chat</title>
      </Head>
      <MainHeadingLayout heading="Chat with patient">
        <ContainerChat data={data?.data.data || []} isLoading={isLoading} />
      </MainHeadingLayout>
    </>
  )
}

export default ChatPage
