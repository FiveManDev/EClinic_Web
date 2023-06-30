import { Box, IconButton, Tooltip } from "@mui/material"
import TableCustom from "components/Common/Table/TableCustom"
import { CustomInput } from "components/User/Input"
import { MRT_ColumnDef } from "material-react-table"
import React, { useMemo, useState } from "react"
import { HiOutlinePencilSquare } from "react-icons/hi2"
import WrapperHeading from "./WrapperHeading"

interface SAMPLE {
  id: number
  name: string
}

const data: SAMPLE[] = [
  {
    id: 1,
    name: "Machine learning 1"
  },
  {
    id: 2,
    name: "Machine learning 2"
  },
  {
    id: 3,
    name: "Machine learning 3"
  },
  {
    id: 4,
    name: "Machine learning4"
  },
  {
    id: 5,
    name: "Machine learning 5"
  }
]

const ListModel = () => {
  const [searchData, setSearchData] = useState("")

  const columns = useMemo<MRT_ColumnDef<SAMPLE>[]>(
    () => [
      {
        accessorKey: "id",
        header: "Id",
        enableClickToCopy: true,
        Cell: ({ row }) => {
          return <p className="line-clamp-1 max-w-[160px]">{row.original.id}</p>
        }
      },
      {
        accessorKey: "name",
        header: "Name",
        Cell: ({ row }) => {
          return (
            <p className="line-clamp-1 max-w-[180px]">{row.original.name}</p>
          )
        }
      }
    ],
    []
  )

  return (
    <WrapperHeading heading="Model list">
      <TableCustom
        pagination={{ pageIndex: 1, pageSize: 10 }}
        // onPaginationChange={setPagination}
        columns={columns}
        data={data ?? []}
        rowCount={data.length ?? 0}
        // pageCount={paginationData.TotalPages ?? 0}
        isLoading={false}
        isError={false}
        isRefetching={false}
        renderRowActions={({ row }) => (
          <Box sx={{ display: "flex", gap: "1rem" }}>
            <Tooltip arrow placement="left" title="Edit">
              <IconButton onClick={() => {}}>
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
    </WrapperHeading>
  )
}

export default ListModel
