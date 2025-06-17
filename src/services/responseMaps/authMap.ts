// Login
interface LoginUserResponse {
	token_type: string;
	access_token: string;
	user: object;
}
export const LoginUserResponseMap: LoginUserResponse = {
	token_type: "",
	access_token: "",
	user: {},
};

// Signup
interface SignupUserResponse {
	token_type: string;
	access_token: string;
	user: object;
	invite_status: string | null;
}

export const SignupUserResponseMap: SignupUserResponse = {
	token_type: "",
	access_token: "",
	user: {},
	invite_status: "",
};
