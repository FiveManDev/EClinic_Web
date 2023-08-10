import { Skeleton } from "@mui/material"
import { CalendarPicker, LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import ModalPrimary from "components/Common/Modal/ModalPrimary"
import TooltipIcon from "components/Common/ToolTipIcon"
import CustomButton from "components/User/Button"
import dayjs from "dayjs"
import {
  useCreateDoctorScheduleMutation,
  useGetDoctorScheduleForUser,
  useUpdateDoctorScheduleMutation
} from "hooks/query/booking"
import { OverlayScrollbarsComponent } from "overlayscrollbars-react"
import { queryClient } from "pages/_app"
import { useEffect, useState } from "react"
import { toast } from "react-hot-toast"
import { HiPlus } from "react-icons/hi2"
import { QUERY_KEYS } from "shared/constant/constant"
import { Slot } from "types/Booking"
import { SlotForm } from "./SlotForm"

interface Props {
  show: boolean
  // eslint-disable-next-line no-unused-vars
  onChangeModel: (status: boolean) => void
  doctorID: string
}
const initialData: Slot = {
  slotID: "00000000-0000-0000-0000-000000000000",
  endTime: "",
  startTime: "",
  isBooking: false
}

const ModelSchedule = ({ show, onChangeModel, doctorID }: Props) => {
  const createSchedule = useCreateDoctorScheduleMutation()
  const updateSchedule = useUpdateDoctorScheduleMutation()
  const [type, setType] = useState<"create" | "update">("create")
  const [date, setDate] = useState(dayjs())
  const [slots, setSlots] = useState<Slot[]>([])
  const [errors, setErrors] = useState<number[]>([])
  const doctorSchedule = useGetDoctorScheduleForUser(
    date.format("YYYY-MM-DD").toString(),
    doctorID || ""
  )
  useEffect(() => {
    if (doctorSchedule.status === "error") {
      setType("create")
      setSlots([])
    }
    if (
      doctorSchedule?.data?.data?.slots &&
      doctorSchedule?.data?.data?.slots.length > 0
    ) {
      setType("update")
      setSlots(doctorSchedule.data?.data.slots || [])
    }
    if (doctorSchedule.isLoading) {
      setSlots([])
    }
  }, [doctorSchedule.status, show])
  useEffect(() => {
    handleValidate()
  }, [slots])
  const handleSchedule = (
    kind: "startTime" | "endTime",
    time: string,
    index: number,
    slotId?: string
  ) => {
    setSlots((prevState) => {
      return prevState.map((slot, idx) => {
        if (type === "create" && idx === index) {
          return { ...slot, [kind]: time }
        }
        if (
          type === "update" &&
          (slotId ? slot.slotID === slotId : idx === index)
        ) {
          return { ...slot, [kind]: time }
        }
        return slot
      })
    })
  }

  const handleAddSlot = () => {
    setSlots([...slots, initialData])
  }
  const handleRemoveSlot = (index: number) => {
    setSlots((prevSlots) => prevSlots.filter((_, idx) => idx !== index))
  }

  const onSubmit = () => {
    if (type === "create") {
      createSchedule.mutate(
        {
          doctorID,
          slots,
          time: date.format("YYYY-MM-DD").toString()
        },
        {
          onSuccess() {
            queryClient.invalidateQueries([QUERY_KEYS.BOOKING.DOCTOR])
            toast.success("Create successfuly")
            doctorSchedule.refetch()
          },
          onError() {
            toast.success("Create failed")
          }
        }
      )
    } else {
      updateSchedule.mutate(
        {
          calenderID: doctorSchedule.data?.data.calenderID as string,
          slots
        },
        {
          onSuccess() {
            queryClient.invalidateQueries([QUERY_KEYS.BOOKING.DOCTOR])
            toast.success("Update successfuly")
            doctorSchedule.refetch()
          },
          onError() {
            toast.success("Update failed")
          }
        }
      )
    }
  }
  const formatDate = (date: string) => {
    return dayjs(date, "HH:mm")
  }
  const handleValidate = () => {
    if (slots.length > 1) {
      const newErrors: number[] = []
      for (let i = 1; i < slots.length; i++) {
        const prevEndTime = formatDate(slots[i - 1]?.endTime)
        const endTime = formatDate(slots[i].endTime)
        const startTime = formatDate(slots[i].startTime)
        if (
          endTime.isBefore(startTime) ||
          startTime.isSame(endTime) ||
          startTime.isBefore(prevEndTime)
        ) {
          newErrors.push(i)
        }
      }
      setErrors(newErrors)
    } else {
      setErrors([])
    }
  }
  return (
    <>
      <ModalPrimary
        show={show}
        onClose={() => {
          onChangeModel(false)
          setSlots([])
        }}
      >
        <div className="flex h-[460px] ">
          <div className="flex flex-col gap-6 px-4 py-6 modal-filed">
            <h1 className="text-xl text-h1 max-w-[460px]">
              Select the date(s) you want to assign specific hours
            </h1>
            <div className="mx-auto">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <CalendarPicker
                  disablePast
                  showDaysOutsideCurrentMonth
                  date={dayjs(date)}
                  onChange={(newDate) => {
                    newDate && setDate(newDate)
                  }}
                />
              </LocalizationProvider>
            </div>
          </div>
          <div className="w-[1px] h-full bg-gray-300"></div>
          <div className="p-6 w-[410px]">
            <h4 className="mb-4 text-xl text-h1 max-w-[340px]">
              What hours are you available?
            </h4>
            {slots.length === 0 && (
              <div className="flex items-center justify-between">
                <span className="font-light text-disable">Unavailable</span>
                <TooltipIcon
                  title="Add new interval"
                  className="ml-2"
                  onClick={handleAddSlot}
                >
                  <HiPlus />
                </TooltipIcon>
              </div>
            )}
            <OverlayScrollbarsComponent>
              <div className="flex flex-col w-full h-[380px] py-2 gap-y-6">
                {doctorSchedule.isLoading &&
                  Array(4)
                    .fill(0)
                    .map((_, index) => (
                      <div
                        key={index}
                        className="flex items-center w-full gap-x-5"
                      >
                        <Skeleton width={120} height={40} variant="rounded" />
                        <Skeleton width={120} height={40} variant="rounded" />
                        <Skeleton width={40} height={40} variant="rounded" />
                      </div>
                    ))}
                {slots.map((item, index) => (
                  <div className="flex flex-col space-y-2" key={index}>
                    <SlotForm
                      slot={item}
                      onChangeSlot={(type, time) =>
                        handleSchedule(type, time, index)
                      }
                      onRemove={() => handleRemoveSlot(index)}
                      onCreate={
                        index === slots.length - 1 && errors.length === 0
                          ? handleAddSlot
                          : undefined
                      }
                    />
                    {errors.map(
                      (error) =>
                        error === index && (
                          <p className="text-red-500" key={error}>
                            Times overlap with another set of times.
                          </p>
                        )
                    )}
                  </div>
                ))}
              </div>
            </OverlayScrollbarsComponent>
          </div>
        </div>
        <div className="!mt-0 footer">
          <div className="flex justify-between px-6">
            <CustomButton kind="tertiary" onClick={() => onChangeModel(false)}>
              Cancel
            </CustomButton>
            <CustomButton
              kind="primary"
              isLoading={createSchedule.isLoading || updateSchedule.isLoading}
              onClick={onSubmit}
              disabled={
                errors.length > 0 ||
                createSchedule.isLoading ||
                updateSchedule.isLoading
              }
            >
              Apply
            </CustomButton>
          </div>
        </div>
      </ModalPrimary>
    </>
  )
}

export default ModelSchedule
