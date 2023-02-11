import classNames from "classnames"
import { TextareaHTMLAttributes } from "react"

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  classCustom?: string
}

const TextAreaCustom = ({ classCustom, className, ...rest }: Props) => {
  return (
    <div
      className={classNames(
        "w-full px-[6px] py-2 flex items-center space-x-2 input-hover",
        classCustom
      )}
    >
      <textarea
        className={classNames(
          "w-full h-full bg-transparent border-none outline-none  text-sm ",
          className
        )}
        {...rest}
      />
    </div>
  )
}

export default TextAreaCustom
