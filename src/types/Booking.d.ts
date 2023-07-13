export interface BookingService {
  bookingID: string
  profile: Profile
  price: number
  bookingTime: string
  service: Service
  appoinmentTime: string
  bookingStatus: number
}

interface Profile {
  profileID: string
  userID: string
  firstName: string
  lastName: string
  avatar: string
}

interface Service {
  servicePackageID: string
  servicePackageName: string
  image: string
}
export interface BookingSchedule {
  calenderID: string
  time: string
  slots: Slot[]
}

export interface Slot {
  slotID: string
  startTime: string
  endTime: string
  isBooking: boolean
}
