import UserLayout from "layout/User/UserLayout"
import ProfilePage from "module/User/Profile/ProfilePage"
import { NextPageWithLayout } from "pages/page"

const Profile: NextPageWithLayout = () => {
  return <ProfilePage />
}
Profile.getLayout = (page) => {
  return <UserLayout footer={false}>{page}</UserLayout>
}
export default Profile
