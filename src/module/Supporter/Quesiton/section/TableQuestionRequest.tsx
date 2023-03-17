import { Chip, Skeleton, TablePagination } from "@mui/material"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import { useQueryClient } from "@tanstack/react-query"
import ImageCustom from "components/Common/ImageCustom"
import CustomButton from "components/User/Button"
import useConfirm from "context/ComfirmContext"
import {
  useChangeActivePost,
  useGetAllPostForumQuery
} from "hooks/query/forum/useForum"
import ViewDetailPost from "module/Supporter/components/ViewDetailPost"
import React from "react"
import { toast } from "react-hot-toast"
import { QUERY_KEYS } from "shared/constant/constant"
import { combineName, dayformat } from "shared/helpers/helper"
import { IPagination } from "types/Pagination"
interface Column {
  label: string
  minWidth?: number
  align?: "right" | "left" | "center"
}

const columns: readonly Column[] = [
  { label: "Title", minWidth: 100 },
  { label: "Description", minWidth: 170 },
  {
    label: "Author",
    minWidth: 170
  },
  {
    label: "Created at"
  },
  {
    label: "Total like",
    align: "center"
  },
  {
    label: "Status",
    align: "center"
  },
  {
    label: "Action",
    align: "center"
  }
]

export default function TableQuestionRequest() {
  const queryClient = useQueryClient()
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)
  const changeActivePost = useChangeActivePost()
  const confirm = useConfirm()

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }
  const { data, isLoading, isError } = useGetAllPostForumQuery(
    page + 1,
    rowsPerPage
  )
  if (isError) {
    return <p> Error</p>
  }
  const paginateData = data?.headers["x-pagination"]
    ? (JSON.parse(data.headers["x-pagination"]) as IPagination)
    : {
        PageIndex: page,
        PageSize: 0,
        TotalCount: 0,
        TotalPages: 0,
        HasPrevious: false,
        HasNext: false
      }
  const changeStatusPost = async (postId: string) => {
    if (confirm) {
      const choice = await confirm({
        title: "Change status of post?",
        content: "Are you sure you want to change status this question?"
      })
      if (choice) {
        changeActivePost.mutate(postId, {
          onSuccess: (data) => {
            queryClient.invalidateQueries([QUERY_KEYS.FORUM.POST])
            toast.success(data.message as string)
          },
          onError: () => {
            toast.error("Change status of post failed")
          }
        })
      }
    }
  }
  return (
    <div className="w-full shadow">
      <TableContainer>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((column, index) => (
                <TableCell
                  key={index}
                  style={{
                    minWidth: column.minWidth
                  }}
                  align={column.align}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading &&
              Array(4)
                .fill(0)
                .map((_, index) => (
                  <TableRow hover key={index}>
                    <TableCell component="th" scope="row">
                      <Skeleton variant="text" width={"100%"} height={26} />
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="text" width={"100%"} height={26} />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-x-2">
                        <div className="relative w-8 h-8 rounded-full">
                          <Skeleton
                            variant="rounded"
                            width={"100%"}
                            height={"100%"}
                          />
                        </div>
                        <Skeleton variant="text" width={"40%"} height={26} />
                      </div>
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="text" width={"100%"} height={26} />
                    </TableCell>
                    <TableCell align="center">
                      <Skeleton variant="text" width={"100%"} height={26} />
                    </TableCell>
                    <TableCell align="center">
                      <Skeleton variant="rounded" width={"100%"} height={26} />
                    </TableCell>
                    <TableCell align="center">
                      <Skeleton variant="rounded" width={"100%"} height={26} />
                    </TableCell>
                  </TableRow>
                ))}
            {data?.data.data.map((row) => (
              <TableRow hover key={row.id}>
                <TableCell component="th" scope="row">
                  <span className="line-clamp-1 max-w-[100px]">
                    {row.title}
                  </span>
                </TableCell>
                <TableCell>
                  <p className="line-clamp-1 max-w-[500px]">{row.content}</p>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-x-2">
                    <div className="relative w-8 h-8 rounded-full">
                      <ImageCustom
                        src={row.author.avatar}
                        alt={row.author.firstName}
                        fill
                        sizes="(max-width: 768px) 50vw,
              (max-width: 1200px) 30vw,
              22vw"
                      />
                    </div>
                    <span>
                      {combineName(row.author.lastName, row.author.firstName)}
                    </span>
                  </div>
                </TableCell>
                <TableCell>{dayformat(row.createdAt)}</TableCell>
                <TableCell align="center">{row.likes}</TableCell>
                <TableCell align="center">
                  {row.isActive ? (
                    <Chip label="Active" color="success" variant="outlined" />
                  ) : (
                    <Chip label="UnActive" color="error" variant="outlined" />
                  )}
                </TableCell>
                <TableCell align="center" className="flex">
                  <ViewDetailPost post={row} />
                  {row.isActive ? (
                    <CustomButton
                      onClick={() => changeStatusPost(row.id)}
                      kind="primary"
                      color="error"
                      className="bg-red-500 "
                    >
                      Block
                    </CustomButton>
                  ) : (
                    <CustomButton
                      onClick={() => changeStatusPost(row.id)}
                      kind="primary"
                      color="error"
                    >
                      Unblock
                    </CustomButton>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[2, 25, 100]}
        component="div"
        count={paginateData.TotalCount}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  )
}
