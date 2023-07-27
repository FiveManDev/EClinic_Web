import ContainerChat from "components/Common/Chat/ContainerChat"
import ListHistory from "components/Common/Chat/ListHistory"
import EmtyData from "components/Common/Empty"
import {
  useGetAllNewRoomQuery,
  useGetAllRoomOfSupporterQuery
} from "hooks/query/chat/room"
import MainHeadingLayout from "layout/Management/MainHeadingLayout"
import Head from "next/head"
import { useState } from "react"

const ChatPage = () => {
  const [pageIndex, setPageIndex] = useState(1)

  const { data, isLoading, isError } = useGetAllRoomOfSupporterQuery(
    pageIndex,
    100
  )
  const newRoom = useGetAllNewRoomQuery(pageIndex, 100)
  if (isError) {
    return <EmtyData />
  }

  return (
    <>
      <Head>
        <title>Support list</title>
      </Head>
      <MainHeadingLayout heading="List of all messages that need support">
        <div className="flex gap-x-4">
          <div className="flex flex-col rounded-lg shadow-[rgba(145,_158,_171,_0.2)_0px_0px_2px_0px,_rgba(145,_158,_171,_0.12)_0px_12px_24px_-4px] bg-gray-50">
            <ListHistory
              title="Unanswered list"
              isLoading={newRoom.isLoading}
              data={newRoom.data?.data.data || []}
            />
          </div>
          <div className="flex-1">
            <ContainerChat data={data?.data.data || []} isLoading={isLoading} />
          </div>
        </div>
      </MainHeadingLayout>
    </>
  )
}

export default ChatPage
