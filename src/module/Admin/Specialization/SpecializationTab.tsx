import { yupResolver } from "@hookform/resolvers/yup"
import { Box, IconButton, Tooltip } from "@mui/material"
import CustomButton from "components/User/Button"
import { CustomInput } from "components/User/Input"
import useConfirm from "context/ComfirmContext"
import { CreateSpecialization, useCreateSpecializationMutation, useSearchSpecializationQuery, useUpdateSpecializationMutation } from "hooks/query/service/useService"
import useDebounce from "hooks/useDebounce"
import MaterialReactTable, {
    MRT_ColumnDef,
    MRT_PaginationState
} from "material-react-table"
import { useMemo, useState } from "react"
import { FieldValues, useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { HiOutlinePencilSquare } from "react-icons/hi2"
import { getDataPaginate } from "shared/helpers/helper"
import { Specialization } from "types/Service"
import * as yup from "yup"

const schema = yup.object({
    specializationName: yup.string().required("Please enter specialization name"),
})
const SpecializationTab = () => {
    const [mode, setMode] = useState("create")
    const [spec, setSpec] = useState<Specialization>({
        specializationID: "",
        specializationName: ""
    });
    const [pagination, setPagination] = useState<MRT_PaginationState>({
        pageIndex: 1,
        pageSize: 10
    })
    const [searchData, setSearchData] = useState("")
    const searchTextDebounce = useDebounce(searchData, 1000)
    const { data, isLoading, isError, isRefetching, refetch } = useSearchSpecializationQuery({
        searchText: searchTextDebounce,
        pageNumber: pagination.pageIndex,
        pageSize: pagination.pageSize
    })
    const confirm = useConfirm()
    const createSpecialization = useCreateSpecializationMutation()
    const updateSpecialization = useUpdateSpecializationMutation()
    const {
        handleSubmit,
        control,
        reset,
        setValue,
        formState: { errors }
    } = useForm({
        mode: "onSubmit",
        resolver: yupResolver(schema),
        defaultValues: { specializationID: spec.specializationID, specializationName: spec.specializationName } as Specialization
    })
    const handleUpdate = (spec: Specialization) => {
        setMode("update");
        setSpec(spec);
        setValue("specializationName", spec.specializationName)
    }
    const onSubmit = async (value: FieldValues) => {
        if (mode === "update") {
            if (confirm) {
                const choice = await confirm({
                    title: "Update Specialization",
                    content: "Are you sure want to update this Specialization?"
                })
                if (choice) {
                    updateSpecialization.mutate(
                        {
                            ...value,
                            specializationID: spec.specializationID
                        } as Specialization,
                        {
                            onSuccess: (data) => {
                                refetch()
                                if (data.isSuccess) {
                                    toast.success("Update a Specialization successfuly")
                                    resetForm()
                                    setMode("create")
                                } else {
                                    toast.error("Update a Specialization fail")
                                }
                            },
                            onError: () => {
                                toast.error("Update a Specialization fail")
                            }
                        }
                    )
                }
            }
        } else {
            if (confirm) {
                const choice = await confirm({
                    title: "Create Specialization",
                    content: "Are you sure want to create this Specialization?"
                })
                if (choice) {
                    createSpecialization.mutate(
                        {
                            ...value,
                        } as CreateSpecialization,
                        {
                            onSuccess: (data) => {
                                refetch()
                                if (data?.isSuccess) {
                                    toast.success("Create a Specialization successfuly")
                                    resetForm()
                                } else {
                                    toast.error("Create a Specialization fail")
                                }
                            },
                            onError: () => {
                                toast.error("Create a Specialization fail")
                            }
                        }
                    )
                }
            }
        }
    }
    const resetForm = () => {
        reset({
            specializationName: ""
        })
    }
    const columns = useMemo<MRT_ColumnDef<Specialization>[]>(
        () => [
            {
                accessorKey: "specializationID",
                header: "Id",
                size: 160,
                enableClickToCopy: true,
                Cell: ({ row }) => {
                    return (
                        <p className="line-clamp-1 max-w-[160px]">
                            {row.original.specializationID}
                        </p>
                    )
                }
            },
            {
                accessorKey: "specializationName",
                header: "Name",
                size: 180,
                enableClickToCopy: true,
                Cell: ({ row }) => {
                    return (
                        <p className="line-clamp-1 max-w-[180px]">
                            {row.original.specializationName}
                        </p>
                    )
                }
            },
        ],
        []
    )
    return (
        <div className="flex flex-col gap-y-4">
            <form className="flex gap-x-3 max-w-2xl items-center background-primary" onSubmit={handleSubmit(onSubmit)}>
                <CustomInput
                    size="medium"
                    label="Specialization name"
                    control={control}
                    name="specializationName"
                    error={!!errors.specializationName}
                    helperText={errors?.specializationName?.message?.toString()}
                />
                <CustomButton
                    kind="primary"
                    type="submit"
                    className="w-fit"
                    isLoading={createSpecialization.isLoading}
                >
                    {mode === "create" ? "Create" : "Update"}
                </CustomButton>
            </form>
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
                                onClick={() => handleUpdate({ specializationID: row.original.specializationID, specializationName: row.original.specializationName } as Specialization)
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

        </div>
    )
}

export default SpecializationTab