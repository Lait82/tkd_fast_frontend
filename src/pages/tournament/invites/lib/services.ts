import tkdfastProtectedApi from "@/apis/tkdfastProtectedApi";

export const inviteMaster = async (code: string, payload: object) => {
    try {
        const response = await tkdfastProtectedApi.post(
            `/organizer/tournament/${code}/invite-master`,
            payload
        );
        return response.data;
    } catch (error: any) {
        // console.log("LLEGA AL ERROR DEL CATCH DEL SERVICE")
        throw new Error(
            error.response?.data?.message || "Fallo al invitar el maestro."
        );
    }
};