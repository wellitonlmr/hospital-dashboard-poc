export default function DashboardTabs({
  blocks,
  activeBlock,
  onChange,
}) {
  const tabs = [
    {
      id: "all",
      title: "Todos",
    },
    ...blocks,
  ]

  return (
    <div className="flex gap-2 flex-wrap">
      {tabs.map((tab) => {
        const active = activeBlock === tab.id

        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`
            px-4
            py-2
            rounded-xl
            border
            transition
            ${
              active
                ? "bg-slate-800 text-white border-slate-800 dark:bg-white dark:text-slate-900"
                : "bg-white dark:bg-slate-900 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
            }
          `}
          >
            {tab.title}
          </button>
        )
      })}
    </div>
  )
}
