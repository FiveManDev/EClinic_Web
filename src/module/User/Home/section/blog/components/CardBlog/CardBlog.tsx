import ImageCustom from "components/Common/ImageCustom"
import { IBlog } from "types/Blog"
interface Props {
  blog?: IBlog
}
const CardBlog = ({ blog }: Props) => {
  return (
    <div className="flex flex-col w-full space-y-4">
      <div className="relative w-full h-[280px]">
        <ImageCustom
          src={blog?.coverImage || "/images/sample.png"}
          alt="image"
          sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
          fill
          classNameImage="object-cover rounded-lg"
        />
      </div>
      <div className="flex flex-col space-y-3">
        <h4 className="text-[22px] text-[#304050] font-semibold line-clamp-2">
          {blog?.title}
        </h4>
        <div className="text-[#9A9FA5] text-xs space-x-1.5">
          <span>By</span>
          <b className="font-bold text-black">{blog?.author.firstName} {blog?.author.lastName}</b>
          <span>-</span>
          <span>{blog?.updatedAt}</span>
        </div>
        <p className="text-base text-[#657280] line-clamp-3">
          {blog?.content}
        </p>
      </div>
    </div>
  )
}

export default CardBlog
