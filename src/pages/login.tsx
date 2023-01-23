import AuthLayout from "layout/Auth/AuthLayout"
import LoginPage from "module/Auth/Login/LoginPage"
import { NextPageWithLayout } from "./page"

type Props = {}

const Login: NextPageWithLayout = (props: Props) => {
  return <LoginPage />
}
Login.getLayout = (page) => {
  return <AuthLayout>{page}</AuthLayout>
}

export default Login
