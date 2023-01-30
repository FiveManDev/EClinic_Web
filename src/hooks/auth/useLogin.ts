import { useQuery } from "@tanstack/react-query"
import { authService } from "services/auth.service"
import { QUERY_KEYS } from "shared/constant/constant"
import { ILogin } from "./../../types/Auth.type"

const useLogin = ({ userName, password }: ILogin) => {
  return useQuery({
    queryKey: [QUERY_KEYS.LOGIN, userName, password],
    queryFn: async () => authService.signIn(userName, password)
  })
}
