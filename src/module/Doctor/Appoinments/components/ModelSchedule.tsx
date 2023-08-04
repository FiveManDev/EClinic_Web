import { TextField } from "@mui/material"
import { CalendarPicker, LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import classNames from "classnames"
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
import { HiOutlineTrash, HiPlus } from "react-icons/hi2"
import { QUERY_KEYS } from "shared/constant/constant"
import { Slot } from "types/Booking"

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
  const doctorSchedule = useGetDoctorScheduleForUser(
    date.format("YYYY-MM-DD").toString(),
    doctorID || ""
  )
  useEffect(() => {
    if (doctorSchedule.status === "error") {
      setType("create")
      setSlots([])
    }
    if (doctorSchedule.status === "success") {
      setType("update")
      setSlots(doctorSchedule.data?.data.slots || [])
    }
  }, [doctorSchedule.data?.data.slots, doctorSchedule.status])
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
            queryClient.refetchQueries([QUERY_KEYS.BOOKING.DOCTOR, date])
            toast.success("Create successfuly")
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
            queryClient.refetchQueries([QUERY_KEYS.BOOKING.DOCTOR, date])
            toast.success("Update successfuly")
          },
          onError() {
            toast.success("Update failed")
          }
        }
      )
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
          <div className="p-6 ">
            <h4 className="mb-4 text-xl text-h1 max-w-[340px]">
              What hours are you available?
            </h4>
            {slots.length < 1 && (
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
                {slots.map((item, index) => (
                  <SlotForm
                    slot={item}
                    key={index}
                    onChangeSlot={(type, time) =>
                      handleSchedule(type, time, index)
                    }
                    onRemove={() => handleRemoveSlot(index)}
                    onCreate={handleAddSlot}
                  />
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
            <CustomButton kind="primary" onClick={onSubmit}>
              Apply
            </CustomButton>
          </div>
        </div>
      </ModalPrimary>
    </>
  )
}

interface PropsSlotForm {
  slot?: Slot
  // eslint-disable-next-line no-unused-vars
  onChangeSlot: (type: "startTime" | "endTime", time: string) => void
  className?: string
  onCreate: () => void
  onRemove: () => void
}
const SlotForm = ({
  slot,
  onChangeSlot,
  className,
  onCreate,
  onRemove
}: PropsSlotForm) => {
  return (
    <div className={classNames("flex items-center", className)}>
      <div className="max-w-[120px] w-full">
        <TextField
          size="small"
          value={slot?.startTime}
          label="Start"
          type="time"
          InputLabelProps={{
            shrink: true
          }}
          onChange={(e) => onChangeSlot("startTime", e.target.value)}
        />
      </div>
      <span className="px-2">-</span>
      <div className="max-w-[120px] w-full">
        <TextField
          onChange={(e) => onChangeSlot("endTime", e.target.value)}
          size="small"
          value={slot?.endTime}
          label="End"
          type="time"
          InputLabelProps={{
            shrink: true
          }}
        />
      </div>
      <TooltipIcon title="Remove" className="ml-2" onClick={() => onRemove()}>
        <HiOutlineTrash />
      </TooltipIcon>
      <TooltipIcon
        title="Add new interval"
        className="ml-2"
        onClick={() => onCreate()}
      >
        <HiPlus />
      </TooltipIcon>
    </div>
  )
}
export default ModelSchedule
