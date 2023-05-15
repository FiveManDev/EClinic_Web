import ImageCustom from "components/Common/ImageCustom"
import React from "react"
interface IProps {
  icon: string
  title: string
  dataNumber: string
}
const Card = ({ icon, title, dataNumber }: IProps) => {
  return (
    <div className="flex items-center justify-between w-full px-6 py-4 bg-white rounded-lg shadow-main gap-x-6">
      <div className="flex flex-col flex-1 gap-y-1">
        <span className="text-3xl font-semibold text-h1">{dataNumber}</span>
        <h4 className="text-base text-disable">{title}</h4>
      </div>
      <div className="relative w-32 h-32 ">
        <ImageCustom src={icon} alt="icon" fill className="object-contain" />
      </div>
    </div>
  )
}
export default Card
