import Head from "next/head"
import React from "react"
import FormLogin from "./components/Form"

const SignInPage = () => {
  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/favicon.png" />
      </Head>
      <div className="flex flex-col justify-center">
        <div className="flex flex-col space-y-[10px] text-[#4E5D78] font-bold text-center  mx-auto mt-[42px]">
          <h1 className="text-lg md:text-[30px]">Getting Started</h1>
          <h3 className="text-sm md:text-base">
            Login to continue and connect with the people.
          </h3>
        </div>
        <FormLogin />
      </div>
    </>
  )
}
export default SignInPage
