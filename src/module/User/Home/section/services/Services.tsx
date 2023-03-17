import CustomButton from "components/User/Button"
import { useTranslation } from "react-i18next"
import CardService from "./components/card"

const Services = () => {
  const { t } = useTranslation("home")

  return (
    <section className="flex flex-col w-full ">
      <h3 className="mb-3 heading-section ">{t("service.title")}</h3>
      <p className="mb-4 desc-section">{t("service.desc")}</p>
      <CustomButton kind="secondary" className="max-w-[200px]">
        {t("service.btn")}
      </CustomButton>

      <div className="relative grid grid-cols-1 pt-8 gap-y-2 md:gap-x-4 md:grid-cols-4">
        <CardService />
        <CardService />
        <CardService />
        <CardService />
      </div>
    </section>
  )
}

export default Services
