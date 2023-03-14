import { Pagination, PaginationProps } from "@mui/material"
import React from "react"
import { IPagination } from "types/Pagination"

interface IProps extends PaginationProps {
  pagination: IPagination
  // eslint-disable-next-line no-unused-vars
  onPageChange: (page: number) => void
}

const PaginationCustom: React.FC<IProps> = ({
  pagination,
  onPageChange,
  ...props
}) => {
  const { PageIndex, TotalPages, HasPrevious, HasNext } = pagination

  return (
    <Pagination
      page={PageIndex}
      count={TotalPages}
      onChange={(_, page) => onPageChange(page)}
      hideNextButton={!HasNext}
      hidePrevButton={!HasPrevious}
      {...props}
    />
  )
}
export default PaginationCustom
