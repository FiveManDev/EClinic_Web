import React, { PropsWithChildren, useContext, useEffect, useRef } from "react"
import * as signalR from "@microsoft/signalr"
import { token } from "shared/utils/token"

interface ISignalRContext {
  connectionMessage: React.MutableRefObject<signalR.HubConnection | null>
  isConnected: boolean
}

const SignalMessageRContext = React.createContext<ISignalRContext | null>(null)

const SignalRMessageContextProvider = ({ children }: PropsWithChildren<{}>) => {
  const connectionMessage = useRef<signalR.HubConnection | null>(null)
  const [isConnected, setIsConnected] = React.useState(false)
  useEffect(() => {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl(`https://muddyworld.xyz:8686/message`, {
        accessTokenFactory: () => token.getToken().access_token || ""
      })
      .withAutomaticReconnect()
      .build()
    setIsConnected(true)
    connectionMessage.current = connection

    return () => {
      connectionMessage.current?.stop()
    }
  }, [])

  return (
    <SignalMessageRContext.Provider value={{ connectionMessage, isConnected }}>
      {children}
    </SignalMessageRContext.Provider>
  )
}

export const useSignalRMessage = () => {
  const context = useContext(SignalMessageRContext)
  if (context === null) {
    throw new Error("useSignalR must be used within a SignalRContextProvider")
  }
  return context
}

export { SignalRMessageContextProvider }
