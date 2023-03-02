// import { PlusOutlined } from "@ant-design/icons"
// import { message, Upload } from "antd"
// import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface"
// import React, { useState } from "react"
// import { toast } from "react-hot-toast"
// const UploadImage: React.FC = () => {
//   const [fileList, setFileList] = useState<UploadFile[]>([])
//   const [uploading, setUploading] = useState(false)

//   const handleUpload = () => {
//     const formData = new FormData()
//     fileList.forEach((file) => {
//       formData.append("files[]", file as RcFile)
//     })
//     setUploading(true)
//     // You can use any AJAX library you like
//     fetch("https://www.mocky.io/v2/5cc8019d300000980a055e76", {
//       method: "POST",
//       body: formData
//     })
//       .then((res) => res.json())
//       .then(() => {
//         setFileList([])
//         toast.success("upload successfully.")
//       })
//       .catch(() => {
//         toast.error("upload failed.")
//       })
//       .finally(() => {
//         setUploading(false)
//       })
//   }

//   const generatePreview = (file: File) => {
//     if (file) {
//       return URL.createObjectURL(file)
//     }
//     return ""
//   }

//   const props: UploadProps = {
//     onRemove: (file) => {
//       const index = fileList.indexOf(file)
//       const newFileList = fileList.slice()
//       newFileList.splice(index, 1)
//       setFileList(newFileList)
//     },
//     beforeUpload: (file: RcFile) => {
//       setFileList([...fileList, file])
//       return false
//     },
//     fileList: fileList.map((file) => {
//       return {
//         ...file,
//         status: "done",
//         url: generatePreview(file as any)
//       }
//     })
//   }
//   return (
//     <>
//       <Upload listType="picture-card" {...props}>
//         {fileList.length >= 8 ? null : (
//           <div>
//             <PlusOutlined />
//             <div style={{ marginTop: 8 }}>Upload</div>
//           </div>
//         )}
//       </Upload>
//     </>
//   )
// }

// export default UploadImage
import React from "react"

const UploadImage = () => {
  return <div>upload</div>
}

export default UploadImage
