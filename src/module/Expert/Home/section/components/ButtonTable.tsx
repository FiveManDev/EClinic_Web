import styled from "@emotion/styled"
import React from "react"

interface Props
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  icon?: React.ReactNode
  content: string
  color?: string
}

const StyledButton = styled.button`
  display: inline-flex;
  align-items: center;
  padding: 8px;
  font-size: 14px;
  font-weight: 500;
  text-align: center;
  text-decoration: none;
  border: none;
  border-radius: 4px;
  outline: none;
  cursor: pointer;
  background-color: ${(props) => props.color};
  color: #fff;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: ${(props) => props.color && `${props.color}90`};
  }

  &:active {
    transform: scale(0.95);
  }

  svg {
    width: 18px;
    height: 18px;
    margin-right: 4px;
  }
`

const ButtonTable = ({
  icon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M12 5.25a.75.75 0 01.75.75v5.25H18a.75.75 0 010 1.5h-5.25V18a.75.75 0 01-1.5 0v-5.25H6a.75.75 0 010-1.5h5.25V6a.75.75 0 01.75-.75z"
        clipRule="evenodd"
      />
    </svg>
  ),
  content,
  color = "#4FD8DE",
  ...props
}: Props) => {
  return (
    <StyledButton color={color} {...props}>
      {icon}
      <span>{content}</span>
    </StyledButton>
  )
}

export default ButtonTable
