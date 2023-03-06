import Image, { ImageProps } from "next/image"
import { useState } from "react"
interface IProps extends ImageProps {
  classNameImage?: string
}

const ImageCustom = ({ classNameImage, ...props }: IProps) => {
  const [isReady, setIsReady] = useState(false)
  const onLoadCallback = () => {
    setIsReady(true)
  }
  return (
    <Image
      className={`${classNameImage}bg-gray-400 transition duration-1000 ${
        isReady ? "scale-100 bg-gray-400 blur-0" : "scale-120 blur-2xl"
      }`}
      {...props}
      onLoadingComplete={onLoadCallback}
      alt={props.alt}
    />
  )
}

export default ImageCustom
