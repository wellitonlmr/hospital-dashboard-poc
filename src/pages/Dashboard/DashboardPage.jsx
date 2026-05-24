import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  BarChart,
  Bar,
} from "recharts"

import KpiCard from "../../components/dashboard/KpiCard"
import DashboardFilters from "../../components/dashboard/DashboardFilters"
import DashboardTabs from "../../components/dashboard/DashboardTabs"

import {
  kpis,
  monthlyData,
  stackedData,
} from "../../mocks/dashboardData"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Dashboard Executivo
        </h1>

        <p className="text-gray-500 mt-1">
          Indicadores hospitalares e financeiros
        </p>
      </div>

      <DashboardFilters />

      <DashboardTabs />

      <div
        className="
        grid
        grid-cols-1
        md:grid-cols-2
        xl:grid-cols-4
        gap-4
      "
      >
        {kpis.map((kpi) => (
          <KpiCard
            key={kpi.title}
            {...kpi}
          />
        ))}
      </div>

      <div
        className="
        grid
        grid-cols-1
        xl:grid-cols-2
        gap-6
      "
      >
        <div
          className="
          bg-white
          dark:bg-slate-900
          rounded-2xl
          p-6
          shadow-sm
          border
          dark:border-slate-700
        "
        >
          <h2 className="text-lg font-semibold mb-4">
            Evolução Financeira
          </h2>

          <div className="h-[350px]">
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="month" />

                <YAxis />

                <Tooltip />

                <Legend />

                <Line
                  type="monotone"
                  dataKey="receita"
                  strokeWidth={3}
                />

                <Line
                  type="monotone"
                  dataKey="despesa"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div
          className="
          bg-white
          dark:bg-slate-900
          rounded-2xl
          p-6
          shadow-sm
          border
          dark:border-slate-700
        "
        >
          <h2 className="text-lg font-semibold mb-4">
            Receita por Categoria
          </h2>

          <div className="h-[350px]">
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <BarChart data={stackedData}>
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="name" />

                <YAxis />

                <Tooltip />

                <Legend />

                <Bar
                  dataKey="sus"
                  stackId="a"
                />

                <Bar
                  dataKey="convenio"
                  stackId="a"
                />

                <Bar
                  dataKey="particular"
                  stackId="a"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div
        className="
        bg-white
        dark:bg-slate-900
        rounded-2xl
        p-6
        shadow-sm
        border
        dark:border-slate-700
      "
      >
        <h2 className="text-lg font-semibold mb-4">
          Comparativo Mensal
        </h2>

        <div className="overflow-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-3">
                  Mês
                </th>

                <th className="text-left p-3">
                  Receita
                </th>

                <th className="text-left p-3">
                  Despesa
                </th>

                <th className="text-left p-3">
                  Resultado
                </th>
              </tr>
            </thead>

            <tbody>
              {monthlyData.map((item) => (
                <tr
                  key={item.month}
                  className="border-b"
                >
                  <td className="p-3">
                    {item.month}
                  </td>

                  <td className="p-3">
                    {item.receita}
                  </td>

                  <td className="p-3">
                    {item.despesa}
                  </td>

                  <td className="p-3 text-emerald-500">
                    {item.receita - item.despesa}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}