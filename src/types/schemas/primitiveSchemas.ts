import { z } from "zod/v4";
import { Discipline, Gender, Rank, Role } from "../enums";

export const userSchema = z.object({
	//TODO: reemplazar el tipo de los esquemas opr los nativos que hice yo
	firstname: z.string().default(""),
	lastname: z.string().default(""),
	email: z.string().default(""),
	id_number: z.string().nullable().default(null),
	phone: z.string().nullable().default(""),
	rank: z.enum(Rank).default(Rank.WHITE),
	school: z.string().nullable().default(""),
	federation: z.string().nullable().default(""),
	dob: z.string().default(""),
	uuid: z.string().default(""),
	created_at: z.string().optional().default(""),
	updated_at: z.string().optional().default(""),
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
	id: z.number().default(1),
	uuid: z.string().default(""),
	code: z.string().default(""),
	name: z.string().nullable().default(null),
	date_of_event: z.string().nullable().default(null),
	location: z.string().nullable().default(null),
	arena: z.string().nullable().default(null),
	inscriptions_deadline: z.string().nullable().default(null),
	description: z.string().nullable().default(null),
	date_of_finish: z.string().nullable().default(null),
	created_at: z.string().optional().default(""),
	updated_at: z.string().optional().default(""),
	organizer_uuid: z.string().nullable().default(null),
	role: z.array(z.enum(Role)).default([Role.NONE]),
});
export type TournamentSchema = z.infer<typeof tournamentSchema>;

export const competitorWithUserSchema = z.object({
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
export type CompetitorWithUserSchema = z.infer<typeof competitorWithUserSchema>;

export const categorySchema = z.object({
	id: z.number(),
	uuid: z.uuid(),
	tournament_uuid: z.uuid(),
	discipline: z.enum(Discipline),
	is_team: z.boolean(),
	min_weight: z.number(),
	max_weight: z.number(),
	gender: z.enum(Gender),
	created_at: z.string().optional(),
	updated_at: z.string().optional(),
	min_rank: z.enum(Rank),
	max_rank: z.enum(Rank),
	min_age: z.number(),
	max_age: z.number(),
});
export type categorySchema = z.infer<typeof categorySchema>;

export const categoryWithCompetitorsSchema = z.object({
	category: categorySchema,
	competitors: z.array(competitorWithUserSchema),
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

export const competitorSchema = z.object({
	id: z.number().default(0),
	uuid: z.string().default(""),
	user_uuid: z.string().default(""),
	tournament_uuid: z.string().default(""),
	registered_by_uuid: z.string().default(""),
	access_code: z.string().default(""),
	created_at: z.string().optional().default(""),
	updated_at: z.string().optional().default(""),
	user: userSchema.default(userSchema.parse({})),
});
export type CompetitorSchema = z.infer<typeof competitorSchema>;
