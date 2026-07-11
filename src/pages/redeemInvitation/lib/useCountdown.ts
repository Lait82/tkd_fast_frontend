import { useEffect, useState } from "react";

/**
 * Cuenta regresiva desde `seconds` hasta 0, ejecutando `onDone` al llegar.
 * Se puede pausar con `active = false`.
 */
export const useCountdown = (
	seconds: number,
	onDone: () => void,
	active = true
) => {
	const [remaining, setRemaining] = useState(seconds);

	useEffect(() => {
		if (!active) return;

		if (remaining <= 0) {
			onDone();
			return;
		}

		const timer = setTimeout(() => setRemaining((s) => s - 1), 1000);
		return () => clearTimeout(timer);
	}, [remaining, active]);

	return remaining;
};
