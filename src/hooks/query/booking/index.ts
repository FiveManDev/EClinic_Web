import { useMutation, useQuery } from "@tanstack/react-query"
import { bookingService } from "services/booking.service"
import { QUERY_KEYS } from "shared/constant/constant"

export const useGetAllBookingPackageForUserQuery = (
  pageNumber: number,
  pageSize: number,
  status: number
) => {
  const queryKey = [QUERY_KEYS.BOOKING.SERVICE, pageNumber, pageSize, status]
  return useQuery({
    queryKey,
    queryFn: () =>
      bookingService.getAllBookingPackageForUser(pageNumber, pageSize, status)
  })
}
export const useUpdateStateBookingServiceMutation = () =>
  useMutation({
    mutationFn: (bookingId: string) =>
      bookingService.updateBookingPackageStatusCancel(bookingId)
  })
export const useGetDoctorScheduleForUser = (date: string, doctorId: string) => {
  const queryKey = [QUERY_KEYS.BOOKING.DOCTOR, date, doctorId]
  return useQuery({
    queryKey,
    queryFn: () => bookingService.getDoctorScheduleForUser(date, doctorId)
  })
}
