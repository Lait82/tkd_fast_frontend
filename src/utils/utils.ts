import { Role, RoleHierarchy } from "@/types/enums";

export function mapTo<T>(map: T, raw: any): T {
	const result = {} as T;
	for (const key in map) {
		if (!(key in raw)) {
			throw new Error(`Missing field '${key}' in response`);
		}
		result[key] = raw[key];
	}
	return result;
}

export function getHighestRole(roles: Role[]): Role {
	return roles.reduce(
		(carry, role) =>
			RoleHierarchy[role] < RoleHierarchy[carry] ? role : carry,
		Role.NONE
	);
}
