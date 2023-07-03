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
  tableContainerProps?: TableContainerProps
  pagination?: MRT_PaginationState
  rowCount?: number
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
  tableContainerProps = { sx: { maxHeight: "600px" } },
  ...props
}: ReusableTableProps<T>) => {
  if (pagination) {
    return (
      <MaterialReactTable
        {...props}
        columns={columns}
        enableRowActions
        manualPagination
        enableStickyHeader
        enableTopToolbar
        enableGlobalFilter={false}
        muiTableContainerProps={tableContainerProps}
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
  return (
    <MaterialReactTable
      {...props}
      columns={columns}
      enableRowActions
      enableStickyHeader
      enableTopToolbar
      enableGlobalFilter={false}
      muiTableContainerProps={tableContainerProps}
      data={data}
      state={{
        isLoading,
        showAlertBanner: isError,
        showProgressBars: isRefetching
      }}
      positionActionsColumn="last"
    />
  )
}

export default TableCustom
