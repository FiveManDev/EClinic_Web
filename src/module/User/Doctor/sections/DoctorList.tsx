import PaginationCustom from "components/Common/Pagination"
import { useGetDoctorProfilesQuery } from "hooks/query/profile/useProfile"
import { useState } from "react"
import { getDataPaginate } from "shared/helpers/helper"
import CardDoctor, { CardDoctorSkeleton } from "../components/card/CardDoctor"
interface IProps {
  searchText: string
}
const DoctorList = ({ searchText }: IProps) => {
  const [pagination, setPagination] = useState({
    pageIndex: 1,
    pageSize: 10
  })

  const { data, isLoading } = useGetDoctorProfilesQuery({
    searchText,
    pageNumber: pagination.pageIndex + 1,
    pageSize: pagination.pageSize
  })
  const paginateData = getDataPaginate(data)

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:gap-8 lg:grid-cols-2">
        {!isLoading
          ? data?.data.data.map((doctor) => (
              <CardDoctor doctor={doctor} key={doctor.userID} />
            ))
          : Array(6)
              .fill(0)
              .map((_, index) => <CardDoctorSkeleton key={index} />)}
      </div>
      <PaginationCustom
        onPageChange={(value) =>
          setPagination({ ...pagination, pageIndex: value })
        }
        pagination={paginateData}
        color="primary"
        className="pt-6 md:ml-auto md:w-fit"
        shape="rounded"
      />
    </>
  )
}

export default DoctorList
