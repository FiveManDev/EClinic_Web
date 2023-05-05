import { Checkbox, Divider, FormControlLabel, Stack } from "@mui/material"
import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import classNames from "classnames"
import TimePickerCustom from "components/Common/DatePicker/TimePickerCustom"
import ModalPrimary from "components/Common/Modal/ModalPrimary"
import TooltipIcon from "components/Common/ToolTipIcon"
import CustomButton from "components/User/Button"
import { useState } from "react"
import { HiOutlineTrash, HiPlus } from "react-icons/hi2"

const durationTime = [15, 30, 60, 120]
const initialData = [
  {
    active: true,
    name: "Sun",
    intervals: [
      {
        from: "09:00",
        to: "17:00"
      }
    ]
  },
  {
    active: true,
    name: "Mon",
    intervals: [
      {
        from: "09:00",
        to: "17:00"
      }
    ]
  },
  {
    active: true,
    name: "Tue",
    intervals: [
      {
        from: "09:00",
        to: "17:00"
      }
    ]
  },
  {
    active: true,
    name: "Wed",
    intervals: [
      {
        from: "09:00",
        to: "17:00"
      }
    ]
  },
  {
    active: true,
    name: "Thu",
    intervals: [
      {
        from: "09:00",
        to: "17:00"
      }
    ]
  },
  {
    active: true,
    name: "Fri",
    intervals: [
      {
        from: "09:00",
        to: "17:00"
      }
    ]
  },
  {
    active: true,
    name: "Sat",
    intervals: [
      {
        from: "09:00",
        to: "17:00"
      }
    ]
  }
]
const ScheduleAPM = () => {
  const [isDuration, setIsDuration] = useState(false)
  const [weeklyHours, setWeeklyHours] = useState(initialData)
  const [showModal, setShowModal] = useState(false)

  return (
    <section className="flex flex-col background-primary ">
      <h3 className="mb-6 text-lg font-semibold text-black1">
        Set your availability
      </h3>
      <div className="flex flex-col gap-y-2">
        <span className="text-base ">How long should booked events be?</span>
        <div className="flex items-center gap-3 overflow-hidden ">
          {durationTime.map((item, index) => (
            <button
              key={index}
              onClick={() => setIsDuration(false)}
              className={classNames(
                "flex items-center justify-center rounded-md px-3 py-2 text-gray-400 bg-transparent border border-gray-400 border-solid hover:border-primary hover:border-2 hover:text-primary cursor-pointer"
              )}
            >
              {item} min
            </button>
          ))}
          <button
            onClick={() => setIsDuration(true)}
            className={classNames(
              "flex items-center rounded-md justify-center px-3 py-2 text-gray-400 bg-transparent border border-gray-400 border-solid hover:border-primary hover:border-2 hover:text-primary cursor-pointer"
            )}
          >
            Custom
          </button>
        </div>
        {isDuration && (
          <div className="flex flex-col">
            <span className="text-sm text-disable">Custom duration</span>
            <div className="flex items-center">
              <input
                type="text"
                className="rounded-md w-[140px] px-3 py-2 border border-gray-400 border-solid "
                defaultValue={"60"}
              />
              <span className="px-2">min</span>
            </div>
          </div>
        )}
      </div>
      <div className="h-0.5 w-full bg-gray-300 mt-6"></div>
      <div className="flex flex-col">
        <div className="grid grid-cols-5">
          <div className="col-span-3 py-6 mr-4">
            <h4 className="text-sm font-semibold">Set your weekly hours</h4>
            <Stack
              direction="column"
              divider={<Divider orientation="horizontal" flexItem />}
              spacing={2}
            >
              {weeklyHours.map((item, index) => (
                <div className="flex py-4" key={index}>
                  <FormControlLabel
                    control={<Checkbox />}
                    label={item.name}
                    className="max-w-[100px] w-full"
                  />
                  <div className="flex flex-col gap-y-2">
                    {item.intervals.map((inter, idx) => (
                      <div className="flex items-center" key={idx}>
                        <TimePickerCustom />
                        <span className="px-2">-</span>
                        <TimePickerCustom />
                        <TooltipIcon title="Remove" className="ml-2">
                          <HiOutlineTrash />
                        </TooltipIcon>
                      </div>
                    ))}
                  </div>
                  <TooltipIcon title="Add new interval" className="ml-2">
                    <HiPlus />
                  </TooltipIcon>
                </div>
              ))}
            </Stack>
          </div>
          <div className="py-6  col-span-2 border border-y-0 border-l-[2px] border-gray-300 border-solid border-r-0 ">
            <div className="px-4">
              <h4 className="text-sm font-semibold">Add date overrides</h4>
              <button
                className="px-3 py-2 rounded-[40px] w-full border border-solid border-gray-400 flex items-center justify-center focus-within:bg-gray-300 transition-all outline-none text-sm cursor-pointer bg-transparent mt-4"
                onClick={() => setShowModal(true)}
              >
                Add a date override
              </button>
              <ModalPrimary
                show={showModal}
                onClose={() => setShowModal(false)}
              >
                <div className="flex flex-col gap-6 px-6 py-6 ">
                  <h1 className="text-xl text-h1 max-w-[420px]">
                    Select the date(s) you want to assign specific hours
                  </h1>
                  <div className="mx-auto">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DateCalendar showDaysOutsideCurrentMonth />
                    </LocalizationProvider>
                  </div>
                </div>
                <div className="p-6 mb-4 border border-gray-400 border-solid bg-gray-50 border-x-0">
                  <h4 className="mb-2 text-sm text-h1">
                    What hours are you available?
                  </h4>
                  <div className="flex items-center ">
                    <TimePickerCustom />
                    <span className="px-2">-</span>
                    <TimePickerCustom />
                    <TooltipIcon title="Remove" className="ml-2">
                      <HiOutlineTrash />
                    </TooltipIcon>
                    <TooltipIcon title="Add new interval" className="ml-2">
                      <HiPlus />
                    </TooltipIcon>
                  </div>
                </div>
                <div className="footer">
                  <div className="flex justify-between px-6">
                    <CustomButton
                      kind="tertiary"
                      onClick={() => setShowModal(false)}
                    >
                      Cancel
                    </CustomButton>
                    <CustomButton kind="primary">Apply</CustomButton>
                  </div>
                </div>
              </ModalPrimary>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
export default ScheduleAPM
