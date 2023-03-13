import { Button } from "@mui/material"
import InputCustom from "components/Common/Input/InputCustom"
import TextAreaCustom from "components/Common/Textarea/TextAreaCustom"
import CustomButton from "components/User/Button"
import {
  CreatePostForum,
  useCreatePostMutation
} from "hooks/query/forum/useForum"
import { NextRouter, useRouter } from "next/router"
import { useState } from "react"
import { toast } from "react-hot-toast"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { routers } from "shared/constant/constant"
import { RootState } from "store/store"
import UploadImages from "./UploadImage"
type KeyCreatePost = keyof CreatePostForum
const CreateQuestion = () => {
  const { t } = useTranslation("forum")
  const router = useRouter()
  const auth = useSelector((state: RootState) => state.auth)
  const [post, setPost] = useState<CreatePostForum>({
    content: "",
    images: [],
    title: ""
  })
  const createPostMutation = useCreatePostMutation()
  const handleChangePost = (type: KeyCreatePost, data: any) => {
    setPost((prevPost) => ({
      ...prevPost,
      [type]: data
    }))
  }
  const handleFileImageChange = (files: File[]) => {
    if (files !== null) {
      setPost((prevState) => ({
        ...prevState,
        images: files
      }))
    }
  }
  const handleSubmit = () => {
    if (post && auth.user.userId) {
      console.log("handleSubmit ~ post:", post)
      createPostMutation.mutate(post, {
        onError: () => {
          toast.error("Add error")
        },
        onSuccess: () => {
          toast.success("Create post successfuly!")
        }
      })
    } else {
      Toast(router)
    }
  }
  return (
    <div className="flex flex-col justify-start space-y-4 background-primary">
      <h3 className="text-xl">{t("questionTitleHeading")}</h3>
      <InputCustom
        className="max-w-[412px]"
        value={post.title}
        placeholder={t("inputTitle")}
        onChange={(e) => handleChangePost("title", e.target.value)}
      />
      <TextAreaCustom
        value={post.content}
        classCustom="max-w-full h-[185px] "
        className="resize-none"
        placeholder={t("textareaDesc")}
        onChange={(e) => handleChangePost("content", e.target.value)}
      />
      <UploadImages onChange={(value) => handleFileImageChange(value)} />
      <CustomButton
        kind="primary"
        className="md:max-w-[182px] rounded-[4px]"
        onClick={handleSubmit}
      >
        {t("btnUpload")}
      </CustomButton>
    </div>
  )
}
function Toast(router: NextRouter) {
  return toast((t) => (
    <div className="flex items-center gap-x-2">
      <p className="flex-shrink-0 font-medium text-h1">
        Please login to create question
      </p>
      <Button
        color="primary"
        size="small"
        onClick={() => {
          toast.dismiss(t.id)
          router.push(routers.signIn)
        }}
      >
        Login
      </Button>
    </div>
  ))
}

export default CreateQuestion
