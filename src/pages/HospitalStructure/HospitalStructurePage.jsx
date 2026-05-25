import { useMemo, useState } from "react"

import HospitalFilters from "../../components/hospital/HospitalFilters"
import HospitalModal from "../../components/hospital/HospitalModal"
import HospitalTable from "../../components/hospital/HospitalTable"

import {
  getHospitals,
  saveHospitals,
} from "../../services/hospitalService"

function buildTree(data, parentId = null, level = 0) {
  return data
    .filter((item) => item.parentId === parentId)
    .flatMap((item) => [
      {
        ...item,
        level,
      },
      ...buildTree(data, item.id, level + 1),
    ])
}

function getDescendantIds(data, parentId) {
  const children = data.filter(
    (item) => item.parentId === parentId
  )

  return children.flatMap((child) => [
    child.id,
    ...getDescendantIds(data, child.id),
  ])
}

function calculateTotal(data, itemId) {
  const item = data.find((entry) => entry.id === itemId)

  if (!item) {
    return 0
  }

  const children = data.filter(
    (entry) => entry.parentId === itemId
  )

  return children.reduce(
    (total, child) =>
      total + calculateTotal(data, child.id),
    Number(item.ownValue || 0)
  )
}

function getLevel(data, item) {
  if (!item.parentId) {
    return 0
  }

  const parent = data.find(
    (entry) => entry.id === item.parentId
  )

  if (!parent) {
    return 0
  }

  return getLevel(data, parent) + 1
}

export default function HospitalStructurePage() {
  const [data, setData] = useState(() =>
    getHospitals()
  )
  const [search, setSearch] = useState("")
  const [openModal, setOpenModal] =
    useState(false)
  const [editingItem, setEditingItem] =
    useState(null)

  function persist(updated) {
    setData(updated)
    saveHospitals(updated)
  }

  function handleSave(item) {
    const normalizedItem = {
      title: item.title,
      description: item.description,
      type: item.type,
      status: item.status,
      parentId: item.parentId
        ? Number(item.parentId)
        : null,
      ownValue: Number(item.ownValue || 0),
    }

    const updated = editingItem
      ? data.map((entry) =>
          entry.id === editingItem.id
            ? {
                ...normalizedItem,
                id: editingItem.id,
              }
            : entry
        )
      : [
          ...data,
          {
            ...normalizedItem,
            id: Date.now(),
          },
        ]

    persist(updated)
    setOpenModal(false)
    setEditingItem(null)
  }

  function handleDelete(id) {
    const idsToRemove = [
      id,
      ...getDescendantIds(data, id),
    ]

    persist(
      data.filter(
        (item) => !idsToRemove.includes(item.id)
      )
    )
  }

  function handleEdit(item) {
    setEditingItem(item)
    setOpenModal(true)
  }

  const enrichedData = useMemo(
    () =>
      data.map((item) => ({
        ...item,
        totalValue: calculateTotal(data, item.id),
      })),
    [data]
  )

  const filteredData = useMemo(() => {
    const normalizedSearch = search.toLowerCase()
    const filtered = enrichedData.filter(
      (item) =>
        item.title
          .toLowerCase()
          .includes(normalizedSearch) ||
        (item.description || "")
          .toLowerCase()
          .includes(normalizedSearch)
    )

    if (!search) {
      return buildTree(enrichedData)
    }

    return filtered.map((item) => ({
      ...item,
      level: getLevel(enrichedData, item),
    }))
  }, [enrichedData, search])

  return (
    <div className="space-y-6">
      <div
        className="
        flex
        flex-col
        md:flex-row
        justify-between
        gap-4
      "
      >
        <div>
          <h1 className="text-3xl font-bold">
            Estrutura Hospitalar
          </h1>

          <p className="text-gray-500">
            Cadastro de categorias, subcategorias e totais consolidados
          </p>
        </div>

        <button
          onClick={() => {
            setEditingItem(null)
            setOpenModal(true)
          }}
          className="
          bg-emerald-500
          hover:bg-emerald-600
          text-white
          px-5
          py-3
          rounded-2xl
        "
        >
          Nova Categoria
        </button>
      </div>

      <HospitalFilters
        search={search}
        setSearch={setSearch}
      />

      <HospitalTable
        data={filteredData}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <HospitalModal
        key={editingItem?.id || "new"}
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSave={handleSave}
        editingItem={editingItem}
        categories={data}
      />
    </div>
  )
}
