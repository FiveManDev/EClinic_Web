import { message } from "antd"
import { ArgsProps } from "antd/es/message"
interface Props extends ArgsProps {}

export const useToast = () => {
  const [messageApi, contextHolder] = message.useMessage()

  const triggerToast = ({
    type = "success",
    content,
    className,
    ...props
  }: Props) => {
    messageApi.open({
      ...props,
      type,
      content,
      className
    })
  }
  return {
    triggerToast,
    contextHolder
  }
}
