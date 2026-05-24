import { useEffect, useState } from "react"

import HospitalModal from "../../components/hospital/HospitalModal"
import HospitalTable from "../../components/hospital/HospitalTable"
import HospitalFilters from "../../components/hospital/HospitalFilters"

import {
  getHospitals,
  saveHospitals,
} from "../../services/hospitalService"

export default function HospitalStructurePage() {
  const [data, setData] = useState([])

  const [search, setSearch] =
    useState("")

  const [openModal, setOpenModal] =
    useState(false)

  const [editingItem, setEditingItem] =
    useState(null)

  useEffect(() => {
    setData(getHospitals())
  }, [])

  function handleSave(item) {
    let updated = []

    if (editingItem) {
      updated = data.map((d) =>
        d.id === editingItem.id
          ? {
              ...item,
              id: editingItem.id,
            }
          : d
      )
    } else {
      updated = [
        ...data,
        {
          ...item,
          id: Date.now(),
        },
      ]
    }

    setData(updated)

    saveHospitals(updated)

    setOpenModal(false)

    setEditingItem(null)
  }

  function handleDelete(id) {
    const updated = data.filter(
      (item) => item.id !== id
    )

    setData(updated)

    saveHospitals(updated)
  }

  function handleEdit(item) {
    setEditingItem(item)

    setOpenModal(true)
  }

  const filteredData = data.filter(
    (item) =>
      item.title
        .toLowerCase()
        .includes(search.toLowerCase())
  )

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
            Gestão de setores hospitalares
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
          Novo Setor
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
        onClose={() =>
          setOpenModal(false)
        }
        onSave={handleSave}
        editingItem={editingItem}
      />
    </div>
  )
}