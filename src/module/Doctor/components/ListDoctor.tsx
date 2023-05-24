import { Box, IconButton, Tooltip } from "@mui/material"
import ImageCustom from "components/Common/ImageCustom"
import { useGetDoctorProfilesQuery } from "hooks/query/profile/useProfile"
import MaterialReactTable, {
  MRT_ColumnDef,
  MRT_PaginationState
} from "material-react-table"
import { useEffect, useMemo, useState } from "react"
import { combineName, dayformat, getDataPaginate } from "shared/helpers/helper"
import { IProfileDoctor } from "types/Profile.type"
const ListDoctor = () => {
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 1,
    pageSize: 10
  })
  const [searchData, setSearchData] = useState({
    searchText: ""
  })
  const { data, isLoading, isError, isRefetching } = useGetDoctorProfilesQuery({
    searchText: searchData.searchText,
    pageNumber: pagination.pageIndex,
    pageSize: pagination.pageSize
  })

  const columns = useMemo<MRT_ColumnDef<IProfileDoctor>[]>(
    () => [
      {
        accessorFn: (row) => `${row.firstName} ${row.lastName} ${row.avatar}`,
        header: "Full name",
        Cell: ({ row }) => {
          return (
            <div className="flex items-center space-x-2">
              <div className="relative w-10 h-10 overflow-hidden rounded-full">
                <ImageCustom
                  src={row.original.avatar}
                  fill
                  alt="user-avatar"
                  className="object-cover"
                />
              </div>
              <span className="text-sm font-medium text-h1">
                {combineName(row.original.firstName, row.original.lastName)}
              </span>
            </div>
          )
        }
      },
      {
        accessorKey: "address",
        header: "Address",
        Cell: ({ row }) => {
          return (
            <p className="line-clamp-1 max-w-[120px]">{row.original.address}</p>
          )
        }
      },
      {
        accessorKey: "email",
        header: "Email",
        Cell: ({ row }) => {
          return (
            <p className="line-clamp-1 max-w-[120px]">{row.original.email}</p>
          )
        }
      },
      {
        accessorKey: "title",
        header: "Position",
        Cell: ({ row }) => {
          return (
            <p className="line-clamp-1 max-w-[120px]">{row.original.title}</p>
          )
        }
      },
      {
        accessorKey: "workStart",
        header: "Date start work",
        Cell: ({ row }) => {
          return (
            <p className="line-clamp-1 max-w-[120px]">
              {dayformat(row.original.workStart)}
            </p>
          )
        }
      }
    ],
    []
  )
  return (
    <MaterialReactTable
      columns={columns}
      enableRowActions
      manualPagination
      onPaginationChange={setPagination}
      data={data?.data?.data ?? []}
      rowCount={getDataPaginate(data).PageSize ?? 0}
      state={{
        isLoading,
        pagination,
        showAlertBanner: isError,
        showProgressBars: isRefetching
      }}
      renderRowActions={({ row, table }) => (
        <Box sx={{ display: "flex", gap: "1rem" }}>
          <Tooltip arrow placement="left" title="Edit">
            <IconButton onClick={() => table.setEditingRow(row)}>
              Edit
            </IconButton>
          </Tooltip>
        </Box>
      )}
    />
  )
}

export default ListDoctor
