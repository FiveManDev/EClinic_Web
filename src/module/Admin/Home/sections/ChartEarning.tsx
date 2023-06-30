import { Skeleton } from "@mui/material"
import { Option, SelectCustom } from "components/Common/Select/SelectCustom"
import dayjs from "dayjs"
import { useGetTransactionQuery } from "hooks/query/payment/usePayment"
import { useMemo, useState } from "react"
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts"
import { TIME_STYPE_PAYMENT } from "shared/constant/constant"
import { dayformat } from "shared/helpers/helper"
import { Statistics } from "types/Payment"

const mapData = (data: Statistics[], dataKey: string) => {
  return data.map((item) => ({
    name: dayformat(item.time),
    [dataKey]: item.totalAmount
  }))
}

const ChartEarning = () => {
  const [year, setYear] = useState(dayjs().year().toString())
  const currentDate = dayjs()
  const YEAR_SELECT: Option[] = useMemo(() => {
    const years: Option[] = []
    for (let item = 2000; item <= dayjs().year(); item++) {
      years.push({
        label: item.toString(),
        value: item.toString()
      })
    }
    return years
  }, [])

  const firstDay = dayjs(`${year}-01-01`)
  const lastDay = dayjs(`${year}-12-31`)
  const firstDayOfYearFormatted = firstDay.format("YYYY-MM-DD")
  const lastDayOfYearFormatted = lastDay.format("YYYY-MM-DD")
  const dataYear = useGetTransactionQuery({
    startTime: firstDayOfYearFormatted,
    endTime: lastDayOfYearFormatted,
    timeType: TIME_STYPE_PAYMENT.Month
  })

  // Get the first day of the current month
  const firstDayOfMonth = currentDate.startOf("month")

  // Get the last day of the current month
  const lastDayOfMonth = currentDate.endOf("month")

  // Format the dates in the desired format
  const firstDayOfMothFormatted = firstDayOfMonth
    .format("YYYY-MM-DD")
    .toString()
  const lastDayOfMothFormatted = lastDayOfMonth.format("YYYY-MM-DD").toString()
  const dataMoth = useGetTransactionQuery({
    startTime: firstDayOfMothFormatted,
    endTime: lastDayOfMothFormatted,
    timeType: TIME_STYPE_PAYMENT.Day
  })

  // Get the first day of the current week (Sunday)
  const firstDayOfWeek = currentDate.startOf("week")

  // Get the last day of the current week (Saturday)
  const lastDayOfWeek = currentDate.endOf("week")

  // Format the dates in the desired format
  const firstDayOfWeekFormatted = firstDayOfWeek.format("YYYY-MM-DD")
  const lastDayOfWeekFormatted = lastDayOfWeek.format("YYYY-MM-DD")
  const dataWeek = useGetTransactionQuery({
    startTime: firstDayOfWeekFormatted,
    endTime: lastDayOfWeekFormatted,
    timeType: TIME_STYPE_PAYMENT.Day
  })
  return (
    <div className="flex flex-col gap-y-6">
      <div className="flex flex-col w-full h-[500px] background-primary">
        <div className="flex items-center justify-between">
          <h3 className="mb-6 text-2xl font-semibold text-h1">Total Incomes</h3>
          <SelectCustom
            size="small"
            className="min-w-[100px]"
            value={year.toString()}
            options={YEAR_SELECT}
            onSelectOption={(value) => setYear(value.value)}
          />
        </div>
        {dataYear.isLoading && (
          <Skeleton variant="rounded" className="w-full h-full" />
        )}
        {dataYear.isSuccess && (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={mapData(dataYear.data?.data, `${year}`)}
              margin={{ right: 25, top: 10 }}
            >
              <XAxis dataKey="name" interval={"preserveEnd"} />
              <YAxis interval="preserveEnd" tickLine={false} />
              <Area
                type="monotone"
                dataKey={year}
                stroke="#235EE8"
                fill="#235EE8"
              />
              <Tooltip />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
      <div className="grid grid-cols-2 gap-x-6 h-[300px]">
        <ChartMini
          isLoading={dataMoth.isLoading}
          data={
            (dataMoth.isSuccess &&
              mapData(
                dataMoth.data.data,
                currentDate.get("month").toString()
              )) ||
            []
          }
          heading="Total Incomes in current month"
          dataKey={currentDate.get("month").toString()}
        />
        <ChartMini
          isLoading={dataWeek.isLoading}
          data={
            (dataWeek.isSuccess && mapData(dataWeek.data.data, "week")) || []
          }
          heading="Total Incomes in current week"
          dataKey={"week"}
        />
      </div>
    </div>
  )
}
interface Props {
  data?: any[]
  isLoading: boolean
  heading: string
  dataKey: string
}
const ChartMini = ({ heading = "", data, isLoading, dataKey }: Props) => {
  return (
    <div className="flex flex-col background-primary ">
      <h3 className="mb-6 text-xl font-semibold text-h1">{heading}</h3>
      <div className="w-full h-[400px]">
        {isLoading && <Skeleton variant="rounded" className="w-full h-full" />}
        {data && (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0
              }}
            >
              {/* <CartesianGrid strokeDasharray="3 3" /> */}
              <XAxis dataKey="name" tickLine={false} />
              <YAxis tickLine={false} />
              <Tooltip />
              <Area
                type="monotone"
                dataKey={dataKey}
                stroke="#4FD8DE"
                fill="#4FD8DE"
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  )
}
export default ChartEarning
