import { IconButton, Tooltip } from "@mui/material"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import ImageCustom from "components/Common/ImageCustom"
import TableCustom from "components/Common/Table/TableCustom"
import Tag from "components/Common/Tag"
import { CustomInput } from "components/User/Input"
import useConfirm from "context/ComfirmContext"
import { useGetPostForAd } from "hooks/query/forum/useForum"
import { MRT_ColumnDef, MRT_PaginationState } from "material-react-table"
import ViewDetailPost from "module/Supporter/components/ViewDetailPost"
import { useMemo, useState } from "react"
import { toast } from "react-hot-toast"
import { MdOutlineDelete } from "react-icons/md"
import { forumService } from "services/forum.service"
import { QUERY_KEYS } from "shared/constant/constant"
import { combineName, dayformat, getDataPaginate } from "shared/helpers/helper"
import colorsProvider from "shared/theme/colors"
import { IPost } from "types/Post"

export default function ListPostForum() {
  const queryClient = useQueryClient()
  const deletePostMutation = useMutation(forumService.deletePostByID)
  const confirm = useConfirm()
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 10
  })
  const { data, isLoading, isError, isRefetching } = useGetPostForAd(
    pagination.pageIndex + 1,
    pagination.pageSize
  )

  const deletePost = async (postId: string) => {
    if (confirm) {
      const choice = await confirm({
        title: "Delete of post?",
        content: "Are you sure you want to delete this post?"
      })
      if (choice) {
        deletePostMutation.mutate(postId, {
          onSuccess: (data) => {
            queryClient.invalidateQueries([QUERY_KEYS.FORUM.POST])
            toast.success(data.message as string)
          },
          onError: () => {
            toast.error("Change of post failed")
          }
        })
      }
    }
  }
  const columns = useMemo<MRT_ColumnDef<IPost>[]>(
    () => [
      {
        accessorKey: "title",
        header: "Title",
        Cell: ({ row }) => {
          return (
            <p className="line-clamp-1 max-w-[120px]">{row.original.title}</p>
          )
        }
      },
      {
        accessorKey: "content",
        header: "Description",
        size: 400,
        Cell: ({ row }) => {
          return (
            <p className="flex items-center space-x-2 line-clamp-2">
              {row.original.content}
            </p>
          )
        }
      },
      {
        accessorKey: "author",
        header: "Author",
        Cell: ({ row }) => {
          return (
            <div className="flex items-center gap-x-2">
              <div className="relative w-8 h-8 rounded-full">
                <ImageCustom
                  src={row.original.author.avatar}
                  alt={row.original.author.firstName}
                  fill
                  sizes="(max-width: 768px) 50vw,
              (max-width: 1200px) 30vw,
              22vw"
                />
              </div>
              <span>
                {combineName(
                  row.original.author.lastName,
                  row.original.author.firstName
                )}
              </span>
            </div>
          )
        }
      },
      {
        accessorKey: "createdAt",
        header: "Created at",
        Cell: ({ row }) => {
          return (
            <p className="line-clamp-1 ">{dayformat(row.original.createdAt)}</p>
          )
        }
      },
      {
        accessorKey: "likes",
        header: "Total like"
      },
      {
        accessorKey: "isActive",
        header: "Status",
        Cell: ({ row }) => {
          return (
            <Tag
              color={
                row.original.isActive
                  ? colorsProvider.success
                  : colorsProvider.error
              }
            >
              {row.original.isActive ? "Active" : "Banned"}
            </Tag>
          )
        }
      }
    ],
    []
  )
  const paginationData = getDataPaginate(data)
  return (
    <TableCustom
      pagination={pagination}
      onPaginationChange={setPagination}
      columns={columns}
      data={data?.data?.data ?? []}
      rowCount={paginationData.TotalCount ?? 0}
      pageCount={paginationData.TotalPages ?? 0}
      isLoading={isLoading}
      isError={isError}
      isRefetching={isRefetching}
      renderRowActions={({ row }) => (
        <div className="flex items-center flex-shrink-0 w-16">
          <ViewDetailPost post={row.original} />
          <Tooltip arrow placement="left" title="Delete this post">
            <IconButton onClick={() => deletePost(row.original.id)}>
              <MdOutlineDelete />
            </IconButton>
          </Tooltip>
        </div>
      )}
      renderTopToolbarCustomActions={() => (
        <CustomInput
          placeholder="Search data here"
          className="max-w-[300px] w-full"
        />
      )}
    />
  )
}
