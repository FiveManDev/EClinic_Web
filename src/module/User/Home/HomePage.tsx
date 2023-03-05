import Head from "next/head"
import Appoiment from "./section/appoiment/Appoiment"
import Banner from "./section/banner/Banner"
import Blog from "./section/blog"
import Forum from "./section/forum"
import Services from "./section/services/Services"

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Home page</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/favicon.png" />
      </Head>
      <main className="mb-20 page-wrapper pt-16 md:pt-[72px] overflow-hidden">
        <Banner />
        <div className="space-y-10 md:space-y-16 page-container page-container--child">
          <Appoiment />
          <Services />
          <Blog />
          <Forum />
        </div>
      </main>
    </>
  )
}
