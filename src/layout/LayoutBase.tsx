import { message, notification } from "antd"
import React from "react"

const LayoutBase = ({ children }: React.PropsWithChildren) => {
  const [_, contextNotiHolder] = notification.useNotification()
  const [__, contextMessageHolder] = message.useMessage()
  return (
    <>
      {contextMessageHolder}
      {contextNotiHolder}
      <>{children}</>
    </>
  )
}

export default LayoutBase
