// 'use strict'

// const tournamentPolicy = {
//   edit: (role: Role) => role === 'organizer',
//   invite: (role: Role) => role === 'organizer' || role === 'referee',
//   view: (role: Role) => true,
//   register: (role: Role) => role === 'viewer',
// };
// export function useTournamentPermissions(userId: string, tournament: Tournament) {
//   const role = tournament.userRoles[userId]; // o donde sea que esté mapeado

//   const can = (action: keyof typeof tournamentPolicy) => {
//     const rule = tournamentPolicy[action];
//     return rule ? rule(role) : false;
//   };

//   return { role, can };
// }
