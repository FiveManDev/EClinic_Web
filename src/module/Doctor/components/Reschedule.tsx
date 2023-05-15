import { Chip } from "@mui/material"
import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { Option, SelectCustom } from "components/Common/Select/SelectCustom"
import { DetailDoctorModalWrapper } from "module/User/Doctor/sections/styles"
import React from "react"
const optionsConnect = [
  { label: "Trực tiếp", value: "1" },
  { label: "Online", value: "2" }
]
const Reschedule = () => {
  const handleSelectTypeConnect = (option: Option) => {}

  return (
    <DetailDoctorModalWrapper className="max-w-[505px] gap-y-6">
      <div className="flex flex-col gap-y-2">
        <h3 className="text-2xl text-h1">Đặt lịch cuộc hẹn</h3>
        <p className="font-light text-gray-500">
          Lựa chọn lịch hẹn và hình thức kết nối
        </p>
      </div>
      <div className="modal-filed max-w-[200px]">
        <span className="label">Hình thức kết nối</span>
        <SelectCustom
          placeholder="Chọn địa điểm"
          options={optionsConnect}
          onSelectOption={handleSelectTypeConnect}
        />
      </div>
      <div className="flex flex-col gap-8">
        <div className=" modal-filed">
          <span className="label">Chọn ngày</span>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar showDaysOutsideCurrentMonth />
          </LocalizationProvider>
        </div>
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
    </DetailDoctorModalWrapper>
  )
}

export default Reschedule
