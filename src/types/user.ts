export interface SignupData {
	firstname: string;
	lastname: string;
	email: string;
	phone: string;
	rank: string;
	school: string;
	id_number: string;
	password: string;
	password_confirmation: string;
	asociation: string;
	federation: string;
	dob: string;
	invite_token?: string;
}

export interface LoginData {
	email: string;
	password: string;
}
