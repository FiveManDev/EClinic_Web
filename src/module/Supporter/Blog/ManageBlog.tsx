import MainHeadingLayout from "layout/Management/MainHeadingLayout"
import TabsCustom from "layout/Management/components/TabsCustom"
import Head from "next/head"
import React, { useMemo } from "react"

const ManageBlog = () => {
  const tabs = useMemo(
    () => [
      {
        key: 0,
        label: `Blog`,
        children: (
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ratione
            dolorem libero eaque asperiores similique! Quasi a consectetur hic
            quidem aliquam cupiditate! Dolores corporis consectetur ut natus
            quam impedit modi provident.
          </p>
        )
      },
      {
        key: 1,
        label: `Create a new post
        `,
        children: (
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore
            temporibus consequuntur corporis error? Illum incidunt impedit
            repellat saepe cum corrupti doloribus molestiae ullam sapiente,
            sequi nemo dignissimos similique, eveniet cumque!
          </p>
        )
      }
    ],
    []
  )
  return (
    <>
      <Head>
        <title>Blog</title>
      </Head>
      <MainHeadingLayout heading="Manage Blog">
        <TabsCustom tabs={tabs} />
      </MainHeadingLayout>
    </>
  )
}

export default ManageBlog
