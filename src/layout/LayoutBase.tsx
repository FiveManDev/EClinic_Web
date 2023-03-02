import React from "react"
import { Toaster } from "react-hot-toast"

const LayoutBase = ({ children }: React.PropsWithChildren) => {
  return (
    <>
      <Toaster />
      <>{children}</>
    </>
  )
}

export default LayoutBase
