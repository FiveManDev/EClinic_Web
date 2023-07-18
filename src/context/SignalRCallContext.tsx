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
}

interface ISignalRContext {
  signalRConnection: React.MutableRefObject<signalR.HubConnection | null>
  callAccepted: boolean
  callEnded: boolean
  callUser: (roomId: string) => void
  answerCall: () => void
  leaveCall: () => void
  myVideo: React.MutableRefObject<HTMLVideoElement | null>
  userVideo: React.MutableRefObject<HTMLVideoElement | null>
  call: ICall
  stream?: MediaStream
}

const SignalCallRContext = React.createContext<ISignalRContext | null>(null)

const SignalRCallContextProvider = ({ children }: PropsWithChildren<{}>) => {
  const signalRConnection = useRef<signalR.HubConnection | null>(null)
  const connectionRef = useRef<Peer.Instance | null>(null)
  const [callAccepted, setCallAccepted] = useState(false)
  const [callEnded, setCallEnded] = useState(false)

  const [call, setCall] = useState({
    isReceivingCall: false,
    roomId: "",
    name: "",
    signal: ""
  })
  const [stream, setStream] = useState<MediaStream>()
  const myVideo = useRef<HTMLVideoElement | null>(null)
  const userVideo = useRef<HTMLVideoElement | null>(null)
  useEffect(() => {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl(`https://muddyworld.xyz:8686/call`, {
        accessTokenFactory: () => token.getToken().access_token || ""
      })
      .withAutomaticReconnect()
      .build()

    signalRConnection.current = connection

    signalRConnection.current.on("callUser", (data) => {
      setCall({
        isReceivingCall: true,
        roomId: data.roomId,
        name: data.from,
        signal: data.signal
      })
    })
    return () => {
      signalRConnection.current?.stop()
    }
  }, [])
  const callUser = (roomId: string) => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream)
        const peer = new Peer({
          initiator: true,
          trickle: false,
          stream: currentStream
        })
        myVideo.current!.srcObject = currentStream
        peer.on("signal", (data) => {
          signalRConnection
            .current!.invoke("CallUser", data, "", roomId)
            .catch((err) => {
              return console.error(err.toString())
            })
        })

        peer.on("stream", (currentStream) => {
          setCallAccepted(true)
          userVideo.current!.srcObject = currentStream
        })

        signalRConnection.current?.on("AnswerCall", (signal) => {
          setCallAccepted(true)
          peer.signal(signal)
        })
        connectionRef.current! = peer
      })
  }
  const answerCall = () => {
    setCallAccepted(true)
    const peer = new Peer({ initiator: false, trickle: false, stream })
    peer.on("signal", (data) => {
      // socket.emit('answerCall', { signal: data, to: call.from });
      signalRConnection.current!.invoke("AnswerCall", data, call)
    })
    peer.on("stream", (currentStream) => {
      userVideo.current!.srcObject = currentStream
    })
    peer.signal(call.signal)
    connectionRef.current! = peer
  }
  const leaveCall = () => {
    setCallEnded(true)

    connectionRef.current!.destroy()

    window.location.reload()
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
        stream
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
