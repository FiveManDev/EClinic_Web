import { CalendarPicker, LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import EmtyData from "components/Common/Empty"
import InputCustom from "components/Common/Input"
import { useSearchFamlyProfilesQuery } from "hooks/query/profile/useProfile"
import useDebounce from "hooks/useDebounce"
import ProfileItem from "module/User/Profile/section/profile/components/ProfileItem"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { PAGE_SIZE } from "shared/constant/constant"
import {
  selectAppointmentTime,
  selectProfile
} from "store/module/booking/service/booking-service-selector"
import { bookingServiceSlice } from "store/module/booking/service/booking-service-slice"
export type PropsStep = {
  onContinue?: () => void
  onCancel?: () => void
  onBack?: () => void
}
export const StepOne = ({ onCancel, onContinue }: PropsStep) => {
  const dispatch = useDispatch()
  const profile = useSelector(selectProfile)
  const appointmentTime = useSelector(selectAppointmentTime)
  const [searchData, setSearchData] = useState("")
  const searchTextDebounce = useDebounce(searchData, 1000)
  const profiles = useSearchFamlyProfilesQuery(1, PAGE_SIZE, searchTextDebounce)

  return (
    <>
      <div className="flex justify-between my-8 ">
        <div className="flex flex-col gap-y-2">
          <h3 className="text-2xl text-h1">Đặt lịch cuộc hẹn</h3>
        </div>
      </div>
      <div className="flex gap-x-4 ">
        <div className="modal-filed">
          <span className="label">Chọn ngày</span>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <CalendarPicker
              disablePast
              showDaysOutsideCurrentMonth
              date={appointmentTime}
              onChange={(newDate) =>
                dispatch(
                  bookingServiceSlice.actions.appoinmentTimeChange(newDate)
                )
              }
            />
          </LocalizationProvider>
        </div>
        <div className="modal-filed md:w-[454px]">
          <span className="label">Chọn hồ sơ bạn muốn đặt khám</span>
          <div className="flex mb-3 gap-x-2">
            <InputCustom
              onChange={(e) => setSearchData(e.target.value)}
              value={searchData}
              className="w-full md:max-w-[300px]"
              placeholder="Find a profile by keyword"
            />
          </div>
          <ul className="max-h-[600px] overflow-auto gap-2 grid grid-cols-2">
            {profiles.data?.data.data?.map((item, index) => (
              <ProfileItem
                className={
                  profile?.profileID === item.profileID
                    ? "border border-primary border-solid bg-primary bg-opacity-5"
                    : ""
                }
                data={item}
                key={index}
                loading={false}
                onClick={() =>
                  dispatch(bookingServiceSlice.actions.profileChange(item))
                }
              />
            ))}
            {profiles.isLoading &&
              Array(2)
                .fill(0)
                .map((_, index) => (
                  <ProfileItem onClick={() => {}} key={index} loading={true} />
                ))}
          </ul>
          {profiles.data?.data.data && profiles.data?.data.data?.length < 1 && (
            <EmtyData />
          )}
        </div>
      </div>
    </>
  )
}
