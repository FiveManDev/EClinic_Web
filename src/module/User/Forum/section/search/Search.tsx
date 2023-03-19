import { Chip, Skeleton } from "@mui/material"
import classNames from "classnames"
import ChipCustom from "components/Common/Chip/Chip"
import InputCustom from "components/Common/Input"
import Spinner from "components/Common/Loading/LoadingIcon"
import CustomButton from "components/User/Button"
import { useGetHashtagBySortQuery } from "hooks/query/forum/useForum"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { AiOutlinePlus } from "react-icons/ai"
import { HiMagnifyingGlass } from "react-icons/hi2"
import { PAGE_SIZE } from "shared/constant/constant"
import { getDataPaginate } from "shared/helpers/helper"
import { IHashtag } from "types/Post"

type Props = {
  tagsActive: IHashtag[]
  // eslint-disable-next-line no-unused-vars
  onSearchChange: (value: string) => void
  // eslint-disable-next-line no-unused-vars
  onChangeHashTags: (value: IHashtag[]) => void
  isLoading: boolean
}
const Search = ({
  tagsActive,
  onSearchChange,
  onChangeHashTags,
  isLoading = false
}: Props) => {
  const { t } = useTranslation("forum")
  const [keyword, setKeyword] = useState("")
  const [pageIndexTag, setPageIndexTag] = useState(1)
  const [tags, setTags] = useState<IHashtag[]>([])
  const tagsQuery = useGetHashtagBySortQuery(pageIndexTag, PAGE_SIZE)
  const pagination = getDataPaginate(tagsQuery.data)
  const handleSearchBykeyword = (hashtagCurrent: IHashtag) => {
    const checkExits = tagsActive.some(
      (item) => item.hashtagID === hashtagCurrent.hashtagID
    )
    let newHashTags = [] as IHashtag[]
    if (!checkExits) {
      newHashTags = [...tagsActive, hashtagCurrent]
    } else {
      newHashTags = tagsActive.filter(
        (item) => item.hashtagID !== hashtagCurrent.hashtagID
      )
    }
    onChangeHashTags(newHashTags)
  }
  useEffect(() => {
    if (tagsQuery.status === "success") {
      setTags((prevStag) => [...prevStag, ...tagsQuery.data.data.data])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tagsQuery.status])
  return (
    <div className="flex flex-col space-y-3">
      <div className="flex gap-x-1">
        <InputCustom
          onChange={(e) => setKeyword(e.target.value)}
          icon={<HiMagnifyingGlass />}
          className="w-full md:max-w-[412px]"
          placeholder={t("search.input")}
        />
        <CustomButton
          kind="primary"
          disabled={isLoading}
          className="!rounded-[5px]"
          onClick={() => onSearchChange(keyword)}
        >
          {isLoading ? <Spinner /> : "Search"}
        </CustomButton>
      </div>
      <div className="w-full px-4 py-5 background-primary">
        <h3 className="text-xl">{t("search.heading")}</h3>
        <ul className="flex flex-wrap items-center w-full gap-4 mt-3 overflow-auto list-none">
          {tags.length > 0 &&
            tags.map((item, index) => {
              const check = tagsActive.some(
                (tag) => tag.hashtagID === item.hashtagID
              )
              return (
                <li key={index}>
                  <ChipCustom
                    className={check ? "bg-primary text-white" : ""}
                    label={item.hashtagName}
                    onClick={() => handleSearchBykeyword(item)}
                  />
                </li>
              )
            })}

          {tagsQuery.isLoading &&
            new Array(3).fill(null).map((item, index) => (
              <li key={index}>
                <Skeleton variant="rounded" width={100} height={30} />
              </li>
            ))}
          <Chip
            onClick={() => {
              pagination.HasNext && setPageIndexTag(pageIndexTag + 1)
            }}
            label="Load more"
            icon={<AiOutlinePlus className="text-base" />}
            clickable
            className={classNames(
              "!bg-opacity-25 rounded-md font-semibold",
              !pagination.HasNext && "hidden"
            )}
            color="primary"
          />
        </ul>
      </div>
    </div>
  )
}

export default Search
