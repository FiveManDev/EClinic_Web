import FullCalendar from "@fullcalendar/react"
import React from "react"
import dayGridPlugin from "@fullcalendar/daygrid" // a plugin!
import MainHeadingLayout from "layout/Management/MainHeadingLayout"
import Head from "next/head"

const DoctorHomePage = () => {
  return (
    <>
      <Head>
        <title>Overview</title>
      </Head>
      <MainHeadingLayout>
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          weekends={false}
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
