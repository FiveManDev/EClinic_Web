import { Chip } from "@mui/material"
import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { Option, SelectCustom } from "components/Common/Select/SelectCustom"
const optionsConnect = [
  { label: "Trực tiếp", value: "1" },
  { label: "Online", value: "2" }
]
const optionsPayment = [
  { label: "Momo", value: "1" },
  { label: "Stripe", value: "2" }
]
export type PropsStep = {
  onContinue: () => void
  onCancel: () => void
  onBack?: () => void
}
export const StepOne = ({ onCancel, onContinue }: PropsStep) => {
  const handleSelectTypeConnect = (option: Option) => {}
  return (
    <>
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
              <span className="text-red-500">Màu đỏ</span> là đã có người chọn
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
      <div className="grid grid-cols-2 mt-6 gap-x-3 h-36">
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
    </>
  )
}
