import MainHeadingLayout from "layout/Management/MainHeadingLayout"
import Head from "next/head"
import TableAPM from "./sections/TableAPM"

const AppoinmentPage = () => {
  return (
    <>
      <Head>
        <title>Appointment page</title>
      </Head>
      <MainHeadingLayout heading="Appointment List">
        <TableAPM />
      </MainHeadingLayout>
    </>
  )
}

export default AppoinmentPage
