import { Role } from "@/types/enums";
import { z } from "zod/v4";
import { InvitationStatus, Kind } from "./types";


export const vacantInstructorSchema = z.object({
  kind: z.literal(Kind.VACANT),
  uuid: z.string(),
  role: z.literal(Role.INSTRUCTOR),
});

export const masterSchema = z.object({
  kind: z.literal(Kind.FILLED),
  role: z.literal(Role.MASTER),
  uuid: z.string(),
  firstname: z.string(),
  lastname: z.string(),
  email: z.string().email(),
  status: z.enum(InvitationStatus),
  instructorsInvited: z.number(),
  enrolledCompetitors: z.number(),
});
const filledInstructorSchema = z.object({
    kind: z.literal(Kind.FILLED),
    role: z.literal(Role.INSTRUCTOR),
    uuid: z.string(),
    firstname: z.string(),
    lastname: z.string(),
    email: z.string().email(),
    enrolledCompetitors: z.number(),
  });
const instructorSchema = z.discriminatedUnion("kind", [
  vacantInstructorSchema,
  filledInstructorSchema
]);

export const inviteeSchema = z.discriminatedUnion("role", [
  masterSchema,
  instructorSchema,
]);

export type VacantInstructorT = z.infer<typeof vacantInstructorSchema>;
export type InvitedMasterT = z.infer<typeof masterSchema>;
export type InstructorSchemaT = z.infer<typeof instructorSchema>;
export type FilledInstructorSchemaT = z.infer<typeof filledInstructorSchema>;
export type InviteeSchemaT = z.infer<typeof inviteeSchema>;
