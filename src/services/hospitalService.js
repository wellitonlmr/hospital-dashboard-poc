const STORAGE_KEY = "hospital_data"

const initialData = [
  {
    id: 1,
    title: "Farmácia",
    description: "Estoque central de medicamentos",
    type: "Assistencial",
    status: "Ativo",
    parentId: null,
    ownValue: 20,
  },
  {
    id: 2,
    title: "Farmácia satélite",
    description: "Apoio aos setores assistenciais",
    type: "Assistencial",
    status: "Ativo",
    parentId: 1,
    ownValue: 10,
  },
  {
    id: 3,
    title: "UTI Adulto",
    description: "Pacientes críticos",
    type: "Assistencial",
    status: "Ativo",
    parentId: null,
    ownValue: 18,
  },
  {
    id: 4,
    title: "TI",
    description: "Tecnologia da informação",
    type: "Administrativo",
    status: "Inativo",
    parentId: null,
    ownValue: 6,
  },
]

function normalizeItem(item) {
  return {
    ...item,
    parentId: item.parentId ?? null,
    ownValue: Number(item.ownValue || 0),
  }
}

export function getHospitals() {
  const data = localStorage.getItem(STORAGE_KEY)

  if (!data) {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(initialData)
    )

    return initialData
  }

  const parsedData = JSON.parse(data)
  const isLegacyData = parsedData.every(
    (item) =>
      item.parentId === undefined &&
      item.ownValue === undefined
  )

  if (isLegacyData) {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(initialData)
    )

    return initialData
  }

  return parsedData.map(normalizeItem)
}

export function saveHospitals(data) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(data.map(normalizeItem))
  )
}
