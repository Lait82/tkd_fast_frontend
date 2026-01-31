import { CheckboxProps } from "@headlessui/react";
import { Checkbox as CheckboxHeadlessUI } from "@headlessui/react";

type CustomCheckboxProps = CheckboxProps & {
	/**
	 * If true, the checkbox border will change color on parent hover. Must be inside a parent with "group" class.
 	*/
	groupHover?: boolean;
}
const Checkbox = ({ ...props }: CustomCheckboxProps) => {
	return (
		<CheckboxHeadlessUI
			{...props}
			className={`group block shrink-0 size-2 rounded border transition-all bg-transparent border-neutrallight ${props.groupHover && "group-hover:border-orange"} data-checked:border-orange
                                        focus:outline-none focus:ring-0`}
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
