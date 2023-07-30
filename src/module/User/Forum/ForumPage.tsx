import { useSearchPostsForum } from "hooks/query/forum/useForum"
import UserSecondaryLayout from "layout/User/UserSecondaryLayout"
import Head from "next/head"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { PAGE_SIZE } from "shared/constant/constant"
import { getDataPaginate } from "shared/helpers/helper"
import { IBreadcrum } from "types/Base.type"
import { IHashtag } from "types/Post"
import ListCardForum from "./section/list/ListCardForum"
import Search from "./section/search"
import { CreateQuestion } from "./section/create"

const ForumPage = () => {
  const { t } = useTranslation(["base", "forum"])
  const breadrums: IBreadcrum[] = [
    { label: t("base:pages.home"), href: "/" },
    { label: t("base:pages.forum") }
  ]
  const [pageIndex, setPageIndex] = useState(1)
  const [searchData, setSearchData] = useState({
    searchText: "",
    tags: [] as IHashtag[]
  })
  const searchPostsForum = useSearchPostsForum(
    searchData.searchText,
    pageIndex,
    PAGE_SIZE,
    searchData.tags.map((item) => item.hashtagID)
  )
  const paginateData = getDataPaginate(searchPostsForum.data)
  return (
    <>
      <Head>
        <title>Forum page</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/favicon.png" />
      </Head>
      <UserSecondaryLayout breadrums={breadrums}>
        <div className="grid grid-cols-3 gap-4 mt-6 md:gap-7">
          <div className="grid grid-cols-3 col-span-3 gap-7">
            <div className="order-last col-span-3 space-y-3 md:order-first md:col-span-2">
              <CreateQuestion
                className={
                  searchData.searchText || searchData.tags.length > 0
                    ? "hidden"
                    : ""
                }
              />
              <div className="col-span-3 space-y-4 md:col-span-2 background-primary">
                <ListCardForum
                  onPageIndexChange={(indexPage) => setPageIndex(indexPage)}
                  title={
                    searchData.searchText || searchData.tags.length > 0 ? (
                      <>
                        <div className="flex flex-col gap-y-2">
                          <span className="text-gray-500">
                            Your resuls:{" "}
                            <strong className="text-lg font-semibold text-black">
                              {searchData.searchText || ""}
                            </strong>
                          </span>
                          <span>
                            Tags:{" "}
                            <span className="text-sm text-gray-500">
                              {searchData.tags
                                .map((item) => item.hashtagName)
                                .join(", ")}
                            </span>
                          </span>
                        </div>
                      </>
                    ) : (
                      t("forum:allquestion")
                    )
                  }
                  paginate={paginateData}
                  posts={searchPostsForum.data?.data.data}
                  isLoading={searchPostsForum.isLoading}
                />
              </div>
            </div>
            <div className="col-span-3 md:col-span-1">
              <Search
                onChangeHashTags={(value) =>
                  setSearchData((prev) => ({ ...prev, tags: [...value] }))
                }
                tagsActive={searchData.tags}
                isLoading={searchPostsForum.isLoading}
                onSearchChange={(value) =>
                  setSearchData((prev) => ({ ...prev, searchText: value }))
                }
              />
            </div>
          </div>
          {/* <div className="w-full col-span-3 md:col-span-2 background-primary">
            <CardForum kind="large" />
            <div className="flex flex-col mt-6 space-y-3">
              <div className="flex items-center space-x-2 text-xl">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6 stroke-red-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                    />
                  </svg>
                </span>
                <span> {t("forum:questionHeadingFav")}</span>
              </div>
              <div className="grid grid-cols-1 gap-y-4 md:gap-x-6 md:grid-cols-3">
                {Array(3)
                  .fill(0)
                  .map((item, index) => (
                    <CardForum key={index} />
                  ))}
              </div>
            </div>
          </div> */}
        </div>
      </UserSecondaryLayout>
    </>
  )
}

export default ForumPage
