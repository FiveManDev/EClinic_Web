import classNames from "classnames"
import { useImageFile } from "hooks/useImageFile"
import Image from "next/image"
import {
  ChangeEvent,
  DetailedHTMLProps,
  InputHTMLAttributes,
  useEffect
} from "react"
import { toast } from "react-hot-toast"
import { isImage } from "shared/helpers/helper"
import ImageCustom from "../ImageCustom"

interface UpdateCoverProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  imageUrl: string | null
  // eslint-disable-next-line no-unused-vars
  onFileChange: (file: File) => void
  isError?: boolean
}
export const UpdateCover = ({
  imageUrl = null,
  onFileChange,
  isError = false,
  ...props
}: UpdateCoverProps) => {
  const { image, handleImageChange, setImage } = useImageFile(imageUrl)
  const onImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = handleImageChange(e)
    if (isImage(file!)) {
      onFileChange(file!)
    } else {
      toast.error("File is not image type")
    }
  }
  useEffect(() => {
    if (typeof imageUrl === "string" || !imageUrl) {
      setImage(imageUrl)
    }
  }, [imageUrl])
  return (
    <div className="relative flex justify-center w-full ">
      {image && (
        <div
          className="absolute top-0 right-0 z-20 flex items-center justify-center w-6 h-6 text-white transition-all bg-black rounded-full cursor-pointer -translate-x-2/4 translate-y-2/4 bg-opacity-40 hover:bg-opacity-30 hover:scale-105"
          onClick={(e) => {
            e.stopPropagation()
            setImage("")
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
      )}
      <label
        className={classNames(
          "relative flex flex-col items-center justify-center w-full h-72 p-3 transition-all border border-gray-400 border-dashed cursor-pointer bg-gray-50 rounded-xl hover:bg-gray-100 hover:border-gray-300",
          isError && "border-red-500"
        )}
      >
        {image ? (
          <ImageCustom
            src={image}
            priority
            fill
            alt="avatar"
            className="object-cover rounded-xl"
          />
        ) : (
          <div className="flex items-center gap-x-3">
            <div className="relative w-[200px] h-[170px]">
              <Image
                src={"/images/upload.svg"}
                fill
                alt="upload"
                className="object-cover "
              />
            </div>
            <div className="flex flex-col space-y-1">
              <h3 className="pt-1 text-2xl font-semibold tracking-wider text-h1">
                Drop or Select Image
              </h3>
              <p className="text-xs text-disable">
                Drop image here or click browse thorough your machine
              </p>
            </div>
          </div>
        )}

        <input
          {...props}
          type="file"
          className="opacity-0"
          onChange={(e) => onImageChange(e)}
        />
      </label>
    </div>
  )
}
