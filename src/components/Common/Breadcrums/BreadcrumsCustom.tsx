import { Breadcrumbs, Typography } from "@mui/material"
import Link from "next/link"

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
}

const BreadcrumsCustom: React.FC<BreadcrumbsProps> = ({ items }) => (
  <Breadcrumbs>
    {items.map((item, index) =>
      item.href ? (
        <Link key={index} className="text-inherit" href="/">
          {item.label}
        </Link>
      ) : (
        <Typography key={index} color="text.primary">
          {item.label}
        </Typography>
      )
    )}
  </Breadcrumbs>
)

export default BreadcrumsCustom
