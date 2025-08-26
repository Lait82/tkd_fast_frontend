import tkdfastProtectedApi from "@/apis/tkdfastProtectedApi";

export const createTeam = async (code: string, payload: object) => {
    try {
        const response = await tkdfastProtectedApi.post(
            `/tournament/${code}/teams`,
            payload
        );
        return response.data;
    } catch (error: any) {
        throw new Error(
            error.response?.data?.message || "Fallo al crear equipo."
        );
    }
};

export const addCompetitorToTeam = async (
    teamUuid: string,
    payload: object
) => {
    try {
        const response = await tkdfastProtectedApi.post(
            `/team/${teamUuid}/competitor`,
            payload
        );
        return response.data;
    } catch (error: any) {
        throw new Error(
            error.response?.data?.message ||
                "Fallo al agregar competidores al equipo."
        );
    }
};

export const kickCompetitor = async (
    teamUuid: string,
    competitorUuid: string
) => {
    try {
        const response = await tkdfastProtectedApi.delete(
            `/team/${teamUuid}/competitor/${competitorUuid}`
        );
        return response.data;
    } catch (error: any) {
        throw new Error(
            error.response?.data?.message ||
                "Fallo al expulsar competidor del equipo."
        );
    }
};

export const enrollTeam = async (teamUuid: string, payload: object) => {
    try {
        const response = await tkdfastProtectedApi.post(
            `/team/${teamUuid}/enroll`,
            payload
        );
        return response.data;
    } catch (error: any) {
        throw new Error(
            error.response?.data?.message ||
                "Fallo al inscribir equipo a la categoría."
        );
    }
};
