import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import {
  chartAxis,
  chartGrid,
  chartLineStyles,
  getSeriesColor,
  formatValue,
  tooltipStyle,
} from "./chartTheme"

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
        fill: item.value >= 0 ? getSeriesColor(2) : getSeriesColor(1),
      }
    }

    const start = runningTotal
    runningTotal += item.value

    return {
      ...item,
      start,
      end: runningTotal,
      delta: Math.abs(item.value),
      fill: item.value >= 0 ? getSeriesColor(2) : getSeriesColor(1),
    }
  })
}

function getValueFormatter(unit) {
  return (value) => formatValue(value, unit)
}

function GaugeHistoryChart({
  chart,
}) {
  const value = chart.gauge.value
  const max = chart.gauge.max
  const gaugeData = [
    {
      name: chart.gauge.label,
      value,
      fill: getSeriesColor(0),
    },
    {
      name: "Restante",
      value: Math.max(max - value, 0),
      fill: "#e2e8f0",
    },
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-5 h-full">
      <div className="relative min-h-[210px]">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <PieChart>
            <Pie
              data={gaugeData}
              dataKey="value"
              startAngle={180}
              endAngle={0}
              innerRadius="68%"
              outerRadius="92%"
              paddingAngle={0}
              stroke="none"
            >
              {gaugeData.map((entry) => (
                <Cell
                  key={entry.name}
                  fill={entry.fill}
                />
              ))}
            </Pie>
            <Tooltip
              formatter={getValueFormatter(chart.unit)}
              contentStyle={tooltipStyle}
            />
          </PieChart>
        </ResponsiveContainer>

        <div className="absolute inset-x-0 bottom-8 text-center">
          <p className="text-4xl font-bold">
            {formatValue(value, chart.unit)}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Meta {formatValue(chart.gauge.target, chart.unit)}
          </p>
        </div>
      </div>

      <ResponsiveContainer
        width="100%"
        height="100%"
      >
        <BarChart data={chart.data}>
          <CartesianGrid {...chartGrid} />
          <XAxis
            dataKey="name"
            {...chartAxis}
          />
          <YAxis
            {...chartAxis}
            tickFormatter={getValueFormatter(chart.unit)}
          />
          <Tooltip
            formatter={getValueFormatter(chart.unit)}
            contentStyle={tooltipStyle}
          />
          <Legend />
          <ReferenceLine
            y={chart.gauge.target}
            stroke={getSeriesColor(1)}
            strokeDasharray="6 4"
          />
          <Bar
            dataKey={chart.series[0].key}
            name={chart.series[0].name}
            fill={getSeriesColor(0)}
            radius={[6, 6, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
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
        {chart.type === "gauge-history" && (
          <GaugeHistoryChart chart={chart} />
        )}

        {chart.type !== "gauge-history" && (
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            {chart.type === "line" && (
              <LineChart data={chart.data}>
                <CartesianGrid {...chartGrid} />
                <XAxis
                  dataKey="name"
                  {...chartAxis}
                />
                <YAxis
                  {...chartAxis}
                  tickFormatter={getValueFormatter(chart.unit)}
                />
                <Tooltip
                  formatter={getValueFormatter(chart.unit)}
                  contentStyle={tooltipStyle}
                />
                <Legend />
                {chart.series.map((serie, index) => (
                  <Line
                    key={serie.key}
                    type="monotone"
                    dataKey={serie.key}
                    name={serie.name}
                    stroke={getSeriesColor(index)}
                    strokeDasharray={chartLineStyles[index]}
                    strokeWidth={3}
                    dot={{
                      r: 4,
                      strokeWidth: 2,
                    }}
                    activeDot={{ r: 6 }}
                  />
                ))}
              </LineChart>
            )}

            {chart.type === "bar" && (
              <BarChart data={chart.data}>
                <CartesianGrid {...chartGrid} />
                <XAxis
                  dataKey="name"
                  {...chartAxis}
                />
                <YAxis
                  {...chartAxis}
                  tickFormatter={getValueFormatter(chart.unit)}
                />
                <Tooltip
                  formatter={getValueFormatter(chart.unit)}
                  contentStyle={tooltipStyle}
                />
                <Legend />
                {chart.series.map((serie, index) => (
                  <Bar
                    key={serie.key}
                    dataKey={serie.key}
                    name={serie.name}
                    fill={getSeriesColor(index)}
                    radius={[6, 6, 0, 0]}
                  />
                ))}
              </BarChart>
            )}

            {chart.type === "area" && (
              <AreaChart data={chart.data}>
                <CartesianGrid {...chartGrid} />
                <XAxis
                  dataKey="name"
                  {...chartAxis}
                />
                <YAxis
                  {...chartAxis}
                  tickFormatter={getValueFormatter(chart.unit)}
                />
                <Tooltip
                  formatter={getValueFormatter(chart.unit)}
                  contentStyle={tooltipStyle}
                />
                <Legend />
                {chart.series.map((serie, index) => (
                  <Area
                    key={serie.key}
                    type="monotone"
                    dataKey={serie.key}
                    name={serie.name}
                    stackId="total"
                    stroke={getSeriesColor(index)}
                    fill={getSeriesColor(index)}
                    fillOpacity={0.32}
                    strokeWidth={3}
                  />
                ))}
              </AreaChart>
            )}

            {chart.type === "waterfall" && (
              <BarChart data={waterfallData}>
                <CartesianGrid {...chartGrid} />
                <XAxis
                  dataKey="name"
                  {...chartAxis}
                />
                <YAxis
                  {...chartAxis}
                  tickFormatter={getValueFormatter(chart.unit)}
                />
                <Tooltip
                  formatter={getValueFormatter(chart.unit)}
                  contentStyle={tooltipStyle}
                />
                <ReferenceLine
                  y={0}
                  stroke="#64748b"
                />
                <Bar
                  dataKey="start"
                  stackId="waterfall"
                  fill="transparent"
                />
                <Bar
                  dataKey="delta"
                  stackId="waterfall"
                  name={chart.series[0].name}
                  radius={[6, 6, 0, 0]}
                >
                  {waterfallData.map((entry) => (
                    <Cell
                      key={entry.name}
                      fill={entry.fill}
                    />
                  ))}
                </Bar>
              </BarChart>
            )}
          </ResponsiveContainer>
        )}
      </div>
    </section>
  )
}
