import { IconButton, Tooltip } from "@mui/material"
import classNames from "classnames"
import Peer from "peerjs"
import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { headerSlice } from "store/module/header/header-slice"
import * as signalR from "@microsoft/signalr"
import { token } from "shared/utils/token"
import { roomIdChatSelector } from "store/module/chat/chat-selector"

const getNavigator = () => {
  const newNavigator: any = window.navigator
  var getUserMedia =
    newNavigator.getUserMedia ||
    newNavigator.webkitGetUserMedia ||
    newNavigator.mozGetUserMedia
  return getUserMedia
}

const VideoCall = () => {
  const roomId = useSelector(roomIdChatSelector)

  const [peerId, setPeerId] = useState("")
  const dispatch = useDispatch()

  const [remotePeerIdValue, setRemotePeerIdValue] = useState("")

  const [isFullScreen, setIsFullScreen] = useState(false)
  const currentUserVideoRef = useRef<HTMLVideoElement | null>(null)
  const remoteVideoRef = useRef<HTMLVideoElement | null>(null)
  const peerInstance = useRef<any>(null)
  const callRef = useRef<any>(null)
  const connnectionRef = useRef<signalR.HubConnection | null>(null)
  useEffect(() => {
    if (roomId) {
      const connection = new signalR.HubConnectionBuilder()
        .withUrl(`https://localhost:8686/message`, {
          accessTokenFactory: () => token.getToken().access_token || ""
        })
        .withAutomaticReconnect()
        .build()

      connnectionRef.current = connection
      connnectionRef.current
        .start()
        .then(function () {
          connection
            .invoke("JoinGroup", peerId)
            .then(() => {})
            .catch(function (err) {
              return console.error(err.toString())
            })
        })
        .catch(function (err) {
          return console.error(err.toString())
        })
    }
    connnectionRef.current!.on("Response", (message: any) => {})

    // Cleanup the connection on component unmount
    return () => {
      connnectionRef.current!.stop()
    }
  }, [peerId])

  useEffect(() => {
    const peer = new Peer()
    peer.on("open", (id) => {
      setPeerId(id)
    })

    peer.on("call", (call) => {
      const newUserMedia = getNavigator()

      newUserMedia({ video: true, audio: true }, (mediaStream: any) => {
        if (remoteVideoRef.current) {
          currentUserVideoRef.current!.srcObject = mediaStream
          currentUserVideoRef.current!.play()
        }
        call.answer(mediaStream)
        call.on("stream", function (remoteStream) {
          if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = remoteStream
            remoteVideoRef.current.play()
          }
        })
      })
      callRef.current = call
    })

    peerInstance.current = peer
  }, [])
  const call = (remotePeerId: any) => {
    const newUserMedia = getNavigator()
    newUserMedia({ video: true, audio: true }, (mediaStream: any) => {
      currentUserVideoRef.current!.srcObject = mediaStream
      currentUserVideoRef.current!.play()

      const call = peerInstance.current!.call(remotePeerId, mediaStream)
      call.on("stream", (remoteStream: any) => {
        remoteVideoRef.current!.srcObject = remoteStream
        remoteVideoRef.current!.play()
      })
      callRef.current = call
    })
  }
  const handleChangeSizeVideo = () => {
    dispatch(headerSlice.actions.onChangeZIndex(isFullScreen ? 20 : 0))
    setIsFullScreen(!isFullScreen)
  }
  const handleCloseVideoCall = () => {
    if (callRef.current) {
      callRef.current.close()
    }

    if (currentUserVideoRef.current) {
      const currentUserStream = currentUserVideoRef.current
        .srcObject as MediaStream
      if (currentUserStream) {
        const tracks = currentUserStream.getTracks()
        tracks.forEach((track) => track.stop())
      }
      currentUserVideoRef.current.srcObject = null
    }

    if (remoteVideoRef.current) {
      const remoteStream = remoteVideoRef.current.srcObject as MediaStream
      if (remoteStream) {
        const tracks = remoteStream.getTracks()
        tracks.forEach((track) => track.stop())
      }
      remoteVideoRef.current.srcObject = null
    }
  }
  return (
    <div className="p-4">
      <div
        className={classNames(
          "bg-black",
          isFullScreen
            ? "fixed h-screen w-screen right-0 bottom-0 z-50"
            : "relative w-full mx-auto overflow-hidden rounded-xl h-96"
        )}
      >
        <h1>Current user id is {peerId}</h1>
        <input
          type="text"
          value={remotePeerIdValue}
          onChange={(e) => setRemotePeerIdValue(e.target.value)}
        />
        <button onClick={() => call(remotePeerIdValue)}>Call</button>
        <Tooltip
          title="Full screen"
          placement="top"
          className="absolute top-0 left-0 z-50"
        >
          <IconButton onClick={() => handleChangeSizeVideo()}>
            <button className="flex items-center justify-center p-2 text-white border-none rounded-full outline-none cursor-pointer bg-gray80">
              <svg
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 16.6667H7.33333V20H9.33333V14.6667H4V16.6667ZM7.33333 7.33333H4V9.33333H9.33333V4H7.33333V7.33333ZM14.6667 20H16.6667V16.6667H20V14.6667H14.6667V20ZM16.6667 7.33333V4H14.6667V9.33333H20V7.33333H16.6667Z"
                  fill="white"
                />
              </svg>
            </button>
          </IconButton>
        </Tooltip>
        <video
          className="absolute top-0 right-0 z-50 object-cover w-32 h-40 overflow-hidden -translate-x-4 translate-y-4 rounded-xl"
          ref={remoteVideoRef}
        />
        <video
          className="object-contain w-full h-auto"
          ref={currentUserVideoRef}
        />
        <div className="absolute bottom-0 z-20 flex items-center justify-center w-full p-4 bg-white bg-opacity-20">
          <Tooltip title="End session" placement="top">
            <IconButton>
              <button className="flex items-center justify-center p-2 text-white border-none rounded-full outline-none cursor-pointer bg-gray80">
                <svg
                  width={18}
                  height={18}
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.429 6.03297L16.7147 4.05495V13.9451L12.429 11.967M2.14328 15.4286H11.5718C12.0452 15.4286 12.429 14.9858 12.429 14.4396V3.56044C12.429 3.01423 12.0452 2.57143 11.5718 2.57143H2.14328C1.66989 2.57143 1.28613 3.01423 1.28613 3.56044V14.4396C1.28613 14.9858 1.66989 15.4286 2.14328 15.4286Z"
                    stroke="white"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </IconButton>
          </Tooltip>
          <Tooltip title="End session" placement="top">
            <IconButton onClick={handleCloseVideoCall}>
              <button className="flex items-center justify-center p-3 text-white border-none rounded-md outline-none cursor-pointer bg-error">
                <svg
                  width={18}
                  height={18}
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.02742 11.6618L1.82648 10.5029C1.36554 10.0618 1.39497 9.29356 1.90027 8.88666C5.89753 5.02358 12.131 5.05138 16.1014 8.88856C16.6042 9.29313 16.6339 10.058 16.1759 10.5008L14.9726 11.6619C14.7798 11.8516 14.5223 11.9673 14.248 11.9875C13.4682 12.0449 11.9759 11.1258 11.5938 10.5566C11.2955 10.1123 11.4125 9.48714 11.413 8.98584C9.8398 8.56976 8.17854 8.57135 6.60448 8.99043C6.60397 9.49174 6.71971 10.1167 6.42046 10.5616C6.03659 11.1323 4.536 12.0587 3.75475 11.9971C3.47772 11.9752 3.21886 11.8559 3.02742 11.6618Z"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </IconButton>
          </Tooltip>
          <Tooltip title="Mic off" placement="top">
            <IconButton>
              <button className="flex items-center justify-center p-2 text-white border-none rounded-full outline-none cursor-pointer bg-gray80">
                <svg
                  width={18}
                  height={18}
                  viewBox="0 0 12 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.25 9C11.25 11.7614 8.89949 14 6 14M6 14C3.10051 14 0.75 11.7614 0.75 9M6 14V16.5M6 16.5H8.625M6 16.5H3.375M6 11.5C4.55025 11.5 3.375 10.3807 3.375 9V4C3.375 2.61929 4.55025 1.5 6 1.5C7.44975 1.5 8.625 2.61929 8.625 4V9C8.625 10.3807 7.44975 11.5 6 11.5Z"
                    stroke="white"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </IconButton>
          </Tooltip>
        </div>
      </div>
    </div>
  )
}

export default VideoCall
