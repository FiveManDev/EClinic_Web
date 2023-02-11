import classNames from "classnames"
import Image from "next/image"
import React from "react"
interface Props {
  kind?: "large" | "medium"
}
const CardForum = ({ kind = "medium" }: Props) => {
  return (
    <div
      className={classNames(
        "grid w-full rounded-md overflow-hidden",
        kind === "large" && "md:grid-cols-8 md:gap-x-4",
        kind === "medium" && "grid-cols-1 gap-y-4 "
      )}
    >
      <div
        className={classNames(
          "relative  rounded-md overflow-hidden",
          kind === "large" && "col-span-5 h-[200px] md:h-[245px]",
          kind === "medium" && "col-span-5 h-[140px] md:h-[200px]"
        )}
      >
        <Image
          src={"/images/sample.png"}
          fill
          alt="image"
          className="object-cover"
        />
      </div>
      <div className={classNames(kind === "large" && "space-y-4 col-span-3")}>
        <h4 className="text-[22px] text-[#304050] font-semibold line-clamp-2">
          Chụp CT có ảnh hưởng đến liền sẹo hay không?
        </h4>
        <div className="flex items-center space-x-3">
          <div className="relative h-14 md:w-11 w-14 md:h-11">
            <Image
              src={"/images/sample.png"}
              fill
              alt="image"
              className="object-cover rounded-full"
            />
          </div>
          <div className="flex flex-col  text-[#9A9FA5] text-sm md:text-[10px] font-medium">
            <span>Được trả lời bởi</span>
            <span className="text-black">BS. Nguyễn Thanh Bình</span>
            <span>9 năm kinh nghiệm</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardForum
