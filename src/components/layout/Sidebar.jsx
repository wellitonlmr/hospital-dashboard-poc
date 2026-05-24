import { Link, useLocation } from "react-router-dom"
import {
  LayoutDashboard,
  Building2,
  LogOut,
} from "lucide-react"

export default function Sidebar() {
  const location = useLocation()

  const menus = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard size={18} />,
    },

    {
      name: "Estrutura Hospitalar",
      path: "/hospital-structure",
      icon: <Building2 size={18} />,
    },
  ]

  return (
    <aside
  className="
  w-20 xl:w-64
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
      <div className="p-6 border-b border-slate-700">
        <h1 className="text-xl font-bold">
          Hospital Indicators
        </h1>
      </div>

      <nav className="flex-1 p-4">
        {menus.map((menu) => (
          <Link
            key={menu.path}
            to={menu.path}
            className={`flex items-center gap-3 p-3 rounded-lg mb-2 transition
            ${
              location.pathname === menu.path
                ? "bg-slate-700"
                : "hover:bg-slate-800"
            }`}
          >
            {menu.icon}
            <span className="hidden xl:block">
  {menu.name}
</span>
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-700">
        <button className="flex items-center gap-2 text-red-400">
          <LogOut size={18} />
          Sair
        </button>
      </div>
    </aside>
  )
}