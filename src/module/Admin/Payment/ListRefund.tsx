import { Box, IconButton, Tooltip } from "@mui/material"
import TableCustom from "components/Common/Table/TableCustom"
import { useGetAllRefundTransactionQuery } from "hooks/query/payment/usePayment"
import { MRT_ColumnDef, MRT_PaginationState } from "material-react-table"
import { useRouter } from "next/router"
import { useMemo, useState } from "react"
import { HiOutlinePencilSquare } from "react-icons/hi2"
import { dayformat, getDataPaginate } from "shared/helpers/helper"
import { RefundWithoutReason } from "types/Payment"
const ListRefund = () => {
    const router = useRouter()
    const [pagination, setPagination] = useState<MRT_PaginationState>({
        pageIndex: 1,
        pageSize: 10
    })

    const { data, isLoading, isError, isRefetching } = useGetAllRefundTransactionQuery(
        {
            pageNumber: pagination.pageIndex + 1,
            pageSize: pagination.pageSize
        }
    )
    const paginationData = getDataPaginate(data)
    const columns = useMemo<MRT_ColumnDef<RefundWithoutReason>[]>(
        () => [
            {
                accessorKey: "refundID",
                header: "Id",
                size: 160,
                enableClickToCopy: true,
                Cell: ({ row }) => {
                    return (
                        <p className="line-clamp-1 max-w-[160px]">
                            {row.original.refundID}
                        </p>
                    )
                }
            },
            {
                accessorKey: "refundAmount",
                header: "Amount",
                size: 180,
                Cell: ({ row }) => {
                    return (
                        <p className="line-clamp-1 max-w-[180px]">
                            {row.original.refundAmount} VND
                        </p>
                    )
                }
            },
            {
                accessorKey: "refundTime",
                header: "Time",
                size: 110,
                Cell: ({ row }) => {
                    return (
                        <p className="line-clamp-1 max-w-[110px]">
                            {dayformat(row.original.refundTime)}
                        </p>
                    )
                }
            },
            {
                accessorKey: "paymentService",
                header: "Refund Type",
                size: 80,
                Cell: ({ row }) => {
                    return (
                        <p className="line-clamp-1 max-w-[80px]">
                            {row.original.paymentService}
                        </p>
                    )
                }
            },
        ],
        []
    )
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
                    <Tooltip arrow placement="left" title="Edit">
                        <IconButton
                            onClick={() =>
                                router.push(`/admin/payment/refunddetail/${row.original.refundID}`)
                            }
                        >
                            <HiOutlinePencilSquare />
                        </IconButton>
                    </Tooltip>
                </Box>
            )}
        />
    )
}

export default ListRefund
