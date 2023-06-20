import MainHeadingLayout from "layout/Management/MainHeadingLayout"
import TabsCustom from "layout/Management/components/TabsCustom"
import { useMemo } from "react"
import DoctorBooking from "./components/DoctorBooking"

const AppointmentSchedule = () => {
  const tabs = useMemo(
    () => [
      {
        key: 0,
        label: `Doctor`,
        children: <DoctorBooking />
      },
      {
        key: 1,
        label: `Services`,
        children: (
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Explicabo
            iste numquam vero vitae tempora nostrum natus excepturi voluptas!
            Nesciunt consequatur eos laudantium sapiente alias repudiandae earum
            quia veniam iure aspernatur?
          </p>
        )
      }
    ],
    []
  )
  return (
    <>
      <MainHeadingLayout heading="Your Booking">
        <TabsCustom tabs={tabs} />
      </MainHeadingLayout>
    </>
  )
}

export default AppointmentSchedule
