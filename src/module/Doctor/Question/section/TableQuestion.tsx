import { Chip, TablePagination } from "@mui/material"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import ImageCustom from "components/Common/ImageCustom"
import { useGetPostNoAnserForumQuery } from "hooks/query/forum/useForum"
import React from "react"
import { combineName, dayformat } from "shared/helpers/helper"
import { IPagination } from "types/Pagination"
import UpdateQuestion from "./UpdateQuestion"
type ColumName =
  | "Title"
  | "Description"
  | "Author"
  | "Created at"
  | "Total like"
  | "Status"
  | "Action"
interface Column {
  id: ColumName
  label: ColumName
  minWidth?: number
  align?: "right" | "left" | "center"
}

const columns: readonly Column[] = [
  { id: "Title", label: "Title", minWidth: 100 },
  { id: "Description", label: "Description", minWidth: 170 },
  {
    id: "Author",
    label: "Author",
    minWidth: 170
  },
  {
    id: "Created at",
    label: "Created at",
    minWidth: 80
  },
  {
    id: "Total like",
    label: "Total like",
    minWidth: 50,
    align: "center"
  },
  {
    id: "Status",
    label: "Status",
    minWidth: 50,
    align: "center"
  },
  {
    id: "Action",
    label: "Action",
    minWidth: 50,
    align: "center"
  }
]

export default function TableQuestion() {
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }
  const { data, isLoading, isError } = useGetPostNoAnserForumQuery(
    page,
    rowsPerPage
  )
  if (isLoading) {
    return <p> loading</p>
  }
  if (isError) {
    return <p> Error</p>
  }
  const paginateData = data.headers["x-pagination"]
    ? (JSON.parse(data.headers["x-pagination"]) as IPagination)
    : {
        PageIndex: page,
        PageSize: 0,
        TotalCount: 0,
        TotalPages: 0,
        HasPrevious: false,
        HasNext: false
      }
  return (
    <div className="w-full shadow">
      <TableContainer>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.data.data.map((row) => (
              <TableRow
                hover
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
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
                <TableCell align="center">
                  <UpdateQuestion post={row} />
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
        page={paginateData.PageIndex}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  )
}
