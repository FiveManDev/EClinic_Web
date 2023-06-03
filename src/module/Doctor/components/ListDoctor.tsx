import { Box, IconButton, Tooltip } from "@mui/material"
import ImageCustom from "components/Common/ImageCustom"
import TableCustom from "components/Common/Table/TableCustom"
import { CustomInput } from "components/User/Input"
import { useGetDoctorProfilesQuery } from "hooks/query/profile/useProfile"
import useDebounce from "hooks/useDebounce"
import { MRT_ColumnDef, MRT_PaginationState } from "material-react-table"
import { useRouter } from "next/router"

import { useMemo, useState } from "react"
import { HiOutlinePencilSquare } from "react-icons/hi2"
import { combineName, dayformat, getDataPaginate } from "shared/helpers/helper"
import { IProfileDoctor } from "types/Profile.type"
const ListDoctor = () => {
  const router = useRouter()
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 1,
    pageSize: 10
  })
  const [searchData, setSearchData] = useState("")
  const searchTextDebounce = useDebounce(searchData, 1500)

  const { data, isLoading, isError, isRefetching } = useGetDoctorProfilesQuery({
    searchText: searchTextDebounce,
    pageNumber: pagination.pageIndex + 1,
    pageSize: pagination.pageSize
  })

  const columns = useMemo<MRT_ColumnDef<IProfileDoctor>[]>(
    () => [
      {
        accessorKey: "profileID",
        header: "Id",
        size: 160,
        enableClickToCopy: true,
        Cell: ({ row }) => {
          return (
            <p className="line-clamp-1 max-w-[120px]">
              {row.original.profileID}
            </p>
          )
        }
      },
      {
        accessorFn: (row) => `${row.firstName} ${row.lastName} ${row.avatar}`,
        header: "Full name",
        size: 200,
        Cell: ({ row }) => {
          return (
            <div className="flex items-center space-x-2">
              <div className="relative w-10 h-10 overflow-hidden rounded-full">
                <ImageCustom
                  src={row.original.avatar || "/images/avatars/avatar_1.jpg"}
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
        size: 200,
        Cell: ({ row }) => {
          return <p className="line-clamp-2">{row.original.address}</p>
        }
      },
      // {
      //   accessorKey: "address",
      //   header: "Status",
      //   Cell: () => {
      //     return <Tag color="#4FD8DE">Active</Tag>
      //   }
      // },
      {
        accessorKey: "email",
        header: "Email",
        size: 260,
        Cell: ({ row }) => {
          return <p className="line-clamp-1 ">{row.original.email}</p>
        }
      },
      {
        accessorKey: "dateOfBirth",
        header: "Date of birth",
        size: 120,
        Cell: ({ row }) => {
          return (
            <p className="line-clamp-1">
              {dayformat(row.original.dateOfBirth)}
            </p>
          )
        }
      },
      {
        accessorKey: "title",
        header: "Position",
        size: 120,
        Cell: ({ row }) => {
          return <p className="line-clamp-1">{row.original.title}</p>
        }
      },
      {
        accessorKey: "phone",
        header: "Phone",
        size: 180,
        Cell: ({ row }) => {
          return <p className="line-clamp-1">{row.original.phone}</p>
        }
      },
      {
        accessorKey: "workStart",
        header: "Date start work",
        size: 120,
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
  const pagaginationData = getDataPaginate(data)

  return (
    <TableCustom
      pagination={pagination}
      onPaginationChange={setPagination}
      columns={columns}
      data={data?.data?.data ?? []}
      rowCount={pagaginationData.TotalCount ?? 0}
      pageCount={pagaginationData.TotalPages ?? 0}
      isLoading={isLoading}
      isError={isError}
      isRefetching={isRefetching}
      renderRowActions={({ row }) => (
        <Box sx={{ display: "flex", gap: "1rem" }}>
          <Tooltip arrow placement="left" title="Edit">
            <IconButton
              onClick={() =>
                router.push(
                  `/admin/accounts/doctor/edit/${row.original.userID}`
                )
              }
            >
              <HiOutlinePencilSquare />
            </IconButton>
          </Tooltip>
        </Box>
      )}
      renderTopToolbarCustomActions={() => (
        <CustomInput
          placeholder="Search data here"
          className="max-w-[300px] w-full"
          onChange={(e) => setSearchData(e.target.value)}
        />
      )}
    />
    // <MaterialReactTable
    //   columns={columns}
    //   enableRowActions
    //   manualPagination
    //   enableStickyHeader
    //   enableTopToolbar
    //   enableGlobalFilter={false}
    //   muiTableContainerProps={{ sx: { maxHeight: "600px" } }}
    //   onPaginationChange={setPagination}
    //   data={data?.data?.data ?? []}
    //   rowCount={getDataPaginate(data).PageSize ?? 0}
    //   state={{
    //     isLoading,
    //     pagination,
    //     showAlertBanner: isError,
    //     showProgressBars: isRefetching
    //   }}
    //   positionActionsColumn="last"

    // />
  )
}

export default ListDoctor
