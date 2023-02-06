import CustomButton from "components/User/Button"
import React from "react"
import CardBlog from "./components/CardBlog/CardBlog"

const Blog = () => {
  return (
    <section className="flex flex-col w-full ">
      <h3 className="mb-3 text-center heading-section ">
        Tin tức sức khỏe cập nhật hàng ngày
      </h3>
      <div className="grid grid-cols-1 mt-4 gap-y-2 md:gap-x-6 md:grid-cols-3">
        <CardBlog />
        <CardBlog />
        <CardBlog />
      </div>
      <CustomButton kind="secondary" className="max-w-[200px] mx-auto mt-6">
        Xem tất cả tin tức
      </CustomButton>
    </section>
  )
}

export default Blog
