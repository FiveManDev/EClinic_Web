import classNames from "classnames"
import { useState, useRef, useEffect } from "react"

export type Option = {
  label: string
  value: string
}

type SelectProps = {
  options: Option[]
  // eslint-disable-next-line no-unused-vars
  onSelectOption: (option: Option) => void
  className?: string
  placeholder: string
}

export const SelectCustom = ({
  options,
  onSelectOption,
  className,
  placeholder
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState<Option | null>(null)
  const selectRef = useRef<HTMLDivElement>(null)

  const handleSelectOption = (option: Option) => {
    setSelectedOption(option)
    onSelectOption(option)
    setIsOpen(false)
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (
      selectRef.current &&
      !selectRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    window.addEventListener("click", handleClickOutside)
    return () => window.removeEventListener("click", handleClickOutside)
  }, [])

  return (
    <div
      className={classNames("relative min-w-[200px] h-10", className)}
      ref={selectRef}
    >
      <button
        type="button"
        className="flex items-center w-full h-full py-2 pl-3 pr-10 text-left bg-white border border-gray-300 border-solid rounded-md outline-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>
          {selectedOption ? (
            selectedOption.label
          ) : (
            <span className="text-gray-400">{placeholder}</span>
          )}
        </span>
        <div
          className={classNames(
            "grid place-items-center absolute top-2/4 right-2 pt-px w-5 h-5  -translate-y-2/4 transition-all",
            isOpen ? "rotate-180" : "rotate-0"
          )}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="#c5c5c5"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        </div>
      </button>
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } absolute z-50 mt-1 w-full rounded-md bg-white shadow-lg transition-all duration-300 ease-in-out transform origin-top`}
        style={{
          transformOrigin: "top",
          transform: isOpen ? "scaleY(1)" : "scaleY(0.5)",
          opacity: isOpen ? "1" : "0",
          visibility: isOpen ? "visible" : "hidden",
          zIndex: isOpen ? "50" : "-1"
        }}
      >
        <ul className="w-full p-3 overflow-auto font-sans text-sm font-normal bg-white border rounded-md shadow-lg max-h-96 border-blue-gray-50 shadow-blue-gray-500/10 text-blue-gray-500 focus:outline-none">
          {options.map((option) => (
            <li
              key={option.value}
              className="pt-[9px] pb-2 px-3 rounded-md leading-tight select-none hover:bg-blue-gray-50 focus:bg-blue-gray-50 hover:bg-opacity-80 focus:bg-opacity-80 hover:text-blue-gray-900 focus:text-blue-gray-900 outline outline-0 transition-all cursor-pointer hover:bg-gray-100"
              onClick={() => handleSelectOption(option)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
