import CustomButton from "components/User/Button"
import React from "react"
import { useTranslation } from "react-i18next"
import CardBlog from "./components/CardBlog/CardBlog"

const Blog = () => {
  const { t } = useTranslation("home")

  return (
    <section className="flex flex-col w-full ">
      <h3 className="mb-3 text-center heading-section ">{t("blog.title")}</h3>
      <div className="grid grid-cols-1 mt-4 gap-y-2 md:gap-x-6 md:grid-cols-3">
        <CardBlog />
        <CardBlog />
        <CardBlog />
      </div>
      <CustomButton kind="secondary" className="max-w-[200px] mx-auto mt-6">
        {t("blog.btn")}
      </CustomButton>
    </section>
  )
}

export default Blog
