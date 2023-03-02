import CustomButton from "components/User/Button"
import { useState } from "react"
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
  const handleVerify = () => {
    if (otp === code) {
      onSubmit()
    } else {
      toast.error("Invalid authentication code.")
    }
  }
  return (
    <>
      <div className="px-3 py-20">
        <div className="container mx-auto background-primary">
          <div className="max-w-sm mx-auto md:max-w-lg">
            <div className="w-full">
              <div className="h-64 py-3 text-center bg-white rounded">
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
                        "text-3xl flex items-center justify-center jus border border-gray-300 border-solid rounded"
                    }}
                  />
                </div>
                <div className="flex items-center justify-center mt-5 text-center gap-x-2">
                  <CustomButton
                    kind="tertiary"
                    className="text-base font-medium "
                    onClick={handleBack}
                  >
                    Back
                  </CustomButton>
                  <CustomButton
                    kind="primary"
                    className="text-base font-medium "
                    onClick={handleVerify}
                  >
                    Send Code
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
