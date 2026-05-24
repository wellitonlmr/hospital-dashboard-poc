import Sidebar from "../components/layout/Sidebar"
import Topbar from "../components/layout/Topbar"

export default function MainLayout({
  children,
}) {
  return (
    <div
      className="
      flex
      h-screen
      bg-gray-100
      dark:bg-slate-950
      transition-colors
    "
    >
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Topbar />

        <main
          className="
          flex-1
          overflow-auto
          p-6
        "
        >
          {children}
        </main>
      </div>
    </div>
  )
}