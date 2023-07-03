import { Box, IconButton, MenuItem, Tooltip } from "@mui/material"
import TableCustom from "components/Common/Table/TableCustom"
import Tag from "components/Common/Tag"
import {
  useGetAllDeepLearningQuery,
  useGetAllMachineLearningQuery,
  useGetAllModelQuery
} from "hooks/query/ai"
import { MRT_ColumnDef } from "material-react-table"
import { useMemo, useState } from "react"
import { HiOutlinePencilSquare } from "react-icons/hi2"
import colorsProvider from "shared/theme/colors"
import { Model } from "types/AI"
import UpdateModel from "./UpdateModel"
import WrapperHeading from "./WrapperHeading"

const ListModel = () => {
  const [actionModel, setActionModel] = useState({
    active: false,
    type: "edit" as "edit" | "create",
    value: null as Model | null
  })
  const { data, isLoading, isError, isRefetching } = useGetAllModelQuery()
  const deepLearning = useGetAllDeepLearningQuery()
  const machineLearning = useGetAllMachineLearningQuery()
  const columns = useMemo<MRT_ColumnDef<Model>[]>(
    () => [
      {
        accessorKey: "ModelID",
        header: "Id",
        enableClickToCopy: true,
        Cell: ({ row }) => {
          return (
            <p className="line-clamp-1 max-w-[60px]">{row.original.ModelID}</p>
          )
        }
      },
      {
        accessorKey: "ModelName",
        header: "Model Name",
        Cell: ({ row }) => {
          return (
            <p className="line-clamp-1 max-w-[180px]">
              {row.original.ModelName}
            </p>
          )
        }
      },
      {
        accessorKey: "Accuracy",
        header: "Model Name",
        Cell: ({ row }) => {
          return (
            <Tag color={colorsProvider.success}>{row.original.Accuracy}</Tag>
          )
        }
      },
      {
        accessorKey: "DeepLearning.DeepID",
        header: "Deep Learning",
        Cell: ({ row }) => {
          return (
            <Tag color={colorsProvider.support}>
              {row.original.DeepLearning.DeepName}
            </Tag>
          )
        },
        muiTableBodyCellEditTextFieldProps: {
          select: true, //change to select for a dropdown
          children: deepLearning.data?.data.data.map((state) => (
            <MenuItem key={state.DeepID} value={state.DeepID}>
              {state.DeepName}
            </MenuItem>
          ))
        }
      },
      {
        accessorKey: "MachineLearning.MachineID",
        header: "Machine Learning",
        Cell: ({ row }) => {
          return (
            <Tag color={colorsProvider.pending}>
              {row.original.MachineLearning.MachineName}
            </Tag>
          )
        },
        muiTableBodyCellEditTextFieldProps: {
          select: true, //change to select for a dropdown
          children: machineLearning.data?.data.data.map((state) => (
            <MenuItem key={state.MachineID} value={state.MachineID}>
              {state.MachineName}
            </MenuItem>
          ))
        }
      },
      {
        accessorKey: "IsActive",
        header: "Active",
        muiTableBodyCellEditTextFieldProps: {
          select: true,
          children: [true, false].map((state, index) => (
            <MenuItem key={index} value={2}>
              <Tag
                color={state ? colorsProvider.success : colorsProvider.error}
              >
                {state ? "Active" : "Banned"}
              </Tag>
            </MenuItem>
          ))
        },
        Cell: ({ row }) => (
          <Tag
            color={
              row.original.IsActive
                ? colorsProvider.success
                : colorsProvider.error
            }
          >
            {row.original.IsActive ? "Active" : "Banned"}
          </Tag>
        )
      }
    ],
    [deepLearning, machineLearning]
  )
  // const handleSaveRow: MaterialReactTableProps<Model>["onEditingRowSave"] =
  // async ({ exitEditingMode, values }) => {
  //   update.mutate(values, {
  //     onSuccess: () => {
  //       toast.success("Update complete")
  //       exitEditingMode()
  //       refetch()
  //       queryClient.invalidateQueries({
  //         queryKey: [QUERY_KEYS.AI.Model]
  //       })
  //     },
  //     onError: () => {
  //       toast.error("An error occurred during the update")
  //     }
  //   })
  // }
  return (
    <WrapperHeading heading="Model list">
      <TableCustom
        initialState={{ pagination: { pageSize: 5, pageIndex: 0 } }}
        columns={columns}
        data={data?.data.data ?? []}
        isLoading={isLoading}
        isError={isError}
        isRefetching={isRefetching}
        renderRowActions={({ row }) => (
          <Box sx={{ display: "flex", gap: "1rem" }}>
            <Tooltip arrow placement="left" title="Edit">
              <IconButton
                onClick={() => {
                  setActionModel({
                    active: true,
                    type: "edit",
                    value: row.original
                  })
                }}
              >
                <HiOutlinePencilSquare />
              </IconButton>
            </Tooltip>
          </Box>
        )}
      />
      <UpdateModel
        onModalChange={(value) => {
          setActionModel((prevstate) => ({ ...prevstate, active: value }))
        }}
        model={actionModel.value}
        show={actionModel.active}
      />
    </WrapperHeading>
  )
}

export default ListModel
