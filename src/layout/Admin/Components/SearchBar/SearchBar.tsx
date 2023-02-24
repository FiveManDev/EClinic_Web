import { useState } from "react"

const SearchBar = () => {
  const [searchText, setSearchText] = useState("");
  return (<>
    <div className="max-w-[350px] h-10 rounded-[100px] flex justify-center items-center bg-white ml-9 mx-1">
      <IconSearch />
      <input type="text" name="searchBar" id="searchBar" placeholder="Search..." className="ml-3 max-w-[292px] text-md h-9 flex-grow outline-none border-none" onInput={(e) => {
        setSearchText(e.currentTarget.value);
      }} />
    </div>
  </>)
}
function IconSearch() {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="#CACCCF"
        className="w-4 h-4 md:w-8 md:h-8"
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
export default SearchBar
