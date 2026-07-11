import dayjs from "dayjs";

/** Segundos del contador antes de redirigir automáticamente. */
export const REDIRECT_SECONDS = 7000;

/** Formatea una fecha suelta, ej: "6 de Junio". */
export const formatDate = (date?: string | null): string => {
	if (!date) return "A confirmar";
	return dayjs(date).format("D [de] MMMM");
};

/**
 * Formatea un rango de fechas. Si comparten mes, lo muestra una sola vez,
 * ej: "6 y 7 de Junio". Si no, "15 de Mayo - 30 de Agosto".
 */
export const formatDateRange = (
	start?: string | null,
	end?: string | null
): string => {
	if (!start && !end) return "A confirmar";
	if (!start) return formatDate(end);
	if (!end) return formatDate(start);

	const from = dayjs(start);
	const to = dayjs(end);

	if (from.isSame(to, "day")) return formatDate(start);
	if (from.isSame(to, "month")) {
		return `${from.format("D")} y ${to.format("D [de] MMMM")}`;
	}
	return `${from.format("D [de] MMMM")} - ${to.format("D [de] MMMM")}`;
};
