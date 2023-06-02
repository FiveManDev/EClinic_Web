import { TableContainerProps } from "@mui/material"
import MaterialReactTable, {
  MRT_ColumnDef,
  MRT_PaginationState,
  MaterialReactTableProps
} from "material-react-table"

interface ReusableTableProps<T extends Record<string, any>>
  extends MaterialReactTableProps<T> {
  columns: MRT_ColumnDef<T>[]
  data: T[]
  muiTableContainerProps?: TableContainerProps
  pagination: MRT_PaginationState
  rowCount: number
  isLoading: boolean
  isError: boolean
  isRefetching: boolean
}
const TableCustom = <T extends Record<string, any>>({
  columns,
  data,
  pagination,
  rowCount,
  isLoading,
  isError,
  isRefetching,
  muiTableContainerProps = { sx: { maxHeight: "600px" } },
  ...props
}: ReusableTableProps<T>) => {
  return (
    <MaterialReactTable
      {...props}
      columns={columns}
      enableRowActions
      manualPagination
      enableStickyHeader
      enableTopToolbar
      enableGlobalFilter={false}
      muiTableContainerProps={muiTableContainerProps}
      data={data}
      rowCount={rowCount}
      state={{
        isLoading,
        pagination,
        showAlertBanner: isError,
        showProgressBars: isRefetching
      }}
      positionActionsColumn="last"
    />
  )
}

export default TableCustom
