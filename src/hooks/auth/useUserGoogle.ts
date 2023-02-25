import { useGoogleLogin } from "@react-oauth/google"
import { useMutation } from "@tanstack/react-query"
import { message } from "antd"
import { useState } from "react"
import { getUserGoogle } from "services/google.service"

export default function useUserGoogle() {
  const [profile, setProfile] = useState<any>(null)
  const { mutate, error } = useMutation({
    mutationFn: (access_token: string) => getUserGoogle(access_token)
  })
  const action = useGoogleLogin({
    onSuccess: (codeResponse) => {
      message.loading({
        content: "Loading....",
        duration: 0
      })
      return mutate(codeResponse.access_token, {
        onSuccess: (data: any) => {
          setProfile({
            ...data,
            access_token: codeResponse.access_token
          })
        }
      })
    },
    onError: (_) => {
      message.destroy()
      console.log("error")
    }
  })
  return { action, profile, error }
}
