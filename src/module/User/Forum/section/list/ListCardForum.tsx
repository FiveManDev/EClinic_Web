import { Pagination } from "@mui/material"
import { useGetAllPostForumQuery } from "hooks/query/forum/useForum"
import CardForum from "module/User/components/CardForum"
interface Props {
  title: string
}

const ListCardForum = ({ title }: Props) => {
  const { data, isError, isLoading } = useGetAllPostForumQuery()
  if (isError) {
    return <p>Error....</p>
  }
  if (isLoading) {
    return <p>loading....</p>
  }
  return (
    <>
      <div className="flex flex-col w-full gap-y-4 ">
        <h4 className="text-xl "> {title}</h4>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {data.data.length > 0 &&
            data.data.map((post, index) => (
              <CardForum key={index} post={post} />
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
