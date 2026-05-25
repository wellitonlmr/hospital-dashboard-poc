import ChartCard from "./ChartCard"

export default function DashboardBlock({
  block,
}) {
  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold">
          {block.title}
        </h2>

        <p className="text-gray-500 mt-1">
          {block.description}
        </p>
      </div>

      <div
        className="
        grid
        grid-cols-1
        xl:grid-cols-2
        gap-5
      "
      >
        {block.charts.map((chart) => (
          <ChartCard
            key={chart.title}
            chart={chart}
          />
        ))}
      </div>
    </section>
  )
}
