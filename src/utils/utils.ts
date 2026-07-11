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


/** Compara dos objetos por igualdad superficial de sus propias claves. */
export function shallowEqual<T extends object>(a: T, b: T): boolean {
    const aKeys = Object.keys(a) as (keyof T)[];
    if (aKeys.length !== Object.keys(b).length) return false;
    return aKeys.every((key) => a[key] === b[key]);
}

/**
 * Mergea una lista fresca contra la actual preservando referencias para evitar
 * re-renders innecesarios (el "stutter" de reemplazar todo el array de golpe):
 * - Items sin cambios mantienen su referencia previa (no re-renderizan).
 * - Items que cambiaron se reemplazan por la versión fresca.
 * - Nuevos se appendean al final, en orden de llegada.
 * - Eliminados (ya no vienen en `fresh`) se descartan.
 *
 * Asume que `fresh` es la lista completa. Por defecto identifica por `uuid`.
 */
export function mergeByKey<T extends object>(
    prev: T[],
    fresh: T[],
    getKey: (item: T) => PropertyKey = (item) =>
        (item as { uuid: PropertyKey }).uuid
): T[] {
    const freshByKey = new Map(fresh.map((item) => [getKey(item), item]));
    const merged: T[] = [];

    // Recorre los previos en orden: mantiene referencia si no cambió,
    // los descarta si ya no vienen.
    for (const item of prev) {
        const updated = freshByKey.get(getKey(item));
        if (!updated) continue;
        merged.push(shallowEqual(item, updated) ? item : updated);
        freshByKey.delete(getKey(item));
    }

    // Lo que queda en el map son los nuevos: se appendean en orden de llegada.
    for (const item of freshByKey.values()) {
        merged.push(item);
    }

    return merged;
}

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
    const categoryName =
    `${_discipline[category.discipline]} ${teamOrIndividual} | ${
        _gender[category.gender]
    } | ${getRankName(category.min_rank)} - ${getRankName(
        category.max_rank
    )}`;
    if (category.discipline !== Discipline.PATTERNS){
        categoryName.concat(` | ${category.min_weight} Kg - ${category.max_weight} Kg`)
    }
    return categoryName
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
