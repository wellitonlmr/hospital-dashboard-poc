import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

function buildWaterfallData(data) {
  let runningTotal = 0

  return data.map((item, index) => {
    if (index === 0 || index === data.length - 1) {
      runningTotal = item.value

      return {
        ...item,
        start: 0,
        end: item.value,
        delta: item.value,
      }
    }

    const start = runningTotal
    runningTotal += item.value

    return {
      ...item,
      start,
      end: runningTotal,
      delta: Math.abs(item.value),
    }
  })
}

export default function ChartCard({
  chart,
}) {
  const waterfallData =
    chart.type === "waterfall"
      ? buildWaterfallData(chart.data)
      : []

  return (
    <section
      className="
      bg-white
      dark:bg-slate-900
      rounded-2xl
      p-5
      shadow-sm
      border
      dark:border-slate-700
    "
    >
      <h3 className="text-base font-semibold mb-4">
        {chart.title}
      </h3>

      <div className="h-[320px]">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          {chart.type === "line" && (
            <LineChart data={chart.data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              {chart.series.map((serie) => (
                <Line
                  key={serie.key}
                  type="monotone"
                  dataKey={serie.key}
                  name={serie.name}
                  stroke={serie.color}
                  strokeWidth={3}
                  dot={{ r: 3 }}
                />
              ))}
            </LineChart>
          )}

          {chart.type === "bar" && (
            <BarChart data={chart.data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              {chart.series.map((serie) => (
                <Bar
                  key={serie.key}
                  dataKey={serie.key}
                  name={serie.name}
                  fill={serie.color}
                  radius={[6, 6, 0, 0]}
                />
              ))}
            </BarChart>
          )}

          {chart.type === "area" && (
            <AreaChart data={chart.data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              {chart.series.map((serie) => (
                <Area
                  key={serie.key}
                  type="monotone"
                  dataKey={serie.key}
                  name={serie.name}
                  stroke={serie.color}
                  fill={serie.color}
                  fillOpacity={0.24}
                  strokeWidth={3}
                />
              ))}
            </AreaChart>
          )}

          {chart.type === "waterfall" && (
            <BarChart data={waterfallData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <ReferenceLine y={0} stroke="#64748b" />
              <Bar
                dataKey="start"
                stackId="waterfall"
                fill="transparent"
              />
              <Bar
                dataKey="delta"
                stackId="waterfall"
                name={chart.series[0].name}
                fill={chart.series[0].color}
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </section>
  )
}
