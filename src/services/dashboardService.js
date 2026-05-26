import dashboardResponse from "../mocks/json/dashboard.json"

function cloneResponse(data) {
  return structuredClone(data)
}

export async function getDashboardKpis() {
  return cloneResponse(dashboardResponse.kpis)
}

export async function getDashboardBlocks() {
  return cloneResponse(dashboardResponse.blocks)
}

export async function getDashboardBlockById(id) {
  const blocks = await getDashboardBlocks()

  return blocks.find((block) => block.id === id) ?? null
}
