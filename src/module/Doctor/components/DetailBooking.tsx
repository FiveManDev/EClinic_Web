import { Box, Chip, Drawer, TextField } from "@mui/material"
import ImageCustom from "components/Common/ImageCustom"
import ModalPrimary from "components/Common/Modal/ModalPrimary"
import TooltipIcon from "components/Common/ToolTipIcon"
import CustomButton from "components/User/Button"
import { CustomInput } from "components/User/Input"
import { OverlayScrollbarsComponent } from "overlayscrollbars-react"
import { useState } from "react"
import { HiOutlineEye, HiOutlineTrash } from "react-icons/hi2"
import { dayformat } from "shared/helpers/helper"
import Reschedule from "./Reschedule"
const DetailBooking = () => {
  const style = "border border-solid border-gray80"
  const [show, setShow] = useState(false)
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <div className="flex items-center gap-x-3">
        <TooltipIcon title="Delete" className={style}>
          <HiOutlineTrash />
        </TooltipIcon>
        <TooltipIcon
          title="Detail Booking"
          className={style}
          onClick={() => setShow(true)}
        >
          <HiOutlineEye />
        </TooltipIcon>
        <Drawer anchor="right" open={show} onClose={() => setShow(false)}>
          <Box
            sx={{
              width: 600
            }}
          >
            <div className="flex flex-col">
              <div className="flex flex-col gap-6 px-6 py-6 ">
                <h1 className="text-xl text-h1">Detail a booking</h1>
                <div className="flex flex-col gap-y-2">
                  <span className="text-base">Info </span>
                  <div className="grid grid-cols-2 gap-x-2">
                    <CustomInput
                      variant="filled"
                      label="Patient Name"
                      name="name"
                      value={"Patient name"}
                    />
                    <CustomInput
                      variant="filled"
                      label="Email"
                      name="email"
                      value={"Patient@gmail.com"}
                    />
                  </div>
                </div>
                <CustomInput
                  variant="filled"
                  label="Phone number"
                  name="Phone number"
                  value={"079534235123"}
                />
                <div className="flex flex-col gap-y-2">
                  <span className="text-base">Appointment Date </span>
                  <div className="flex items-center gap-3">
                    <Chip
                      color="info"
                      className="rounded-md min-w-[160px]"
                      label={dayformat("03 May 2023")}
                    />
                    <Chip
                      color="info"
                      className="rounded-md"
                      label={`10:00 - 11:00`}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-y-2">
                  <span className="text-base">Note </span>
                  <TextField
                    label="Multiline"
                    multiline
                    rows={4}
                    defaultValue="Default Value"
                    variant="filled"
                  />
                </div>
                <div className="flex flex-col gap-y-2">
                  <span className="text-base">Attached images </span>
                  <div className="grid grid-cols-2 gap-3">
                    {Array(4)
                      .fill(0)
                      .map((_, index) => (
                        <div
                          key={index}
                          className="relative w-full h-[200px] rounded-lg overflow-hidden"
                        >
                          <ImageCustom
                            src="/images/products/product_1.jpg"
                            alt="image"
                            fill
                          />
                        </div>
                      ))}
                  </div>
                </div>
                <div className="flex items-center gap-x-2">
                  <CustomButton kind="tertiary">Close</CustomButton>
                  <CustomButton
                    kind="primary"
                    onClick={() => {
                      setShowModal(true)
                    }}
                  >
                    Re-Schedule
                  </CustomButton>
                </div>
              </div>
            </div>
          </Box>
          <ModalPrimary show={showModal} onClose={() => setShowModal(false)}>
            <OverlayScrollbarsComponent
              defer
              options={{ scrollbars: { autoHide: "scroll" } }}
            >
              <Reschedule />
            </OverlayScrollbarsComponent>

            <div className="footer">
              <div className="flex justify-between px-6">
                <CustomButton
                  kind="tertiary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </CustomButton>
                <CustomButton kind="primary">Reschedule</CustomButton>
              </div>
            </div>
          </ModalPrimary>
        </Drawer>
      </div>
    </>
  )
}

export default DetailBooking
