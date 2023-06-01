import { ChangeEvent, useState } from "react"

export const useImageFile = (imageUrl: string | null) => {
  const [image, setImage] = useState(imageUrl)
  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files !== null && event.target.files?.length > 0) {
      const objectUrl = URL.createObjectURL(event.target.files[0])
      setImage(objectUrl)
      return event.target.files[0]
    }
  }
  return { image, setImage, handleImageChange }
}
