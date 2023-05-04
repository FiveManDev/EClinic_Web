import { Container } from "@mui/material"
import BreadcrumsCustom from "components/Common/Breadcrums"
import { PropsWithChildren } from "react"
import { IBreadcrum } from "types/Base.type"

interface Props extends PropsWithChildren {
  breadrums: IBreadcrum[]
}

const UserSecondaryLayout = ({ breadrums, children }: Props) => {
  return (
    <Container className="mb-20 flex-1 pt-16 md:pt-[72px] flex flex-col">
      <div className="mt-3 mb-3 md:mb-6 md:mt-6">
        <BreadcrumsCustom items={breadrums} />
      </div>
      {children}
    </Container>
  )
}

export default UserSecondaryLayout
