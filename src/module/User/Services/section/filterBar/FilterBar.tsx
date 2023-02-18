import { Slider } from "@mui/material"
import { Rate } from "antd"
import CheckBoxCustom from "components/Common/Checkbox"
import InputCustom from "components/Common/Input"
import React from "react"
import { HiMagnifyingGlass } from "react-icons/hi2"
const FilterBar = () => {
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
    <div className="flex flex-col justify-start gap-y-6">
      <div className="space-y-2">
        <h3>Tìm kiếm dịch vụ</h3>
        <InputCustom
          icon={<HiMagnifyingGlass />}
          className="w-full md:max-w-[412px]"
          placeholder="Tìm dịch vụ... "
        />
      </div>
      <div className="space-y-2">
        <h3>Chuyên khoa</h3>
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
        <h3>Khoảng giá</h3>
        <Slider size="medium" defaultValue={1000} valueLabelDisplay="auto" />
      </div>
      <div className="space-y-2">
        <h3>Đánh giá</h3>
        <Rate />
      </div>
    </div>
  )
}

export default FilterBar
