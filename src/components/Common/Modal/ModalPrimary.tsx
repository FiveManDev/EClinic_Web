import styled from "@emotion/styled"
import classNames from "classnames"
import { motion, AnimatePresence } from "framer-motion"
import React from "react"
import { HiXMark } from "react-icons/hi2"
import Backdrop from "../Backdrop"
import { PortalCustom } from "../Portal/PortalCustom"
const ModalPrimaryWrapper = styled(motion.div)`
  .footer {
    padding: 20px 0;
    border-top: 0.5px solid #cccc;
  }
`
const dropIn = {
  hidden: {
    y: "-100vh",
    opacity: 0
  },
  visible: {
    y: "0",
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
      stiffness: 500
    }
  },
  exit: {
    y: "100vh",
    opacity: 0
  }
}
interface ModalProps {
  show: boolean
  onClose: () => void
  children: React.ReactNode
}

const ModalPrimary = ({ show, onClose, children }: ModalProps) => {
  return (
    <PortalCustom>
      <AnimatePresence initial={false} onExitComplete={() => null} mode="wait">
        {show && (
          <Backdrop onClick={onClose}>
            <ModalPrimaryWrapper
              onClick={(e) => e.stopPropagation()}
              variants={dropIn}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div
                className={classNames(
                  "relative bg-white w-fit mx-auto shadow-lg z-50  transition-opacity transition-scale duration-300 rounded-[20px]"
                )}
              >
                <div className="absolute top-0 right-0 translate-x-1/3 -translate-y-1/3 z-20 h-[46px] w-[46px] rounded-full p-1 bg-white cursor-pointer">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    onClick={onClose}
                    className="bg-[#44444F] w-full h-full flex items-center justify-center border-none outline-none rounded-full cursor-pointer hover:bg-opacity-90 transition-all"
                  >
                    <HiXMark className="text-lg text-white" />
                  </motion.button>
                </div>
                {children}
              </div>
            </ModalPrimaryWrapper>
          </Backdrop>
        )}
      </AnimatePresence>
    </PortalCustom>
  )
}

export default ModalPrimary