import ModalPrimary from "components/Common/Modal/ModalPrimary"
import CustomButton from "components/User/Button"
import { DetailDoctorModalWrapper } from "module/User/Doctor/sections/styles"
import { OverlayScrollbarsComponent } from "overlayscrollbars-react"
import React, { useState } from "react"
import { StepOne } from "./StepOne"
import classNames from "classnames"
import StepTwo from "./StepTwo"
interface Props {
  show: boolean
  onClose: () => void
}

const BookingModel = ({ onClose, show }: Props) => {
  const [currentStep, setCurrentStep] = useState<number>(1)
  const onChangeStep = (step: typeof currentStep) => {
    setCurrentStep(step)
  }
  return (
    <>
      <ModalPrimary show={show} onClose={() => onClose()}>
        <OverlayScrollbarsComponent
          defer
          options={{ scrollbars: { autoHide: "scroll" } }}
        >
          <DetailDoctorModalWrapper
            className={classNames(
              currentStep && "!w-fit",
              currentStep === 2 && "max-w-[500px]"
            )}
          >
            {currentStep === 1 ? (
              <StepOne
                onCancel={() => onClose()}
                onContinue={() => onChangeStep(2)}
              />
            ) : (
              <StepTwo onBack={() => onChangeStep(1)} />
            )}
          </DetailDoctorModalWrapper>
        </OverlayScrollbarsComponent>

        {currentStep !== 2 && (
          <div className="footer ">
            <div className="flex justify-between px-6">
              <CustomButton kind="tertiary" onClick={() => onClose()}>
                Hủy
              </CustomButton>
              <CustomButton
                kind="primary"
                onClick={() => onChangeStep(currentStep + 1)}
              >
                Tiếp tục
              </CustomButton>
            </div>
          </div>
        )}
      </ModalPrimary>
    </>
  )
}

export default BookingModel
