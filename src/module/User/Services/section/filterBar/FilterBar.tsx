import { Rating, Slider } from "@mui/material"
import CheckBoxCustom from "components/Common/Checkbox"
import InputCustom from "components/Common/Input"
import CustomButton from "components/User/Button"
import DrawerCustom from "components/User/Drawer"
import React from "react"
import { useTranslation } from "react-i18next"
import { HiMagnifyingGlass } from "react-icons/hi2"
interface Props {
  show: boolean
  onClose: () => void
}
const FilterBar = ({ show, onClose }: Props) => {
  const { t } = useTranslation(["ser"])
  const [rating, setRating] = React.useState<number | null>(2)

  const [state, setState] = React.useState({
    tieuhoa: false,
    nhikhoa: false
  })
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked
    })
  }
  return (
    <DrawerCustom
      show={show}
      onClose={onClose}
      className="md:max-w-[200px] lg:max-w-[290px] max-w-full px-4 md:px-0"
    >
      <div className="flex flex-col justify-start mt-10 md:mt-0 gap-y-6">
        <div className="space-y-2">
          <h3>{t("ser:search.label")}</h3>
          <InputCustom
            icon={<HiMagnifyingGlass />}
            className="w-full md:max-w-[412px]"
            placeholder={t("ser:search.input")}
          />
        </div>
        <div className="space-y-2">
          <h3>{t("ser:specialist.label")}</h3>
          <div className="flex flex-col ">
            <CheckBoxCustom
              name="tieuhoa"
              label="Tiêu hóa"
              checked={state.tieuhoa}
              onChange={handleChange}
            />
            <CheckBoxCustom
              name="nhikhoa"
              label="Nhi khoa"
              checked={state.nhikhoa}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="space-y-2">
          <h3>{t("ser:range.label")}</h3>
          <div className="w-[95%]">
            <Slider
              size="medium"
              defaultValue={1000}
              valueLabelDisplay="auto"
            />
          </div>
        </div>
        <div className="space-y-2">
          <h3>{t("ser:rate.label")}</h3>
          <Rating
            name="simple-controlled"
            value={rating}
            onChange={(event, newValue) => {
              setRating(newValue)
            }}
          />
        </div>
        <CustomButton
          kind="primary"
          size="small"
          className="h-10  rounded-[3px]"
        >
          <div className="flex items-center gap-2">
            <span>{t("ser:btn")}</span>
          </div>
        </CustomButton>
      </div>
    </DrawerCustom>
  )
}

export default FilterBar
