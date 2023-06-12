import { Slider } from "@mui/material"
import CheckBoxCustom from "components/Common/Checkbox"
import InputCustom from "components/Common/Input"
import CustomButton from "components/User/Button"
import useDebounce from "hooks/useDebounce"
import UserSecondaryLayout from "layout/User/UserSecondaryLayout"
import Head from "next/head"
import { ChangeEvent, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { HiMagnifyingGlass } from "react-icons/hi2"
import { IBreadcrum } from "types/Base.type"
import FilterBar from "../components/filterBar/FilterBar"
import DoctorList from "./sections/DoctorList"

const DoctorPage = () => {
  const { t } = useTranslation(["base", "ser"])
  const [searchData, setSearchData] = useState("")
  const searchTextDebounce = useDebounce(searchData, 1500)

  const [showFilter, setShowFilter] = useState(false)
  const [state, setState] = useState({
    tieuhoa: false,
    nhikhoa: false
  })
  useEffect(() => {
    if (window.innerWidth > 768) {
      setShowFilter(true)
    }
  }, [])
  const breadrums: IBreadcrum[] = [
    { label: t("base:pages.home"), href: "/" },
    { label: t("base:pages.doctors") }
  ]
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked
    })
  }
  return (
    <>
      <Head>
        <title>Doctor page</title>
      </Head>
      <UserSecondaryLayout breadrums={breadrums}>
        <div className="grid grid-cols-3 gap-2 mt-6 md:mt-10 md:gap-7 md:hidden">
          <div className="col-span-3 md:hidden">
            <CustomButton
              kind="secondary"
              size="small"
              className="h-10  mx-auto w-[140px] rounded-[3px]"
              onClick={() => setShowFilter(!showFilter)}
            >
              <div className="flex items-center gap-2">
                <span>
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
                      d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
                    />
                  </svg>
                </span>
                <span>Bộ lọc</span>
              </div>
            </CustomButton>
          </div>
        </div>
        <div className="flex mt-6 md:mt-10 ">
          <FilterBar
            show={showFilter}
            onClose={() => setShowFilter(!showFilter)}
          >
            <div className="space-y-2">
              <h3>Tìm kiếm bác sĩ</h3>
              <InputCustom
                value={searchData}
                onChange={(e) => setSearchData(e.target.value)}
                icon={<HiMagnifyingGlass />}
                className="w-full md:max-w-[412px]"
                placeholder={"Search by doctor's name"}
              />
            </div>
            <div className="space-y-2">
              <h3>{t("ser:specialist.label")}</h3>
              <div className="flex flex-col ">
                <CheckBoxCustom
                  name="tieuhoa"
                  label="Tiêu hóa"
                  checked={state.tieuhoa}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="space-y-2">
              <h3>{t("ser:range.label")}</h3>
              <div className="w-[95%]">
                <Slider
                  size="medium"
                  defaultValue={1000}
                  valueLabelDisplay="auto"
                />
              </div>
            </div>
            <CustomButton
              kind="primary"
              size="small"
              className="h-10  rounded-[3px]"
            >
              <div className="flex items-center gap-2">
                <span>{t("ser:btn")}</span>
              </div>
            </CustomButton>
          </FilterBar>
          <div className="flex-1 md:ml-16">
            <DoctorList searchText={searchTextDebounce} />
          </div>
        </div>
      </UserSecondaryLayout>
    </>
  )
}

export default DoctorPage
