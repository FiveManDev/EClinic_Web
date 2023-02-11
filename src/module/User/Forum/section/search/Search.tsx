import ChipCustom from "components/Common/Chip/Chip"
import InputCustom from "components/Common/Input"
import React from "react"
import { HiMagnifyingGlass } from "react-icons/hi2"
import { useTranslation } from "react-i18next"

const Search = () => {
  const { t } = useTranslation("forum")

  return (
    <div className="flex flex-col space-y-3">
      <InputCustom
        icon={<HiMagnifyingGlass />}
        className="w-full md:max-w-[412px]"
        placeholder={t("search.input")}
      />
      <div className="w-full px-4 py-5 background-primary">
        <h3 className="text-xl">{t("search.heading")}</h3>
        <ul className="flex flex-wrap items-center w-full gap-4 mt-3 overflow-auto list-none">
          {new Array(7).fill(null).map((item, index) => (
            <li key={index}>
              <ChipCustom label="Covid-19" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Search
