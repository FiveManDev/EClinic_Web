import React, { useState, useEffect, useRef } from "react"
import { PortalCustom } from "../Portal/PortalCustom"
import classNames from "classnames"
import { HiXMark } from "react-icons/hi2"
import { ModalPrimaryWrapper } from "./ModalPrimary.styles"

interface ModalProps {
  show: boolean
  onClose: () => void
  children: React.ReactNode
}

const ModalPrimary = ({ show, onClose, children }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setIsOpen(show)
  }, [show])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [onClose])

  const handleTransitionEnd = () => {
    if (!isOpen) {
      onClose()
    }
  }

  return (
    <PortalCustom>
      <ModalPrimaryWrapper
        className={classNames(
          "modal fixed top-0 left-0 w-full h-full flex items-center justify-center z-50",
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
        onTransitionEnd={handleTransitionEnd}
      >
        <div className="absolute w-full h-full bg-gray-900 opacity-50 modal-overlay"></div>
        <div
          className={classNames(
            "relative bg-white w-fit mx-auto shadow-lg z-50  transition-opacity transition-scale duration-300 rounded-[20px]",
            isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95"
          )}
          ref={modalRef}
        >
          <div className="absolute top-0 right-0 translate-x-1/3 -translate-y-1/3 z-20 h-[46px] w-[46px] rounded-full p-1 bg-white cursor-pointer">
            <button
              onClick={onClose}
              className="bg-[#44444F] w-full h-full flex items-center justify-center border-none outline-none rounded-full cursor-pointer hover:bg-opacity-90 transition-all"
            >
              <HiXMark className="text-lg text-white" />
            </button>
          </div>
          {children}
        </div>
      </ModalPrimaryWrapper>
    </PortalCustom>
  )
}

export default ModalPrimary
