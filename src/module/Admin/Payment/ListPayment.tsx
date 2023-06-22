import { Box, IconButton, Tooltip } from "@mui/material"
import TableCustom from "components/Common/Table/TableCustom"
import Tag from "components/Common/Tag"
import { useGetAllPaymentTransactionQuery } from "hooks/query/payment/usePayment"
import { MRT_ColumnDef, MRT_PaginationState } from "material-react-table"
import { useRouter } from "next/router"
import { useMemo, useState } from "react"
import { HiOutlinePencilSquare } from "react-icons/hi2"
import { dayformat, getDataPaginate } from "shared/helpers/helper"
import { PaymentWithoutAuthor } from "types/Payment"
const ListPayment = () => {
    const router = useRouter()
    const [pagination, setPagination] = useState<MRT_PaginationState>({
        pageIndex: 1,
        pageSize: 10
    })

    const { data, isLoading, isError, isRefetching } = useGetAllPaymentTransactionQuery(
        {
            pageNumber: pagination.pageIndex + 1,
            pageSize: pagination.pageSize
        }
    )
    const paginationData = getDataPaginate(data)
    const columns = useMemo<MRT_ColumnDef<PaymentWithoutAuthor>[]>(
        () => [
            {
                accessorKey: "paymentID",
                header: "Id",
                size: 160,
                enableClickToCopy: true,
                Cell: ({ row }) => {
                    return (
                        <p className="line-clamp-1 max-w-[160px]">
                            {row.original.paymentID}
                        </p>
                    )
                }
            },
            {
                accessorKey: "paymentAmount",
                header: "Amount",
                size: 180,
                Cell: ({ row }) => {
                    return (
                        <p className="line-clamp-1 max-w-[180px]">
                            {row.original.paymentAmount} VND
                        </p>
                    )
                }
            },
            {
                accessorKey: "paymentTime",
                header: "Time",
                size: 110,
                Cell: ({ row }) => {
                    return (
                        <p className="line-clamp-1 max-w-[110px]">
                            {dayformat(row.original.paymentTime)}
                        </p>
                    )
                }
            },
            {
                accessorKey: "paymentService",
                header: "Payment Type",
                size: 80,
                Cell: ({ row }) => {
                    return (
                        <p className="line-clamp-1 max-w-[80px]">
                            {row.original.paymentService}
                        </p>
                    )
                }
            },
            {
                accessorKey: "isRefund",
                header: "Status",
                size: 110,
                Cell: ({ row }) => {
                    return (
                        <div className="line-clamp-1 max-w-[110px]">
                            {row.original.isRefund ? (<Tag color="#FEAF02">Refund</Tag>) : (<Tag color="#4fde98">Not Refund</Tag>)}
                        </div>
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
                                router.push(`/admin/payment/paymentdetail/${row.original.paymentID}`)
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

export default ListPayment
