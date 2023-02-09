import Tag from "components/Common/Tag"
import CustomButton from "components/User/Button"
import Image from "next/image"
import Link from "next/link"
import React from "react"
import { useTranslation } from "react-i18next"

const Card = () => {
  const { t } = useTranslation("home")

  return (
    <div className="h-[334px] w-full p-3 flex flex-col space-y-4 bg-white rounded-2xl border border-solid border-[#E7ECF3]">
      <div className="w-full h-[152px] relative">
        <Image
          alt="image-appoiment"
          src="/images/sample.png"
          fill
          className="object-cover rounded-2xl"
        />
      </div>
      <h4 className="font-semibold text-[#3B3E44] text-[20px]">
        Gói khám sức khỏe cơ bản{" "}
      </h4>
      <div className="flex items-center space-x-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
          />
        </svg>
        <span className="text-[#84878B] text-sm ">
          Dành cho độ tổi từ 20 - 70 tuổi
        </span>
      </div>
      <div className="flex items-center justify-between">
        <Tag>$120</Tag>
        <Link href={"/"}>
          <CustomButton
            size="small"
            kind="primary"
            className="h-[33px] rounded-md"
          >
            <span className="text-sm">{t("service.btnCard")}</span>
          </CustomButton>
        </Link>
      </div>
    </div>
  )
}

export default Card
