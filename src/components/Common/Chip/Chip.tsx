import classNames from "classnames"

interface Props {
  label: string
  className?: string
}

const ChipCustom = ({ label, className, ...props }: Props) => {
  return (
    <div
      className={classNames(
        " px-3 py-1 md:h-[34px] md:px-5 md:py-2 w-max bg-[#F3F6FD] rounded-sm md:rounded-[4px] font-semibold text-h1 flex items-center justify-center text-xs md:text-sm hover:bg-primary hover:text-white transition-all cursor-pointer",
        className
      )}
      {...props}
    >
      {label}
    </div>
  )
}

export default ChipCustom
