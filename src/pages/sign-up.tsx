import AuthLayout from "layout/Auth/AuthLayout"
import SignupPage from "module/Auth/SignUp/SignupPage"
import { NextPageWithLayout } from "./page"

const Signup: NextPageWithLayout = () => {
  return <SignupPage />
}
Signup.getLayout = (page) => {
  return <AuthLayout>{page}</AuthLayout>
}

export default Signup
