import {
  useEffect,
  useMemo,
  useState,
} from "react"
import {
  Navigate,
  useParams,
} from "react-router-dom"
import {
  Pencil,
  Plus,
  Trash2,
} from "lucide-react"

import {
  createRecord,
  deleteRecord,
  listRecords,
  updateRecord,
} from "../../services/simpleCrudService"
import {
  getCrudModule,
} from "../../modules/crudModules"

async function loadReferenceOptions(config) {
  const referenceFields = config.fields.filter(
    (field) => field.referenceModule
  )

  const entries = await Promise.all(
    referenceFields.map(async (field) => {
      const referenceConfig = getCrudModule(
        field.referenceModule
      )

      if (!referenceConfig) {
        return [field.name, []]
      }

      const options = await listRecords(
        referenceConfig
      )

      return [field.name, options]
    })
  )

  return Object.fromEntries(entries)
}

function getToday() {
  return new Date().toISOString().slice(0, 10)
}

function buildEmptyForm(moduleConfig) {
  return moduleConfig.fields.reduce(
    (form, field) => ({
      ...form,
      [field.name]:
        field.type === "date" ? getToday() : "",
    }),
    {}
  )
}

function buildEditForm(moduleConfig, record) {
  return moduleConfig.fields.reduce(
    (form, field) => ({
      ...form,
      [field.name]: record[field.name] ?? "",
    }),
    {}
  )
}

