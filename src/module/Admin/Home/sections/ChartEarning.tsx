import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts"

const data = [
  {
    name: "2022-1",
    "2023": 100,
    "2022": 2400
  },
  {
    name: "2022-3",
    "2023": 3000,
    "2022": 1398
  },
  {
    name: "2022-4",
    "2023": 2000,
    "2022": 9800
  },
  {
    name: "2022-6",
    "2023": 2780,
    "2022": 3908
  },
  {
    name: "2022-7",
    "2023": 1890,
    "2022": 4800
  },
  {
    name: "2022-8",
    "2023": 2390,
    "2022": 3800
  },
  {
    name: "2022-10",
    "2023": 3490,
    "2022": 4300
  }
]
const ChartEarning = () => {
  return (
    <div className="flex flex-col gap-y-6">
      <div className="flex flex-col w-full h-[500px] background-primary">
        <h3 className="mb-6 text-2xl font-semibold text-h1">Total Incomes</h3>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ right: 25, top: 10 }}>
            <XAxis dataKey="name" interval={"preserveEnd"} />
            <YAxis interval="preserveEnd" tickLine={false} />
            <Area
              type="monotone"
              dataKey="2022"
              stroke="#235EE8"
              fill="#235EE8"
            />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="2023"
              stroke="#4FD8DE"
              fill="#4FD8DE"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="grid grid-cols-2 gap-x-6 h-[300px]">
        <ChartMini heading="Total Incomes in current month" />
        <ChartMini heading="Total Incomes in current week" />
      </div>
    </div>
  )
}
const ChartMini = ({ heading = "" }) => {
  return (
    <div className="flex flex-col background-primary ">
      <h3 className="mb-6 text-xl font-semibold text-h1">{heading}</h3>
      <div className="w-full h-[400px]">
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
              dataKey="2023"
              stroke="#4FD8DE"
              fill="#4FD8DE"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
export default ChartEarning
