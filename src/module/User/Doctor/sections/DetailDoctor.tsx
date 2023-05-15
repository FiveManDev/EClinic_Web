import ImageCustom from "components/Common/ImageCustom"
import ModalPrimary from "components/Common/Modal/ModalPrimary"
import CustomButton from "components/User/Button"
import { OverlayScrollbarsComponent } from "overlayscrollbars-react"
import { useEffect, useState } from "react"
import About from "./About"
import InfoGeneral from "./InfoGeneral"
import { StepOne } from "./step/StepOne"
import { StepTwo } from "./step/StepTwo"
import { DetailDoctorModalWrapper } from "./styles"

const DetailDoctor = () => {
  const [showModal, setShowModal] = useState(false)
  const [currentStep, setCurrentStep] = useState<number>(1)
  const onChangeStep = (step: typeof currentStep) => {
    setCurrentStep(step)
  }
  useEffect(() => {
    if (showModal === false) {
      setCurrentStep(1)
    }
  }, [showModal])
  return (
    <div className="flex flex-col">
      <ModalPrimary show={showModal} onClose={() => setShowModal(false)}>
        <OverlayScrollbarsComponent
          defer
          options={{ scrollbars: { autoHide: "scroll" } }}
        >
          <DetailDoctorModalWrapper>
            {currentStep === 1 ? (
              <StepOne
                onCancel={() => setShowModal(false)}
                onContinue={() => onChangeStep(2)}
              />
            ) : currentStep === 2 ? (
              <StepTwo
                onCancel={() => setShowModal(false)}
                onBack={() => onChangeStep(1)}
                onContinue={() => onChangeStep(currentStep)}
              />
            ) : (
              ""
            )}
          </DetailDoctorModalWrapper>
        </OverlayScrollbarsComponent>

        <div className="footer">
          <div className="flex justify-between px-6">
            <CustomButton kind="tertiary" onClick={() => setShowModal(false)}>
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
      </ModalPrimary>
      <div className="flex flex-col gap-4 p-6 bg-opacity-10 lg:rounded-lg bg-primary">
        <div className="flex items-center justify-center gap-4">
          <div className="relative object-cover mx-auto overflow-hidden border border-solid rounded-full w-36 h-36 ring-1 ring-slate-100 border-primary">
            <ImageCustom
              fill
              src={"/images/sample.png"}
              alt="avatar-image"
              className="p-1 rounded-full"
            />
          </div>
          <div className="flex flex-row items-center justify-between flex-1 gap-4">
            <div className="flex-1">
              <div className="text-gray-800">
                <h1 className="text-4xl font-semibold leading-6 text-primary">
                  Nguyễn Văn A
                </h1>
                <p className="mt-4 text-xl font-light text-gray-600">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-x-3">
              <CustomButton
                kind="primary"
                className="w-[190px] rounded-xl"
                onClick={() => setShowModal(true)}
              >
                Booking
              </CustomButton>
              <CustomButton
                kind="secondary"
                className="w-[220px] rounded-xl bg-white border-none"
              >
                Theo dõi
              </CustomButton>
            </div>
          </div>
        </div>
        <div className="bg-gray-300 h-[2px] w-full"></div>
        <div className="flex items-center space-x-10 text-lg uppercase">
          <span className="text-gray-700 cursor-pointer ">Về tôi</span>
          <span className="text-gray-400 cursor-pointer ">Đánh giá</span>
        </div>
      </div>
      <div className="grid grid-cols-11 gap-4 p-6 bg-white">
        <div className="col-span-7">
          <About />
        </div>
        <div className="col-span-4">
          <InfoGeneral />
        </div>
      </div>
    </div>
  )
}

export default DetailDoctor
