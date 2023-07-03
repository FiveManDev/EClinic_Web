import ModalPrimary from "components/Common/Modal/ModalPrimary"
import CustomButton from "components/User/Button"
import { Model } from "types/AI"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useForm } from "react-hook-form"
import { CustomInput } from "components/User/Input"

interface Props {
  show: boolean
  // eslint-disable-next-line no-unused-vars
  onModalChange: (value: boolean) => void
  model: Model | null
}

const schema = yup.object({
  ModelName: yup.string().required("Please enter model name"),
  Accuracy: yup.string().required("Please enter Accuracy"),
  MachineID: yup.string().required("Please enter meta description"),
  DeepID: yup.string().required("Please enter meta keywords")
})

const UpdateModel = ({ show, onModalChange, model }: Props) => {
  const {
    handleSubmit,
    control,
    watch,
    reset,
    setValue,
    formState: { errors }
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(schema)
  })

  return (
    <>
      <ModalPrimary show={show} onClose={() => onModalChange(false)}>
        <div className="max-w-[400px] w-full flex flex-col gap-3">
          <div className="flex items-start space-x-3">
            <CustomInput
              size="medium"
              label="Name Model"
              control={control}
              name="ModelName"
              error={!!errors.ModelName}
              helperText={errors.ModelName?.message?.toString()}
            />
            <CustomInput
              size="medium"
              label="Accuracy"
              control={control}
              name="Accuracy"
              error={!!errors.Accuracy}
              helperText={errors.Accuracy?.message?.toString()}
            />
          </div>
        </div>
        <div className="footer">
          <div className="flex justify-between px-6">
            <CustomButton kind="tertiary" onClick={() => onModalChange(false)}>
              Cancel
            </CustomButton>
            <CustomButton kind="primary">Apply</CustomButton>
          </div>
        </div>
      </ModalPrimary>
    </>
  )
}

export default UpdateModel
