import { yupResolver } from "@hookform/resolvers/yup"
import {
  Box,
  Chip,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent
} from "@mui/material"
import SwitchCustom from "components/Common/IOSSwitch"
import { UpdateCover } from "components/Common/UpLoadImage"
import CustomButton from "components/User/Button"
import { CustomInput } from "components/User/Input"
import { error } from "console"
import {
  CreatePostBlog,
  useCreateBlogPostMutation,
  useGetAllHashTag
} from "hooks/query/blog/useBlog"
import dynamic from "next/dynamic"
import { useEffect } from "react"
import { FieldValues, useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { HashTag } from "types/Base.type"
import { IBlog } from "types/Blog"
import * as yup from "yup"
const Editor = dynamic(() => import("components/Common/Editor/Editor"), {
  ssr: false
})
const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
}
const schema = yup.object({
  title: yup.string().required("Please enter title"),
  content: yup.string().required("Please enter content"),
  metaTitle: yup.string().required("Please enter meta title"),
  metaDescription: yup.string().required("Please enter meta description"),
  metaKeywords: yup.string().required("Please enter meta keywords"),
  hashtags: yup
    .array()
    .min(1, "Please choose at least one hashtag")
    .required("Please choose hashtag")
})
interface Props {
  labelForm: string
  post?: IBlog
  mode?: "update" | "create"
}
const CreateBlog = ({ labelForm, post, mode = "create" }: Props) => {
  // const confirm = useConfirm()
  const hashTags = useGetAllHashTag()
  const createPost = useCreateBlogPostMutation()
  // const updateProfileDoctorMutation = useUpdateProfileDoctorMutation()
  const {
    handleSubmit,
    control,
    watch,
    reset,
    setValue,
    formState: { errors }
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(schema),
    defaultValues: post
  })
  const hashTagSelected = watch("hashtags")
  const watchDesc = watch("content")
  const watchCoverImage = watch("coverImage")
  const watchIsActive = watch("isActive", post?.isActive ? true : false)
  const onFileChange = (file: File) => {
    setValue("coverImage", file)
  }
  const onSubmit = async (value: FieldValues) => {
    const newHashTags = value.hashtags.map((item: HashTag) => item.hashtagID)
    if (mode === "update") {
      // if (confirm) {
      //   const choice = await confirm({
      //     title: "Update account",
      //     content: "Are you sure you want to update this profile?"
      //   })
      //   if (choice) {
      //     updateProfileDoctorMutation.mutate(
      //       {
      //         ...value
      //       } as UpdateDoctorProfile,
      //       {
      //         onSuccess: (data) => {
      //           if (data.isSuccess) {
      //             toast.success("Update successfuly")
      //           } else {
      //             toast.error("Update error")
      //           }
      //         },
      //         onError: () => {
      //           toast.error("Update error")
      //         }
      //       }
      //     )
      //   }
      // }
    } else {
      createPost.mutate(
        {
          ...value,
          hashtagId: newHashTags
        } as CreatePostBlog,
        {
          onSuccess: (data) => {
            if (data?.isSuccess) {
              toast.success("Create a post successfuly")
              resetForm()
            } else {
              toast.error("Add error")
            }
          },
          onError: () => {
            toast.error("Add error")
          }
        }
      )
    }
  }
  const resetForm = () => {
    reset({
      title: "",
      content: "",
      coverImage: "",
      hashtags: [],
      isActive: false,
      metaDescription: "",
      metaKeywords: "",
      metaTitle: ""
    })
  }
  useEffect(() => {
    if (post === undefined) {
      resetForm()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post])
  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value }
    } = event
    let newHashtags: HashTag[] = []
    if (typeof value === "string") {
      newHashtags =
        hashTags.data?.data.data.filter((item) => {
          if (item.hashtagID === value) {
            return item
          }
        }) || []
    } else {
      newHashtags =
        hashTags.data?.data.data.filter((item) => {
          if (value.some((has) => has === item.hashtagID)) {
            return item
          }
        }) || []
    }
    setValue("hashtags", newHashtags)
  }
  const getHashtagName = (hashtagID: string) => {
    const selectedTag = hashTags.data?.data.data.find(
      (tag) => tag.hashtagID === hashtagID
    )
    return selectedTag ? selectedTag.hashtagName : ""
  }
  return (
    <form className="grid grid-cols-8 gap-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="col-span-5 background-primary">
        <h3 className="pb-4 text-lg font-medium">{labelForm}</h3>
        <div className="flex flex-col justify-start">
          <div className="flex flex-col space-y-5">
            <CustomInput
              size="medium"
              label="Post title"
              control={control}
              name="title"
              error={!!errors.title}
              helperText={errors.title?.message?.toString()}
            />
            <div className="flex flex-col">
              <UpdateCover
                onFileChange={onFileChange}
                imageUrl={watchCoverImage || null}
              />
            </div>

            <div className="flex flex-col gap-y-2">
              <span className="text-gray-500">Content</span>
              <Editor
                onChange={(data: string) => {
                  setValue("content", data)
                }}
                value={watchDesc}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="col-span-3">
        <div className="flex flex-col py-8 space-y-6 background-primary">
          <div className="flex items-center justify-between w-full">
            <span className="text-base font-medium text-black2">Publish</span>
            <SwitchCustom
              checked={watchIsActive}
              onChange={() => setValue("isActive", !watchIsActive)}
            />
          </div>
          <FormControl>
            <InputLabel>Chip</InputLabel>
            <Select
              multiple
              value={hashTagSelected?.map((item) => item.hashtagID) || []}
              onChange={handleChange}
              error={!!errors.hashtags}
              input={<OutlinedInput label="Tags" />}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={getHashtagName(value)} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {hashTags.data?.data.data.map((name) => (
                <MenuItem key={name.hashtagID} value={name.hashtagID}>
                  {name.hashtagName}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText error>{errors.hashtags?.message}</FormHelperText>
          </FormControl>
          <CustomInput
            size="medium"
            label="Meta title"
            control={control}
            name="metaTitle"
            error={!!errors.metaTitle}
            helperText={errors.metaTitle?.message?.toString()}
          />
          <CustomInput
            size="medium"
            multiline
            rows={3}
            label="Meta description"
            control={control}
            name="metaDescription"
            error={!!errors.metaDescription}
            helperText={errors.metaDescription?.message?.toString()}
          />
          <CustomInput
            size="medium"
            label="Meta keywords"
            control={control}
            name="metaKeywords"
            error={!!errors.metaKeywords}
            helperText={errors.metaKeywords?.message?.toString()}
          />
        </div>
        <div className="flex w-full mt-4 space-x-5">
          <CustomButton kind="secondary" className="w-full ">
            Preview
          </CustomButton>
          <CustomButton
            kind="primary"
            type="submit"
            className="w-full "
            isLoading={createPost.isLoading}
          >
            {mode === "create" ? "Post" : "Update blog"}
          </CustomButton>
        </div>
      </div>
    </form>
  )
}
export default CreateBlog
