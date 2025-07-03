import "react-datepicker/dist/react-datepicker.css";
import "../styles/components/DatepickerOverrides.css"

import { useState } from "react";
import DatePicker from "react-datepicker";
import { FaCalendar } from "react-icons/fa";
import {es} from "date-fns/locale/es";

const Datepicker = () => {
	const [startDate, setStartDate] = useState<Date | null>(null);

	return (
		<div className="w-full text-sm text-white">
			<DatePicker
				selected={startDate}
				onChange={(date) => setStartDate(date)}
				showIcon
				showMonthDropdown
				showYearDropdown
				dropdownMode="select"
				icon={
					<FaCalendar className="text-neutrallight" />
				}
				placeholderText="  Seleccionar fecha"
				className="bg-elevated cursor-pointer w-full border border-transparent border-b-orange focus:outline-none"
				calendarClassName="bg-elevated border border-orange rounded-lg"
				// dayClassName={(date) =>
				// 	"text-neutrallight hover:bg-orange hover:text-white transition-all"
				// }
				dayClassName={() => "!text-[var(--color-neutrallight)]"}
				// popoverPlacement="bottom"
				locale={es} // si querés soporte en español
			/>
		</div>
	);
};

export default Datepicker;
