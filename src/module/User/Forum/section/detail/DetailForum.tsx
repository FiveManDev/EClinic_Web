import ChipCustom from "components/Common/Chip/Chip"
import Favorite from "components/Common/Favorite"
import Info from "module/User/components/Info/Info"
import dynamic from "next/dynamic"
import Image from "next/image"
import { useTranslation } from "react-i18next"
import ListCardForum from "../list/ListCardForum"
const Comment = dynamic(
  () => import("../comment").then((module) => module.default),
  {
    ssr: false
  }
)

const DetailForum = () => {
  const { t } = useTranslation(["base", "forum"])

  return (
    <>
      <div className="flex flex-col justify-start gap-y-4 background-primary">
        <h3 className="text-xl">
          Chụp CT có ảnh hưởng đến liền sẹo hay không?
        </h3>
        <div className="relative w-full overflow-hidden rounded-lg h-96">
          <Image
            src={"/images/sample.png"}
            fill
            alt="image"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <div className="flex justify-between">
            <h4 className="text-lg">{t("forum:question")}</h4>
            <Favorite content="2 Cảm ơn" />
          </div>
          <p className="text-[#696974] text-sm leading-loose">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Praesentium porro reiciendis, neque veniam ut quaerat! Soluta
            blanditiis voluptatibus molestiae. Hic quos minus laudantium at sunt
            molestias iure dolor. Odit, quia. Lorem, ipsum dolor sit amet
            consectetur adipisicing elit. Eaque quae fugit dicta alias, magnam
            minus enim labore. Vel quaerat, nulla deleniti facilis at et officia
            quidem quisquam soluta? Voluptas, cumque?
          </p>
        </div>
        <div className="w-full h-[1px] bg-slate-200 my-3"></div>
        <div className="flex flex-col space-y-2">
          <h4 className="text-lg">{t("forum:anwers")}</h4>
          <div className="flex flex-col gap-y-2">
            <Info />
            <p className="text-[#696974] text-sm leading-loose">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Praesentium porro reiciendis, neque veniam ut quaerat! Soluta
              blanditiis voluptatibus molestiae. Hic quos minus laudantium at
              sunt molestias iure dolor. Odit, quia. Lorem, ipsum dolor sit amet
              consectetur adipisicing elit. Eaque quae fugit dicta alias, magnam
              minus enim labore. Vel quaerat, nulla deleniti facilis at et
              officia quidem quisquam soluta? Voluptas, cumque?
            </p>
          </div>
        </div>
        <div className="flex items-center w-full gap-2 mt-4">
          <h4 className="text-lg ">{t("forum:tags")}:</h4>
          <ul className="flex items-center w-full space-x-4 overflow-auto list-none">
            {new Array(3).fill(null).map((_, index) => (
              <li key={index}>
                <ChipCustom label="Covid-19" />
              </li>
            ))}
          </ul>
        </div>
        <Comment />
      </div>
      <div className="col-span-3 space-y-4 md:col-span-2 background-primary">
        <ListCardForum title={t("forum:related")} />
      </div>
    </>
  )
}

export default DetailForum
