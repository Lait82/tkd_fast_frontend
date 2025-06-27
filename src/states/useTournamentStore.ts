// store/authStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Role, TournamentActions } from "@/types/enums";
import { Tournament } from "@/types/tournament";
import { getTournamentInfo } from "@/services/tournamentService";
import { tournamentMap } from "@/types/modelMaps/tournamentMap";
import { tournamentSchema } from "@/types/schemas";
import { error } from "console";
// import type { User } from "@/types/user";

// let initializedCodes = new Set<string>();

type TournamentState = {
	tournament: Tournament;
	role: Role[];
	loading: boolean;
	error: string | null;
	getTournamentInfo: (code: string) => Promise<void>;
	can: (action: TournamentActions) => boolean;
};

export const useTournamentStore = create<TournamentState>()(
	persist(
		(set, get) => ({
			tournament: tournamentMap,
			role: [Role.NONE],
			loading: false,
			error: null,

			getTournamentInfo: async (code: string) => {
				set({ loading: true, error: null });

				try {
					const rawRes = await getTournamentInfo(code);
					const tournament = tournamentSchema.parse(rawRes);
					set({
						tournament: tournament,
						role: tournament.role || [Role.NONE],
					});
				} catch (err: any) {
					set({
						error:
							err.message ||
							"Error al obtener informacion del torneo.",
					});
				} finally {
					set({ loading: false });
				}
			},

			can: (action: TournamentActions) => {
				const { role } = get();
				if (role.includes(Role.ORGANIZER)) return true;

				const permissions = {
					// Competitors
					[TournamentActions.MANAGE_COMPETITORS]: [
						Role.INSTRUCTOR,
						Role.MASTER,
						Role.ORGANIZER,
					],

					// Tournament
					[TournamentActions.MANAGE_CATEGORIES]: [Role.ORGANIZER], // Added for scalability and legibility as all of the only organizer's permits.
					[TournamentActions.MANAGE_TOURNAMENT]: [Role.ORGANIZER],

					// Invites
					[TournamentActions.INVITE_INSTRUCTOR]: [
						Role.MASTER,
						Role.ORGANIZER,
					],
					[TournamentActions.INVITE_MASTER]: [Role.ORGANIZER],
				};

				// If one of the specified list of roles appear in the user's tournament roles returns true.
				return permissions[action].some((allowedRole) =>
					role.includes(allowedRole)
				);
			},
		}),
		{
			name: "tournament-storage", // clave en localStorage
			partialize: (state) => ({
				tournament: state.tournament,
				role: state.role,
			}),
		}
	)
);
