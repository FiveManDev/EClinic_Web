import * as signalR from "@microsoft/signalr"
import { useEffect, useRef, useState } from "react"
import { token } from "shared/utils/token"
import Peer from "simple-peer"
const useVideoCall = () => {
  const signalRConnection = useRef<signalR.HubConnection | null>(null)
  const connectionRef = useRef<Peer.Instance | null>(null)
  const [callAccepted, setCallAccepted] = useState(false)
  const [callEnded, setCallEnded] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
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

    setIsConnected(true)
    signalRConnection.current = connection
    signalRConnection.current.on("CallUser", (signal, data) => {
      const newData = JSON.parse(data)
      setCall({
        isReceivingCall: true,
        roomId: newData.roomId,
        name: newData.name,
        signal: JSON.parse(signal)
      })
    })
    return () => {
      signalRConnection.current?.stop()
    }
  }, [])
  const callUser = (roomId: string, userName: string) => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then((currentStream) => {
        setStream(currentStream)
        const peer = new Peer({
          initiator: true,
          trickle: false,
          stream: currentStream
        })
        myVideo.current!.srcObject = currentStream
        peer.on("signal", (signal) => {
          const data = {
            roomId,
            name: userName
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
          userVideo.current!.srcObject = currentStream
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
    const peer = new Peer({ initiator: false, trickle: false, stream })
    peer.on("signal", (signal) => {
      signalRConnection.current!.invoke(
        "AnswerCall",
        JSON.stringify(signal),
        JSON.stringify(call),
        call.roomId
      )
    })
    peer.on("stream", (currentStream) => {
      userVideo.current!.srcObject = currentStream
    })
    peer.signal(call.signal)
    connectionRef.current! = peer
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then((currentStream) => {
        myVideo.current!.srcObject = currentStream
        connectionRef.current! = peer
      })
  }
  const leaveCall = () => {
    setCallEnded(true)
    connectionRef.current!.destroy()
  }
  return {
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
    isConnected
  }
}

export default useVideoCall
