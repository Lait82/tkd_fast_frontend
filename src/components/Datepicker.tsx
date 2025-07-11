import "react-datepicker/dist/react-datepicker.css";
import "../styles/components/DatepickerOverrides.css";

import dayjs, { Dayjs } from "dayjs";
// import customParseFormat from "dayjs/plugin/customParseFormat";

import { es } from "date-fns/locale/es";
import { FaCalendar } from "react-icons/fa";
import DatePicker from "react-datepicker";
import { ReactNode } from "react";
import Label from "./forms/Label";

type Props = {
	name: string;
	value: Dayjs;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	error?: string;
	title?: ReactNode | string;
	maxDate?: Dayjs;
};

const Datepicker = ({ name, value, onChange, error, title }: Props) => {
	// dayjs.extend(customParseFormat);

	return (
		<div className="w-full grid grid-cols-[1fr_auto] gap-x-1 gap-y-0">
			{<Label title={title} name={name} />}
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
				className={`bg-elevated cursor-pointer text-center w-full border border-transparent ${
					error ? "border-b-red" : "border-b-orange"
				} focus:outline-none`}
				calendarClassName="bg-elevated border border-orange rounded-lg"
				// dayClassName={() => "!text-[var(--color-neutrallight)]"}
				locale={es}
				dateFormat="dd/MM/yyyy"
				showDisabledMonthNavigation
			/>

			{error && (
				<div className="col-start-2 text-xs text-red-500">{error}</div>
			)}
		</div>
	);
};

export default Datepicker;
