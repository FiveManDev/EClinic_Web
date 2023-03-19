import ImageCustom from "components/Common/ImageCustom"

export const CommentAvatar = ({ avatar = "" }) => {
  return (
    <div className="relative w-8 h-8 mr-2 ">
      <ImageCustom
        src={avatar || "/images/sample.png"}
        fill
        sizes="(max-width: 768px) 50vw,
      (max-width: 1200px) 30vw,
      20vw"
        alt="Michael Gough"
        className="object-cover rounded-full"
      />
    </div>
  )
}
