import { Chip, Skeleton } from "@mui/material"
import PaginationCustom from "components/Common/Pagination"
import {
  useGetAnwerByPostId,
  useGetPostByUserId
} from "hooks/query/forum/useForum"
import Info from "module/User/components/Info/Info"
import Link from "next/link"
import { useState } from "react"
import { dayformat } from "shared/helpers/helper"
import { IPagination } from "types/Pagination"
import { IPost } from "types/Post"

const HistoryQuestion = () => {
  const [pageIndex, setPageIndex] = useState(1)

  const { data, isLoading } = useGetPostByUserId(pageIndex, 2)
  const paginateData = data?.headers["x-pagination"]
    ? (JSON.parse(data.headers["x-pagination"]) as IPagination)
    : {
        PageIndex: pageIndex,
        PageSize: 0,
        TotalCount: 0,
        TotalPages: 0,
        HasPrevious: false,
        HasNext: false
      }
  return (
    <div className="flex flex-col justify-start">
      <div className="grid w-full grid-cols-2 gap-6">
        {isLoading &&
          Array(2)
            .fill(0)
            .map((_, index) => <QuestionItemLoading key={index} />)}
        {data?.data.data.map((ques) => (
          <QuestionItem key={ques.id} ques={ques} />
        ))}
      </div>
      <PaginationCustom
        onPageChange={(value) => setPageIndex(value)}
        pagination={paginateData}
        color="primary"
        className="pt-6 md:ml-auto md:w-fit"
        shape="rounded"
      />
    </div>
  )
}
const QuestionItem = ({ ques }: { ques: IPost }) => {
  const { data, isLoading } = useGetAnwerByPostId(ques.id)
  return (
    <Link
      href={`/forum/${ques.id}`}
      className="flex flex-col px-4 py-3 rounded-md shadow"
    >
      <div className="flex justify-between">
        {isLoading ? (
          <Skeleton variant="rounded" width={52} height={32} />
        ) : data?.data.id ? (
          <Chip
            color="success"
            label="Anwerd"
            variant="outlined"
            className="bg-green-100 border-none rounded-md"
          />
        ) : (
          <Chip
            color="warning"
            label="Watting"
            variant="outlined"
            className="bg-yellow-100 border-none rounded-md"
          />
        )}

        <span className="text-sm text-gray-400">
          {dayformat(ques.createdAt)}
        </span>
      </div>
      <h3 className="mt-4 font-normal line-clamp-2">{ques.title}</h3>
      <div className="w-full h-[1px] bg-gray-200 my-4"></div>
      <Info data={ques.author} />
    </Link>
  )
}
const QuestionItemLoading = () => {
  return (
    <div className="flex flex-col px-4 py-3 rounded-md shadow">
      <div className="flex justify-between">
        <Skeleton variant="rounded" width={52} height={32} />
        <Skeleton variant="text" width={62} />
      </div>
      <h3 className="mt-4 font-normal line-clamp-2">
        <Skeleton variant="text" />
      </h3>
      <div className="w-full h-[1px] bg-gray-200 my-4"></div>
      <Info loading={true} />
    </div>
  )
}
export default HistoryQuestion
