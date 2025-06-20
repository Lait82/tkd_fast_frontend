import { Role } from "../enums";
import { Tournament } from "../tournament";

export const tournamentMap: Tournament = {
	id: 1,
	uuid: "",
	code: "",
	name: null,
	date_of_event: null,
	location: null,
	arena: null,
	inscriptions_deadline: null,
	description: null,
	date_of_finish: null,
	created_at: "",
	updated_at: "",
	organizer_uuid: null,
	roles: [Role.NONE], // 👈 este es el rol del usuario respecto al torneo
};
