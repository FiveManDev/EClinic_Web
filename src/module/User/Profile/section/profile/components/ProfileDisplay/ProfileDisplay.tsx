import CustomButton from "components/User/Button"
import dayjs from "dayjs"
import Image from "next/image"
import { IProfile, IRelationShip } from "types/Profile.type"
interface Props {
  profile?: IProfile & IRelationShip
  // eslint-disable-next-line no-unused-vars
  onEdit: (profileId: string) => void
}
const ProfileDisplay = ({ profile, onEdit }: Props) => {
  if (!profile) {
    return null
  } else {
    return (
      <>
        <div className="flex flex-col items-center justify-center gap-y-5 max-w-[460px] mx-auto">
          <div className="relative w-32 h-32 rounded-full shadow-sm">
            <Image
              src={profile.avatar}
              fill
              alt={profile.firstName}
              sizes="(max-width: 768px) 100vw,
                      (max-width: 1200px) 50vw,
                      33vw"
              className="object-cover border border-gray-200 border-solid rounded-full"
            />
          </div>
          <div className="self-start w-full space-y-3 ">
            <h3 className="text-lg font-bold text-h1">Thông tin </h3>
            <ProfileItem
              label="Full name"
              content={profile.firstName + " " + profile.lastName}
            />
            <ProfileItem label="Email" content={profile.email} />
            <ProfileItem label="Phone number" content={profile.phone} />
            <ProfileItem
              label="Gender"
              content={profile.gender ? "Female" : "Male"}
            />
            <ProfileItem label="Address" content={profile.address} />
            <ProfileItem
              label="Date of birth"
              content={dayjs(profile.dateOfBirth).format("L")}
            />
            <ProfileItem label="Blood Type" content={profile.bloodType} />
            <ProfileItem label="Height" content={profile.height.toString()} />
            <ProfileItem label="Weight" content={profile.weight.toString()} />
            <ProfileItem
              label="Relationship"
              content={profile.relationshipName}
            />
          </div>
          <CustomButton
            kind="primary"
            className="self-end "
            onClick={() => onEdit(profile.profileID)}
          >
            Change the infomation
          </CustomButton>
        </div>
      </>
    )
  }
}
const ProfileItem = ({ label = "", content = "--" }) => {
  return (
    <div className="flex justify-between">
      <span className="font-light">{label}</span>
      <span className="font-semibold">{content}</span>
    </div>
  )
}
export default ProfileDisplay
