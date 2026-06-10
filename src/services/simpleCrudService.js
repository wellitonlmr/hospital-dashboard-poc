import api from "../api"

function normalizeRecord(record) {
  const description =
    record.descricao ??
    record.description ??
    record.nome ??
    record.medicamento ??
    record.sku ??
    (record.data_atendimento
      ? `Atendimento ${record.data_atendimento}`
      : "") ??
    ""

  return {
    ...record,
    id: record.id,
    descricao: description,
  }
}

function getRecordUrl(moduleConfig, id) {
  return `${moduleConfig.endpoint.replace(/\/$/, "")}/${id}/`
}

function normalizeValue(field, value) {
  if (field.type === "select") {
    return Number(value)
  }

  if (field.type === "number") {
    return Number(value)
  }

  return value
}

function buildPayload(moduleConfig, record, includeId = false) {
  return moduleConfig.fields.reduce((payload, field) => {
    const value = record[field.name]

    if (
      value === undefined ||
      value === null ||
      value === ""
    ) {
      return payload
    }

    return {
      ...payload,
      [field.name]: normalizeValue(field, value),
    }
  }, includeId ? { id: record.id } : {})
}

export async function listRecords(moduleConfig) {
  const { data } = await api.get(moduleConfig.endpoint)

  return Array.isArray(data)
    ? data.map(normalizeRecord)
    : []
}

export async function createRecord(
  moduleConfig,
  record
) {
  const payload = buildPayload(moduleConfig, record)

  const { data } = await api.post(
    moduleConfig.endpoint,
    payload
  )

  return normalizeRecord(data)
}

export async function updateRecord(
  moduleConfig,
  record
) {
  const payload = buildPayload(
    moduleConfig,
    record,
    true
  )

  const { data } = await api.patch(
    getRecordUrl(moduleConfig, record.id),
    payload
  )

  return normalizeRecord(data)
}

export async function deleteRecord(moduleConfig, id) {
  await api.delete(getRecordUrl(moduleConfig, id))
}
