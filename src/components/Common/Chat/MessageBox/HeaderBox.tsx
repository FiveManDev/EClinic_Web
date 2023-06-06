import { IconButton, Tooltip } from "@mui/material"
import ImageCustom from "components/Common/ImageCustom"
import {
  HiOutlineInformationCircle,
  HiOutlineVideoCamera
} from "react-icons/hi2"
interface IProps {
  toggleInfo: () => void
}
export const HeaderBox = ({ toggleInfo }: IProps) => {
  return (
    <div className="flex justify-between px-5 py-3 border border-t-0 border-gray-200 border-solid border-x-0">
      <div className="flex space-x-2">
        <div className="relative w-10 h-10 overflow-hidden rounded-full">
          <ImageCustom
            src={"/images/avatars/avatar_2.jpg"}
            fill
            alt="user-avatar"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col justify-between">
          <span className="text-base font-medium text-h1">Jone Martin</span>
          <span className="text-sm text-green-500">Online</span>
        </div>
      </div>
      <div className="flex items-center gap-x-2">
        <Tooltip title="Call video" placement="top">
          <IconButton>
            <span className="text-3xl text-secondary">
              <HiOutlineVideoCamera />
            </span>
          </IconButton>
        </Tooltip>
        <Tooltip title="View profile" placement="top">
          <IconButton onClick={toggleInfo}>
            <span className="text-3xl text-disable">
              <HiOutlineInformationCircle />
            </span>
          </IconButton>
        </Tooltip>
      </div>
    </div>
  )
}
