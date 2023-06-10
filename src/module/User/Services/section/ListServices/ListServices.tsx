import React, { useState } from "react"
import CardService from "../../components/CardService"
import { useGetAllServicePackageQuery } from "hooks/query/service/useService"
import { ServicePackage } from "types/Service"
import { IPagination } from "types/Pagination"
import PaginationCustom from "components/Common/Pagination"

const ListServices = () => {
  const [pageIndex, setPageIndex] = useState(1)
  const { data } = useGetAllServicePackageQuery({
    pageNumber: 1,
    pageSize: 12
  })
  const servicePackages: ServicePackage[] = data?.data?.data as ServicePackage[]
  const paginateData = data?.headers["x-pagination"]
    ? (JSON.parse(data.headers["x-pagination"]) as IPagination)
    : {
      PageIndex: pageIndex,
      PageSize: 0,
      TotalCount: 0,
      TotalPages: 0,
      HasPrevious: false,
      HasNext: false
    }
  return (
    <>
      <div className="grid grid-cols-2 gap-4 md:gap-8 lg:grid-cols-3">
        {servicePackages?.map((item) => (
          <CardService servicePackage={item} key={item.servicePackageID} />
        )
        )}
      </div>
      <PaginationCustom
        onPageChange={(value) => setPageIndex(value)}
        pagination={paginateData}
        color="primary"
        className="pt-6 md:ml-auto md:w-fit"
        shape="rounded"
      />
    </>
  )
}

export default ListServices
