import styled from "@emotion/styled"
import React, { PropsWithChildren } from "react"

interface Props extends PropsWithChildren {
  heading: string
}
const Wrapper = styled.div`
  .MuiPaper-root.MuiPaper-rounded.MuiPaper-elevation {
    box-shadow: none !important;
    padding-left: 0;
    padding-right: 0;
    .MuiToolbar-root {
      border-top: 1px solid #eeee;
    }
  }
`
const WrapperHeading = ({ heading, children }: Props) => {
  return (
    <>
      <Wrapper className="flex flex-col w-full bg-white rounded-lg">
        <h3 className="p-4 text-xl font-semibold text-gray80">{heading}</h3>
        {children}
      </Wrapper>
    </>
  )
}

export default WrapperHeading
