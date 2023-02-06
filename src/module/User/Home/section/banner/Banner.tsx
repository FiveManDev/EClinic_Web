import Image from "next/image"
import Search from "./Search"
import { useTranslation } from "react-i18next"
const Banner = () => {
  const { t } = useTranslation("home")
  return (
    <section className="banner-wrapper ">
      <div className="relative page-container">
        <div className="flex items-center justify-between pt-10">
          <div className="max-w-[560px] w-full">
            <h1 className="font-bold text-4xl md:text-[70px] md:leading-tight text-h1">
              {t("banner.title")}
            </h1>
            <h3 className="text-xs md:text-[20px] text-[#7B7E90] leading-tight  mt-4">
              {t("banner.description")}
            </h3>
          </div>
          <div className="relative flex-shrink-0 w-[200px] h-[200px]  md:w-[600px] md:h-[600px]">
            <Image alt="banner" src="/images/banner.png" fill />
          </div>
        </div>
        <Search />
      </div>
    </section>
  )
}

export default Banner
