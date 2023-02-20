import { Pagination } from "@mui/material"
import React from "react"
import CardService from "../../components/CardService"

const ListServices = () => {
  return (
    <>
      <div className="grid grid-cols-2 gap-4 md:gap-8 lg:grid-cols-3">
        {Array(15)
          .fill(0)
          .map((_, index) => (
            <CardService key={index} />
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

export default ListServices
