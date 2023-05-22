import React from "react"
import InputCustom from "../Input"
import { HiMagnifyingGlass } from "react-icons/hi2"
import ImageCustom from "../ImageCustom"
import { OverlayScrollbarsComponent } from "overlayscrollbars-react"

const ListHistory = () => {
  return (
    <div className="flex flex-col bg-gray-50 w-full max-w-[320px]">
      <div className="px-5 pt-10 pb-4">
        <h1 className="mb-3 text-2xl text-h1">Message</h1>
        <InputCustom
          onChange={(e) => {}}
          icon={<HiMagnifyingGlass />}
          className="w-full md:max-w-[412px]"
          placeholder="Search for message"
        />
      </div>
      <OverlayScrollbarsComponent
        defer
        options={{ scrollbars: { autoHide: "scroll" } }}
      >
        <div className="h-full space-y-4">
          {Array(20)
            .fill(0)
            .map((item, index) => (
              <HistoryItem key={index} />
            ))}
        </div>
      </OverlayScrollbarsComponent>
    </div>
  )
}
export const HistoryItem = () => {
  return (
    <div className="flex justify-between bg-white px-5 py-[6px] cursor-pointer hover:bg-blue-100 transition-all">
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
          <span className="text-sm font-medium text-h1">Jone Martin</span>
          <span className="text-xs text-disable">I hope you get well soon</span>
        </div>
      </div>
      <time className="text-xs align-top text-disable">17:10</time>
    </div>
  )
}
export default ListHistory
