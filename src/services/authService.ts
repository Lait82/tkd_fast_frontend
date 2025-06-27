import tkdfastUnprotectedApi from "@/apis/tkdfastUnprotectedApi";

export const loginUser = async (email: string, password: string) => {
	try {
		const response = await tkdfastUnprotectedApi.post("/auth/login", {
			email,
			password,
		});
		return response.data;
	} catch (error: any) {
		throw new Error(error.response?.data?.message || "Login failed");
	}
};

export const signupUser = async (userData: any) => {
	try {
		const response = await tkdfastUnprotectedApi.post(
			"/auth/signup",
			userData
		);
		return response.data;
	} catch (error: any) {
		throw new Error(error.response?.data?.message || "Signup failed");
	}
};

export const forgotPassword = async (email: string) => {
	try {
		const response = await tkdfastUnprotectedApi.post(
			"/auth/forgot-password",
			{
				email,
			}
		);
		return response.data;
	} catch (error: any) {
		throw new Error(error.response?.data?.message || "Request failed");
	}
};
