const STORAGE_KEY = "hospital_data"

const initialData = [
  {
    id: 1,
    title: "Diretoria Médica",
    description: "Coordenação médica",
    type: "Hospital",
    status: "Ativo",
  },

  {
    id: 2,
    title: "UTI Adulto",
    description: "Pacientes críticos",
    type: "Assistencial",
    status: "Ativo",
  },

  {
    id: 3,
    title: "TI",
    description: "Tecnologia da informação",
    type: "Administrativo",
    status: "Inativo",
  },
]

export function getHospitals() {
  const data = localStorage.getItem(STORAGE_KEY)

  if (!data) {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(initialData)
    )

    return initialData
  }

  return JSON.parse(data)
}

export function saveHospitals(data) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(data)
  )
}