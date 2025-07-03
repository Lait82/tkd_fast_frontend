import { Role } from "./enums";

export interface Tournament {
	id: number;
	uuid: string;
	code: string;
	name: string | null;
	date_of_event: string | null;
	location: string | null;
	arena: string | null;
	inscriptions_deadline: string | null;
	description: string | null;
	date_of_finish: string | null;
	created_at?: string;
	updated_at: string;
	organizer_uuid: string | null;
	role: Role[]; // 👈 este es el rol del usuario respecto al torneo
}

export interface EditTournamentData {
	name?: string;
	date_of_event?: string;
	date_of_finish?: string;
	location?: string;
	inscriptions_deadline?: string;
	arena?: string;
	description?: string;
}
