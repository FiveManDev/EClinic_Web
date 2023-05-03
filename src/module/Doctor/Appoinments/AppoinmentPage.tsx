import MainHeadingLayout from "layout/Management/MainHeadingLayout"
import TabsCustom from "layout/Management/components/TabsCustom"
import Head from "next/head"
import { useMemo } from "react"
import TableAPM from "./sections/TableAPM"

const AppoinmentPage = () => {
  const tabs = useMemo(
    () => [
      {
        key: 0,
        label: `All Appointment`,
        children: <TableAPM />
      },
      {
        key: 1,
        label: `Create schedule`,
        children: (
          <div>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem
            eius sunt nemo perspiciatis? Vitae suscipit maiores consectetur
            molestias tenetur minima! Nobis laborum voluptates dolorum vitae
            quidem exercitationem nulla, architecto consequatur.
          </div>
        )
      }
    ],
    []
  )
  return (
    <>
      <Head>
        <title>Appointment page</title>
      </Head>
      <MainHeadingLayout heading="Appointment List">
        <TabsCustom tabs={tabs} />
        <div className="flex justify-between"></div>
      </MainHeadingLayout>
    </>
  )
}

export default AppoinmentPage
