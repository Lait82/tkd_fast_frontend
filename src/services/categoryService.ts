import tkdfastProtectedApi from "@/apis/tkdfastProtectedApi";


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