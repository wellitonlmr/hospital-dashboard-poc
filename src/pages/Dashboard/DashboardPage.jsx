import { useEffect, useState } from "react"
import { Navigate, useParams } from "react-router-dom"

import DashboardBlock from "../../components/dashboard/DashboardBlock"
import DashboardFilters from "../../components/dashboard/DashboardFilters"
import KpiCard from "../../components/dashboard/KpiCard"
import {
  getDashboardBlocks,
  getDashboardKpis,
} from "../../services/dashboardService"

export default function DashboardPage() {
  const { blockId } = useParams()
  const [dashboardBlocks, setDashboardBlocks] =
    useState([])
  const [dashboardKpis, setDashboardKpis] =
    useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadDashboard() {
      const [blocks, kpis] = await Promise.all([
        getDashboardBlocks(),
        getDashboardKpis(),
      ])

      setDashboardBlocks(blocks)
      setDashboardKpis(kpis)
      setLoading(false)
    }

    loadDashboard()
  }, [])

  if (loading) {
    return <p className="text-gray-500">Carregando dashboard...</p>
  }

  if (!dashboardBlocks.length) {
    return <p className="text-gray-500">Nenhum dashboard disponivel.</p>
  }

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
