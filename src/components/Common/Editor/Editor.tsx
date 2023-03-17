// @ts-nocheck
import dynamic from "next/dynamic"
import React, { useRef } from "react"
import { ReactQuillProps } from "react-quill"
import "react-quill/dist/quill.snow.css"
const ReactQuill = dynamic(
  () => import("react-quill").then((module) => module.default),
  {
    ssr: false
  }
)
interface Props {
  className?: string
  value: string
  onChange: (value: string) => void
  placeholder: string
}

const Editor: React.FC<Props> = ({
  className,
  placeholder,
  value,
  onChange
}) => {
  const quillRef = useRef<ReactQuillProps>(null)

  return (
    <ReactQuill
      className={`${className} `}
      placeholder={placeholder}
      ref={quillRef}
      value={value}
      onChange={onChange}
      modules={{
        toolbar: [
          [{ header: [1, 2, false] }],
          ["bold", "italic", "underline", "strike", "blockquote"],
          [{ list: "ordered" }, { list: "bullet" }],
          [{ align: [] }],
          ["link"],
          ["clean"]
        ]
      }}
    />
  )
}

export default Editor
