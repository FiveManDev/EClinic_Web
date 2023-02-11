import { ButtonHTMLAttributes, ReactNode } from "react"

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string
  icon: ReactNode
}

const ButtonIcon = ({ text, icon, ...props }: Props) => {
  return (
    <button
      {...props}
      className={`flex items-center space-x-2 outline-none border-none py-3 md:py-4 px-4 md:px-6 rounded-md mx-auto cursor-pointer transition-all hover:bg-opacity-75 ${props.className}`}
    >
      <span>{icon}</span>
      <span className="font-bold text-[12px] leading-[18px] text-[#4E5D78] ">
        {text}
      </span>
    </button>
  )
}

export default ButtonIcon
