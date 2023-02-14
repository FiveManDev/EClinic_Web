import { useGoogleLogin } from "@react-oauth/google"
import { useMutation } from "@tanstack/react-query"
import { useEffect, useMemo, useState } from "react"
import { getUserGoogle } from "services/google.service"
import { isAxiosError } from "shared/helpers/helper"

export default function useUserGoogle() {
  const [profile, setProfile] = useState([])
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const { mutate } = useMutation({
    mutationFn: (access_token: string) => getUserGoogle(access_token)
  })
  const action = useGoogleLogin({
    onSuccess: (codeResponse) => {
      console.log(codeResponse)

      return mutate(codeResponse.access_token, {
        onSuccess: (data: any) => {
          setProfile(data)
        },
        onError: (_) => {
          setErrorMessage("Login Failed")
        }
      })
    },
    onError: (_) => setErrorMessage("Login Failed")
  })
  return { action, profile, errorMessage }
}
