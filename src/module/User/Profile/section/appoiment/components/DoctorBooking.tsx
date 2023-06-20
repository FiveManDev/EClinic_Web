import React from "react"
import DoctorBookingItem from "./DoctorBookingItem"

const DoctorBooking = () => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {Array(6)
        .fill(0)
        .map((item, index) => (
          <DoctorBookingItem key={index} />
        ))}
    </div>
  )
}

export default DoctorBooking
