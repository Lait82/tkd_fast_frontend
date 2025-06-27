import tkdfastProtectedApi from "@/apis/tkdfastProtectedApi";

// const API_URL = "http://localhost:8000/api/v1";
// const token = useAuthStore.getState().token;

// const api = axios.create({
// 	baseURL: API_URL,
// 	headers: {
// 		"Content-Type": "application/json",
// 		Accept: "application/json",
// 		Authorization: `Bearer ${token}`,
// 	},
// });

export const getUserTournaments = async () => {
	try {
		const response = await tkdfastProtectedApi.get(`/user/tournaments`);
		return response.data;
	} catch (error: any) {
		throw new Error(
			error.response?.data?.message ||
				"'Fallo al obtener torneos del usuario."
		);
	}
};

export const getUserTournamentCompetitors = async (code: string) => {
	try {
		const response = await tkdfastProtectedApi.get(
			`/user/tournament/${code}/competitors`
		);
		return response.data;
	} catch (error: any) {
		throw new Error(
			error.response?.data?.message ||
				"'Fallo al obtener competidores del usuario."
		);
	}
};
