import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom"

import MainLayout from "../layouts/MainLayout"

import LoginPage from "../pages/Login/LoginPage"
import DashboardPage from "../pages/Dashboard/DashboardPage"
import HospitalStructurePage from "../pages/HospitalStructure/HospitalStructurePage"
import ProtectedRoute from "./ProtectedRoute"

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
    <ProtectedRoute>
      <MainLayout>
        <DashboardPage />
      </MainLayout>
    </ProtectedRoute>
  }
/>

       <Route
  path="/hospital-structure"
  element={
    <ProtectedRoute>
      <MainLayout>
        <HospitalStructurePage />
      </MainLayout>
    </ProtectedRoute>
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