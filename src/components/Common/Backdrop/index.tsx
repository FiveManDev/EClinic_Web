import React, { PropsWithChildren } from "react"
import { motion } from "framer-motion"

interface Props extends PropsWithChildren {
  onClick: () => void
}
const Backdrop = ({ children, onClick }: Props) => {
  return (
    <motion.div
      onClick={onClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full backdrop-brightness-50"
    >
      {children}
    </motion.div>
  )
}

export default Backdrop
