import styled from "@emotion/styled"
import { ReactNode } from "react"
import { hexToRGBA } from "shared/helpers/helper"
interface Props {
  className?: string
  children: ReactNode
  color?: string
}

const TagWrapper = styled.div`
  width: fit-content;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => hexToRGBA(props.color, 20)};
  color: ${(props) => props.color};
  padding: 8px 16px;
  border-radius: 8px;
`
const Tag = ({ className, color = "235EE8", children }: Props) => {
  return (
    <TagWrapper color={color}>
      <span>{children}</span>
    </TagWrapper>
  )
}

export default Tag
