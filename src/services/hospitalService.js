import initialHospitals from "../mocks/json/hospitals.json"

const STORAGE_KEY = "hospital_data"

function normalizeItem(item) {
  return {
    ...item,
    parentId: item.parentId ?? null,
    ownValue: Number(item.ownValue || 0),
  }
}

function getInitialData() {
  return initialHospitals.map(normalizeItem)
}

export async function getHospitals() {
  const data = localStorage.getItem(STORAGE_KEY)
  const initialData = getInitialData()

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

export async function saveHospitals(data) {
  const normalizedData = data.map(normalizeItem)

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(normalizedData)
  )

  return normalizedData
}
