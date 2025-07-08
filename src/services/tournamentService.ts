import tkdfastProtectedApi from "@/apis/tkdfastProtectedApi";

export const claimTournament = async (code: string) => {
	try {
		const response = await tkdfastProtectedApi.post("/tournaments/claim", {
			code,
		});
		return response.data;
	} catch (error: any) {
		throw new Error(
			error.response?.data?.message || "Fallo al crear el torneo."
		);
	}
};

export const getTournamentInfo = async (code: string) => {
	try {
		const response = await tkdfastProtectedApi.get(`/tournaments/${code}`);
		return response.data;
	} catch (error: any) {
		throw new Error(
			error.response?.data?.message ||
				"Fallo al obtener información del torneo."
		);
	}
};

export const getCompetitorsByCategory = async (code: string) => {
	try {
		const response = await tkdfastProtectedApi.get(
			`/tournament/${code}/categories/competitors`
		);
		return response.data;
	} catch (error: any) {
		throw new Error(
			error.response?.data?.message || "Fallo al obtener mis torneos."
		);
	}
};

export const createCompetitor = async (code: string, data: object) => {
	try {
		const response = await tkdfastProtectedApi.post(
			`/tournament/${code}/competitors/create`,
			{ ...data }
		);
		return response.data;
	} catch (error: any) {
		throw new Error(
			error.response?.data?.message || "Fallo al crear competidor."
		);
	}
};

export const enrollCompetitor = async (code: string, data: object) => {
	// TODO: Organizar los schemas de zod y crear schemas de payloads.
	try {
		const response = await tkdfastProtectedApi.post(
			`/tournament/${code}/competitors/enroll`,
			{ ...data }
		);
		return response.data;
	} catch (error: any) {
		throw new Error(
			error.response?.data?.message || "Fallo al inscribir competidor."
		);
	}
};

export const getAvailableCategories = async (code: string) => {
	try {
		const response = await tkdfastProtectedApi.get(
			`/tournament/${code}/available-categories`
		);
		return response.data;
	} catch (error: any) {
		throw new Error(
			error.response?.data?.message ||
				"Fallo al obtener categorías disponibles."
		);
	}
};
