import MaterialReactTable, {
  MRT_ColumnDef,
  MRT_PaginationState
} from "material-react-table"
import React, { useMemo, useState } from "react"

interface ReusableTableProps<T extends Record<string, any>> {
  columns: MRT_ColumnDef<T>[]
  data: T[]
  rowCount: number
  isLoading: boolean
  isError: boolean
  isRefetching: boolean
  // eslint-disable-next-line no-unused-vars
  onPaginationChange: (pagination: MRT_PaginationState) => void
  // eslint-disable-next-line no-unused-vars
  renderRowActions: (props: { row: any }) => React.ReactNode
  renderTopToolbarCustomActions: () => React.ReactNode
}

const TableCustom = <T extends Record<string, any>>({
  columns,
  data,
  rowCount,
  isLoading,
  isError,
  isRefetching,
  onPaginationChange,
  renderRowActions,
  renderTopToolbarCustomActions
}: ReusableTableProps<T>) => {
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 1,
    pageSize: 10
  })

  useMemo(() => {
    onPaginationChange(pagination)
  }, [pagination, onPaginationChange])

  return (
    <MaterialReactTable
      columns={columns}
      enableRowActions
      manualPagination
      enableStickyHeader
      enableTopToolbar
      enableGlobalFilter={false}
      muiTableContainerProps={{ sx: { maxHeight: "500px" } }}
      onPaginationChange={setPagination}
      data={data}
      rowCount={rowCount}
      state={{
        isLoading,
        pagination,
        showAlertBanner: isError,
        showProgressBars: isRefetching
      }}
      positionActionsColumn="last"
      renderRowActions={renderRowActions}
      renderTopToolbarCustomActions={renderTopToolbarCustomActions}
    />
  )
}

export default TableCustom
