import { Navigate, useParams } from "react-router-dom"

import DashboardBlock from "../../components/dashboard/DashboardBlock"
import DashboardFilters from "../../components/dashboard/DashboardFilters"
import KpiCard from "../../components/dashboard/KpiCard"

import {
  dashboardBlocks,
  dashboardKpis,
} from "../../mocks/dashboardData"

export default function DashboardPage() {
  const { blockId } = useParams()
  const selectedBlock = dashboardBlocks.find(
    (block) => block.id === blockId
  )

  if (!selectedBlock) {
    return (
      <Navigate
        to={`/dashboard/${dashboardBlocks[0].id}`}
        replace
      />
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">
          {selectedBlock.title}
        </h1>

        <p className="text-gray-500 mt-1">
          {selectedBlock.description}
        </p>
      </div>

      <DashboardFilters />

      <div
        className="
        grid
        grid-cols-1
        md:grid-cols-2
        xl:grid-cols-4
        gap-4
      "
      >
        {dashboardKpis.map((kpi) => (
          <KpiCard
            key={kpi.title}
            {...kpi}
          />
        ))}
      </div>

      <DashboardBlock block={selectedBlock} />
    </div>
  )
}
