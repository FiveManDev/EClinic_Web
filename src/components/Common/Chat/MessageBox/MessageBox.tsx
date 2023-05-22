import { Divider } from "@mui/material"
import { HeaderBox } from "./HeaderBox"
import TextMessage from "./TextMessage"
import { dayformat } from "shared/helpers/helper"
import { OverlayScrollbarsComponent } from "overlayscrollbars-react"
import InputMessage from "./InputMessage"
const MessageBox = () => {
  return (
    <div className="flex flex-col w-full ">
      <HeaderBox />
      <OverlayScrollbarsComponent
        defer
        options={{ scrollbars: { autoHide: "scroll" } }}
      >
        <div className="flex flex-col flex-1 h-full px-5 py-6 space-y-4">
          <TextMessage />
          <TextMessage />
          <TextMessage kind="owner" />
          <TextMessage />
          <TextMessage />
          <Divider className="flex items-center px-6">
            <time className="text-xs text-disable">
              {dayformat("Mon May 22 2023 18:17:57 GMT+0700 (Indochina Time)")}
            </time>
          </Divider>
          <TextMessage kind="owner" />
          <TextMessage />
          <TextMessage kind="owner" />
          <TextMessage />
          <TextMessage />
          <TextMessage kind="owner" />
          <TextMessage />
          <TextMessage kind="owner" />
          <TextMessage />
          <TextMessage />
          <TextMessage />
          <TextMessage kind="owner" />
          <TextMessage />
          <TextMessage />
          <TextMessage kind="owner" />
          <TextMessage />
          <TextMessage kind="owner" />
          <TextMessage />
          <TextMessage />
          <TextMessage kind="owner" />
          <TextMessage />
          <TextMessage kind="owner" />
          <TextMessage />
          <TextMessage />
          <TextMessage />
          <TextMessage kind="owner" />
          <TextMessage />
          <TextMessage />
        </div>
      </OverlayScrollbarsComponent>
      <InputMessage />
    </div>
  )
}

export default MessageBox
