import { CheckboxProps } from "@headlessui/react";
import { Checkbox as CheckboxHeadlessUI } from "@headlessui/react";

const Checkbox = ({ ...props }: CheckboxProps) => {
	return (
		<CheckboxHeadlessUI
			{...props}
			className="group block shrink-0 size-2 rounded border bg-transparent border-neutrallight data-checked:border-orange
                                        focus:outline-none focus:ring-0"
		>
			<svg
				className="stroke-orange opacity-0 group-data-checked:opacity-100"
				viewBox="0 0 14 14"
				fill="none"
			>
				<path
					d="M3 8L6 11L11 3.5"
					strokeWidth={2}
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
		</CheckboxHeadlessUI>
	);
};

export default Checkbox;
