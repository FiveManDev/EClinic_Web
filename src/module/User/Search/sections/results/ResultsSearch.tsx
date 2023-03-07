import CardForum from "module/User/components/CardForum"
import CardBlog from "module/User/Home/section/blog/components/CardBlog/CardBlog"
import CardService from "module/User/Services/components/CardService"
import Link from "next/link"
import React, { PropsWithChildren } from "react"

const ResultsSearch = () => {
  return (
    <div className="mt-6 space-y-8">
      <LayoutItem label="Dịch vụ" link="/">
        {Array(4)
          .fill(0)
          .map((item, index) => (
            <CardService key={index} />
          ))}
      </LayoutItem>
      <LayoutItem label="Hỏi đáp" link="/">
        {Array(4)
          .fill(0)
          .map((item, index) => (
            <CardForum key={index} />
          ))}
      </LayoutItem>
      <LayoutItem label="Tin tức hằng ngày" link="/">
        {Array(4)
          .fill(0)
          .map((item, index) => (
            <CardBlog key={index} />
          ))}
      </LayoutItem>
    </div>
  )
}
interface LayoutItemProps extends PropsWithChildren {
  label: string
  link: string
}
const LayoutItem = ({ children, label, link }: LayoutItemProps) => {
  return (
    <div className="shadow-sm background-primary">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-2xl font-semibold text-h1">{label}</h3>
        <Link href={link} className="text-primary hover:underline">
          Xem tất cả
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">{children}</div>
    </div>
  )
}

export default ResultsSearch
