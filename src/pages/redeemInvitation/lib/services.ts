import tkdfastUnprotectedApi from "@/apis/tkdfastUnprotectedApi";
import tkdfastProtectedApi from "@/apis/tkdfastProtectedApi";

/** Trae la info de la invitación para renderizar la vista correcta. */
export const previewInvitation = async (token: string) => {
	try {
		const response = await tkdfastUnprotectedApi.get("/invitation", {
			params: { token },
		});
		return response.data;
	} catch (error: any) {
		throw new Error(
			error.response?.data?.message ||
				"No se pudo cargar la invitación."
		);
	}
};

/** Canjea la invitación como magic link (usuario con cuenta). */
export const redeemInvitation = async (token: string) => {
	try {
		const response = await tkdfastUnprotectedApi.post("/invitation/redeem", {
			token,
		});
		return response.data;
	} catch (error: any) {
		throw new Error(
			error.response?.data?.message ||
				"No se pudo procesar la invitación."
		);
	}
};

/** Reapunta la autorización al usuario actualmente logueado. */
export const migrateInvitation = async (token: string) => {
	try {
		const response = await tkdfastProtectedApi.post("/invitation/migrate", {
			token,
		});
		return response.data;
	} catch (error: any) {
		throw new Error(
			error.response?.data?.message ||
				"No se pudo migrar la invitación."
		);
	}
};
