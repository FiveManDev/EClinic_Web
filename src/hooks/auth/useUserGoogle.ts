import { useGoogleLogin } from "@react-oauth/google"
import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { getUserGoogle } from "services/google.service"

export default function useUserGoogle() {
  const [profile, setProfile] = useState([])
  const { mutate, error } = useMutation({
    mutationFn: (access_token: string) => getUserGoogle(access_token)
  })
  const action = useGoogleLogin({
    onSuccess: (codeResponse) => {
      return mutate(codeResponse.access_token + "1", {
        onSuccess: (data: any) => {
          setProfile(data)
        }
      })
    },
    onError: (_) => console.log("error")
  })
  return { action, profile, error }
}
