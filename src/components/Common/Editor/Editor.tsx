/* eslint-disable react/display-name */
import { memo, useCallback, useMemo, useRef } from "react"

import "react-quill/dist/quill.snow.css"

import { ImageActions } from "@xeger/quill-image-actions"
import { ImageFormats } from "@xeger/quill-image-formats"
import ReactQuill, { Quill } from "react-quill"

Quill.register("modules/imageActions", ImageActions)
Quill.register("modules/imageFormats", ImageFormats)

const Editor = memo(
  ({
    value,
    onChange
  }: {
    value: string
    onChange: (value: string) => void
  }) => {
    const editorRef: any = useRef()

    const imageHandler = useCallback(() => {
      const input: any = document.createElement("input")
      input.setAttribute("type", "file")
      input.setAttribute("accept", "image/*")
      input.click()

      input.onchange = async () => {
        const file = input.files[0]

        // file type is only image.
        if (/^image\//.test(file.type)) {
          const res: any = "https://source.unsplash.com/random"
          insertToEditor(res)
        } else {
          console.warn("You could only upload images.")
        }
      }
    }, [])

    const Editor = useMemo(() => {
      return {
        modules: {
          toolbar: {
            container: [
              [{ size: [] }],
              ["bold", "italic", "underline", "strike", "blockquote"],
              [
                { list: "ordered" },
                { list: "bullet" },
                { indent: "-1" },
                { indent: "+1" }
              ],
              ["link"],
              ["clean"],
              ["image"],
              [
                { align: "" },
                { align: "center" },
                { align: "right" },
                { align: "justify" }
              ]
            ],

            handlers: {
              image: imageHandler
            }
          },
          clipboard: {
            // toggle to add extra line breaks when pasting HTML:
            matchVisual: false
          },
          imageActions: {},
          imageFormats: {}
        },
        formats: [
          "header",
          "size",
          "font",
          "bold",
          "italic",
          "underline",
          "strike",
          "blockquote",
          "list",
          "bullet",
          "indent",
          "link",
          "image",
          "video",
          "align",
          "float",
          "alt",
          "height",
          "width",
          "style"
        ]
      }
    }, [imageHandler])

    function insertToEditor(url: string) {
      const quillObj = editorRef?.current?.getEditor()
      const range = quillObj?.getSelection()
      quillObj.insertEmbed(range.index, "image", url)
    }

    const onChangeVaule = (values: string) => {
      const val = values === "<p><br></p>" ? "" : values
      onChange(val)
    }

    return (
      <ReactQuill
        modules={Editor.modules}
        formats={Editor.formats}
        theme="snow"
        value={value}
        onChange={onChangeVaule}
        ref={editorRef}
      />
    )
  }
)

export default Editor
