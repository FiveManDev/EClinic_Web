import MainHeadingLayout from "layout/Management/MainHeadingLayout"
import React from "react"
import TableQuestion from "./section/TableQuestion"
import Head from "next/head"
const QuestionsPage = () => {
  return (
    <>
      <Head>
        <title>Question page</title>
      </Head>
      <MainHeadingLayout heading="Manage Question">
        <TableQuestion />
      </MainHeadingLayout>
    </>
  )
}

export default QuestionsPage
