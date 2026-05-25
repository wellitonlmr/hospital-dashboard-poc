export default function DashboardFilters() {
  return (
    <div
      className="
      bg-white
      dark:bg-slate-900
      p-4
      rounded-2xl
      shadow-sm
      border
      dark:border-slate-700
      flex
      flex-wrap
      gap-4
      items-center
    "
    >
      <select className="border rounded-lg px-3 py-2 dark:bg-slate-800">
        <option>2026</option>
        <option>2025</option>
      </select>

      <select className="border rounded-lg px-3 py-2 dark:bg-slate-800">
        <option>Todos os setores</option>
        <option>UTI</option>
        <option>Centro Cirúrgico</option>
        <option>Emergência</option>
        <option>Internação</option>
      </select>

      <select className="border rounded-lg px-3 py-2 dark:bg-slate-800">
        <option>Mensal</option>
        <option>Trimestral</option>
      </select>
    </div>
  )
}
