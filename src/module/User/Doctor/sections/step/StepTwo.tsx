import Editor from "components/Common/Editor/Editor"
import { useSearchFamlyProfilesQuery } from "hooks/query/profile/useProfile"
import { UploadImage } from "module/User/Forum/section/create"
import ProfileItem from "module/User/Profile/section/profile/components/ProfileItem"
import { ChangeEvent, useState } from "react"
import { toast } from "react-hot-toast"
import { PAGE_SIZE } from "shared/constant/constant"
import { ImageItem } from "types/Base.type"
import { PropsStep } from "./StepOne"

export const StepTwo = ({ onBack }: PropsStep) => {
  const profiles = useSearchFamlyProfilesQuery(1, PAGE_SIZE, "")
  console.log("StepTwo ~ profiles:", profiles)
  const [note, setNote] = useState("")
  const [images, setImages] = useState<ImageItem[]>([])
  const removeImage = (key: string) => {
    const newImages = images.filter((item) => item.key !== key)
    setImages(newImages)
  }
  const handleFileImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (images.length < 4) {
      if (event.target.files !== null && event.target.files?.length > 0) {
        const currentFile = event.target.files[0]
        const url = URL.createObjectURL(currentFile)
        setImages([
          ...images,
          {
            file: currentFile,
            key: images.length.toString(),
            url
          }
        ])
        const imagesList = [...images.map((item) => item.file), currentFile]
      }
    } else {
      toast.error("Up to 4 images")
    }
  }
  return (
    <>
      <div className="flex items-center gap-x-3">
        <button
          className="h-[50px] w-[50px] rounded-full shadow flex items-center justify-center cursor-pointer outline-none border-none"
          onClick={() => onBack && onBack()}
        >
          <svg
            width={13}
            height={20}
            viewBox="0 0 13 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M11.6267 16.7721C12.3049 17.3945 12.3502 18.4488 11.7278 19.127C11.1054 19.8052 10.0511 19.8504 9.37294 19.2281L0.801512 11.3622C0.0812647 10.7013 0.0818923 9.56521 0.802869 8.90504L9.3743 1.05661C10.0532 0.434993 11.1074 0.481413 11.729 1.16029C12.3507 1.83916 12.3042 2.89342 11.6254 3.51503L4.39489 10.1356L11.6267 16.7721Z"
              fill="#403ECC"
            />
          </svg>
        </button>
        <span>Quay lại</span>
      </div>
      <div className="flex justify-between my-8 ">
        <div className="flex flex-col gap-y-2">
          <h3 className="text-2xl text-h1">Thông tin bổ sung</h3>
          <p className="font-light text-gray-500">Không bắt buộc</p>
        </div>
      </div>
      <div className="flex flex-col gap-y-3">
        <div className="modal-filed">
          <span className="label">Chọn hồ sơ bạn muốn đặt khám</span>
          <ul className="max-h-[600px] overflow-auto gap-2 grid grid-cols-2">
            {profiles.data?.data.data?.map((item, index) => (
              <ProfileItem
                data={item}
                key={index}
                loading={false}
                onClick={() => console.log(item)}
              />
            ))}
            {profiles.isLoading &&
              Array(2)
                .fill(0)
                .map((_, index) => (
                  <ProfileItem onClick={() => {}} key={index} loading={true} />
                ))}
          </ul>
        </div>
        <div className="modal-filed">
          <span className="label">Ghi chú</span>
          <div className="flex gap-8">
            <Editor
              placeholder="Write your anwers......"
              className="w-full entry-content custom-quill"
              value={note}
              onChange={(value) => setNote(value)}
            />
          </div>
        </div>
        <div className="modal-filed">
          <span className="label">Hình ảnh đính kèm (không bắt buộc)</span>
          <UploadImage
            images={images}
            removeImage={removeImage}
            onChange={(value) => handleFileImageChange(value)}
          />
        </div>
      </div>
    </>
  )
}
