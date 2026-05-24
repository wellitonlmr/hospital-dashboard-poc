import { useEffect, useState } from "react"

export default function HospitalModal({
  open,
  onClose,
  onSave,
  editingItem,
}) {
 const emptyForm = {
  title: "",
  description: "",
  type: "",
  status: "Ativo",
}

const [form, setForm] = useState(
  editingItem || emptyForm
)


  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  function handleSubmit(e) {
    e.preventDefault()

    onSave(form)

    setForm({
      title: "",
      description: "",
      type: "",
      status: "Ativo",
    })
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
            ? "Editar Setor"
            : "Novo Setor"}
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