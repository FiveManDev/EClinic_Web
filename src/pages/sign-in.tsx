import AuthLayout from "layout/Auth/AuthLayout"
import SignInPage from "module/Auth/SignIn/SignInPage"
import { NextPageWithLayout } from "./page"

const SignIn: NextPageWithLayout = () => {
  return <SignInPage />
}
SignIn.getLayout = (page) => {
  return <AuthLayout>{page}</AuthLayout>
}

export default SignIn
