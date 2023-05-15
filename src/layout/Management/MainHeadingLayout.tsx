import React, { PropsWithChildren } from "react"
interface Props extends PropsWithChildren {
  heading?: string
}
const MainHeadingLayout = ({ heading, children }: Props) => {
  return (
    <main className="px-[30px] mt-[40px]">
      {heading && (
        <h1 className="text-2xl text-black1 font-semibold mb-[30px]">
          {heading}
        </h1>
      )}
      <div className="flex flex-col gap-y-[30px]">{children}</div>
    </main>
  )
}

export default MainHeadingLayout
