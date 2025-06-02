import axios from "axios"

const API_URL = "http://localhost:8000/api/v1"

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "Authorization": localStorage.getItem("token")
  },
})

// // Add token to requests if available
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token")
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`
//     }
//     return config
//   },
//   (error) => Promise.reject(error),
// )

export const claimTournament = async (code: string) => {
  try {
    const response = await api.post("/tournaments/claim", { code })
    return response.data
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "'Fallo al crear el torneo.")
  }
}

export default api
