import CustomButton from "components/User/Button"
import UserSecondaryLayout from "layout/User/UserSecondaryLayout"
import Head from "next/head"
import React, { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { IBreadcrum } from "types/Base.type"
import FilterBar from "./section/filterBar/FilterBar"
import ListServices from "./section/ListServices/ListServices"

const ServicesPage = () => {
  const { t } = useTranslation(["base"])
  const [showFilter, setShowFilter] = React.useState(false)
  useEffect(() => {
    if (window.innerWidth > 768) {
      setShowFilter(true)
    }
  }, [])
  const breadrums: IBreadcrum[] = [
    { label: t("base:pages.home"), href: "/" },
    { label: t("base:pages.servies") }
  ]
  return (
    <>
      <Head>
        <title>Forum page</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/favicon.png" />
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
          />
          <div className="flex-1 md:ml-16">
            <ListServices />
          </div>
        </div>
      </UserSecondaryLayout>
    </>
  )
}

export default ServicesPage
