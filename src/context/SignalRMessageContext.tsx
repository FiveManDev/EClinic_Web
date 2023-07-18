import React, { PropsWithChildren, useContext, useEffect, useRef } from "react"
import * as signalR from "@microsoft/signalr"
import { token } from "shared/utils/token"

interface ISignalRContext {
  connectionMessage: React.MutableRefObject<signalR.HubConnection | null>
}

const SignalMessageRContext = React.createContext<ISignalRContext | null>(null)

const SignalRMessageContextProvider = ({ children }: PropsWithChildren<{}>) => {
  const connectionMessage = useRef<signalR.HubConnection | null>(null)

  useEffect(() => {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl(`https://muddyworld.xyz:8686/message`, {
        accessTokenFactory: () => token.getToken().access_token || ""
      })
      .withAutomaticReconnect()
      .build()

    connectionMessage.current = connection

    return () => {
      connectionMessage.current?.stop()
    }
  }, [])

  return (
    <SignalMessageRContext.Provider value={{ connectionMessage }}>
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
