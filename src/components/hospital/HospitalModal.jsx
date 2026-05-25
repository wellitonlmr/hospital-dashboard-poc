import { useMemo, useState } from "react"

function getDescendantIds(data, parentId) {
  const children = data.filter(
    (item) => item.parentId === parentId
  )

  return children.flatMap((child) => [
    child.id,
    ...getDescendantIds(data, child.id),
  ])
}

export default function HospitalModal({
  open,
  onClose,
  onSave,
  editingItem,
  categories,
}) {
  const emptyForm = {
    title: "",
    description: "",
    type: "",
    status: "Ativo",
    parentId: "",
    ownValue: 0,
  }

  const [form, setForm] = useState(() =>
    editingItem
      ? {
          ...editingItem,
          parentId:
            editingItem.parentId ?? "",
        }
      : emptyForm
  )

  const parentOptions = useMemo(() => {
    if (!editingItem) {
      return categories
    }

    const blockedIds = [
      editingItem.id,
      ...getDescendantIds(
        categories,
        editingItem.id
      ),
    ]

    return categories.filter(
      (category) =>
        !blockedIds.includes(category.id)
    )
  }, [categories, editingItem])

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  function handleSubmit(e) {
    e.preventDefault()

    onSave(form)
  }

  if (!open) return null

  return (
    <div
      className="
      fixed
      inset-0
      bg-black/40
      flex
      items-center
      justify-center
      z-50
      p-4
    "
    >
      <div
        className="
        bg-white
        dark:bg-slate-900
        rounded-2xl
        w-full
        max-w-lg
        p-6
        shadow-xl
      "
      >
        <h2 className="text-2xl font-bold mb-6">
          {editingItem
            ? "Editar Categoria"
            : "Nova Categoria"}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <input
            name="title"
            placeholder="Título"
            value={form.title}
            onChange={handleChange}
            className="
            w-full
            border
            rounded-xl
            p-3
            dark:bg-slate-800
          "
            required
          />

          <textarea
            name="description"
            placeholder="Descrição"
            value={form.description}
            onChange={handleChange}
            className="
            w-full
            border
            rounded-xl
            p-3
            dark:bg-slate-800
          "
            required
          />

          <select
            name="parentId"
            value={form.parentId}
            onChange={handleChange}
            className="
            w-full
            border
            rounded-xl
            p-3
            dark:bg-slate-800
          "
          >
            <option value="">
              Sem categoria pai
            </option>

            {parentOptions.map((category) => (
              <option
                key={category.id}
                value={category.id}
              >
                {category.title}
              </option>
            ))}
          </select>

          <input
            name="ownValue"
            type="number"
            min="0"
            step="1"
            placeholder="Valor próprio"
            value={form.ownValue}
            onChange={handleChange}
            className="
            w-full
            border
            rounded-xl
            p-3
            dark:bg-slate-800
          "
          />

          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="
            w-full
            border
            rounded-xl
            p-3
            dark:bg-slate-800
          "
            required
          >
            <option value="">
              Tipo
            </option>

            <option value="Hospital">
              Hospital
            </option>

            <option value="Assistencial">
              Assistencial
            </option>

            <option value="Administrativo">
              Administrativo
            </option>
          </select>

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="
            w-full
            border
            rounded-xl
            p-3
            dark:bg-slate-800
          "
          >
            <option value="Ativo">
              Ativo
            </option>

            <option value="Inativo">
              Inativo
            </option>
          </select>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="
              px-4
              py-2
              rounded-xl
              border
            "
            >
              Cancelar
            </button>

            <button
              className="
              px-4
              py-2
              rounded-xl
              bg-emerald-500
              text-white
            "
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
