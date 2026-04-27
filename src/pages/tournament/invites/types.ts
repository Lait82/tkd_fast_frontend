
export enum InvitationStatus {
    PENDING = "PENDING",
    ACCEPTED = "ACCEPTED",
    EXPIRED = "EXPIRED",
}

export enum Kind {
    FILLED = "FILLED",
    VACANT = "VACANT"
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