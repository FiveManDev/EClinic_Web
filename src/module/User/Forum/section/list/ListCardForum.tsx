import { Pagination } from "@mui/material"
import CardForum from "module/User/components/CardForum"
interface Props {
  title: string
}

const ListCardForum = ({ title }: Props) => {
  return (
    <>
      <div className="flex flex-col w-full gap-y-4 ">
        <h4 className="text-xl "> {title}</h4>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {Array(6)
            .fill(0)
            .map((_, index) => (
              <CardForum key={index} />
            ))}
        </div>
        <Pagination
          count={10}
          color="primary"
          className="pt-6 md:ml-auto md:w-fit"
          shape="rounded"
        />
      </div>
    </>
  )
}

export default ListCardForum
