import { useNavigate } from "react-router-dom"
import { login } from "../../services/authService"

export default function LoginPage() {
  const navigate = useNavigate()

 function handleLogin(e) {
  e.preventDefault()

  login(
    "admin@admin.com",
    "123"
  )

  navigate("/dashboard")
}
  return (
    <div className="h-screen flex items-center justify-center bg-gray-200">
      <div className="bg-white p-10 rounded-xl shadow-md w-[400px]">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-700">
            POC - Dashboards Hospitalares
          </h1>

          <p className="text-gray-500 mt-2">
            Sistema de Indicadores
          </p>
        </div>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="E-mail"
            className="w-full border rounded-lg p-3 mb-4"
          />

          <input
            type="password"
            placeholder="Senha"
            className="w-full border rounded-lg p-3 mb-6"
          />

          <button
            className="w-full bg-emerald-500 hover:bg-emerald-600
            text-white py-3 rounded-lg transition"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  )
}   
