import tkdfastProtectedApi from "@/apis/tkdfastProtectedApi";
import { EditTournamentData } from "@/types/tournament";

export const editTournament = async (
	code: string,
	data: EditTournamentData
) => {
	try {
		const response = await tkdfastProtectedApi.put(
			`/organizer/tournament/${code}`,
			{
				...data,
			}
		);
		return response.data;
	} catch (error: any) {
		throw new Error(
			error.response?.data?.message || "Fallo al crear el torneo."
		);
	}
};
