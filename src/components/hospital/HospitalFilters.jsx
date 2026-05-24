export default function HospitalFilters({
  search,
  setSearch,
}) {
  return (
    <div
      className="
      bg-white
      dark:bg-slate-900
      rounded-2xl
      shadow-sm
      border
      dark:border-slate-700
      p-4
    "
    >
      <input
        type="text"
        placeholder="Buscar setor..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="
        w-full
        border
        rounded-xl
        p-3
        dark:bg-slate-800
      "
      />
    </div>
  )
}