import ImageCustom from "components/Common/ImageCustom"
import Tag from "components/Common/Tag"
import CustomButton from "components/User/Button"
import colorsProvider from "shared/theme/colors"

const DoctorBookingItem = () => {
  return (
    <div className="flex flex-col p-4 bg-white rounded-lg shadow">
      <div className="flex items-center top gap-x-4">
        <div className="relative w-32 h-28">
          <ImageCustom
            src={"/images/avatars/avatar_1.jpg"}
            fill
            alt="image doctor"
            className="object-cover rounded-lg"
          />
        </div>
        <div className="flex flex-col justify-between h-full">
          <h4 className="text-lg font-semibold">Dr. Adian Allende</h4>
          <div className="flex items-center gap-x-2">
            <span>Video Call</span>
            <span>-</span>
            <Tag color={colorsProvider.success} className="cursor-pointer">
              Completed
            </Tag>
          </div>
          <div className="flex items-center gap-2 text-disable">
            <span>Dec 14.2022</span>
            <span>-</span>
            <span>15:00 Pm</span>
          </div>
        </div>
        <Tag color={colorsProvider.primary} className="cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"
            />
          </svg>
        </Tag>
      </div>
      <div className="h-[1px] w-full bg-gray-200 my-4"></div>
      <div className="flex items-center gap-x-4 justify-self-end">
        <CustomButton kind="secondary">Book Again</CustomButton>
        <CustomButton>Rechedule</CustomButton>
      </div>
    </div>
  )
}

export default DoctorBookingItem
