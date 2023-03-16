// @ts-nocheck
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip
} from "@mui/material"
import { useQueryClient } from "@tanstack/react-query"
import Editor from "components/Common/Editor/Editor"
import Field from "components/Common/Field/Field"
import ImageCustom from "components/Common/ImageCustom"
import Label from "components/Common/Label/Label"
import Spinner from "components/Common/Loading/LoadingIcon"
import CustomButton from "components/User/Button"
import {
  CreateAnwserPost,
  useCreateAwnserPostForumMutation
} from "hooks/query/forum/useForum"
import { useState } from "react"
import { toast } from "react-hot-toast"
import { AiOutlineQuestionCircle } from "react-icons/ai"
import { QUERY_KEYS } from "shared/constant/constant"
import { IPost } from "types/Post"
import MultipleSelectChip from "../components/SelectMutitple"
type Props = {
  post: IPost
}
const UpdateQuestion = ({ post }: Props) => {
  const queryClient = useQueryClient()
  const [anwerData, setAnerData] = useState<CreateAnwserPost>({
    postId: post.id,
    content: "",
    tags: []
  })
  const [open, setOpen] = useState(false)
  const createAwnserPostForumMutation = useCreateAwnserPostForumMutation()
  const handleClose = () => {
    setOpen(!open)
  }
  const handleChangeAnwerData = (key: keyof CreateAnwserPost, value) => {
    setAnerData((prevState) => ({
      ...prevState,
      [key]: value
    }))
  }
  const handleSubmit = () => {
    if (
      anwerData.content &&
      anwerData.content !== "<p><br></p>" &&
      anwerData.tags.length > 0
    ) {
      createAwnserPostForumMutation.mutate(anwerData, {
        onSuccess: () => {
          queryClient.invalidateQueries([QUERY_KEYS.FORUM.POST])
          toast.success("Create answer successfully")
          setOpen(!open)
        },
        onError: () => {
          toast.error("Create answer failed")
        }
      })
    } else {
      toast.error("Please fill out the information completely")
    }
  }
  return (
    <>
      <CustomButton
        kind="primary"
        className="mx-auto"
        onClick={() => setOpen(true)}
      >
        Create awnser
      </CustomButton>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="lg"
        scroll="paper"
      >
        <DialogTitle>{"Anwers the question here"}</DialogTitle>
        <DialogContent>
          <Field>
            <Label htmlFor="title">
              <div className="flex items-center space-x-1">
                <span> Title of post </span>
              </div>
            </Label>
            <h3 className="text-xl font-semibold">{post.title}</h3>
          </Field>
          <Field>
            <Label htmlFor="title">
              <div className="flex items-center space-x-1">
                <span> Description of question </span>
              </div>
            </Label>
            <h3 className="text-base font-normal text-gray-700">
              {post.content}
            </h3>
          </Field>
          <Field>
            <Label htmlFor="content">Picture of disease symptoms</Label>
            <div className="grid w-full grid-cols-2 gap-3">
              {post.image.map((item, index) => (
                <div
                  className="relative w-full h-[300px] overflow-hidden"
                  key={index}
                >
                  <ImageCustom
                    src={item}
                    fill
                    alt="post"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </Field>
          <Field>
            <Label htmlFor="content">
              <div className="flex items-center space-x-1">
                <span> Fill your anwers here</span>
                <span>
                  <Tooltip
                    title="The answer must be clear and precise with specific evidence"
                    placement="top"
                  >
                    <IconButton size="small">
                      <AiOutlineQuestionCircle />
                    </IconButton>
                  </Tooltip>
                </span>
              </div>
            </Label>
            <Editor
              className="w-full entry-content custom-quill"
              value={anwerData.content}
              onChange={(value) => handleChangeAnwerData("content", value)}
            />
          </Field>
          <Field>
            <Label htmlFor="title">
              <div className="flex items-center space-x-1">
                <span> Tags for post </span>
                <span>
                  <Tooltip title="Choose hashtag of the post" placement="top">
                    <IconButton size="small">
                      <AiOutlineQuestionCircle />
                    </IconButton>
                  </Tooltip>
                </span>
              </div>
            </Label>
            <MultipleSelectChip
              hashTags={anwerData.tags}
              handleChange={(value) =>
                handleChangeAnwerData("tags", [...value])
              }
            />
          </Field>
        </DialogContent>
        <DialogActions>
          <CustomButton kind="secondary" onClick={handleClose}>
            Close
          </CustomButton>
          <CustomButton
            disabled={createAwnserPostForumMutation.isLoading}
            kind="primary"
            onClick={handleSubmit}
          >
            {createAwnserPostForumMutation.isLoading ? <Spinner /> : "Save"}
          </CustomButton>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default UpdateQuestion
