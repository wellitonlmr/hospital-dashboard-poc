export const hospitalSectors = [
  {
    id: 1,
    title: "Diretoria Médica",
    description: "Coordenação técnica das atividades assistenciais",
    type: "hospital",
    subsectors: [
      {
        id: 11,
        name: "Corpo Clínico",
      },
      {
        id: 12,
        name: "CCIH",
      },
    ],
  },

  {
    id: 2,
    title: "Unidades Críticas",
    description: "Pacientes graves",
    type: "hospital",
    subsectors: [
      {
        id: 21,
        name: "UTI Adulto",
      },
      {
        id: 22,
        name: "UTI Pediátrica",
      },
    ],
  },

  {
    id: 3,
    title: "TI",
    description: "Tecnologia da Informação",
    type: "hospital",
    subsectors: [
      {
        id: 31,
        name: "Infraestrutura",
      },
      {
        id: 32,
        name: "PEP",
      },
    ],
  },
]
