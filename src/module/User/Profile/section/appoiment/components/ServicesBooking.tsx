import classNames from "classnames"
import { useState } from "react"
import ServiceBooking from "./ServiceBooking"
export type KindAppoiment = "cancelled" | "completed" | "upcomming"
const filterList: KindAppoiment[] = ["upcomming", "cancelled", "completed"]
const moockData: KindAppoiment[] = [
  "cancelled",
  "upcomming",
  "cancelled",
  "completed",
  "upcomming",
  "cancelled",
  "cancelled",
  "completed",
  "upcomming",
  "upcomming",
  "cancelled",
  "completed",
  "completed",
  "cancelled",
  "upcomming",
  "completed",
  "upcomming",
  "upcomming",
  "cancelled",
  "completed"
]

const ServicesBooking = () => {
  const [type, setType] = useState<KindAppoiment>("upcomming")
  return (
    <div className="flex flex-col">
      <div className="flex items-center mb-6 gap-x-3">
        {filterList.map((item, index) => (
          <button
            key={index}
            className={classNames(
              "flex items-center justify-center px-4 py-[10px] outline-none border-none focus:ring-4 rounded-md cursor-pointer capitalize",
              type === item && "ring-4",
              item === "completed"
                ? "text-success"
                : item === "upcomming"
                ? "text-pending"
                : "text-error"
            )}
            onClick={() => setType(item)}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-4">
        {moockData.map(
          (item, index) =>
            item === type && <ServiceBooking kind={item} key={index} />
        )}
      </div>
    </div>
  )
}

export default ServicesBooking
