import * as signalR from "@microsoft/signalr"
import React, { PropsWithChildren, useContext, useEffect, useRef } from "react"

interface ISignalRContext {
  connectionNotification: React.MutableRefObject<signalR.HubConnection | null>
  isConnected: boolean
}

const SignalNotificationRContext = React.createContext<ISignalRContext | null>(
  null
)

const SignalRNotificationContextProvider = ({
  children
}: PropsWithChildren<{}>) => {
  const connectionNotification = useRef<signalR.HubConnection | null>(null)
  const [isConnected, setIsConnected] = React.useState(false)
  useEffect(() => {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl(
        `${process.env.NEXT_PUBLIC_API_MAIN_URL}:${process.env.NEXT_PUBLIC_API_URL_PORT_SIGNALR}/notification`
      )
      .withAutomaticReconnect()
      .build()
    setIsConnected(true)
    connectionNotification.current = connection
    connection!.start()
    connection.on("Response", (profile, chat) => {
      console.log("connection.on ~ chat:", chat)
      console.log("connection.on ~ profile:", profile)
    })
    return () => {
      connection?.stop()
    }
  }, [])

  return (
    <SignalNotificationRContext.Provider
      value={{ connectionNotification, isConnected }}
    >
      {children}
    </SignalNotificationRContext.Provider>
  )
}

export const useSignalRNotification = () => {
  const context = useContext(SignalNotificationRContext)
  if (context === null) {
    return null
  }
  return context
}

export { SignalRNotificationContextProvider }
