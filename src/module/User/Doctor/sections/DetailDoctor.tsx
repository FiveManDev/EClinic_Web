import { Chip } from "@mui/material"
import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import ImageCustom from "components/Common/ImageCustom"
import ModalPrimary from "components/Common/Modal/ModalPrimary"
import CustomButton from "components/User/Button"
import { useState } from "react"
import About from "./About"
import InfoGeneral from "./InfoGeneral"
import { DetailDoctorModalWrapper } from "./styles"
import { Option, SelectCustom } from "components/Common/Select/SelectCustom"
const optionsConnect = [
  { label: "Trực tiếp", value: "1" },
  { label: "Online", value: "2" }
]
const optionsPayment = [
  { label: "Momo", value: "1" },
  { label: "Stripe", value: "2" }
]
const DetailDoctor = () => {
  const [showModal, setShowModal] = useState(false)
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1)
  const handleSelectTypeConnect = (option: Option) => {
    console.log("handleSelectTypeConnect ~ option:", option)
  }
  return (
    <div className="flex flex-col">
      <ModalPrimary show={showModal} onClose={() => setShowModal(false)}>
        <DetailDoctorModalWrapper>
          <div className="flex justify-between my-8 ">
            <div className="flex flex-col gap-y-2">
              <h3 className="text-2xl text-h1">Đặt lịch cuộc hẹn</h3>
              <p className="font-light text-gray-500">
                Lựa chọn lịch hẹn và hình thức kết nối
              </p>
            </div>
            <div className="flex gap-x-2">
              <span>Lưu ý : </span>
              <ul className="space-y-2 font-light">
                <li>
                  <span className="text-gray-500">Màu xám</span> là rảnh
                </li>
                <li>
                  <span className="text-red-500">Màu đỏ</span> là đã có người
                  chọn
                </li>
                <li>
                  <span className="text-primary">Màu xanh dương</span> là bạn đã
                  chọn
                </li>
              </ul>
            </div>
          </div>
          <div className="flex gap-8">
            <div className=" modal-filed">
              <span className="label">Chọn ngày</span>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar showDaysOutsideCurrentMonth />
              </LocalizationProvider>
            </div>
            <div className="modal-filed">
              <span className="label">Chọn giờ</span>
              <div className="grid h-full grid-cols-3 gap-3 overflow-y-auto">
                {Array(20)
                  .fill(0)
                  .map((item, index) => (
                    <Chip
                      key={index}
                      variant="filled"
                      color="info"
                      className="rounded-md"
                      label={`0${index}:00 Sáng`}
                      clickable
                    />
                  ))}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 mt-6 gap-x-3">
            <div className="modal-filed">
              <span className="label">Hình thức kết nối</span>
              <SelectCustom
                placeholder="Chọn địa điểm"
                options={optionsConnect}
                onSelectOption={handleSelectTypeConnect}
              />
            </div>
            <div className="modal-filed">
              <span className="label">Phương thức thanh toán</span>
              <SelectCustom
                placeholder="Chọn phương thức thanh toán"
                options={optionsPayment}
                onSelectOption={handleSelectTypeConnect}
              />
            </div>
          </div>
          <div className="flex justify-between mt-6 ">
            <CustomButton kind="tertiary">Hủy</CustomButton>
            <CustomButton kind="primary">Tiếp tục</CustomButton>
          </div>
        </DetailDoctorModalWrapper>
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
