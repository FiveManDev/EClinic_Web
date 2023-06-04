import UserLayout from "layout/User/UserLayout"
import dynamic from "next/dynamic"
import { NextPageWithLayout } from "pages/page"
const ProfilePage = dynamic(() => import("module/User/Profile/ProfilePage"))

const Profile: NextPageWithLayout = () => {
  return <ProfilePage />
}
Profile.getLayout = (page) => {
  return <UserLayout footer={false}>{page}</UserLayout>
}
export default Profile
