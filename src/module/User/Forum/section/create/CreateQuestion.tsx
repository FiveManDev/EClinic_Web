import InputCustom from "components/Common/Input/InputCustom"
import TextAreaCustom from "components/Common/Textarea/TextAreaCustom"
import CustomButton from "components/User/Button"
import { useTranslation } from "react-i18next"
import UploadImages from "./UploadImage"
const CreateQuestion = () => {
  const { t } = useTranslation("forum")

  return (
    <div className="flex flex-col justify-start space-y-4 background-primary">
      <h3 className="text-xl">{t("questionTitleHeading")}</h3>
      <InputCustom className="max-w-[412px]" placeholder={t("inputTitle")} />
      <TextAreaCustom
        classCustom="max-w-full h-[185px] "
        className="resize-none"
        placeholder={t("textareaDesc")}
      />
      <UploadImages />
      <CustomButton kind="primary" className="md:max-w-[182px] rounded-[4px]">
        {t("btnUpload")}
      </CustomButton>
    </div>
  )
}

export default CreateQuestion
