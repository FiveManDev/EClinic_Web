import InputCustom from "components/Common/Input/InputCustom"
import Spinner from "components/Common/Loading/LoadingIcon"
import TextAreaCustom from "components/Common/Textarea/TextAreaCustom"
import CustomButton from "components/User/Button"
import {
  CreatePostForum,
  useCreatePostMutation
} from "hooks/query/forum/useForum"
import { ToastNavigate } from "module/User/components/Toast/ToastNavigate"
import { useRouter } from "next/router"
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
      if (post.title && post.content) {
        createPostMutation.mutate(post, {
          onError: () => {
            toast.error("Add error")
          },
          onSuccess: () => {
            setPost({ content: "", images: [], title: "" })
            toast.success("Create post successfuly!")
          }
        })
      } else {
        toast.error("Please enter your title and content")
      }
    } else {
      toast((t) => (
        <ToastNavigate
          url={routers.signIn}
          t={t}
          labelButton="Login"
          router={router}
          title="Please login to create question"
        />
      ))
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
      <p>
        {" "}
        {t("desctiptionUpload.imagetitle")}{" "}
        <span className="text-sm text-gray-400">
          ({t("desctiptionUpload.note")})
        </span>
      </p>
      <CustomButton
        disabled={createPostMutation.isLoading}
        kind="primary"
        className="md:max-w-[182px] rounded-[4px]"
        onClick={handleSubmit}
      >
        {createPostMutation.isLoading ? <Spinner /> : t("btnUpload")}
      </CustomButton>
    </div>
  )
}

export default CreateQuestion
