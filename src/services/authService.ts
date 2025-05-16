import axios from "axios"

const API_URL = "http://localhost:8000/api/v1"

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await api.post("/auth/login", { email, password })
    return response.data
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Login failed")
  }
}

export const signupUser = async (userData: any) => {
  try {
    const response = await api.post("/auth/signup", userData)
    return response.data
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Signup failed")
  }
}

export const forgotPassword = async (email: string) => {
  try {
    const response = await api.post("/auth/forgot-password", { email })
    return response.data
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Request failed")
  }
}

export default api
