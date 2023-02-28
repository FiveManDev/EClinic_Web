import { Avatar, Tag } from "antd"
import React from "react"
import { RELATIONSHIPS } from "shared/constant/constant"
import { IProfile, IRelationShip } from "types/Profile.type"
interface Props {
  data: IProfile & IRelationShip
  onClick: () => void
}

const ProfileItem = ({ data, onClick }: Props) => {
  const fullname = data.firstName + " " + data.lastName
  return (
    <>
      <li
        className="flex px-2 py-2 transition-all rounded-md cursor-pointer gap-x-3 hover:bg-gray-100"
        onClick={onClick}
      >
        <Avatar
          size={64}
          src={data.avatar}
          style={{
            backgroundColor: "#024ED5",
            verticalAlign: "middle"
          }}
          shape="square"
        ></Avatar>
        <div className="flex flex-col space-y-[2px]">
          <Tag
            color={
              data.relationshipName === RELATIONSHIPS.ME ? "green" : "blue"
            }
            className="w-fit"
          >
            <span
              className={`text-xs ${
                data.relationshipName === RELATIONSHIPS.ME ? "" : "text-primary"
              }`}
            >
              {data.relationshipName}
            </span>
          </Tag>
          <span className="text-base font-medium">{fullname}</span>
          <time className="text-xs text-gray-400">{data.dateOfBirth}</time>
        </div>
      </li>
    </>
  )
}

export default ProfileItem
