import tkdfastProtectedApi from "@/apis/tkdfastProtectedApi";
import { Role } from "@/types/enums";

export const getInvitees = async (code: string, role?: Role) => {
	try {
        let requestConfig = {}
        if (role){
           requestConfig = {
                params: {role}
            } 
        }

		const response = await tkdfastProtectedApi.get(`/tournament/${code}/invitees`, requestConfig);
		return response.data;
	} catch (error: any) {
		throw new Error(
			error.response?.data?.message ||
				"Error al obtener invitados."
		);
	}
};

export const createInstructorSlot = async (code: string) => {
	try {
		const response = await tkdfastProtectedApi.post(`/tournament/${code}/instructor-slot`);
		return response.data;
	} catch (error: any) {
		throw new Error(
			error.response?.data?.message ||
				"Error al crear slot para instructor."
		);
	}
};

export const deleteInvitee = async (invitationUuid: string) => {
	try {
		const response = await tkdfastProtectedApi.delete(`/invitee/${invitationUuid}`);
		return response.data;
	} catch (error: any) {
		throw new Error(
			error.response?.data?.message ||
				"Error al eliminar invitado."
		);
	}
};
