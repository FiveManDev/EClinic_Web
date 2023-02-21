import { Carousel, Tag } from "antd"
import CustomButton from "components/User/Button"
import UserSecondaryLayout from "layout/User/UserSecondaryLayout"
import Head from "next/head"
import Image from "next/image"
import React from "react"
import { useTranslation } from "react-i18next"
import { IBreadcrum } from "types/Base.type"
import CardService from "./components/CardService"

const ServicesDetailPage = () => {
  const { t } = useTranslation(["base", "ser"])

  const breadrums: IBreadcrum[] = [
    { label: t("base:pages.home"), href: "/" },
    { label: t("base:pages.servies"), href: "/services" },
    { label: t("base:pages.detail") }
  ]
  return (
    <>
      <Head>
        <title>Forum page</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <UserSecondaryLayout breadrums={breadrums}>
        <section className="flex flex-col mt-6 gap-x-10">
          <div className="flex-1">
            <div className="flex-col md:flex-row flex w-full  md:h-[320px] gap-y-4 md:gap-x-8 ">
              <div className="relative w-full h-56 md:h-full md:w-2/4">
                <Image
                  src={"/images/sample-2.png"}
                  alt="detail-service"
                  fill
                  className="object-cover rounded-md"
                />
              </div>
              <div className="flex flex-col justify-between flex-1">
                <div className="flex flex-col gap-y-4">
                  <Tag color="blue" className="w-fit">
                    Tim mạch
                  </Tag>
                  <h4 className="text-2xl font-semibold text-h1 line-clamp-2">
                    Gói Xét nghiệm kiểm tra men gan mỡ máu
                  </h4>
                  <span className="">
                    <svg
                      width="96"
                      height="15"
                      viewBox="0 0 96 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M14.9678 5.6735C14.9278 5.55439 14.8558 5.44863 14.7595 5.36789C14.6632 5.28715 14.5466 5.23458 14.4223 5.21597L10.0707 4.55116L8.1178 0.391791C8.06273 0.274649 7.97546 0.1756 7.86619 0.106221C7.75691 0.0368426 7.63015 0 7.50071 0C7.37127 0 7.24451 0.0368426 7.13523 0.106221C7.02596 0.1756 6.93869 0.274649 6.88362 0.391791L4.93077 4.55116L0.579114 5.21597C0.455165 5.23487 0.338826 5.28757 0.242885 5.36829C0.146944 5.44901 0.0751162 5.55462 0.0352983 5.67351C-0.00451953 5.7924 -0.0107859 5.91996 0.0171881 6.04218C0.045162 6.1644 0.106293 6.27655 0.193861 6.36628L3.36521 9.61331L2.61516 14.2077C2.59469 14.3338 2.61005 14.4631 2.65949 14.5809C2.70893 14.6987 2.79047 14.8002 2.8948 14.8739C2.99913 14.9476 3.12207 14.9905 3.2496 14.9977C3.37714 15.005 3.50414 14.9762 3.61613 14.9148L7.50275 12.7683L11.3894 14.9148C11.5014 14.9768 11.6285 15.0059 11.7563 14.999C11.8841 14.9921 12.0074 14.9493 12.112 14.8756C12.2167 14.8019 12.2985 14.7003 12.3481 14.5823C12.3976 14.4643 12.413 14.3347 12.3924 14.2084L11.6423 9.61399L14.8116 6.36628C14.8988 6.27629 14.9595 6.16403 14.987 6.04182C15.0146 5.91962 15.0079 5.79218 14.9678 5.6735Z"
                        fill="#F5A623"
                      />
                      <path
                        d="M34.9715 5.6735C34.9315 5.55439 34.8594 5.44863 34.7632 5.36789C34.6669 5.28715 34.5502 5.23458 34.426 5.21597L30.0743 4.55116L28.1215 0.391791C28.0664 0.274649 27.9791 0.1756 27.8698 0.106221C27.7606 0.0368426 27.6338 0 27.5044 0C27.3749 0 27.2482 0.0368426 27.1389 0.106221C27.0296 0.1756 26.9423 0.274649 26.8873 0.391791L24.9344 4.55116L20.5828 5.21597C20.4588 5.23487 20.3425 5.28757 20.2465 5.36829C20.1506 5.44901 20.0788 5.55462 20.039 5.67351C19.9991 5.7924 19.9929 5.91996 20.0209 6.04218C20.0488 6.1644 20.11 6.27655 20.1975 6.36628L23.3689 9.61331L22.6188 14.2077C22.5984 14.3338 22.6137 14.4631 22.6632 14.5809C22.7126 14.6987 22.7941 14.8002 22.8985 14.8739C23.0028 14.9476 23.1257 14.9905 23.2533 14.9977C23.3808 15.005 23.5078 14.9762 23.6198 14.9148L27.5064 12.7683L31.393 14.9148C31.505 14.9768 31.6322 15.0059 31.76 14.999C31.8878 14.9921 32.0111 14.9493 32.1157 14.8756C32.2203 14.8019 32.3021 14.7003 32.3517 14.5823C32.4013 14.4643 32.4167 14.3347 32.3961 14.2084L31.646 9.61399L34.8153 6.36628C34.9025 6.27629 34.9631 6.16403 34.9907 6.04182C35.0182 5.91962 35.0116 5.79218 34.9715 5.6735Z"
                        fill="#F5A623"
                      />
                      <path
                        d="M54.9752 5.6735C54.9353 5.55439 54.8632 5.44863 54.767 5.36789C54.6707 5.28715 54.554 5.23458 54.4298 5.21597L50.0781 4.55116L48.1252 0.391791C48.0702 0.274649 47.9829 0.1756 47.8736 0.106221C47.7644 0.0368426 47.6376 0 47.5082 0C47.3787 0 47.252 0.0368426 47.1427 0.106221C47.0334 0.1756 46.9461 0.274649 46.8911 0.391791L44.9382 4.55116L40.5866 5.21597C40.4626 5.23487 40.3463 5.28757 40.2503 5.36829C40.1544 5.44901 40.0826 5.55462 40.0427 5.67351C40.0029 5.7924 39.9967 5.91996 40.0246 6.04218C40.0526 6.1644 40.1137 6.27655 40.2013 6.36628L43.3727 9.61331L42.6226 14.2077C42.6021 14.3338 42.6175 14.4631 42.6669 14.5809C42.7164 14.6987 42.7979 14.8002 42.9022 14.8739C43.0066 14.9476 43.1295 14.9905 43.257 14.9977C43.3846 15.005 43.5116 14.9762 43.6236 14.9148L47.5102 12.7683L51.3968 14.9148C51.5088 14.9768 51.636 15.0059 51.7638 14.999C51.8916 14.9921 52.0149 14.9493 52.1195 14.8756C52.2241 14.8019 52.3059 14.7003 52.3555 14.5823C52.4051 14.4643 52.4204 14.3347 52.3998 14.2084L51.6498 9.61399L54.8191 6.36628C54.9062 6.27629 54.9669 6.16403 54.9945 6.04182C55.022 5.91962 55.0154 5.79218 54.9752 5.6735Z"
                        fill="#F5A623"
                      />
                      <path
                        d="M74.9789 5.6735C74.939 5.55439 74.8669 5.44863 74.7706 5.36789C74.6744 5.28715 74.5577 5.23458 74.4334 5.21597L70.0818 4.55116L68.1289 0.391791C68.0738 0.274649 67.9866 0.1756 67.8773 0.106221C67.768 0.0368426 67.6413 0 67.5118 0C67.3824 0 67.2556 0.0368426 67.1463 0.106221C67.0371 0.1756 66.9498 0.274649 66.8947 0.391791L64.9419 4.55116L60.5902 5.21597C60.4663 5.23487 60.3499 5.28757 60.254 5.36829C60.1581 5.44901 60.0862 5.55462 60.0464 5.67351C60.0066 5.7924 60.0003 5.91996 60.0283 6.04218C60.0563 6.1644 60.1174 6.27654 60.205 6.36628L63.3763 9.61331L62.6263 14.2077C62.6058 14.3338 62.6212 14.4631 62.6706 14.5809C62.72 14.6987 62.8016 14.8002 62.9059 14.8739C63.0102 14.9476 63.1332 14.9905 63.2607 14.9977C63.3882 15.005 63.5152 14.9762 63.6272 14.9148L67.5139 12.7683L71.4005 14.9148C71.5125 14.9767 71.6396 15.0059 71.7674 14.999C71.8952 14.9921 72.0185 14.9493 72.1232 14.8756C72.2278 14.8019 72.3096 14.7003 72.3592 14.5823C72.4087 14.4643 72.4241 14.3347 72.4035 14.2084L71.6535 9.61399L74.8228 6.36628C74.9099 6.27629 74.9706 6.16403 74.9981 6.04182C75.0257 5.91961 75.019 5.79218 74.9789 5.6735Z"
                        fill="#F5A623"
                      />
                      <path
                        d="M94.9827 5.6735C94.9427 5.55439 94.8707 5.44863 94.7744 5.36789C94.6781 5.28715 94.5614 5.23458 94.4372 5.21597L90.0855 4.55116L88.1327 0.391791C88.0776 0.274649 87.9904 0.1756 87.8811 0.106221C87.7718 0.0368426 87.645 0 87.5156 0C87.3862 0 87.2594 0.0368426 87.1501 0.106221C87.0408 0.1756 86.9536 0.274649 86.8985 0.391791L84.9457 4.55116L80.594 5.21597C80.4701 5.23487 80.3537 5.28757 80.2578 5.36829C80.1618 5.44901 80.09 5.55462 80.0502 5.67351C80.0104 5.7924 80.0041 5.91996 80.0321 6.04218C80.0601 6.1644 80.1212 6.27655 80.2088 6.36628L83.3801 9.61331L82.6301 14.2077C82.6096 14.3338 82.6249 14.4631 82.6744 14.5809C82.7238 14.6987 82.8054 14.8002 82.9097 14.8739C83.014 14.9476 83.137 14.9905 83.2645 14.9977C83.392 15.005 83.519 14.9762 83.631 14.9148L87.5176 12.7683L91.4043 14.9148C91.5163 14.9768 91.6434 15.0059 91.7712 14.999C91.899 14.9921 92.0223 14.9493 92.1269 14.8756C92.2316 14.8019 92.3134 14.7003 92.3629 14.5823C92.4125 14.4643 92.4279 14.3347 92.4073 14.2084L91.6572 9.61399L94.8265 6.36628C94.9137 6.27629 94.9744 6.16403 95.0019 6.04182C95.0295 5.91962 95.0228 5.79218 94.9827 5.6735Z"
                        fill="#F5A623"
                      />
                    </svg>
                  </span>
                </div>
                <div className="mt-5 space-y-1 md:space-y-3 md:mt-0">
                  <div className="flex space-x-6">
                    <div className="flex flex-col md:gap-y-2">
                      <span className="text-lg font-semibold text-h1">
                        $2000
                      </span>
                      <span className="text-sm font-light text-gray-400">
                        {t("ser:price")}
                      </span>
                    </div>
                    <div className="flex flex-col md:gap-y-2">
                      <span className="text-lg font-semibold text-h1">173</span>
                      <span className="text-sm font-light text-gray-400">
                        {t("ser:totalSell")}
                      </span>
                    </div>
                  </div>
                  <CustomButton kind="primary" size="small" className="w-full ">
                    <span className="text-[10px] md:text-xs">
                      {t("ser:btnRegis")}
                    </span>
                  </CustomButton>
                </div>
              </div>
            </div>
            <h3 className="mt-8 text-2xl font-normal text-h1">
              {t("ser:inforDetail")}
            </h3>
            <p className="text-[#696974] text-sm leading-loose mt-4">
              Tết là dịp sum họp và mang lại cảm hứng , cùng chế độ sinh hoạt
              không điều độ dẫn đến nhiều hệ lụy cho sức khỏe chúng ta. Gói xét
              nghiệm kiểm tra men gan, mỡ máu ra đời với hạng mục thường quy như
              men gan, mỡ máu... để đánh giá tình trạng sức khỏe, từ đó chủ động
              điều chỉnh chế độ ăn uống, sinh hoạt. Phát hiện sớm các loại bệnh
              ẩn nấp để có phương hướng điều trị từ giai đoạn sớm, nâng cao tỉ
              lệ chữa khỏi và tiết kiệm chi phí. Quý khách có thể đặt lịch lấy
              mẫu tại nhà và kết quả xét nghiệm sẽ có trong ngày. Sau đó, bác sĩ
              gọi điện tư vấn chi tiết kết quả, đưa ra chế độ sinh hoạt phù hợp
              hoặc nếu có bất thường, bác sĩ tư vấn người bệnh tới bệnh viện để
              thực hiện thêm một số phương pháp chẩn đoán chuyên sâu nhằm phát
              hiện chính xác bệnh, từ đó đưa ra phương pháp điều trị hiệu quả.
              Bước 1: Điều dưỡng eDoctor đến tận nhà để lấy mẫu xét nghiệm và
              chuyển đến Trung tâm Y Khoa Medic – Hòa Hảo để tiến hành các phân
              tích. Bước 2: Kết quả phân tích sẽ được trả về tài khoản thông qua
              hệ thống eDoctor tại website https://edoctor.io/ và ứng dụng
              eDoctor. Bước 3: Bác sĩ liên hệ giải thích và tư vấn kết quả xét
              nghiệm qua điện thoại.
            </p>
          </div>
          <div className="mt-12 space-y-3">
            <h3 className="text-2xl font-semibold text-h1">
              {t("ser:specialService")}
            </h3>
            <Carousel
              responsive={[
                {
                  breakpoint: 1024,
                  settings: {
                    slidesToShow: 3
                  }
                },
                {
                  breakpoint: 600,
                  settings: {
                    slidesToShow: 2
                  }
                },
                {
                  breakpoint: 480,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                  }
                }
              ]}
              slidesToShow={4}
              slidesToScroll={4}
            >
              {Array(10)
                .fill(0)
                .map((_, index) => (
                  <CardService
                    isDetail={false}
                    className="!max-w-full md:!max-w-[315px]"
                    key={index}
                  />
                ))}
            </Carousel>
          </div>
        </section>
      </UserSecondaryLayout>
    </>
  )
}

export default ServicesDetailPage
