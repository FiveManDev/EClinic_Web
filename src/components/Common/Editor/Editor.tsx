// //@ts-nocheck
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic"
// import { CKEditor } from "@ckeditor/ckeditor5-react"
// import { FileLoader } from "@ckeditor/ckeditor5-upload/src/filerepository"
// import { Editor } from "@ckeditor/ckeditor5-core"

// interface CKeditorProps {
//   onChange: (data: string) => void
//   value: string
// }

// interface UploadAdapter {
//   upload: () => Promise<{ default: string }>
// }

// export default function CKeditor({ onChange, value }: CKeditorProps) {
//   function uploadAdapter(loader: FileLoader): UploadAdapter {
//     return {
//       upload: () => {
//         return new Promise((resolve, reject) => {
//           const body = new FormData()
//           loader.file.then((file) => {
//             body.append("files", file)
//             resolve({
//               default: "https://source.unsplash.com/random"
//             })
//           })
//         })
//       }
//     }
//   }

//   function uploadPlugin(editor: Editor) {
//     editor.plugins.get("FileRepository").createUploadAdapter = (
//       loader: FileLoader
//     ) => {
//       return uploadAdapter(loader)
//     }
//   }

//   return (
//     <>
//       <CKEditor
//         editor={ClassicEditor}
//         data={value}
//         onChange={(_, editor: Editor) => {
//           const data = editor.getData()
//           onChange(data)
//         }}
//         config={{
//           extraPlugins: [uploadPlugin]
//         }}
//       />
//     </>
//   )
// }
/* eslint-disable react/display-name */
import { memo, useCallback, useMemo, useRef } from "react"

import "react-quill/dist/quill.snow.css"

import { ImageActions } from "@xeger/quill-image-actions"
import { ImageFormats } from "@xeger/quill-image-formats"
import ReactQuill, { Quill } from "react-quill"

Quill.register("modules/imageActions", ImageActions)
Quill.register("modules/imageFormats", ImageFormats)

const Editor = memo(({ value, onChange }: any) => {
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

  const onChangeVaule = (values: any) => {
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
})

export default Editor
