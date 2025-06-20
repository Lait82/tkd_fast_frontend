// store/authStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { mapTo } from "@/utils/utils";
import { Role } from "@/types/enums";
import { Tournament } from "@/types/tournament";
import { getTournamentInfo } from "@/services/tournamentService";
import { tournamentMap } from "@/types/modelMaps/tournamentMap";
// import type { User } from "@/types/user";

// let initializedCodes = new Set<string>();

type TournamentState = {
	tournament: Tournament;
	role: Role[];
	loading: boolean;
	error: string | null;
	getTournamentInfo: (code: string) => Promise<void>;
};

export const useTournamentStore = create<TournamentState>()(
	persist(
		(set, _) => ({
			tournament: tournamentMap,
			role: [Role.NONE],
			loading: false,
			error: null,

			getTournamentInfo: async (code: string) => {
				set({ loading: true, error: null });

				try {
					const rawRes = await getTournamentInfo(code);
					const tournament = mapTo(tournamentMap, rawRes);
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
