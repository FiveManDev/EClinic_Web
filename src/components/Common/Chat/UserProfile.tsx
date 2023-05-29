import { IconButton, Tooltip } from "@mui/material"
import { PropsWithChildren } from "react"
import { HiOutlineXMark, HiPlus } from "react-icons/hi2"
import ImageCustom from "../ImageCustom"
import { AnimatePresence, motion } from "framer-motion"
interface IProps {
  onClose: () => void
}
const UserProfile = ({ onClose }: IProps) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="max-w-[300px] w-full py-5 relative flex flex-col space-y-[26px] "
      >
        <div className="absolute top-0 left-0 text-2xl text-gray-400 cursor-pointer translate-y-1/4 translate-x-1/4">
          <Tooltip title="Close" placement="top">
            <IconButton onClick={onClose}>
              <HiOutlineXMark />
            </IconButton>
          </Tooltip>
        </div>

        {/* top profile */}
        <div className="flex flex-col items-center gap-y-1.5">
          <div className="relative w-20 h-20 overflow-hidden rounded-full">
            <ImageCustom
              src={"/images/avatars/avatar_2.jpg"}
              fill
              alt="user-avatar"
              className="object-cover"
            />
          </div>
          <h3 className="text-base font-semibold text-h1">Mr. Jone Martin</h3>
          <span className="font-light text-disable">30 Years, Male</span>
        </div>
        <div className="pb-6 border border-t-0 border-b border-gray-200 border-solid border-x-0">
          <div className="px-[22px] flex flex-col gap-y-3">
            <Field label="Email" value="jubed435@gmail.com" />
            <Field label="Phone" value="(704) 555-0127" />
          </div>
        </div>
        <div className="flex flex-col px-[22px]">
          <FieldMain label="Shared Image">
            <div className="grid grid-cols-4 gap-2">
              {Array(6)
                .fill(0)
                .map((item, index) => (
                  <div
                    className="relative overflow-hidden rounded-md w-14 h-14"
                    key={index}
                  >
                    <ImageCustom
                      src={"/images/avatars/avatar_2.jpg"}
                      fill
                      alt="user-avatar"
                      className="object-cover"
                    />
                  </div>
                ))}
              <Tooltip title="Load more" placement="top">
                <IconButton>
                  <HiPlus />
                </IconButton>
              </Tooltip>
            </div>
          </FieldMain>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
interface IFieldProps extends PropsWithChildren {
  label: string
  value?: string
}
const Field = ({ label, value }: IFieldProps) => {
  return (
    <div className="flex flex-col space-y-0.5">
      <span className="font-light text-disable ">{label}</span>
      <span className=" text-h1">{value}</span>
    </div>
  )
}
const FieldMain = ({ label, children }: IFieldProps) => {
  return (
    <div className="flex flex-col space-y-2">
      <span className="font-medium text-disable ">{label}</span>
      {children}
    </div>
  )
}
export default UserProfile
