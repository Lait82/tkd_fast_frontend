// store/authStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { loginUser, signupUser } from "@/services/authService";
// import { User } from "@/types/user";
import {
	loginUserResponseSchema,
	signupUserResponseSchema,
	UserSchema,
	userSchema,
} from "@/types/schemas/primitiveSchemas";
// import type { User } from "@/types/user";

type AuthState = {
	user: UserSchema | null;
	token: string | null;
	isAuthenticated: boolean;
	loading: boolean;
	error: string | null;
	login: (
		email: string,
		password: string,
		navigate: (path: string) => void
	) => Promise<void>;
	signup: (userData: any, navigate: (path: string) => void) => Promise<void>;
	setSession: (token: string, user: UserSchema) => void;
	// logout: (navigate: (path: string) => void) => void;
	logout: () => void;
};

export const useAuthStore = create<AuthState>()(
	persist(
		(set, _) => ({
			user: null,
			token: null,
			isAuthenticated: false,
			loading: false,
			error: null,

			login: async (email, password, navigate) => {
				set({ loading: true, error: null });
				try {
					const rawRes = await loginUser(email, password);
					const loginResponse = loginUserResponseSchema.parse(rawRes);
					const user = userSchema.parse(loginResponse.user);
					set({
						user: user || null,
						token: loginResponse.access_token,
						isAuthenticated: true,
					});
					navigate("/dashboard");
				} catch (err: any) {
					set({ error: err.message || "Failed to login" });
				} finally {
					set({ loading: false });
				}
			},

			signup: async (userData, navigate) => {
				set({ loading: true, error: null });
				try {
					const rawRes = await signupUser(userData);
					const signupResponse =
						signupUserResponseSchema.parse(rawRes);
					const user = userSchema.parse(signupResponse.user);
					set({
						user: user,
						token: signupResponse.access_token,
						isAuthenticated: true,
					});
					navigate("/dashboard");
				} catch (err: any) {
					set({ error: err.message || "Failed to signup" });
				} finally {
					set({ loading: false });
				}
			},

			setSession: (token, user) => {
				set({
					user,
					token,
					isAuthenticated: true,
					error: null,
				});
			},

			logout: () => {
				set({ user: null, token: null, isAuthenticated: false });
				// window.location.href = "/login";
			},
		}),
		{
			name: "auth-storage", // clave en localStorage
			partialize: (state) => ({
				token: state.token,
				user: state.user,
				isAuthenticated: state.isAuthenticated,
			}), // podés persistir solo lo necesario
		}
	)
);
