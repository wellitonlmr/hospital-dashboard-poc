export default function DashboardTabs() {
  const tabs = [
    "Financeiro",
    "Assistencial",
    "Operacional",
    "Qualidade",
  ]

  return (
    <div className="flex gap-2 flex-wrap">
      {tabs.map((tab) => (
        <button
          key={tab}
          className="
          px-4
          py-2
          rounded-xl
          bg-white
          dark:bg-slate-900
          border
          dark:border-slate-700
          hover:bg-slate-100
          dark:hover:bg-slate-800
          transition
        "
        >
          {tab}
        </button>
      ))}
    </div>
  )
}