// import {
//   PropsWithChildren,
//   createContext,
//   useEffect,
//   useRef,
//   useState
// } from "react"
// import * as signalR from "@microsoft/signalr"
// import { token } from "shared/utils/token"
// import { CALL_STATUS } from "shared/constant/constant"
// import Peer from "simple-peer"

// interface Props extends PropsWithChildren {
//   peerId: string
//   roomId: string
// }

// const SignalContext = createContext()

// const VideoContextProvider = ({ peerId, roomId, children }: Props) => {
//   const [stream, setStream] = useState<MediaStream>()
//   const [callAccepted, setCallAccepted] = useState(false)

//   const connectionRef = useRef<Peer.Instance>()
//   const myVideo = useRef<HTMLVideoElement>()
//   const userVideo = useRef<HTMLVideoElement>()

//   useEffect(() => {
//     navigator.mediaDevices
//       .getUserMedia({ video: true, audio: true })
//       .then((currentStream) => {
//         setStream(currentStream)

//         myVideo.current!.srcObject = currentStream
//       })
//     const connection = new signalR.HubConnectionBuilder()
//       .withUrl(`https://muddyworld.xyz:8686/message`, {
//         accessTokenFactory: () => token.getToken().access_token || ""
//       })
//       .withAutomaticReconnect()
//       .build()

//     connection
//       .start()
//       .then(() => {
//         connection
//           .invoke("JoinCall", peerId, roomId)
//           .then(() => {})
//           .catch((err) => {
//             return console.error(err.toString())
//           })
//       })
//       .catch((err) => {
//         return console.error(err.toString())
//       })
//     connection!.on("Response", (message: any, status) => {
//       if (status === CALL_STATUS.ENDCALL) {
//         // handleCloseVideoCall()
//       }
//     })
//     return () => {
//       connection.stop()
//     }
//   }, [])
//   const callUser = (id: string) => {
//     const peer = new Peer({ initiator: true, trickle: false, stream })

//     peer.on("signal", (data) => {
//       // socket.emit('callUser', { userToCall: id, signalData: data, from: me, name });
//     })

//     peer.on("stream", (currentStream) => {
//       userVideo.current!.srcObject = currentStream
//     })

//     // socket.on('callAccepted', (signal) => {
//     //   setCallAccepted(true);

//     //   peer.signal(signal);
//     // });
//     connectionRef.current = peer
//   }
//   const answerCall = () => {
//     setCallAccepted(true)

//     const peer = new Peer({ initiator: false, trickle: false, stream })

//     peer.on("signal", (data) => {
//       socket.emit("answerCall", { signal: data, to: call.from })
//     })

//     peer.on("stream", (currentStream) => {
//       userVideo.current!.srcObject = currentStream
//     })

//     peer.signal(call.signal)

//     connectionRef.current = peer
//   }
//   return <SignalContext.Provider>{children}</SignalContext.Provider>
// }
