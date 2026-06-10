import { useEffect, useState } from "react"
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom"

import MainLayout from "../layouts/MainLayout"

import DashboardPage from "../pages/Dashboard/DashboardPage"
import HospitalStructurePage from "../pages/HospitalStructure/HospitalStructurePage"
import LoginPage from "../pages/Login/LoginPage"
import SimpleCrudPage from "../pages/SimpleCrud/SimpleCrudPage"
import { getDashboardBlocks } from "../services/dashboardService"
import ProtectedRoute from "./ProtectedRoute"

function ProtectedLayout({
  children,
}) {
  return (
    <ProtectedRoute>
      <MainLayout>
        {children}
      </MainLayout>
    </ProtectedRoute>
  )
}

function DashboardRedirect() {
  const [firstBlockId, setFirstBlockId] =
    useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadFirstDashboardBlock() {
      const blocks = await getDashboardBlocks()

      setFirstBlockId(blocks[0]?.id ?? null)
      setLoading(false)
    }

    loadFirstDashboardBlock()
  }, [])

  if (loading) {
    return <p className="text-gray-500">Carregando dashboard...</p>
  }

  if (!firstBlockId) {
    return <p className="text-gray-500">Nenhum dashboard disponivel.</p>
  }

  return (
    <Navigate
      to={`/dashboard/${firstBlockId}`}
      replace
    />
  )
}

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={<LoginPage />}
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedLayout>
              <DashboardRedirect />
            </ProtectedLayout>
          }
        />

        <Route
          path="/dashboard/:blockId"
          element={
            <ProtectedLayout>
              <DashboardPage />
            </ProtectedLayout>
          }
        />

        <Route
          path="/hospital-structure"
          element={
            <ProtectedLayout>
              <HospitalStructurePage />
            </ProtectedLayout>
          }
        />

        <Route
          path="/cadastros/:moduleId"
          element={
            <ProtectedLayout>
              <SimpleCrudPage />
            </ProtectedLayout>
          }
        />

        <Route
          path="*"
          element={<Navigate to="/login" />}
        />
      </Routes>
    </BrowserRouter>
  )
}
