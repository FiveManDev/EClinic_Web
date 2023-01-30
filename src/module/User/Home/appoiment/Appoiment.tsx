import CustomButton from "components/User/Button"
import Image from "next/image"
import React from "react"

const Appoiment = () => {
  return (
    <div className="flex items-center justify-between mt-[180px]">
      <div className="w-[570px] h-[570px] relative">
        <Image alt="image-appoiment" src="/images/image-1.png" fill />
      </div>
      <div className="flex  flex-col space-y-7">
        <h3 className="text-h1 text-[44px] ">Đăt lịch khám trực tuyến</h3>
        <p className="text-[#777781] text-base">
          Đặt lịch hẹn với các bác sĩ giỏi, luôn tận tâm chăm sóc sức khỏe của
          bạn và gia đình.
        </p>
        <CustomButton kind="secondary" className="max-w-[200px]">
          Đặt lịch khám
        </CustomButton>
      </div>
    </div>
  )
}

export default Appoiment
