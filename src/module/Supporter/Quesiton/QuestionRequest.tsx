import Head from "next/head"
import React from "react"
import TableQuestionRequest from "./section/TableQuestionRequest"
import MainHeadingLayout from "layout/Management/MainHeadingLayout"

const QuestionRequest = () => {
  return (
    <>
      <Head>
        <title>Question request page</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/favicon.png" />
      </Head>
      <MainHeadingLayout heading="Question Management">
        <TableQuestionRequest />
      </MainHeadingLayout>
    </>
  )
}

export default QuestionRequest
