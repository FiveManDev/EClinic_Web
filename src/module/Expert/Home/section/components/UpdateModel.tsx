import { yupResolver } from "@hookform/resolvers/yup"
import ModalPrimary from "components/Common/Modal/ModalPrimary"
import { SelectCustom } from "components/Common/Select/SelectCustom"
import CustomButton from "components/User/Button"
import { CustomInput } from "components/User/Input"
import InputField from "components/User/Input/InputField"
import {
  ModelAction,
  useCreateModelMutation,
  useGetAllDeepLearningQuery,
  useGetAllMachineLearningQuery,
  useUpdateModelMutation
} from "hooks/query/ai"
import { queryClient } from "pages/_app"
import { useEffect } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { QUERY_KEYS } from "shared/constant/constant"
import { Model } from "types/AI"
import * as yup from "yup"

interface Props {
  show: boolean
  // eslint-disable-next-line no-unused-vars
  onModalChange: (value: boolean) => void
  model: Model | null
}

const schema = yup.object({
  ModelName: yup.string().required("Please enter model name"),
  Accuracy: yup.string().required("Please enter Accuracy"),
  MachineID: yup.string().required("Please enter machine learning"),
  DeepID: yup.string().required("Please enter deep learning")
})

const UpdateModel = ({ show, onModalChange, model }: Props) => {
  const createModel = useCreateModelMutation()
  const updateModel = useUpdateModelMutation()
  const deepLearning = useGetAllDeepLearningQuery()
  const machineLearning = useGetAllMachineLearningQuery()
  const {
    handleSubmit,
    control,
    watch,
    reset,
    register,
    setValue,
    formState: { errors }
  } = useForm<ModelAction>({
    mode: "onSubmit",
    resolver: yupResolver(schema)
  })
  const machineId = watch(
    "MachineID",
    model ? model.MachineLearning.MachineID : ""
  )
  const deepId = watch("DeepID", model ? model.DeepLearning.DeepID : "")
  const onSubmit: SubmitHandler<ModelAction> = (value) => {
    if (model) {
      updateModel.mutate(
        {
          ...value,
          file: value?.file?.length > 0 ? value.file[0] : null
        },
        {
          onSuccess() {
            toast.success("Your model updated")
            queryClient.invalidateQueries([QUERY_KEYS.AI.Model])
            onModalChange(false)
          },
          onError() {
            toast.error("Your model update fail")
          }
        }
      )
    } else {
      if (value.file.length > 0) {
        createModel.mutate(
          {
            ...value,
            file: value.file[0]
          },
          {
            onSuccess() {
              toast.success("Your model created")
              queryClient.invalidateQueries([QUERY_KEYS.AI.Model])
              onModalChange(false)
            },
            onError() {
              toast.error("Your model create fail")
            }
          }
        )
      } else {
        toast.error("Please import model file")
      }
    }
  }
  useEffect(() => {
    if (model) {
      reset({
        Accuracy: model.Accuracy,
        DeepID: model.DeepLearning.DeepID,
        MachineID: model.MachineLearning.MachineID,
        ModelID: model.ModelID,
        ModelName: model.ModelName,
        file: null
      })
    } else {
      reset()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [model, show])
  return (
    <>
      <ModalPrimary show={show} onClose={() => onModalChange(false)}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-[600px] w-full flex flex-col gap-3 p-4 pb-0"
        >
          <h1 className="text-2xl font-bold text-center text-black1">
            {model ? "Update Model" : "Create Model"}
          </h1>
          <div className="flex items-start w-full space-x-3">
            <InputField
              size="medium"
              label="Name Model"
              control={control}
              name="ModelName"
            />
            <InputField
              type="number"
              size="medium"
              label="Accuracy"
              control={control}
              name="Accuracy"
            />
          </div>
          <SelectCustom
            error={errors.MachineID?.message}
            value={machineId}
            isLoading={machineLearning.isLoading}
            placeholder="Machine Learning"
            size="medium"
            options={machineLearning.data?.data.data.map((item) => ({
              label: item.MachineName,
              value: item.MachineID
            }))}
            onSelectOption={(value) => setValue("MachineID", value.value)}
          />
          <SelectCustom
            error={errors.DeepID?.message}
            value={deepId}
            isLoading={deepLearning.isLoading}
            placeholder="Deep Learning"
            size="medium"
            options={deepLearning.data?.data?.data?.map((item) => ({
              label: item.DeepName,
              value: item.DeepID
            }))}
            onSelectOption={(value) => setValue("DeepID", value.value)}
          />
          <div className="border border-solid rounded-md border-carbon">
            <label htmlFor="file-input" className="sr-only">
              Choose file
            </label>
            <input
              {...register("file")}
              type="file"
              className="block w-full text-sm border border-gray-200 rounded-md shadow-sm cursor-pointer focus:z-10 focus:border-blue-500 focus:ring-blue-500 file:bg-transparent file:border-0 file:bg-gray-100 file:mr-4 file:py-3 file:px-4 "
            />
          </div>

          <div className="footer">
            <div className="flex justify-between px-6">
              <CustomButton
                kind="tertiary"
                onClick={() => onModalChange(false)}
              >
                Cancel
              </CustomButton>
              <CustomButton type="submit" kind="primary">
                Apply
              </CustomButton>
            </div>
          </div>
        </form>
      </ModalPrimary>
    </>
  )
}

export default UpdateModel
