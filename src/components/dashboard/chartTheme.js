export const chartPalette = [
  "#005AB5",
  "#DC3220",
  "#009E73",
  "#CC79A7",
  "#000000",
  "#56B4E9",
]

export const chartLineStyles = [
  undefined,
  "6 4",
  "2 4",
  "10 4 2 4",
]

export const chartGrid = {
  stroke: "#cbd5e1",
  strokeDasharray: "4 4",
}

export const chartAxis = {
  stroke: "#64748b",
  tick: {
    fill: "#64748b",
    fontSize: 12,
  },
}

export const tooltipStyle = {
  backgroundColor: "#ffffff",
  border: "1px solid #cbd5e1",
  borderRadius: 8,
  color: "#0f172a",
}

export function getSeriesColor(index) {
  return chartPalette[index % chartPalette.length]
}

export function formatValue(value, unit) {
  if (value === undefined || value === null) {
    return "-"
  }

  if (unit === "percent") {
    return `${value}%`
  }

  if (unit === "currency") {
    return `R$ ${value} mil`
  }

  if (unit === "days") {
    return `${value} dias`
  }

  return value
}
