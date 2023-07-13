import { Skeleton } from "@mui/material"
import { CalendarPicker, LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import EmtyData from "components/Common/Empty"
import Tag from "components/Common/Tag"
import dayjs from "dayjs"
import { useGetDoctorScheduleForUser } from "hooks/query/booking"
import { useRouter } from "next/router"
import { useDispatch, useSelector } from "react-redux"
import colorsProvider from "shared/theme/colors"
import {
  selectBookingTime,
  selectSlotBooking
} from "store/module/booking/doctor/booking-doctor-selector"
import { bookingDoctorSlice } from "store/module/booking/doctor/booking-doctor-slice"
export type PropsStep = {
  onContinue?: () => void
  onCancel?: () => void
  onBack?: () => void
}
export const StepOne = ({ onCancel, onContinue }: PropsStep) => {
  const router = useRouter()
  const dispatch = useDispatch()
  const date = useSelector(selectBookingTime)
  const slot = useSelector(selectSlotBooking)
  const getDoctorSchedule = useGetDoctorScheduleForUser(
    date,
    router.query.id as string
  )
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
        <div className="modal-filed">
          <span className="label">Chọn ngày</span>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <CalendarPicker
              disablePast
              showDaysOutsideCurrentMonth
              date={dayjs(date)}
              onChange={(newDate) => {
                dispatch(
                  bookingDoctorSlice.actions.bookingTime(
                    newDate?.format("YYYY-MM-DD")
                  )
                )
              }}
            />
          </LocalizationProvider>
        </div>
        <div className="flex-1 modal-filed">
          <span className="label">Chọn giờ</span>
          {getDoctorSchedule.isLoading && (
            <div className="grid h-full grid-cols-3 gap-3 overflow-y-auto">
              {Array(20)
                .fill(0)
                .map((_, index) => (
                  <Skeleton
                    key={index}
                    variant="rounded"
                    width={129}
                    height={32}
                  />
                ))}
            </div>
          )}
          {getDoctorSchedule.data ? (
            <div className="grid h-full grid-cols-3 gap-3 overflow-y-auto">
              {getDoctorSchedule.data.data.slots.map((item, index) => (
                <Tag
                  onClick={() => {
                    if (!item.isBooking) {
                      dispatch(bookingDoctorSlice.actions.scheduleSlot(item))
                    }
                  }}
                  key={index}
                  color={
                    slot?.slotID === item.slotID
                      ? colorsProvider.primary
                      : item.isBooking
                      ? colorsProvider.error
                      : colorsProvider.disable
                  }
                  className="w-full cursor-pointer"
                >
                  <p
                    className={item.isBooking ? "line-through" : ""}
                  >{`${item.startTime} - ${item.endTime}`}</p>
                </Tag>
              ))}
            </div>
          ) : (
            <EmtyData message={"No doctor's schedule"} className="flex-1" />
          )}
        </div>
      </div>
    </>
  )
}
