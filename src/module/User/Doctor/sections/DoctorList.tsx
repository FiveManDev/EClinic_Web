import React from "react"
import CardDoctor from "../components/card/CardDoctor"
import { Pagination } from "@mui/material"

const DoctorList = () => {
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:gap-8 lg:grid-cols-2">
        {Array(15)
          .fill(0)
          .map((_, index) => (
            <CardDoctor key={index} />
          ))}
      </div>
      <Pagination
        count={10}
        color="primary"
        className="pt-10 md:ml-auto md:w-fit"
        shape="rounded"
      />
    </>
  )
}

export default DoctorList
