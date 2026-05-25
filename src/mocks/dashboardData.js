export const dashboardKpis = [
  {
    title: "Taxa de IRAS",
    value: "2,1%",
    variation: "-0,4%",
    tone: "positive",
  },
  {
    title: "Ocupacao de leitos",
    value: "87%",
    variation: "+3%",
    tone: "positive",
  },
  {
    title: "NPS hospitalar",
    value: "72",
    variation: "+6 pts",
    tone: "positive",
  },
  {
    title: "Glosas",
    value: "2,4%",
    variation: "-0,3%",
    tone: "positive",
  },
]

export const dashboardBlocks = [
  {
    id: "patient-safety",
    title: "Segurança do Paciente",
    description:
      "Indicadores criticos de segurança assistencial e eventos adversos.",
    charts: [
      {
        title: "Taxa de IRAS x mes",
        type: "line",
        data: [
          { name: "Jan", iras: 2.8 },
          { name: "Fev", iras: 2.6 },
          { name: "Mar", iras: 2.4 },
          { name: "Abr", iras: 2.7 },
          { name: "Mai", iras: 2.2 },
          { name: "Jun", iras: 2.1 },
        ],
        series: [{ key: "iras", name: "IRAS (%)", color: "#0f766e" }],
      },
      {
        title: "Eventos sentinela por tipo",
        type: "bar",
        data: [
          { name: "Medicacao", eventos: 3 },
          { name: "Cirurgia", eventos: 1 },
          { name: "Queda", eventos: 4 },
          { name: "Identificacao", eventos: 2 },
        ],
        series: [{ key: "eventos", name: "Eventos", color: "#dc2626" }],
      },
    ],
  },
  {
    id: "operational-efficiency",
    title: "Eficiência Operacional",
    description:
      "Leitos, permanência e gargalos que afetam capacidade e custo.",
    charts: [
      {
        title: "Taxa de ocupação x setor",
        type: "bar",
        data: [
          { name: "UTI", ocupacao: 94 },
          { name: "Clínica", ocupacao: 82 },
          { name: "Cirurgia", ocupacao: 76 },
          { name: "Maternidade", ocupacao: 69 },
        ],
        series: [{ key: "ocupacao", name: "Ocupação (%)", color: "#2563eb" }],
      },
      {
        title: "Tempo médio de permanência x especialidade",
        type: "line",
        data: [
          { name: "Cardio", tmp: 6.4 },
          { name: "Ortopedia", tmp: 5.1 },
          { name: "Neuro", tmp: 7.2 },
          { name: "Clínica", tmp: 4.8 },
        ],
        series: [{ key: "tmp", name: "TMP (dias)", color: "#7c3aed" }],
      },
    ],
  },
  {
    id: "clinical-quality",
    title: "Qualidade Clínica",
    description:
      "Desfechos assistenciais usados para avaliar qualidade e risco.",
    charts: [
      {
        title: "Mortalidade institucional x meta",
        type: "line",
        data: [
          { name: "Jan", mortalidade: 3.4, meta: 3 },
          { name: "Fev", mortalidade: 3.2, meta: 3 },
          { name: "Mar", mortalidade: 2.9, meta: 3 },
          { name: "Abr", mortalidade: 3.1, meta: 3 },
          { name: "Mai", mortalidade: 2.8, meta: 3 },
          { name: "Jun", mortalidade: 2.7, meta: 3 },
        ],
        series: [
          { key: "mortalidade", name: "Mortalidade (%)", color: "#be123c" },
          { key: "meta", name: "Meta (%)", color: "#64748b" },
        ],
      },
      {
        title: "Reinternação 30 dias x condição",
        type: "bar",
        data: [
          { name: "Cardio", reinternação: 8.4 },
          { name: "DPOC", reinternação: 11.2 },
          { name: "Diabetes", reinternação: 6.5 },
          { name: "Sepse", reinternação: 9.8 },
        ],
        series: [
          { key: "reinternacao", name: "Reinternação (%)", color: "#ea580c" },
        ],
      },
    ],
  },
  {
    id: "satisfaction",
    title: "Satisfação",
    description:
      "Percepção do paciente por setor para orientar melhorias direcionadas.",
    charts: [
      {
        title: "NPS x setor x mes",
        type: "line",
        data: [
          { name: "Jan", emergencia: 61, internacao: 70, cirurgia: 74 },
          { name: "Fev", emergencia: 64, internacao: 72, cirurgia: 75 },
          { name: "Mar", emergencia: 59, internacao: 74, cirurgia: 76 },
          { name: "Abr", emergencia: 66, internacao: 73, cirurgia: 78 },
          { name: "Mai", emergencia: 68, internacao: 75, cirurgia: 80 },
          { name: "Jun", emergencia: 70, internacao: 77, cirurgia: 82 },
        ],
        series: [
          { key: "emergencia", name: "Emergencia", color: "#0891b2" },
          { key: "internacao", name: "Internacao", color: "#16a34a" },
          { key: "cirurgia", name: "Cirurgia", color: "#9333ea" },
        ],
      },
    ],
  },
  {
    id: "financial",
    title: "Financeiro",
    description:
      "Receita, glosas e sustentabilidade operacional para leitura executiva.",
    charts: [
      {
        title: "Receita x glosas x mes",
        type: "area",
        data: [
          { name: "Jan", receita: 410, glosas: 18 },
          { name: "Fev", receita: 438, glosas: 20 },
          { name: "Mar", receita: 452, glosas: 17 },
          { name: "Abr", receita: 471, glosas: 16 },
          { name: "Mai", receita: 489, glosas: 14 },
          { name: "Jun", receita: 515, glosas: 12 },
        ],
        series: [
          { key: "receita", name: "Receita", color: "#15803d" },
          { key: "glosas", name: "Glosas", color: "#f97316" },
        ],
      },
      {
        title: "EBITDA waterfall",
        type: "waterfall",
        data: [
          { name: "Receita", value: 515 },
          { name: "Deducoes", value: -42 },
          { name: "Custos", value: -318 },
          { name: "Despesas", value: -71 },
          { name: "EBITDA", value: 84 },
        ],
        series: [{ key: "value", name: "R$ mil", color: "#0f766e" }],
      },
    ],
  },
]
