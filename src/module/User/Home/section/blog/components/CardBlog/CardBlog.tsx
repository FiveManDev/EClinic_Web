import Image from "next/image"
import React from "react"

const CardBlog = () => {
  return (
    <div className="flex flex-col w-full space-y-4">
      <div className="relative w-full h-[334px]">
        <Image
          src={"/images/sample.png"}
          alt="image"
          sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
          fill
          className="object-cover rounded-lg"
        />
      </div>
      <div className="flex flex-col space-y-3">
        <h4 className="text-[22px] text-[#304050] font-semibold line-clamp-2">
          Chương trình hội thảo:Trang bị kiến thức về sức...
        </h4>
        <div className="text-[#9A9FA5] text-xs space-x-1.5">
          <span>By</span>
          <b className="font-bold text-black">Admin</b>
          <span>-</span>
          <span>January 25, 2021</span>
        </div>
        <p className="text-base text-[#657280] line-clamp-3">
          A leisurely start as not expected at our next campsite....
        </p>
      </div>
    </div>
  )
}

export default CardBlog
