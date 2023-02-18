import CustomButton from "components/User/Button"
import { useTranslation } from "react-i18next"
import CommemtItem from "./CommemtItem"
const Comment = () => {
  const { t } = useTranslation(["base", "forum"])

  return (
    <>
      <section className="py-4 bg-white md:py-6 ">
        <div className="w-full mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-900 lg:text-2xl ">
              {t("forum:discussion")} (20)
            </h2>
          </div>
          <form className="mb-6">
            <div className="w-full px-4 py-2 mb-4 bg-white border border-gray-200 border-solid rounded-lg rounded-t-lg ">
              <label htmlFor="comment" className="sr-only">
                Your comment
              </label>
              <textarea
                id="comment"
                rows={6}
                className="w-full px-0 text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none "
                placeholder={t("forum:writeComment")}
                required
                defaultValue={""}
              />
            </div>
            <CustomButton kind="primary" size="small" className="!h-9">
              <span className="!text-[12px]">{t("forum:btnComment")}</span>
            </CustomButton>
          </form>
          <CommemtItem />
        </div>
      </section>
    </>
  )
}

export default Comment
