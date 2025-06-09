import { EditTournamentData } from "@/types/tournament"
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

export const editTournament = async (code: string, data: EditTournamentData) => {
  try {
    console.log(localStorage.getItem("token"));
    const response = await api.put(`/organizer/tournament/${code}`, { data })
    return response.data
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "'Fallo al crear el torneo.")
  }
}

export default api
