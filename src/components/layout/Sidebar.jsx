import {
  Link,
  useLocation,
} from "react-router-dom"
import {
  Building2,
  ChevronDown,
  LayoutDashboard,
  LogOut,
} from "lucide-react"

import { dashboardBlocks } from "../../mocks/dashboardData"

export default function Sidebar() {
  const location = useLocation()
  const dashboardActive =
    location.pathname.startsWith("/dashboard")

  return (
    <aside
      className="
      w-20
      xl:w-64
      bg-white
      dark:bg-slate-900
      border-r
      dark:border-slate-700
      text-slate-900
      dark:text-white
      flex
      flex-col
    "
    >
      <div className="p-6 border-b border-slate-200 dark:border-slate-700">
        <h1 className="text-xl font-bold hidden xl:block">
          ERP Hospitalar
        </h1>
        <h1 className="text-xl font-bold xl:hidden">
          ERP
        </h1>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        <div>
          <div
            className={`
            flex
            items-center
            gap-3
            p-3
            rounded-lg
            transition
            ${
              dashboardActive
                ? "bg-slate-700 text-white"
                : "hover:bg-slate-100 dark:hover:bg-slate-800"
            }
          `}
          >
            <LayoutDashboard size={18} />
            <span className="hidden xl:block flex-1">
              Dashboard
            </span>
            <ChevronDown
              size={16}
              className="hidden xl:block"
            />
          </div>

          <div className="hidden xl:block mt-2 ml-7 space-y-1">
            {dashboardBlocks.map((block) => {
              const path = `/dashboard/${block.id}`
              const active =
                location.pathname === path

              return (
                <Link
                  key={block.id}
                  to={path}
                  className={`
                  block
                  rounded-lg
                  px-3
                  py-2
                  text-sm
                  transition
                  ${
                    active
                      ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300"
                      : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                  }
                `}
                >
                  {block.title}
                </Link>
              )
            })}
          </div>
        </div>

        <Link
          to="/hospital-structure"
          className={`
          flex
          items-center
          gap-3
          p-3
          rounded-lg
          transition
          ${
            location.pathname ===
            "/hospital-structure"
              ? "bg-slate-700 text-white"
              : "hover:bg-slate-100 dark:hover:bg-slate-800"
          }
        `}
        >
          <Building2 size={18} />
          <span className="hidden xl:block">
            Estrutura Hospitalar
          </span>
        </Link>
      </nav>

      <div className="p-4 border-t border-slate-200 dark:border-slate-700">
        <button className="flex items-center gap-2 text-red-400">
          <LogOut size={18} />
          <span className="hidden xl:block">
            Sair
          </span>
        </button>
      </div>
    </aside>
  )
}
