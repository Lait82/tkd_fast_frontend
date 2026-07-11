import { z } from "zod/v4";
import { Role } from "@/types/enums";
import { userSchema } from "@/types/schemas/primitiveSchemas";

/** Respuesta de GET /invitation (preview). */
export const invitationPreviewSchema = z.object({
	role: z.enum(Role).default(Role.MASTER),
	has_account: z.boolean().default(false),
	invitee: z.object({
		email: z.string().default(""),
		firstname: z.string().nullable().default(null),
		lastname: z.string().nullable().default(null),
	}),
	inviter: z.object({
		firstname: z.string().nullable().default(null),
		lastname: z.string().nullable().default(null),
	}),
	tournament: z.object({
		name: z.string().nullable().default(null),
		code: z.string().nullable().default(null),
		date_of_event: z.string().nullable().default(null),
		date_of_finish: z.string().nullable().default(null),
		inscriptions_deadline: z.string().nullable().default(null),
	}),
});
export type InvitationPreview = z.infer<typeof invitationPreviewSchema>;

/** Respuesta de POST /invitation/redeem (magic link). */
export const redeemResponseSchema = z.object({
	token_type: z.string(),
	access_token: z.string(),
	user: userSchema,
	tournament_code: z.string().nullable().default(null),
});
export type RedeemResponse = z.infer<typeof redeemResponseSchema>;
