import { z } from "zod/v4";
import { Discipline, Gender, Rank, Role } from "./enums";

export const userSchema = z.object({
	firstname: z.string(),
	lastname: z.string(),
	email: z.string(),
	id_number: z.string(),
	phone: z.string(),
	rank: z.string(),
	school: z.string(),
	federation: z.string(),
	dob: z.string(),
	uuid: z.string(),
	created_at: z.string(),
	updated_at: z.string(),
});
export type UserSchema = z.infer<typeof userSchema>;

export const loginUserResponseSchema = z.object({
	token_type: z.string(),
	access_token: z.string(),
	user: userSchema,
});
export type LoginUserResponse = z.infer<typeof loginUserResponseSchema>;

export const signupUserResponseSchema = z.object({
	token_type: z.string(),
	access_token: z.string(),
	user: userSchema,
	invite_status: z.string().nullable(),
});
export type SignupUserResponse = z.infer<typeof signupUserResponseSchema>;

export const tournamentSchema = z.object({
	id: z.number(),
	uuid: z.string(),
	code: z.string(),
	name: z.string().nullable(),
	date_of_event: z.string().nullable(),
	location: z.string().nullable(),
	arena: z.string().nullable(),
	inscriptions_deadline: z.string().nullable(),
	description: z.string().nullable(),
	date_of_finish: z.string().nullable(),
	created_at: z.string(),
	updated_at: z.string(),
	organizer_uuid: z.string().nullable(),
	role: z.array(z.enum(Role)),
});
export type TournamentSchema = z.infer<typeof tournamentSchema>;

export const competitorSchema = z.object({
	firstname: z.string(),
	email: z.email(),
	lastname: z.string(),
	rank: z.enum(Rank),
	school: z.string().nullable(),
	association: z.string().nullable(),
	federation: z.string().nullable(),
	dob: z.string(),
	uuid: z.uuid(),
});
export type CompetitorSchema = z.infer<typeof competitorSchema>;

export const categorySchema = z.object({
	id: z.number(),
	uuid: z.uuid(),
	tournament_uuid: z.uuid(),
	discipline: z.enum(Discipline),
	is_team: z.boolean(),
	min_weight: z.number(),
	max_weight: z.number(),
	gender: z.enum(Gender),
	created_at: z.string(),
	updated_at: z.string(),
	min_rank: z.enum(Rank),
	max_rank: z.enum(Rank),
	min_age: z.number(),
	max_age: z.number(),
});
export type categorySchema = z.infer<typeof categorySchema>;

export const categoryWithCompetitorsSchema = z.object({
	category: categorySchema,
	competitors: z.array(competitorSchema),
});
export type CategoryWithCompetitorsSchema = z.infer<
	typeof categoryWithCompetitorsSchema
>;

export const competitorsByCategoryResponseSchema = z.array(
	categoryWithCompetitorsSchema
);
export type CompetitorsByCategoryResponseSchema = z.infer<
	typeof competitorsByCategoryResponseSchema
>;
