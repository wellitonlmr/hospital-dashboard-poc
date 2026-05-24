import { Moon, Sun } from "lucide-react"
import { useTheme } from "../../hooks/useTheme"

export default function Topbar() {
  const {
    darkMode,
    toggleTheme,
  } = useTheme()

  return (
    <header
      className="
      bg-white
      dark:bg-slate-900
      border-b
      dark:border-slate-700
      px-6
      py-4
      shadow-sm
      flex
      items-center
      justify-between
    "
    >
      <h2 className="text-lg font-semibold">
        Sistema Hospitalar
      </h2>

      <button
        onClick={toggleTheme}
        className="
        p-2
        rounded-lg
        hover:bg-gray-100
        dark:hover:bg-slate-800
      "
      >
        {darkMode ? (
          <Sun size={18} />
        ) : (
          <Moon size={18} />
        )}
      </button>
    </header>
  )
}