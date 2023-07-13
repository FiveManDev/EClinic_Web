import classNames from "classnames"
import { useState } from "react"
import DoctorBookingItem from "./DoctorBookingItem"
import TabButton from "components/User/Booking/TabButton"
import { useGetAllBookingDoctorForUserQuery } from "hooks/query/booking"
import { PAGE_SIZE } from "shared/constant/constant"
import EmtyData from "components/Common/Empty"
import { getDataPaginate } from "shared/helpers/helper"
import PaginationCustom from "components/Common/Pagination"
export type KindAppoiment = "cancelled" | "completed" | "upcomming"
const filterList: KindAppoiment[] = ["upcomming", "cancelled", "completed"]
const DoctorBooking = () => {
  const [type, setType] = useState<number>(1)
  const [pageIndex, setPageIndex] = useState(1)

  const bookingData = useGetAllBookingDoctorForUserQuery(
    pageIndex,
    PAGE_SIZE,
    type
  )
  if (bookingData.isError) {
    return (
      <>
        <EmtyData />
      </>
    )
  }
  const paginateData = getDataPaginate(bookingData.data)
  return (
    <div className="flex flex-col">
      <TabButton setType={setType} type={type} />
      <div className="grid grid-cols-2 gap-4"></div>
      {bookingData.isLoading && <p>Loaing....</p>}
      {bookingData.data?.data && bookingData.data?.data.data.length > 0 ? (
        <div className="grid grid-cols-2 gap-4">
          {bookingData.data?.data.data.map((booking, index) => (
            <DoctorBookingItem data={booking} kind={type} key={index} />
          ))}
        </div>
      ) : (
        <EmtyData />
      )}
      <PaginationCustom
        onPageChange={(value) => setPageIndex(value)}
        pagination={paginateData}
        color="primary"
        className="pt-6 md:ml-auto md:w-fit"
        shape="rounded"
      />
    </div>
  )
}

export default DoctorBooking
