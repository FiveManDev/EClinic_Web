import Image from "next/image"
import { useTranslation } from "react-i18next"

const CommemtItem = () => {
  const { t } = useTranslation(["base", "forum"])

  return (
    <>
      <article className="p-3 mb-3 text-base bg-white rounded-lg md:mb-6 md:p-6 ">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <p className="inline-flex items-center mr-3 text-sm text-gray-900 ">
              <div className="relative w-6 h-6 mr-2 ">
                <Image
                  src="/images/sample.png"
                  fill
                  sizes="(max-width: 768px) 50vw,
                  (max-width: 1200px) 30vw,
                  20vw"
                  alt="Michael Gough"
                  className="rounded-full"
                />
              </div>
              <span> Michael Gough</span>
            </p>
            <p className="text-sm text-gray-600 ">
              <time dateTime="2022-02-08" title="February 8th, 2022">
                Feb. 8, 2022
              </time>
            </p>
          </div>
          <button
            id="dropdownComment1Button"
            data-dropdown-toggle="dropdownComment1"
            className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-400 bg-white border-none rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 "
            type="button"
          >
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path>
            </svg>
            <span className="sr-only">Comment settings</span>
          </button>
        </div>
        <p className="text-sm font-light leading-normal text-gray-500 md:text-base">
          Very straight-to-point article. Really worth time reading. Thank you!
          But tools are just the instruments for the UX designers. The knowledge
          of the design tools are as important as the creation of the design
          strategy.
        </p>
        <div className="flex items-center mt-4 space-x-4">
          <button
            type="button"
            className="flex items-center text-sm text-gray-500 bg-transparent border-none outline-none hover:underline "
          >
            <svg
              aria-hidden="true"
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            {t("forum:reply")}
          </button>
        </div>
      </article>
    </>
  )
}

export default CommemtItem
