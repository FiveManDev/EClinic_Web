import Image from "next/image"
import React from "react"
import { useTranslation } from "react-i18next"

const Info = () => {
  const { t } = useTranslation("forum")

  return (
    <div className="flex items-center space-x-3">
      <div className="relative h-14 md:w-11 w-14 md:h-11">
        <Image
          src={"/images/sample.png"}
          fill
          alt="image"
          className="object-cover rounded-full"
        />
      </div>
      <div className="flex flex-col text-[#9A9FA5] text-sm md:text-[10px] font-medium">
        <span>{t("card.by")}</span>
        <span className="text-black">BS. Nguyễn Thanh Bình</span>
        <div className="flex items-center gap-2">
          <span>
            <strong>9</strong> {t("card.by")}
          </span>
          <div className="flex items-center gap-[2px]">
            <span>30</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#ef4444"
              className="w-3 h-3 stroke-red-500"
            >
              <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Info