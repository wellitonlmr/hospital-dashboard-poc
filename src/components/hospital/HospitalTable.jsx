import {
  Pencil,
  Trash2,
} from "lucide-react"

export default function HospitalTable({
  data,
  onEdit,
  onDelete,
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
      overflow-auto
    "
    >
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left p-4">
              Categoria
            </th>

            <th className="text-left p-4">
              Tipo
            </th>

            <th className="text-left p-4">
              Valor próprio
            </th>

            <th className="text-left p-4">
              Total consolidado
            </th>

            <th className="text-left p-4">
              Status
            </th>

            <th className="text-right p-4">
              Ações
            </th>
          </tr>
        </thead>

        <tbody>
          {data.map((item) => (
            <tr
              key={item.id}
              className="
              border-b
              hover:bg-gray-50
              dark:hover:bg-slate-800
            "
            >
              <td className="p-4">
                <div
                  style={{
                    paddingLeft: `${item.level * 24}px`,
                  }}
                >
                  <p className="font-semibold">
                    {item.level > 0 && (
                      <span className="text-gray-400 mr-2">
                        -
                      </span>
                    )}
                    {item.title}
                  </p>

                  <p className="text-sm text-gray-500">
                    {item.description}
                  </p>
                </div>
              </td>

              <td className="p-4">
                <span
                  className="
                  px-3
                  py-1
                  rounded-full
                  bg-slate-200
                  dark:bg-slate-700
                  text-sm
                "
                >
                  {item.type}
                </span>
              </td>

              <td className="p-4">
                {item.ownValue}
              </td>

              <td className="p-4 font-semibold">
                {item.totalValue}
              </td>

              <td className="p-4">
                <span
                  className={`
                  px-3
                  py-1
                  rounded-full
                  text-sm
                  ${
                    item.status === "Ativo"
                      ? "bg-emerald-100 text-emerald-600"
                      : "bg-red-100 text-red-600"
                  }
                `}
                >
                  {item.status}
                </span>
              </td>

              <td className="p-4">
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => onEdit(item)}
                    className="
                    p-2
                    rounded-lg
                    hover:bg-slate-100
                    dark:hover:bg-slate-700
                  "
                    aria-label={`Editar ${item.title}`}
                  >
                    <Pencil size={18} />
                  </button>

                  <button
                    onClick={() =>
                      onDelete(item.id)
                    }
                    className="
                    p-2
                    rounded-lg
                    hover:bg-red-100
                    text-red-500
                  "
                    aria-label={`Excluir ${item.title}`}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
