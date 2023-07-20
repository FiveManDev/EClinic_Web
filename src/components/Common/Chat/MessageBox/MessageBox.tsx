import { useInfiniteQuery } from "@tanstack/react-query"
import Spinner from "components/Common/Loading/LoadingIcon"
import { AnimatePresence } from "framer-motion"
import { useCreateChatMessage } from "hooks/query/chat/message"
import { useEffect, useRef, useState } from "react"
import { toast } from "react-hot-toast"
import { useSelector } from "react-redux"
import { chatService } from "services/chat.service"
import { PAGE_SIZE, QUERY_KEYS } from "shared/constant/constant"
import { combineName, getDataPaginate } from "shared/helpers/helper"
import colorsProvider from "shared/theme/colors"
import { roomIdChatSelector } from "store/module/chat/chat-selector"
import { RootState } from "store/store"
import { Message } from "types/Chat"
import ButtonScroll from "./ButtonScroll"
import { HeaderBox } from "./HeaderBox"
import InputMessage from "./InputMessage"
import TextMessage from "./TextMessage"
import VideoCall from "./VideoCall"
import { useSignalRMessage } from "context/SignalRMessageContext"
import { useSignalRCall } from "context/SignalRCallContext"
import { Button } from "@mui/material"

interface IProps {
  toggleInfo: () => void
}
const MessageBox = ({ toggleInfo }: IProps) => {
  const refScroll = useRef<HTMLDivElement | null>(null)
  const [isBottom, setIsBottom] = useState(false)
  const [textInput, setTextInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const {
    answerCall,
    callUser,
    call,
    callAccepted,
    signalRConnection,
    callEnded
  } = useSignalRCall()
  const { connectionMessage, isConnected } = useSignalRMessage()
  const auth = useSelector((state: RootState) => state.auth)
  const roomId = useSelector(roomIdChatSelector)
  const createMessage = useCreateChatMessage()
  const roomData = useInfiniteQuery(
    [QUERY_KEYS.CHAT.MESSAGE, PAGE_SIZE, roomId],
    async ({ pageParam = 1 }) => {
      const res = await chatService.getAllMessageOfRoom(
        pageParam,
        PAGE_SIZE,
        roomId
      )
      return res
    },
    {
      getPreviousPageParam: (lastPage) => {
        if (getDataPaginate(lastPage).HasNext) {
          return getDataPaginate(lastPage).PageIndex + 1
        }
        return undefined
      }
    }
  )
  const handleCreateMessage = (content: string) => {
    if (content) {
      createMessage.mutate(
        {
          roomId,
          content
        },
        {
          onSuccess: () => {
            scrollToBottom()
            setTextInput("")
          },
          onError: () => {
            toast.error("Create message fail")
          }
        }
      )
    }
  }
  const scrollToBottom = () => {
    if (refScroll.current) {
      refScroll.current.lastElementChild?.scrollIntoView({
        behavior: "smooth",
        block: "end"
      })
    }
  }
  useEffect(() => {
    if (isConnected) {
      connectionMessage
        .current!.start()
        .then(() => {
          connectionMessage
            .current!.invoke("JoinGroup", roomId)
            .then(() => {})
            .catch((err) => {
              return console.error(err.toString())
            })
        })
        .catch((err) => {
          return console.error(err.toString())
        })
      connectionMessage.current!.on("Response", (message: Message) => {
        if (message) {
          setMessages((prevMes) => [...prevMes, message])
        }
      })
    }
  }, [roomId, isConnected, connectionMessage])
  useEffect(() => {
    const handleScroll = () => {
      if (refScroll.current) {
        const scrollTop = refScroll.current.scrollTop
        const scrollHeight = refScroll.current.scrollHeight
        const clientHeight = refScroll.current.clientHeight

        // Calculate the scroll distance from the bottom
        const scrollDistanceFromBottom =
          scrollHeight - (scrollTop + clientHeight)
        setIsBottom(scrollDistanceFromBottom <= 30)
        if (scrollTop === 0 && roomData.hasPreviousPage) {
          roomData.fetchPreviousPage()
        }
      }
    }

    const scrollContainer = refScroll.current
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll)
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", handleScroll)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refScroll, roomData.hasPreviousPage])
  //handle when create message success
  useEffect(() => {
    if (messages[messages.length - 1]?.userID === auth.user.userId) {
      scrollToBottom()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages])
  useEffect(() => {
    if (roomData.data?.pages.length === 1) {
      scrollToBottom()
    }
  }, [roomData.data])
  useEffect(() => {
    if (roomId && isConnected) {
      signalRConnection
        .current!.start()
        .then(() => {
          signalRConnection
            .current!.invoke("JoinCall", roomId)
            .then(() => {})
            .catch((err) => {
              return console.error(err.toString())
            })
        })
        .catch((err) => {
          return console.error(err.toString())
        })
    }
  }, [roomId, isConnected, signalRConnection])
  const myProfile = roomData.data?.pages[0]?.data.data.myProfile
  return (
    <div className="flex flex-col w-full h-full border border-gray-200 border-solid border-y-0 ">
      <HeaderBox
        isLoading={roomData.isLoading}
        author={roomData.data?.pages[0]?.data.data.otherProfile}
        toggleInfo={toggleInfo}
        handleCall={() => {
          callUser(
            roomId,
            combineName(myProfile?.firstName, myProfile?.lastName),
            myProfile?.userID || ""
          )
        }}
      />
      {call.isReceivingCall &&
        !callAccepted &&
        call.userId !== myProfile?.userID && (
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <h1>{call.name} is calling:</h1>
            <Button variant="contained" color="primary" onClick={answerCall}>
              Answer
            </Button>
          </div>
        )}
      <VideoCall userProfile={roomData.data?.pages[0]?.data.data.myProfile} />

      <div className="relative flex-1 w-full overflow-y-hidden scroll-custom ">
        <AnimatePresence
          initial={false}
          onExitComplete={() => null}
          mode="wait"
        >
          {!isBottom && <ButtonScroll onClick={scrollToBottom} />}
        </AnimatePresence>
        <div
          className="flex flex-col h-full px-5 py-6 space-y-4 overflow-y-auto scroll-custom scroll-smooth md:h-[500px]"
          ref={refScroll}
        >
          {roomData.isFetchingPreviousPage && (
            <div className="w-6 h-6 pt-2 mx-auto ">
              {/* <Spinner color={colorsProvider.primary} /> */}
              <div
                className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-black2 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status"
              >
                <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"></span>
              </div>
            </div>
          )}
          {roomData.isLoading &&
            Array(6)
              .fill(0)
              .map((item, index) => (
                <TextMessage
                  key={index}
                  kind={index % 2 === 1 ? "owner" : "other"}
                  isLoading={roomData.isLoading}
                />
              ))}
          {roomData.data &&
            roomData.data?.pages?.length > 0 &&
            roomData.data?.pages.map((item) =>
              item?.data.data?.message?.map((mess) => (
                <TextMessage
                  avatar={
                    mess.userID === auth.user.userId
                      ? item.data.data.myProfile.avatar
                      : item.data.data.otherProfile.avatar
                  }
                  message={mess}
                  key={mess.chatMessageID}
                  kind={mess.userID === auth.user.userId ? "owner" : "other"}
                />
              ))
            )}
          {messages.length > 0 &&
            messages.map((mess) => (
              <TextMessage
                avatar={
                  mess.userID === auth.user.userId
                    ? roomData.data?.pages[0]?.data.data.myProfile.avatar
                    : roomData.data?.pages[0]?.data.data.otherProfile.avatar
                }
                message={mess}
                key={mess.chatMessageID}
                kind={mess.userID === auth.user.userId ? "owner" : "other"}
              />
            ))}
        </div>
      </div>

      <InputMessage
        value={textInput}
        onChange={(value) => setTextInput(value)}
        isLoading={createMessage.isLoading}
        onCreate={handleCreateMessage}
      />
    </div>
  )
}

export default MessageBox
