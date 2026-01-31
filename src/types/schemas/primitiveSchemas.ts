import { optional, z } from "zod/v4";
import { Discipline, Gender, Rank, Role } from "../enums";
import dayjs, { Dayjs } from "dayjs";
import { getRankOrderNumber } from "@/utils/utils";

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
	invite_status: z.string().optional().nullable(),
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
	uuid: z.uuid().default(""),
	tournament_uuid: z.uuid().default(""),
	discipline: z.enum(Discipline).default(Discipline.COMBAT),
	is_team: z.boolean().default(false),
	min_weight: z.number().default(0),
	max_weight: z.number().default(0),
	gender: z.enum(Gender).default(Gender.MALE),
	min_rank: z.enum(Rank).default(Rank.WHITE),
	max_rank: z.enum(Rank).default(Rank.DAN_9),
	min_age: z.number().default(0),
	max_age: z.number().default(0),
	age_alias: z.string().nullable().default(null),
});
export type CategorySchema = z.infer<typeof categorySchema>;

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

export const competitorTeamSchema = z.object({
	uuid: z.uuid(),
	name: z.string(),
	created_by_uuid: z.uuid(),
});
export type CompetitorTeamSchema = z.infer<typeof competitorTeamSchema>;

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
	inscriptions: z
		.array(
			z.object({
				uuid: z.uuid(),
				category_uuid: z.uuid(),
				competitor_uuid: z.uuid(),
			})
		)
		.default([]),
	teams: z.array(competitorTeamSchema).default([]),
});
export type CompetitorSchema = z.infer<typeof competitorSchema>;

export const teamSchema = z.object({
	name: z.string().default(""),
	uuid: z.uuid().default(""),
	competitors: z.array(z.uuid()).default([]),
	inscriptions: z.array(z.uuid()).default([]),
});
export type TeamSchema = z.infer<typeof teamSchema>;


export const newCategorySchema = z.object({
	discipline: z.enum(Discipline),
	is_team: z.boolean(),
	min_rank: z.enum(Rank),
	max_rank: z.enum(Rank),
	min_weight: z.coerce.number("El peso mínimo debe ser un número válido."),
	max_weight: z.coerce.number("El peso máximo debe ser un número válido."),
	min_age: z.coerce.number("La edad minima debe ser un número válido.").int(),
	max_age: z.coerce.number("La edad maxima debe ser un número válido.").int(),
	gender: z.enum(Gender),
})
// Cross-field validations for ranks
.refine(data => getRankOrderNumber(data.min_rank) <= getRankOrderNumber(data.max_rank)
, { message: "El rango máximo debe ser mayor al mínimo.", path: ["max_rank"]})
// Weights
.refine(data => data.min_weight <= data.max_weight
, { message: "El peso máximo debe ser mayor al peso mínimo.", path: ["max_weight"]})
// Ages
.refine(data => data.min_age <= data.max_age 
, { message: "La edad máxima debe ser mayor a la edad mínima.", path: ["max_age"]});
export type NewCategorySchema = z.infer<typeof newCategorySchema>;