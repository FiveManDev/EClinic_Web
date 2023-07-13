import ImageCustom from "components/Common/ImageCustom"
import ModalPrimary from "components/Common/Modal/ModalPrimary"
import Tag from "components/Common/Tag"
import CustomButton from "components/User/Button"
import { useGetDoctorProfilesByIdQuery } from "hooks/query/profile/useProfile"
import { useRouter } from "next/router"
import { OverlayScrollbarsComponent } from "overlayscrollbars-react"
import { useEffect, useState } from "react"
import { combineName } from "shared/helpers/helper"
import colorsProvider from "shared/theme/colors"
import About from "./About"
import { StepOne } from "./step/StepOne"
import StepThree from "./step/StepThree"
import { StepTwo } from "./step/StepTwo"
import { DetailDoctorModalWrapper } from "./styles"
import { useAppDispatch } from "store/store"
import { bookingDoctorSlice } from "store/module/booking/doctor/booking-doctor-slice"
const DetailDoctor = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { data, isLoading } = useGetDoctorProfilesByIdQuery(
    router.query.id! as string
  )
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
  useEffect(() => {
    if (data?.isSuccess && data.data) {
      dispatch(bookingDoctorSlice.actions.doctorChange(data.data))
    }
  }, [data?.data])
  if (isLoading) {
    return <p>Loading</p>
  }
  if (!data?.data) {
    return null
  }
  return (
    <div className="flex flex-col">
      <ModalPrimary
        show={showModal}
        onClose={() => {
          dispatch(bookingDoctorSlice.actions.resetBookingDoctor())
          setShowModal(false)
        }}
      >
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
              <StepThree onBack={() => onChangeStep(2)} />
            )}
          </DetailDoctorModalWrapper>
        </OverlayScrollbarsComponent>

        <div className="footer ">
          <div className="flex justify-between px-6">
            <CustomButton kind="tertiary" onClick={() => setShowModal(false)}>
              Hủy
            </CustomButton>
            {currentStep !== 3 && (
              <CustomButton
                kind="primary"
                onClick={() => onChangeStep(currentStep + 1)}
              >
                Tiếp tục
              </CustomButton>
            )}
          </div>
        </div>
      </ModalPrimary>
      <div className="grid grid-cols-3 gap-8">
        <div className="flex flex-col items-center justify-center col-span-1 gap-y-5 background-primary h-fit">
          <div className="flex flex-col items-center justify-center gap-y-2">
            <div className="relative w-[168px] h-[168px]">
              <ImageCustom
                fill
                src={data?.data.avatar || "/images/sample.png"}
                alt="avatar-image"
                className="object-cover"
              />
            </div>
            <h1 className="text-lg font-semibold">
              {data.data.title +
                "." +
                combineName(data?.data.firstName, data?.data.lastName)}
            </h1>
            <Tag
              color={colorsProvider.pending}
              className="px-4 py-2 font-semibold rounded-lg"
            >
              {"$ " + data.data.price}
            </Tag>
            <Tag
              color={colorsProvider.success}
              className="px-4 py-2 font-semibold rounded-lg"
            >
              <div className="flex items-center gap-x-1">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9zm3.75 11.625a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                    />
                  </svg>
                </span>
                <span>Sản phụ khoa</span>
              </div>
            </Tag>
          </div>
          <p className="text-sm leading-normal text-center text-disable">
            {data.data.content}
          </p>
          <div className="flex items-center gap-x-2">
            <span className="text-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75"
                />
              </svg>
            </span>
            <h4 className="font-medium text-black2">250 (booking)</h4>
          </div>
          <CustomButton
            kind="primary"
            className="w-[190px] rounded-xl"
            onClick={() => setShowModal(true)}
          >
            Booking
          </CustomButton>
        </div>
        <div className="col-span-2 background-primary">
          <About data={data.data.description} />
          {/* {tab === 1 ? (
            <About />
          ) : (
            <div className="flex flex-col gap-y-5">
              <Feedback />
            </div>
          )} */}
        </div>
      </div>
    </div>
  )
}
export default DetailDoctor
