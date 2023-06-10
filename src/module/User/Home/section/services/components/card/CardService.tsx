import Tag from "components/Common/Tag"
import CustomButton from "components/User/Button"
import Image from "next/image"
import { useRouter } from "next/router"
import React from "react"
import { useTranslation } from "react-i18next"
import { ServicePackage } from "types/Service"

interface Props {
  servicePackage?: ServicePackage
}
const CardService = ({ servicePackage }: Props) => {
  const { t } = useTranslation(["ser"])
  const router = useRouter()
  return (
    <div className="h-[330px] w-full p-3 flex justify-between flex-col space-y-4 bg-white rounded-2xl border border-solid border-[#E7ECF3]">
      <div>
        <div className="w-full h-[152px] relative">
          <Image
            alt="image-appoitment"
            src={servicePackage?.image || "/images/sample.png"}
            fill
            sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
            className="object-cover rounded-2xl"
          />
        </div>
        <h4 className="font-semibold text-[#3B3E44] text-[19px] mt-1">
          {servicePackage?.servicePackageName}
        </h4>
      </div>
      <div >
        <div className="flex justify-between w-full mb-2">
          <Tag className="bg-[#ca1b21] text-white">{(servicePackage?.price || 0) * (1 - ((servicePackage?.discount || 1) / 100))} VND</Tag>
          <Tag className="line-through">{servicePackage?.price} VND</Tag>
        </div>
        <CustomButton
          size="small"
          kind="primary"
          className="h-[33px] rounded-md"
          onClick={() =>
            router.push(
              `/services/${servicePackage?.servicePackageID}`
            )
          }
        >
          <span className="text-sm">{t("ser:btnItem")}</span>
        </CustomButton>
      </div>
    </div>
  )
}

export default CardService
