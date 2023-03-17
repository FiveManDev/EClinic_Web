import { Skeleton } from "@mui/material"
import FormControl from "@mui/material/FormControl"
import MenuItem from "@mui/material/MenuItem"
import Select, { SelectChangeEvent } from "@mui/material/Select"
import { useGetAllHashTagQuery } from "hooks/query/forum/useForum"
type Props = {
  hashTags: string[]
  // eslint-disable-next-line no-unused-vars
  handleChange: (value: string[]) => void
}
export default function MultipleSelect({ hashTags, handleChange }: Props) {
  const getAllHashTagQuery = useGetAllHashTagQuery()

  const handleChangeValue = (event: SelectChangeEvent<typeof hashTags>) => {
    const {
      target: { value }
    } = event
    handleChange(value as [])
  }

  return (
    <FormControl sx={{ width: "100%" }}>
      {getAllHashTagQuery.isLoading ? (
        <Skeleton variant="rounded" width={"100%"} height={50} />
      ) : (
        <Select multiple value={hashTags} onChange={handleChangeValue}>
          {getAllHashTagQuery.data?.data.map((hashtag) => (
            <MenuItem key={hashtag.id} value={hashtag.id}>
              {hashtag.hashtagName}
            </MenuItem>
          ))}
        </Select>
      )}
    </FormControl>
  )
}
