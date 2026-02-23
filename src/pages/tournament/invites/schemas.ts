import { Role } from "@/types/enums";
import { z } from "zod/v4";
import { InvitationStatus } from "./types";

export const inviteeSchema = z.object({
    uuid: z.string(),
    firstname: z.string().nullable(),
    lastname: z.string().nullable(),
    email: z.email().nullable(),
    role: z.enum(Role),
    status: z.enum(InvitationStatus).nullable(),
    instructorsInvited: z.int(),
    enrolledCompetitors: z.int(),
});
export type InviteeSchemaT = z.infer<typeof inviteeSchema>;
