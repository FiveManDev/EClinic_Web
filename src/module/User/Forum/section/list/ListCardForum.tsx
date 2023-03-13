import PaginationCustom from "components/Common/Pagination"
import { useGetAllPostForumQuery } from "hooks/query/forum/useForum"
import CardForum from "module/User/components/CardForum"
import { useState } from "react"
import { PAGE_SIZE } from "shared/constant/constant"
import { IPagination } from "types/Pagination"
interface Props {
  title: string
}

const ListCardForum = ({ title }: Props) => {
  const [pageIndex, setPageIndex] = useState(1)
  const { data, isError, isLoading } = useGetAllPostForumQuery(
    pageIndex,
    PAGE_SIZE
  )
  if (isError) {
    return <p>Error....</p>
  }
  if (isLoading) {
    return <p>loading....</p>
  }
  console.log("ListCardForum ~ data:", data)
  const paginateDate = data?.headers["x-pagination"]
    ? (JSON.parse(data.headers["x-pagination"]) as IPagination)
    : {
        PageIndex: pageIndex,
        PageSize: 0,
        TotalCount: 0,
        TotalPages: 0,
        HasPrevious: false,
        HasNext: false
      }
  console.log("re-render")
  return (
    <>
      <div className="flex flex-col w-full gap-y-4 ">
        <h4 className="text-xl "> {title}</h4>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {data?.data?.data?.map((post, index) => (
            <CardForum key={index} post={post} />
          ))}
        </div>
        <PaginationCustom
          onPageChange={(value) => setPageIndex(value)}
          pagination={paginateDate}
          color="primary"
          className="pt-6 md:ml-auto md:w-fit"
          shape="rounded"
        />
      </div>
    </>
  )
}

export default ListCardForum
