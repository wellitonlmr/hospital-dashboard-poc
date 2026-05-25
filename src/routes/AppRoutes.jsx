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
import { dashboardBlocks } from "../mocks/dashboardData"
import ProtectedRoute from "./ProtectedRoute"

const firstDashboardBlock = dashboardBlocks[0].id

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
            <Navigate
              to={`/dashboard/${firstDashboardBlock}`}
              replace
            />
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
          path="*"
          element={<Navigate to="/login" />}
        />
      </Routes>
    </BrowserRouter>
  )
}
