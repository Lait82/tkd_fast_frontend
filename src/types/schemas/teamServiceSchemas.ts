import { z } from "zod/v4";
import { competitorSchema, teamSchema } from "./primitiveSchemas";

export const addCompetitorsToTeamPayload = z.object({
	competitor_uuids: z.array(z.uuid().optional()),
});

export const addCompetitorsToTeamResponse = z.object({
	team: teamSchema,
	competitors: z.array(competitorSchema),
});

export const kickCompetitorResponseSchema = z.object({
	team: teamSchema,
	competitor: competitorSchema,
});
