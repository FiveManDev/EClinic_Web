import Tag from "components/Common/Tag"
import MaterialReactTable, { type MRT_ColumnDef } from "material-react-table"
import DetailBooking from "module/Doctor/components/DetailBooking"
import Info from "module/User/components/Info/Info"
import { useMemo } from "react"
import { dayformat } from "shared/helpers/helper"

type Person = {
  name: {
    firstName: string
    lastName: string
  }
  kind: string
  city: string
  status: number
}

//nested data is ok, see accessorKeys in ColumnDef below
const data: Person[] = [
  {
    name: {
      firstName: "John",
      lastName: "Doe"
    },
    kind: "Online",
    city: "East Daphne",
    status: 0
  },
  {
    name: {
      firstName: "Jane",
      lastName: "Doe"
    },
    kind: "Online",
    city: "Columbus",
    status: 1
  },
  {
    name: {
      firstName: "Joe",
      lastName: "Doe"
    },
    kind: "Online",
    city: "South Linda",
    status: 1
  },
  {
    name: {
      firstName: "Kevin",
      lastName: "Vandy"
    },
    kind: "Online",
    city: "Lincoln",
    status: 2
  },
  {
    name: {
      firstName: "Joshua",
      lastName: "Rolluffs"
    },
    kind: "Online",
    city: "Omaha",
    status: 0
  }
]

const TableAPM = () => {
  //should be memoized or stable
  const columns = useMemo<MRT_ColumnDef<Person>[]>(
    () => [
      {
        accessorKey: "name.firstName", //access nested data with dot notation
        header: "Patient name",
        enableSorting: false,
        Cell: () => {
          return <Info />
        }
      },
      {
        accessorKey: "name.lastName",
        header: "Appointment Date",
        Cell: () => {
          return (
            <div className="flex flex-col gap-y-2">
              <time dateTime="03 May 2023">{dayformat("03 May 2023")}</time>
              <time className="text-gray80">9:00</time>
            </div>
          )
        }
      },
      {
        accessorKey: "kind", //normal accessorKey
        header: "Kind"
      },
      {
        accessorKey: "status",
        header: "Status",
        Cell: ({ cell }) => {
          return cell.getValue() === 0 ? (
            // <span className="text-pending">Pending</span>
            <Tag color="#FEAF02">Pending</Tag>
          ) : cell.getValue() === 1 ? (
            <Tag color="#4FD8DE">Complete</Tag>
          ) : (
            <Tag color="#D72755">Cancelled</Tag>
          )
        }
      },
      {
        enableSorting: false,
        enableColumnActions: false,
        accessorKey: "city",
        header: "Action",
        Cell: ({ cell }) => {
          return <DetailBooking />
        }
      }
    ],
    []
  )

  return <MaterialReactTable columns={columns} data={data} />
}
// const DetailBooking = ({
//   show = false,
//   onClose = () => {},
//   onOpen = () => {}
// }) => {
//   return (
//     <ModalPrimary show={show} onClose={() => onClose()}>
//       <div className="flex flex-col gap-6 px-6 py-6 max-w-">
//         <h1 className="text-xl text-h1 ">
//           Select the date(s) you want to assign specific hours
//         </h1>
//         <div className="mx-auto">
//           Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium
//           dolores officia corrupti, eaque possimus, inventore optio omnis
//           molestias magni perspiciatis porro reiciendis nemo, tempore facilis
//           dignissimos. Repellat maxime quisquam eum.
//         </div>
//       </div>
//       <div className="footer">
//         <div className="flex justify-between px-6">
//           <CustomButton kind="tertiary" onClick={() => onOpen()}>
//             Cancel
//           </CustomButton>
//           <CustomButton kind="primary">Apply</CustomButton>
//         </div>
//       </div>
//     </ModalPrimary>
//   )
// }
export default TableAPM
