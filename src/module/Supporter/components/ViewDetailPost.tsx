// @ts-nocheck
import {
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip
} from "@mui/material"
import Field from "components/Common/Field/Field"
import ImageCustom from "components/Common/ImageCustom"
import Label from "components/Common/Label/Label"
import CustomButton from "components/User/Button"
import { useGetAnwerByPostId } from "hooks/query/forum/useForum"
import HTMLReactParser from "html-react-parser"
import { useState } from "react"
import { AiOutlineQuestionCircle } from "react-icons/ai"
import { IPost } from "types/Post"
type Props = {
  post: IPost
}
const ViewDetailPost = ({ post }: Props) => {
  const [open, setOpen] = useState(false)
  const { data, isLoading } = useGetAnwerByPostId(post.id)
  if (isLoading) {
    return <p>Loading</p>
  }
  const handleClose = () => {
    setOpen(!open)
  }
  return (
    <>
      <CustomButton
        kind="primary"
        className="mx-auto"
        onClick={() => setOpen(true)}
      >
        Detail
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
                <span> Anwer of doctor</span>
              </div>
            </Label>
            <article className="entry-content ">
              {HTMLReactParser(data.data.content)}
            </article>
          </Field>
          <Field>
            <Label htmlFor="title">
              <div className="flex items-center space-x-1">
                <span> Tags for post </span>
              </div>
            </Label>
            <div className="flex gap-2">
              {data?.data.hashTags.map((tag, index) => (
                <Chip
                  label={tag.hashtagName}
                  key={index}
                  color="success"
                  variant="outlined"
                />
              ))}
            </div>
          </Field>
        </DialogContent>
        <DialogActions>
          <CustomButton kind="secondary" onClick={handleClose}>
            Close
          </CustomButton>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default ViewDetailPost
