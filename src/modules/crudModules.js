export const crudModules = [
  {
    id: "pacientes",
    title: "Pacientes",
    singularTitle: "Paciente",
    endpoint: "/pacientes/",
    fields: [
      {
        name: "nome",
        label: "Nome",
        required: true,
      },
      {
        name: "cpf",
        label: "CPF",
        required: true,
      },
      {
        name: "descricao",
        label: "Descrição",
        type: "textarea",
      },
    ],
  },
  {
    id: "medicos",
    title: "Médicos",
    singularTitle: "Médico",
    endpoint: "/medicos/",
    fields: [
      {
        name: "nome",
        label: "Nome",
        required: true,
      },
      {
        name: "crm",
        label: "CRM",
        required: true,
      },
      {
        name: "descricao",
        label: "Descrição",
        type: "textarea",
      },
    ],
  },
  {
    id: "prontuarios",
    title: "Prontuários",
    singularTitle: "Prontuário",
    endpoint: "/prontuarios/",
    fields: [
      {
        name: "data_atendimento",
        label: "Data de atendimento",
        type: "date",
        required: true,
      },
      {
        name: "paciente",
        label: "Paciente",
        type: "select",
        referenceModule: "pacientes",
        required: true,
      },
      {
        name: "medico",
        label: "Médico",
        type: "select",
        referenceModule: "medicos",
        required: true,
      },
      {
        name: "descricao",
        label: "Descrição",
        type: "textarea",
      },
    ],
  },
  {
    id: "prescricoes",
    title: "Prescrições",
    singularTitle: "Prescrição",
    endpoint: "/prescricoes/",
    fields: [
      {
        name: "medicamento",
        label: "Medicamento",
        required: true,
      },
      {
        name: "prontuario",
        label: "Prontuário",
        type: "select",
        referenceModule: "prontuarios",
        required: true,
      },
      {
        name: "descricao",
        label: "Descrição",
        type: "textarea",
      },
    ],
  },
  {
    id: "exames",
    title: "Exames",
    singularTitle: "Exame",
    endpoint: "/exames/",
    fields: [
      {
        name: "nome",
        label: "Nome",
        required: true,
      },
      {
        name: "data_solicitacao",
        label: "Data de solicitação",
        type: "date",
        required: true,
      },
      {
        name: "paciente",
        label: "Paciente",
        type: "select",
        referenceModule: "pacientes",
        required: true,
      },
      {
        name: "descricao",
        label: "Descrição",
        type: "textarea",
      },
    ],
  },
  {
    id: "faturamento",
    title: "Faturamento",
    singularTitle: "Item de faturamento",
    endpoint: "/faturas/",
    fields: [
      {
        name: "descricao",
        label: "Descrição",
        type: "textarea",
        required: true,
      },
      {
        name: "valor",
        label: "Valor",
        type: "number",
        required: true,
      },
      {
        name: "paciente",
        label: "Paciente",
        type: "select",
        referenceModule: "pacientes",
        required: true,
      },
    ],
  },
  {
    id: "estoque",
    title: "Estoque",
    singularTitle: "Item de estoque",
    endpoint: "/estoque/",
    fields: [
      {
        name: "nome",
        label: "Nome",
        required: true,
      },
      {
        name: "sku",
        label: "SKU",
        required: true,
      },
      {
        name: "descricao",
        label: "Descrição",
        type: "textarea",
      },
    ],
  },
]

export function getCrudModule(moduleId) {
  return crudModules.find((module) => module.id === moduleId)
}
