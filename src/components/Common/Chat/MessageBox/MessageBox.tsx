import { useInfiniteQuery, useMutation } from "@tanstack/react-query"
import { useSignalRCall } from "context/SignalRCallContext"
import { useSignalRMessage } from "context/SignalRMessageContext"
import { AnimatePresence } from "framer-motion"
import { useCreateChatMessage } from "hooks/query/chat/message"
import { useSimpleProfile } from "hooks/query/profile/useProfile"
import { useRouter } from "next/router"
import { queryClient } from "pages/_app"
import { useEffect, useRef, useState } from "react"
import { toast } from "react-hot-toast"
import { useSelector } from "react-redux"
import { chatService } from "services/chat.service"
import { PAGE_SIZE, QUERY_KEYS } from "shared/constant/constant"
import { combineName, getDataPaginate } from "shared/helpers/helper"
import { RootState } from "store/store"
import { Message, ProfileChat } from "types/Chat"
import ButtonScroll from "./ButtonScroll"
import { HeaderBox } from "./HeaderBox"
import InputMessage from "./InputMessage"
import TextMessage from "./TextMessage"
import VideoCall from "./VideoCall"
import useConfirm from "context/ComfirmContext"
import Tag from "components/Common/Tag"
import colorsProvider from "shared/theme/colors"
import { useSignalRNotification } from "context/SignalRNotification"

interface IProps {
  toggleInfo: () => void
  userId: string
  isClose: boolean
}
const MessageBox = ({ toggleInfo, userId: id, isClose }: IProps) => {
  const [userId, setUserId] = useState(id)
  const refScroll = useRef<HTMLDivElement | null>(null)
  const [isBottom, setIsBottom] = useState(false)
  const [textInput, setTextInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const authorProfile = useSimpleProfile(userId)
  const confirm = useConfirm()
  const signalRNotification = useSignalRNotification()
  const { answerCall, callUser, call, callAccepted, signalRConnection } =
    useSignalRCall()
  const { connectionMessage, isConnected } = useSignalRMessage()
  const auth = useSelector((state: RootState) => state.auth)
  const { query } = useRouter()
  const roomId = query.roomId as string
  const createMessage = useCreateChatMessage()
  const closeRoom = useMutation(chatService.closeRoom)
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
            queryClient.refetchQueries([QUERY_KEYS.CHAT.ROOM])
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
          queryClient.refetchQueries([QUERY_KEYS.CHAT.ROOM])
        }
      })
      connectionMessage.current?.on("NewAnswer", (profile: ProfileChat) => {
        if (profile) {
          setUserId(profile.userID)
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
  }, [roomId, isConnected, signalRConnection, userId])
  const handleClose = async () => {
    if (confirm) {
      const choice = await confirm({
        title: "Close Room",
        content: "Are you sure you want to close this room?"
      })
      if (choice) {
        closeRoom.mutate(roomId, {
          onSuccess: (data) => {
            toast.success("Close room successfuly")
            queryClient.refetchQueries([QUERY_KEYS.CHAT.ROOM])
          },
          onError: (data: any) => {
            toast.error(data?.response?.data?.message || "Close room fail")
          }
        })
      }
    }
  }
  const myProfile = roomData.data?.pages[0]?.data.data.myProfile
  return (
    <div className="flex flex-col w-full border border-gray-200 border-solid border-y-0 ">
      <HeaderBox
        handleClose={handleClose}
        author={authorProfile.data?.data}
        isLoading={authorProfile.isLoading}
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
          <div className="flex items-center justify-center w-full">
            <div className="flex items-center p-3 my-2 rounded-lg shadow-[0_3px_10px_rgb(0,0,0,0.2)] gap-x-2 w-fit mx-atuo ">
              <div className="flex items-center justify-center p-2 text-black rounded-full animate-bounce opacity-40">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#000000"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.25 9.75v-4.5m0 4.5h4.5m-4.5 0l6-6m-3 18c-8.284 0-15-6.716-15-15V4.5A2.25 2.25 0 014.5 2.25h1.372c.516 0 .966.351 1.091.852l1.106 4.423c.11.44-.054.902-.417 1.173l-1.293.97a1.062 1.062 0 00-.38 1.21 12.035 12.035 0 007.143 7.143c.441.162.928-.004 1.21-.38l.97-1.293a1.125 1.125 0 011.173-.417l4.423 1.106c.5.125.852.575.852 1.091V19.5a2.25 2.25 0 01-2.25 2.25h-2.25z"
                  />
                </svg>
              </div>
              <div className="flex flex-col mr-9">
                <h3 className="font-medium text-h1">Incoming call...</h3>
                <span className="text-sm text-disable">Not answered yet</span>
              </div>
              {/* <h1>{call.name} is calling:</h1> */}
              <div className="flex items-center gap-x-2">
                <button
                  className="flex items-center justify-center px-3 py-2 text-sm text-white border-none rounded-md outline-none cursor-pointer bg-error"
                  onClick={() => answerCall("reject")}
                >
                  Reject
                </button>
                <button
                  className="flex items-center justify-center px-3 py-2 text-sm text-white border-none rounded-md outline-none cursor-pointer bg-success"
                  onClick={() => answerCall("accept")}
                >
                  Accept
                </button>
              </div>
            </div>
          </div>
        )}

      <VideoCall
        userProfile={authorProfile.data?.data}
        otherProfile={roomData.data?.pages[0]?.data.data.otherProfile}
      />

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
                  isImage={mess.isImage}
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
                isImage={mess.isImage}
                avatar={
                  mess.userID === auth.user.userId
                    ? authorProfile.data?.data.avatar
                    : roomData.data?.pages[0]?.data.data.otherProfile.avatar
                }
                message={mess}
                key={mess.chatMessageID}
                kind={mess.userID === auth.user.userId ? "owner" : "other"}
              />
            ))}
        </div>
      </div>
      {isClose ? (
        <Tag color={colorsProvider.success} className="mx-auto my-3">
          The room has ended or wait for the connection person to reopen the
          room
        </Tag>
      ) : (
        <InputMessage
          value={textInput}
          onChange={(value) => setTextInput(value)}
          isLoading={createMessage.isLoading}
          onCreate={handleCreateMessage}
        />
      )}
    </div>
  )
}

export default MessageBox
