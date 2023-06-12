import { Box } from "@mui/material"
import SwitchCustom from "components/Common/IOSSwitch"
import ImageCustom from "components/Common/ImageCustom"
import TableCustom from "components/Common/Table/TableCustom"
import Tag from "components/Common/Tag"
import { CustomInput } from "components/User/Input"
import {
  useGetPatientProfilesQuery,
  useUpdateProfileMutation
} from "hooks/query/profile/useProfile"
import useDebounce from "hooks/useDebounce"
import MaterialReactTable, {
  MRT_ColumnDef,
  MRT_PaginationState
} from "material-react-table"

import { useMemo, useState } from "react"
import { FieldValues } from "react-hook-form"
import { toast } from "react-hot-toast"
import { combineName, dayformat, getDataPaginate } from "shared/helpers/helper"
import colorsProvider from "shared/theme/colors"
import { IProfile, IRelationShip, Profile } from "types/Profile.type"
const ListPatient = () => {
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 1,
    pageSize: 10
  })
  const [searchData, setSearchData] = useState("")
  const searchTextDebounce = useDebounce(searchData, 1500)
  const updateProfile = useUpdateProfileMutation()

  const { data, isLoading, isError, isRefetching, refetch } =
    useGetPatientProfilesQuery({
      searchText: searchTextDebounce,
      pageNumber: pagination.pageIndex + 1,
      pageSize: pagination.pageSize
    })
  // const handleUpdateProfile = () => {
  //   updateProfile.mutate(data?.data.data, {
  //     onSuccess: (data) => {
  //       if (data.isSuccess) {
  //         toast.success("Update successfully!")
  //         refetch()
  //       } else {
  //         toast.error("Update error")
  //       }
  //     },
  //     onError: () => {
  //       toast.error("Update error")
  //     }
  //   })
// }
  const columns = useMemo<MRT_ColumnDef<Profile>[]>(
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
        accessorKey: "enabledAccount",
        header: "Status",
        Cell: ({ row }) => {
          return (
            <Tag
              color={
                row.original.enabledAccount
                  ? colorsProvider.success
                  : colorsProvider.error
              }
            >
              {row.original.enabledAccount ? "Active" : "Banned"}
            </Tag>
          )
        }
      },
      {
        accessorKey: "phone",
        header: "Phone",
        size: 180,
        Cell: ({ row }) => {
          return (
            <p className="line-clamp-1">
              {row.original.phone ? row.original.phone : "None"}
            </p>
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
        <Box sx={{ display: "flex", gap: "1rem" }}>
          <SwitchCustom />
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
  )
}

export default ListPatient
