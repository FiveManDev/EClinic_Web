import { Box, IconButton, Tooltip } from "@mui/material"
import { CustomInput } from "components/User/Input"
import { useSearchServiceForAdQuery } from "hooks/query/service/useService"
import useDebounce from "hooks/useDebounce"
import MaterialReactTable, {
    MRT_ColumnDef,
    MRT_PaginationState
} from "material-react-table"
import { useRouter } from "next/router"
import { useMemo, useState } from "react"
import { HiOutlinePencilSquare } from "react-icons/hi2"
import { getDataPaginate } from "shared/helpers/helper"
import { Service } from "types/Service"
const ListService = () => {
    const router = useRouter()
    const [pagination, setPagination] = useState<MRT_PaginationState>({
        pageIndex: 1,
        pageSize: 10
    })
    const [searchData, setSearchData] = useState("")
    const searchTextDebounce = useDebounce(searchData, 1000)

    const { data, isLoading, isError, isRefetching } = useSearchServiceForAdQuery({
        searchText: searchTextDebounce,
        pageNumber: pagination.pageIndex,
        pageSize: pagination.pageSize
    })

    const columns = useMemo<MRT_ColumnDef<Service>[]>(
        () => [
            {
                accessorKey: "serviceID",
                header: "Id",
                size: 160,
                enableClickToCopy: true,
                Cell: ({ row }) => {
                    return (
                        <p className="line-clamp-1 max-w-[160px]">
                            {row.original.serviceID}
                        </p>
                    )
                }
            },
            {
                accessorKey: "serviceName",
                header: "Name",
                size: 180,
                enableClickToCopy: true,
                Cell: ({ row }) => {
                    return (
                        <p className="line-clamp-1 max-w-[180px]">
                            {row.original.serviceName}
                        </p>
                    )
                }
            },
            {
                accessorKey: "price",
                header: "Price",
                size: 110,
                enableClickToCopy: true,
                Cell: ({ row }) => {
                    return (
                        <p className="line-clamp-1 max-w-[110px]">
                            {row.original.price} VND
                        </p>
                    )
                }
            },
            {
                accessorKey: "estimatedTime",
                header: "EstimatedTime",
                size: 80,
                enableClickToCopy: true,
                Cell: ({ row }) => {
                    return (
                        <p className="line-clamp-1 max-w-[80px]">
                            {row.original.estimatedTime} m
                        </p>
                    )
                }
            },
            {
                accessorKey: "isActive",
                header: "Status",
                size: 110,
                enableClickToCopy: true,
                Cell: ({ row }) => {
                    return (
                        <p className="line-clamp-1 max-w-[110px]">
                            {row.original.isActive ? "Active" : "InActive"}
                        </p>
                    )
                }
            },
            {
                accessorKey: "specialization",
                header: "Specialization",
                size: 180,
                enableClickToCopy: true,
                Cell: ({ row }) => {
                    return (
                        <p className="line-clamp-1 max-w-[180px]">
                            {row.original.specialization.specializationName}
                        </p>
                    )
                }
            },
        ],
        []
    )
    return (
        <MaterialReactTable
            columns={columns}
            enableRowActions
            manualPagination
            enableStickyHeader
            enableTopToolbar
            enableGlobalFilter={false}
            muiTableContainerProps={{ sx: { maxHeight: "600px" } }}
            onPaginationChange={setPagination}
            data={data?.data?.data ?? []}
            rowCount={getDataPaginate(data).PageSize ?? 0}
            state={{
                isLoading,
                pagination,
                showAlertBanner: isError,
                showProgressBars: isRefetching
            }}
            positionActionsColumn="last"
            renderRowActions={({ row }) => (
                <Box sx={{ display: "flex", gap: "1rem" }}>
                    <Tooltip arrow placement="left" title="Edit">
                        <IconButton
                            onClick={() =>
                                router.push(
                                    `/admin/services/edit/${row.original.serviceID}`
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
    )
}

export default ListService
