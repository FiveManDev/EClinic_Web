import AuthLayout from "layout/Auth/AuthLayout"
import SignupPage from "module/Auth/SignUp/SignupPage"
import { NextPageWithLayout } from "./page"

type Props = {}

const Signup: NextPageWithLayout = (props: Props) => {
  return <SignupPage />
}
Signup.getLayout = (page) => {
  return <AuthLayout>{page}</AuthLayout>
}

export default Signup
