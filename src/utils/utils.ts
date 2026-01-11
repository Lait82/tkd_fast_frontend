import { Discipline, Gender, Rank, Role, RoleHierarchy } from "@/types/enums";
import { CategorySchema } from "@/types/schemas/primitiveSchemas";


const _discipline = {
    [Discipline.COMBAT]: "Lucha",
    [Discipline.PATTERNS]: "Formas",
};
const _gender = {
    [Gender.FEMALE]: "Femenino",
    [Gender.MALE]: "Masculino",
};


export function getHighestRole(roles: Role[]): Role {
    return roles.reduce(
        (carry, role) =>
            RoleHierarchy[role] < RoleHierarchy[carry] ? role : carry,
        Role.NONE
    );
}

export function getRankOrderNumber(rank: Rank) {
    const ranks = Object.values(Rank);
    return ranks.findIndex((val) => val === rank) + 1;
}

export function getRankName(rank: Rank) {
    const ranks = {
        [Rank.WHITE]: "Blanco",
        [Rank.WHITE_YELLOW]: "Blanco Pta. Amarilla",
        [Rank.YELLOW]: "Amarillo",
        [Rank.YELLOW_GREEN]: "Amarillo Pta. Verde",
        [Rank.GREEN]: "Verde",
        [Rank.GREEN_BLUE]: "Verde Pta. Azul",
        [Rank.BLUE]: "Azul",
        [Rank.BLUE_RED]: "Azul Pta. Roja",
        [Rank.RED]: "Rojo",
        [Rank.RED_BLACK]: "Rojo Pta. Negra",
        [Rank.DAN_1]: "1er Dan",
        [Rank.DAN_2]: "2do Dan",
        [Rank.DAN_3]: "3er Dan",
        [Rank.DAN_4]: "4to Dan",
        [Rank.DAN_5]: "5to Dan",
        [Rank.DAN_6]: "6to Dan",
        [Rank.DAN_7]: "7mo Dan",
        [Rank.DAN_8]: "8vo Dan",
        [Rank.DAN_9]: "9no Dan",
    };
    return ranks[rank];
}

export function buildCategoryName(category: CategorySchema) {
    const teamOrIndividual = category.is_team ? "Equipos" : "Individual";
    return `${_discipline[category.discipline]} ${teamOrIndividual} | ${
        _gender[category.gender]
    } | ${getRankName(category.min_rank)} - ${getRankName(
        category.max_rank
    )} | ${category.min_weight} Kg - ${category.max_weight} Kg`;
}

export function getGenderLabel(gender: Gender){
    return _gender[gender];
}

export function getDisciplineLabel(discipline: Discipline){
    return _discipline[discipline];
}

export function getIsTeamLabel(is_team: boolean){
    return is_team ? "Equipos" : "Individual";
}
