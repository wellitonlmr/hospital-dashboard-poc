const STORAGE_KEY = "auth_user"

export function login(email, password) {
  if (email && password) {
    const user = {
      email,
      name: "Administrador",
    }

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(user)
    )

    return user
  }

  return null
}

export function logout() {
  localStorage.removeItem(STORAGE_KEY)
}

export function getUser() {
  const data = localStorage.getItem(STORAGE_KEY)

  if (!data) return null

  return JSON.parse(data)
}

export function isAuthenticated() {
  return !!getUser()
}