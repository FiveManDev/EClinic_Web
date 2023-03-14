// export default UploadImage
import Image from "next/image"
import React, { ChangeEvent, useEffect, useState } from "react"
import { HiOutlineXMark } from "react-icons/hi2"

interface ImageItem {
  key: string
  file: File
  url: string
}
interface IProps {
  // eslint-disable-next-line no-unused-vars
  onChange: (files: File[]) => void
}
const UploadImage = ({ onChange }: IProps) => {
  const [images, setImages] = useState<ImageItem[]>([])
  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (images.length < 5) {
      if (event.target.files !== null && event.target.files?.length > 0) {
        const url = URL.createObjectURL(event.target.files[0])
        setImages([
          ...images,
          {
            file: event.target.files[0],
            key: images.length.toString(),
            url
          }
        ])
      }
    }
  }
  const removeImage = (key: string) => {
    const newImages = images.filter((item) => item.key !== key)
    setImages(newImages)
  }
  useEffect(() => {
    if (onChange) {
      const fileImages = images.map((item) => item.file)
      onChange(fileImages)
    }
  }, [images])
  return (
    <>
      <div className="flex items-center gap-x-3">
        {images &&
          images.map((img) => (
            <div className="relative group" key={img.key}>
              <div className="relative z-10 overflow-hidden rounded-sm w-28 h-28">
                <Image src={img.url} fill alt="avatar" className="z-10" />
              </div>
              <div
                className="absolute top-0 right-0 z-20 p-1 text-xl text-white transition-all opacity-25 cursor-pointer group-hover:opacity-100"
                onClick={() => removeImage(img.key)}
              >
                <HiOutlineXMark />
              </div>
            </div>
          ))}
        <label className="relative flex flex-col items-center justify-center transition-all border-gray-400 border-dashed cursor-pointer border-1 w-28 h-28 hover:bg-gray-100 hover:border-gray-300">
          <div className="flex flex-col items-center justify-center ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-12 h-12 text-gray-400 group-hover:text-gray-600"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                clipRule="evenodd"
              />
            </svg>
            <p className="pt-1 text-xs tracking-wider text-gray-400 group-hover:text-gray-600">
              Select a photo
            </p>
          </div>
          <input
            type="file"
            className="opacity-0"
            onChange={handleImageChange}
          />
        </label>
      </div>
    </>
  )
}

export default UploadImage
