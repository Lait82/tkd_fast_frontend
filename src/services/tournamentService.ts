import tkdfastProtectedApi from "@/apis/tkdfastProtectedApi";

export const claimTournament = async (code: string) => {
    try {
        const response = await tkdfastProtectedApi.post("/tournaments/claim", {
            code,
        });
        return response.data;
    } catch (error: any) {
        throw new Error(
            error.response?.data?.message || "'Fallo al crear el torneo."
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
                "'Fallo al obtener información del torneo."
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
            error.response?.data?.message || "'Fallo al obtener mis torneos."
        );
    }
};

export const enrollCompetitor = async (code: string, data: object) => {
    try {
        const payload = {
            unknown_competitors: [{ ...data }],
        };
        const response = await tkdfastProtectedApi.post(
            `/tournament/${code}/competitors/enroll`,
            payload
        );
        return response.data;
    } catch (error: any) {
        throw new Error(
            error.response?.data?.message || "'Fallo al crear competidor."
        );
    }
};
