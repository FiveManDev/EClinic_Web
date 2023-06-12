import { EventClickArg } from "@fullcalendar/core"
import dayGridPlugin from "@fullcalendar/daygrid" // a plugin!
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick
import FullCalendar from "@fullcalendar/react"
import MainHeadingLayout from "layout/Management/MainHeadingLayout"
import Head from "next/head"

const DoctorHomePage = () => {
  const handleDateClick = (value: EventClickArg) => {
    console.log("handleDateClick ~ value:", value)
  }
  return (
    <>
      <Head>
        <title>Overview</title>
      </Head>
      <MainHeadingLayout>
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          weekends={false}
          eventClick={handleDateClick}
          events={[
            { title: "event 1", date: "2023-05-08" },
            { title: "event 2", date: "2023-05-09" }
          ]}
        />
      </MainHeadingLayout>
    </>
  )
}

export default DoctorHomePage
