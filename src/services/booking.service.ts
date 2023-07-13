import { AxiosResponse } from "axios"
import axiosClient from "shared/axios/httpClient"
import { URL_API } from "shared/constant/constant"
import { IServerResponse } from "types/server/IServerResponse"
import {
  BookingSchedule,
  BookingService as BookingType,
  IBookingDoctor
} from "types/Booking"

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
      return res as AxiosResponse<IServerResponse<BookingType[]>>
    } catch (error) {
      console.log("BookingService ~ error:", error)
    }
  }
  async getAllBookingDoctorForUser(
    pageNumber: number,
    pageSize: number,
    status: number
  ) {
    try {
      const res: AxiosResponse = await axiosClient.get(
        `${URL_API.BOOKING.DOCTOR}/GetAllBookingDoctorForUser?BookingStatus=${status}`,
        {
          headers: {
            PageNumber: pageNumber,
            PageSize: pageSize
          }
        }
      )
      return res as AxiosResponse<IServerResponse<IBookingDoctor[]>>
    } catch (error) {
      console.log("BookingService ~ error:", error)
    }
  }
  async updateBookingPackageStatusCancel(bookingPackageId: string) {
    try {
      const res: AxiosResponse = await axiosClient.put(
        `${URL_API.BOOKING.SERVICE}/updateBookingPackageStatusCancel?bookingPackageID=${bookingPackageId}`
      )
      return res.data as IServerResponse<string>
    } catch (error) {
      console.log("BookingService ~ error:", error)
    }
  }
  async updateBookingDoctorStatusCancel(bookingDoctorId: string) {
    try {
      const res: AxiosResponse = await axiosClient.put(
        `${URL_API.BOOKING.DOCTOR}/updateBookingDoctorStatusCancel?BookingID=${bookingDoctorId}`
      )
      return res.data as IServerResponse<string>
    } catch (error) {
      console.log("BookingService ~ error:", error)
    }
  }
  async getDoctorScheduleForUser(date: string, doctorId: string) {
    try {
      const res: AxiosResponse = await axiosClient.get(
        `${URL_API.BOOKING.DOCTOR_SCHEDULE}/getDoctorScheduleForUser`,
        {
          params: {
            date,
            doctorId
          }
        }
      )
      return res.data as IServerResponse<BookingSchedule>
    } catch (error) {
      console.log("BookingService ~ getDoctorScheduleForUser ~ error:", error)
    }
  }
}
export const bookingService = new BookingService()
