import "react-datepicker/dist/react-datepicker.css";
import "../styles/components/DatepickerOverrides.css";

import dayjs, { Dayjs } from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

import { es } from "date-fns/locale/es";
import { FaCalendar } from "react-icons/fa";
import DatePicker from "react-datepicker";

type Props = {
	name: string;
	value: Dayjs;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Datepicker = ({ name, value, onChange }: Props) => {
	dayjs.extend(customParseFormat);
	return (
		<div className="w-full text-sm text-neutrallight">
			<DatePicker
				selected={
					value
						? dayjs(value, "DD-MM-YYYY").toDate()
						: dayjs().toDate()
				}
				onChange={(date) => {
					if (!date) return;
					const syntheticEvent = {
						target: {
							name,
							value: dayjs(date).format("DD-MM-YYYY"),
						},
					} as React.ChangeEvent<HTMLInputElement>;

					onChange(syntheticEvent);
				}}
				name={name}
				showIcon
				showMonthDropdown
				showYearDropdown
				dropdownMode="select"
				icon={<FaCalendar className="text-neutrallight" />}
				placeholderText="  Seleccionar fecha"
				className="bg-elevated cursor-pointer w-full border border-transparent border-b-orange focus:outline-none"
				calendarClassName="bg-elevated border border-orange rounded-lg"
				dayClassName={() => "!text-[var(--color-neutrallight)]"}
				locale={es}
				dateFormat="dd/MM/yyyy"
			/>
		</div>
	);
};

export default Datepicker;
