import { AxiosResponse } from "axios"
import axiosClient from "shared/axios/httpClient"
import { URL_API } from "shared/constant/constant"
import { IServerResponse } from "types/server/IServerResponse"
class BookingService {
  async getAllBookingPackageForUser(
    pageNumber: number,
    pageSize: number,
    status: number
  ) {
    try {
      const res: AxiosResponse = await axiosClient.get(
        `${URL_API.BOOKING.SERVICE}/GetAllBookingPackageForUser?BookingStatus=${status}`,
        {
          headers: {
            PageNumber: pageNumber,
            PageSize: pageSize
          }
        }
      )
      return res as AxiosResponse<IServerResponse<BookingService[]>>
    } catch (error) {
      console.log("BlogService ~ error:", error)
    }
  }
}
export const bookingService = new BookingService()
