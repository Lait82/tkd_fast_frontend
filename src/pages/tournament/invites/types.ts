import { Role } from "@/types/enums";

export enum InvitationStatus {
    PENDING = "PENDING",
    ACCEPTED = "ACCEPTED",
    EXPIRED = "EXPIRED",
}

// export type InviteeT = {
// 	uuid: string;
//     firstname: string;
//     lastname: string;
// 	email: string;
//     role: Role;
// 	status: InvitationStatus;
// 	instructorsInvited: number;
// 	enrolledCompetitors: number;
// }