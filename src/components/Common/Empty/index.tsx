import classNames from "classnames"
import Image from "next/image"
import React from "react"
interface Props extends React.HTMLProps<HTMLDivElement> {
  message?: string
  classNameImage?: string
}

const EmtyData = ({
  message = "No data available",
  className,
  classNameImage,
  ...props
}: Props) => {
  return (
    <div
      className={classNames(
        "flex flex-col items-center justify-center gap-x-1",
        className
      )}
      {...props}
    >
      <div className={classNames("relative h-36 w-28", classNameImage)}>
        <Image
          src={"/images/empty-data.png"}
          alt="data-empty"
          fill
          className="object-contain"
        />
      </div>
      <p className="text-disable">{message}</p>
    </div>
  )
}

export default EmtyData
