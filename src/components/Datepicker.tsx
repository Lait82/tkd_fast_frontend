import "react-datepicker/dist/react-datepicker.css";

import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Datepicker = () => {
	const [startDate, setStartDate] = useState<Date | null>(null);

	return (
		<div className="w-full text-sm text-white">
			<DatePicker
				selected={startDate}
				onChange={(date) => setStartDate(date)}
				placeholderText="Selesccionar fecha"
				className="bg-elevated border border-bottom-orange p-1 rounded-lg w-full focus:outline-none"
				calendarClassName="!bg-elevated !text-red !border !border-orange rounded-lg"
				// dayClassName={(date) =>
				// 	"text-neutrallight hover:bg-orange hover:text-white transition-all"
				// }
				dayClassName={() => "!text-[var(--color-neutrallight)]"}
				// popoverPlacement="bottom"
				locale="es" // si querés soporte en español
			/>
		</div>
	);
};

export default Datepicker;
