import Image from "next/image"
import Search from "./Search"

const Banner = () => {
  return (
    <div className="banner-wrapper ">
      <div className="page-container relative">
        <div className="flex items-center justify-between ">
          <div className="max-w-[560px] w-full">
            <h1 className="font-bold text-[70px] text-h1">
              Hiểu, theo dõi, cải thiện sức khỏe
            </h1>
            <h3 className="text-[20px] text-[#7B7E90] mt-4">
              Nền tảng đặt dịch vụ và sản phẩm y tế dành cho bạn và gia đình
            </h3>
          </div>
          <div className="relative w-[600px] h-[600px]">
            <Image alt="banner" src="/images/banner.png" fill />
          </div>
        </div>
        <Search />
      </div>
    </div>
  )
}

export default Banner
