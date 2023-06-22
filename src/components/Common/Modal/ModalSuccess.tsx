import CustomButton from "components/User/Button"
import { OverlayScrollbarsComponent } from "overlayscrollbars-react"
import React from "react"
import ModalPrimary from "./ModalPrimary"
import ImageCustom from "../ImageCustom"

interface ModalSuccessProps {
  isSuccess: boolean
  setIsSuccess: (value: boolean) => void
  children: React.ReactNode
}

const ModalSuccess: React.FC<ModalSuccessProps> = ({
  isSuccess,
  setIsSuccess,
  children
}) => {
  return (
    <ModalPrimary
      show={isSuccess}
      onClose={() => setIsSuccess(false)}
      closeButton={false}
    >
      <OverlayScrollbarsComponent
        defer
        options={{ scrollbars: { autoHide: "scroll" } }}
      >
        <div className="flex flex-col  max-w-[560px] w-full p-6">
          <div className="relative w-full h-[260px]">
            <ImageCustom
              priority
              src={"/images/success-image.png"}
              alt="img-success"
              fill
              className="object-cover"
            />
          </div>
          {children}
        </div>
      </OverlayScrollbarsComponent>
    </ModalPrimary>
  )
}

export default ModalSuccess
