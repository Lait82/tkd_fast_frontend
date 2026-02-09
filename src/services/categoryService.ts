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

export const getAllCategories = async (code: string) =>  {
	try {
		const response = await tkdfastProtectedApi.get(
			`/tournament/${code}/categories`
		);
		return response.data;
	} catch (error: any) {
		throw new Error(
			error.response?.data?.message ||
				"Fallo al obtener categorías."
		);
	}
}

export const createCategory = async (code: string, payload: any) => {
	try {
		const response = await tkdfastProtectedApi.post(
			`/organizer/tournament/${code}/categories`,
			payload
		);
		return response.data;
	}
	catch (error: any) {
		throw new Error(
			error.response?.data?.message ||
				"Fallo al crear la categoría."
		);
	}
}

export const updateCategory = async (code: string, categoryUuid: string, payload: any) => {
	try {
		const response = await tkdfastProtectedApi.put(
			`/organizer/tournament/${code}/categories/${categoryUuid}`,
			payload
		);
		return response.data;
	}
	catch (error: any) {
		throw new Error(
			error.response?.data?.message ||
				"Fallo al actualizar la categoría."
		);
	}
}

export const deleteCategory = async (code: string, categoryUuid: string) => {
	try {
		const response = await tkdfastProtectedApi.delete(
			`/organizer/tournament/${code}/categories/${categoryUuid}`);
		return response.data;
	}
	catch (error: any) {
		throw new Error(
			error.response?.data?.message ||
				"Fallo al eliminar la categoría."
		);
	}
}