import axios from "axios";

const API_URL = "http://localhost:8000/api/v1";

const tkdfastUnprotectedApi = axios.create({
	baseURL: API_URL,
	headers: {
		"Content-Type": "application/json",
		Accept: "application/json",
	},
});

export default tkdfastUnprotectedApi;
