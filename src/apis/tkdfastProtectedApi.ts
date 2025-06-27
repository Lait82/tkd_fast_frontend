import axios from "axios";
import { useAuthStore } from "@/states/useAuthStore";

const API_URL = "http://localhost:8000/api/v1";

const tkdfastProtectedApi = axios.create({
	baseURL: API_URL,
	headers: {
		"Content-Type": "application/json",
		Accept: "application/json",
	},
});

tkdfastProtectedApi.interceptors.request.use(
	(config) => {
		const token = useAuthStore.getState().token;
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => Promise.reject(error)
);

tkdfastProtectedApi.interceptors.response.use(
	(response) => response,
	(error) => {
		if (
			error.response?.status === 401 &&
			error.response?.data?.message === "Unauthenticated."
		) {
			useAuthStore.getState().logout();
		}
		return Promise.reject(error);
	}
);

export default tkdfastProtectedApi;
