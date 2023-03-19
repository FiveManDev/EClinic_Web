import CustomButton from "components/User/Button"
import { useEffect, useState } from "react"
import { toast } from "react-hot-toast"
import VerificationInput from "react-verification-input"

interface Props {
  code: string
  onSubmit: () => void
  handleBack: () => void
  email?: string
}

const ConfirmCode = ({ code, onSubmit, email, handleBack }: Props) => {
  const [otp, setOtp] = useState<string | null>(null)
  const [countError, setCountError] = useState(0)
  const handleVerify = () => {
    if (otp === code) {
      onSubmit()
    } else {
      setCountError(countError + 1)
      toast.error("Invalid authentication code.")
    }
  }
  useEffect(() => {
    // if (countError === 5) {
    // }
  }, [countError])
  return (
    <>
      <div className="px-3 py-20">
        <div className="container mx-auto background-primary max-w-[400px]">
          <div className="max-w-sm mx-auto md:max-w-lg">
            <div className="w-full">
              <div className="py-3 text-center bg-white rounded ">
                <h1 className="text-2xl font-bold text-h1">OTP Verification</h1>
                <div className="flex flex-col mt-4">
                  <span>Enter the OTP you received at</span>
                  <span className="font-bold text-h1">{email || ""}</span>
                </div>
                <div
                  id="otp"
                  className="flex flex-row justify-center px-2 mt-5 text-center"
                >
                  <VerificationInput
                    onChange={(value) => setOtp(value)}
                    placeholder=""
                    classNames={{
                      character:
                        "text-3xl bg-white flex items-center justify-center jus border border-gray-300 border-solid rounded"
                    }}
                  />
                </div>
                <div className="flex flex-col items-center justify-center mt-5 gap-y-2">
                  <CustomButton
                    kind="primary"
                    className="w-full text-base font-medium"
                    onClick={handleVerify}
                  >
                    Send Code
                  </CustomButton>
                  <CustomButton
                    kind="tertiary"
                    className="w-full text-base font-medium"
                    onClick={handleBack}
                  >
                    Back
                  </CustomButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ConfirmCode
