import * as signalR from "@microsoft/signalr"
import React, {
  PropsWithChildren,
  useContext,
  useEffect,
  useRef,
  useState
} from "react"
import { token } from "shared/utils/token"
import Peer from "simple-peer"
interface ICall {
  isReceivingCall: boolean
  roomId: string
  name: string
  signal: string
  userId: string
}

interface ISignalRContext {
  signalRConnection: React.MutableRefObject<signalR.HubConnection | null>
  callAccepted: boolean
  callEnded: boolean
  // eslint-disable-next-line no-unused-vars
  callUser: (roomId: string, userName: string, userId: string) => void
  answerCall: () => void
  leaveCall: (roomId: string) => void
  myVideo: React.MutableRefObject<HTMLVideoElement | null>
  userVideo: React.MutableRefObject<HTMLVideoElement | null>
  call: ICall
  stream?: MediaStream
  userStream?: MediaStream
  isConnected: boolean
}

const SignalCallRContext = React.createContext<ISignalRContext | null>(null)

const SignalRCallContextProvider = ({ children }: PropsWithChildren<{}>) => {
  const signalRConnection = useRef<signalR.HubConnection | null>(null)
  const connectionRef = useRef<Peer.Instance | null>(null)
  const [callAccepted, setCallAccepted] = useState(false)
  const [callEnded, setCallEnded] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [call, setCall] = useState({
    isReceivingCall: false,
    roomId: "",
    name: "",
    signal: "",
    userId: ""
  })
  const [stream, setStream] = useState<MediaStream>()
  const streamRef = useRef<MediaStream>()
  const userStreamRef = useRef<MediaStream>()
  const [userStream, setUserStream] = useState<MediaStream>()
  const myVideo = useRef<HTMLVideoElement | null>(null)
  const userVideo = useRef<HTMLVideoElement | null>(null)
  useEffect(() => {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl(`https://muddyworld.xyz:8686/call`, {
        accessTokenFactory: () => token.getToken().access_token || ""
      })
      .withAutomaticReconnect()
      .build()

    setIsConnected(true)
    signalRConnection.current = connection
    signalRConnection.current.on("CallUser", (signal, data) => {
      const newData = JSON.parse(data)
      setCall({
        isReceivingCall: true,
        roomId: newData.roomId,
        name: newData.name,
        signal: JSON.parse(signal),
        userId: newData.userId
      })
    })
    signalRConnection.current.on("Disconnect", () => {
      console.log("hiihihiih")
      streamRef.current!.getTracks().forEach((track) => track.stop())
      userStreamRef.current!.getTracks().forEach((track) => track.stop())
      closeConnection()
    })
    return () => {
      signalRConnection.current?.stop()
    }
  }, [])
  const callUser = (roomId: string, userName: string, userId: string) => {
    setCallEnded(false)
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream)
        streamRef.current = currentStream
        const peer = new Peer({
          initiator: true,
          trickle: false,
          stream: currentStream
        })
        peer.on("signal", (signal) => {
          const data = {
            roomId,
            name: userName,
            userId
          }
          signalRConnection
            .current!.invoke(
              "CallUser",
              JSON.stringify(signal),
              JSON.stringify(data),
              roomId
            )
            .catch((err) => {
              console.log("peer.on ~ err:", err)
            })
        })

        peer.on("stream", (currentStream) => {
          setCallAccepted(true)
          setUserStream(currentStream)
          userStreamRef.current = currentStream
        })

        signalRConnection.current?.on("AnswerCall", (signal) => {
          const newSignal = JSON.parse(signal)
          setCallAccepted(true)
          peer.signal(newSignal)
        })
        connectionRef.current! = peer
      })
  }
  const answerCall = () => {
    setCallAccepted(true)

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream)
        const peer = new Peer({
          initiator: false,
          trickle: false,
          stream: currentStream
        })
        streamRef.current = currentStream
        peer.on("signal", (signal) => {
          signalRConnection.current!.invoke(
            "AnswerCall",
            JSON.stringify(signal),
            JSON.stringify(call),
            call.roomId
          )
        })
        peer.on("stream", (currentStream) => {
          setUserStream(currentStream)
          userStreamRef.current = currentStream
        })
        peer.signal(call.signal)
        connectionRef.current! = peer
      })
  }
  const leaveCall = (roomId: string) => {
    signalRConnection.current!.invoke("Disconnect", roomId).catch((err) => {
      console.log("Disconnect error:", err)
    })
  }
  const closeConnection = () => {
    // End the call
    setCallEnded(true)

    // Clean up the Peer instance
    if (connectionRef.current) {
      connectionRef.current.destroy()
      connectionRef.current = null
    }
  }
  return (
    <SignalCallRContext.Provider
      value={{
        signalRConnection,
        answerCall,
        call,
        callAccepted,
        callEnded,
        callUser,
        leaveCall,
        myVideo,
        userVideo,
        stream,
        userStream,
        isConnected
      }}
    >
      {children}
    </SignalCallRContext.Provider>
  )
}

export const useSignalRCall = () => {
  const context = useContext(SignalCallRContext)
  if (context === null) {
    throw new Error(
      "useSignalR must be used within a SignalRCallContextProvider"
    )
  }
  return context
}

export { SignalRCallContextProvider }
