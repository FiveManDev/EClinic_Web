import {
  IconButton,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent
} from "@mui/material"
import ChipCustom from "components/Common/Chip/Chip"
import React from "react"
import { SearchWrapper } from "./Search.stype"

const Search = () => {
  const [age, setAge] = React.useState("")

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value)
  }
  return (
    <SearchWrapper className="absolute bottom-0 translate-y-2/4 w-full h-[240px] mx-auto bg-white rounded-xl p-8 shadow-[0px_1px_4px_rgba(0,_0,_0,_0.15)]">
      <div className="flex items-center justify-between space-x-4 h-[72px]">
        <OutlinedInput
          placeholder="Tìm bệnh, bác sĩ, hỏi đáp,...."
          className="h-full bg-[#FAFBFE] rounded-lg border-none outline-none"
          fullWidth
          startAdornment={
            <InputAdornment position="start">
              <IconSearch />
            </InputAdornment>
          }
        />
        <Select
          className="h-full bg-[#FAFBFE] rounded-lg border-none outline-none max-w-[300px] w-full"
          value={age}
          onChange={handleChange}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
        <IconButton
          aria-label="delete"
          className="text-white h-full w-[72px] flex items-center justify-center rounded-[10px] bg-primary hover:bg-primary"
        >
          <IconSearch />
        </IconButton>
      </div>
      <div className="flex flex-col mt-4 space-y-2 w-full">
        <h4 className="text-h1 text-[20px]">Tìm kiếm nhiều nhất</h4>
        <ul className="list-none flex items-center space-x-4 w-full overflow-auto">
          {new Array(7).fill(null).map((item, index) => (
            <li key={index}>
              <ChipCustom label="Covid-19" />
            </li>
          ))}
        </ul>
      </div>
    </SearchWrapper>
  )
}
function IconSearch() {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-9 h-w-9"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
        />
      </svg>
    </>
  )
}

export default Search
