import tkdfastProtectedApi from "@/apis/tkdfastProtectedApi";

export const removeEnrollmentToCategory = async (inscriptionUuid: string) => {
	try {
		const response = await tkdfastProtectedApi.delete(
			`/tournament/enrollment/${inscriptionUuid}`
		);
		return response.data;
	} catch (error: any) {
		throw new Error(
			error.response?.data?.message ||
				"Fallo al borrar inscripción del competidor."
		);
	}
};