function getSearchText(record) {
  return [
    record.id,
    record.descricao,
    record.nome,
    record.cpf,
    record.crm,
    record.sku,
    record.medicamento,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase()
}

export default function SimpleCrudPage() {
  const { moduleId } = useParams()
  const moduleConfig = getCrudModule(moduleId)
  const [records, setRecords] = useState([])
  const [referenceOptions, setReferenceOptions] =
    useState({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")
  const [search, setSearch] = useState("")
  const [openModal, setOpenModal] = useState(false)
  const [editingRecord, setEditingRecord] =
    useState(null)
  const [form, setForm] = useState({})

  useEffect(() => {
    let ignore = false

    async function loadData() {
      if (!moduleConfig) {
        return
      }

      setLoading(true)
      setError("")
      setOpenModal(false)
      setEditingRecord(null)
      setForm(buildEmptyForm(moduleConfig))

      try {
        const [data, references] =
          await Promise.all([
            listRecords(moduleConfig),
            loadReferenceOptions(moduleConfig),
          ])

        if (!ignore) {
          setRecords(data)
          setReferenceOptions(references)
        }
      } catch {
        if (!ignore) {
          setError(
            "Não foi possível carregar os registros."
          )
        }
      } finally {
        if (!ignore) {
          setLoading(false)
        }
      }
    }

    loadData()

    return () => {
      ignore = true
    }
  }, [moduleConfig])

  const filteredRecords = useMemo(() => {
    const normalizedSearch = search
      .trim()
      .toLowerCase()

    if (!normalizedSearch) {
      return records
    }

    return records.filter((record) =>
      getSearchText(record).includes(
        normalizedSearch
      )
    )
  }, [records, search])

  if (!moduleConfig) {
    return <Navigate to="/dashboard" replace />
  }

  function openCreateModal() {
    setEditingRecord(null)
    setForm(buildEmptyForm(moduleConfig))
    setOpenModal(true)
  }

  function openEditModal(record) {
    setEditingRecord(record)
    setForm(buildEditForm(moduleConfig, record))
    setOpenModal(true)
  }

  function closeModal() {
    setOpenModal(false)
    setEditingRecord(null)
    setForm(buildEmptyForm(moduleConfig))
    setSaving(false)
  }

  function updateFormField(name, value) {
    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setSaving(true)
    setError("")

    try {
      if (editingRecord) {
        const updatedRecord = await updateRecord(
          moduleConfig,
          {
            ...form,
            id: editingRecord.id,
          }
        )

        setRecords((currentRecords) =>
          currentRecords.map((record) =>
            record.id === updatedRecord.id
              ? updatedRecord
              : record
          )
        )
      } else {
        const createdRecord = await createRecord(
          moduleConfig,
          form
        )

        setRecords((currentRecords) => [
          ...currentRecords,
          createdRecord,
        ])
      }

      closeModal()
    } catch {
      setError(
        "Não foi possível salvar o registro."
      )
      setSaving(false)
    }
  }

  async function handleDelete(record) {
    const shouldDelete = window.confirm(
      `Excluir "${record.descricao}"?`
    )

    if (!shouldDelete) {
      return
    }

    setError("")

    try {
      await deleteRecord(moduleConfig, record.id)

      setRecords((currentRecords) =>
        currentRecords.filter(
          (item) => item.id !== record.id
        )
      )
    } catch {
      setError(
        "Não foi possível excluir o registro."
      )
    }
  }

  function renderField(field) {
    const commonProps = {
      name: field.name,
      value: form[field.name] ?? "",
      required: field.required,
      className:
        "w-full rounded-xl border p-3 dark:bg-slate-800",
    }

    if (field.type === "textarea") {
      return (
        <textarea
          {...commonProps}
          placeholder={field.label}
          onChange={(event) =>
            updateFormField(
              field.name,
              event.target.value
            )
          }
          className={`${commonProps.className} min-h-24`}
        />
      )
    }

    if (field.type === "select") {
      const options =
        referenceOptions[field.name] ?? []

      return (
        <select
          {...commonProps}
          onChange={(event) =>
            updateFormField(
              field.name,
              event.target.value
            )
          }
        >
          <option value="">
            Selecione {field.label.toLowerCase()}
          </option>

          {options.map((option) => (
            <option
              key={option.id}
              value={option.id}
            >
              {option.descricao ||
                `${field.label} ${option.id}`}
            </option>
          ))}
        </select>
      )
    }

    return (
      <input
        {...commonProps}
        type={field.type ?? "text"}
        step={
          field.type === "number" ? "0.01" : undefined
        }
        placeholder={field.label}
        onChange={(event) =>
          updateFormField(
            field.name,
            event.target.value
          )
        }
      />
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            {moduleConfig.title}
          </h1>
          <p className="text-gray-500">
            Cadastro de {moduleConfig.title.toLowerCase()} com os campos obrigatórios da API
          </p>
        </div>

        <button
          type="button"
          onClick={openCreateModal}
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-5 py-3 text-white hover:bg-emerald-600"
        >
          <Plus size={18} />
          Novo
        </button>
      </div>

      <div className="rounded-2xl border bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <input
          type="text"
          placeholder={`Buscar ${moduleConfig.singularTitle.toLowerCase()}...`}
          value={search}
          onChange={(event) =>
            setSearch(event.target.value)
          }
          className="w-full rounded-xl border p-3 dark:bg-slate-800"
        />
      </div>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-700 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-300">
          {error}
        </div>
      )}

      <div className="overflow-auto rounded-2xl border bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <table className="w-full min-w-[560px]">
          <thead>
            <tr className="border-b dark:border-slate-700">
              <th className="w-32 p-4 text-left">
                ID
              </th>
              <th className="p-4 text-left">
                Descrição
              </th>
              <th className="w-32 p-4 text-right">
                Ações
              </th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan="3"
                  className="p-6 text-center text-gray-500"
                >
                  Carregando registros...
                </td>
              </tr>
            ) : filteredRecords.length === 0 ? (
              <tr>
                <td
                  colSpan="3"
                  className="p-6 text-center text-gray-500"
                >
                  Nenhum registro encontrado.
                </td>
              </tr>
            ) : (
              filteredRecords.map((record) => (
                <tr
                  key={record.id}
                  className="border-b hover:bg-gray-50 dark:border-slate-700 dark:hover:bg-slate-800"
                >
                  <td className="p-4 font-medium">
                    {record.id}
                  </td>
                  <td className="p-4">
                    {record.descricao}
                  </td>
                  <td className="p-4">
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          openEditModal(record)
                        }
                        className="rounded-lg p-2 hover:bg-slate-100 dark:hover:bg-slate-700"
                        aria-label={`Editar ${record.descricao}`}
                      >
                        <Pencil size={18} />
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          handleDelete(record)
                        }
                        className="rounded-lg p-2 text-red-500 hover:bg-red-100 dark:hover:bg-red-500/10"
                        aria-label={`Excluir ${record.descricao}`}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {openModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl dark:bg-slate-900">
            <h2 className="mb-6 text-2xl font-bold">
              {editingRecord
                ? `Editar ${moduleConfig.singularTitle}`
                : `Novo ${moduleConfig.singularTitle}`}
            </h2>

            <form
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              {editingRecord && (
                <input
                  type="text"
                  value={editingRecord.id}
                  className="w-full rounded-xl border p-3 text-gray-500 dark:bg-slate-800"
                  disabled
                />
              )}

              {moduleConfig.fields.map((field) => (
                <label
                  key={field.name}
                  className="block space-y-2"
                >
                  <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                    {field.label}
                  </span>
                  {renderField(field)}
                </label>
              ))}

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-xl border px-4 py-2"
                  disabled={saving}
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  className="rounded-xl bg-emerald-500 px-4 py-2 text-white disabled:opacity-70"
                  disabled={saving}
                >
                  {saving ? "Salvando..." : "Salvar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
