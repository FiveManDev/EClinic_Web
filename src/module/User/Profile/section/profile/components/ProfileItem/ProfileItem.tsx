import { Skeleton } from "@mui/material"
import ImageCustom from "components/Common/ImageCustom"
import Tag from "components/Common/Tag"
import dayjs from "dayjs"
import Image from "next/image"
import React from "react"
import { RELATIONSHIPS } from "shared/constant/constant"
import { IProfile, IRelationShip } from "types/Profile.type"
interface Props {
  data?: IProfile & IRelationShip
  onClick: () => void
  loading: boolean
}

const ProfileItem = ({ data, onClick, loading = false }: Props) => {
  return (
    <>
      <li
        className="flex px-2 py-2 transition-all rounded-md cursor-pointer gap-x-3 hover:bg-gray-100"
        onClick={onClick}
      >
        {loading && <Skeleton variant="rounded" width={64} height={64} />}
        {data && (
          <div className="relative w-20 h-20 overflow-hidden rounded-md">
            <ImageCustom
              src={data.avatar as string}
              alt={data.lastName}
              sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
              fill
              classNameImage="rounded-md"
            />
          </div>
        )}

        <div className="flex flex-col space-y-[2px] flex-1">
          {loading && <Skeleton variant="rounded" width={40} height={16} />}

          {data && (
            <Tag
              // data.relationshipName === RELATIONSHIPS.ME ? "green" : "blue"
              className={`w-fit text-sm ${
                data.relationshipName === RELATIONSHIPS.ME
                  ? "bg-green-500 text-green-500"
                  : "text-primary"
              }`}
            >
              {data.relationshipName}
            </Tag>
          )}
          {loading && (
            <>
              <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
              <Skeleton variant="text" sx={{ fontSize: "0.75rem" }} />
            </>
          )}
          {data && (
            <>
              <span className="text-base font-medium">
                {data.firstName + " " + data.lastName}
              </span>
              <time className="text-xs text-gray-400">
                {dayjs(data.dateOfBirth).format("L")}
              </time>
            </>
          )}
        </div>
      </li>
    </>
  )
}

export default ProfileItem
