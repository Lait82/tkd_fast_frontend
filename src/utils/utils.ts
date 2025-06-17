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
