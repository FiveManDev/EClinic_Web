import { keyframes } from "@emotion/react"
import styled from "@emotion/styled"
import React from "react"

const dualRing = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

const Loader = styled.div`
  &:after {
    content: " ";
    display: block;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    border: 4px solid #fff;
    border-color: #fff transparent #fff transparent;
    animation: ${dualRing} 1.2s linear infinite;
  }
`

const Spinner = () => {
  return <Loader />
}

export default Spinner
