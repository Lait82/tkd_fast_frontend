// import React from "react";
// import Label from "./Label";
// // import { IconType } from "react-icons"

// interface FormInputProps {
// 	label?: string;
// 	name: string;
// 	type?: string;
// 	variant?: "primary" | "secondary";
// 	icon?: React.ReactNode;
// 	value: string;
// 	inputClassName?: string;
// 	containerClassName?: string;
// 	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
// 	error?: string;
// 	disabled?: boolean;
// 	placeholder?: string;
// 	required?: boolean | undefined;
// 	horizontal?: boolean | undefined;
// }

// const inputVariantClasses = {
// 	primary: "",
// 	secondary:
// 		"border-0 border-b-1 border-orange focus:border-orange focus:outline-none focus:ring-0 bg-transparent placeholder:text-muted",
// 	// "border focus:ring-0 active:border-transparent border-transparent border-b-orange bg-transparent",
// };

// const FormInput: React.FC<FormInputProps> = ({
// 	label,
// 	name,
// 	type = "text",
// 	variant = "primary",
// 	icon,
// 	value,
// 	onChange,
// 	error,
// 	inputClassName = "",
// 	containerClassName = "",
// 	disabled,
// 	placeholder,
// 	required,
// 	horizontal,
// }) => {
// 	const horizontalClasses = horizontal ? "flex items-end" : "";
// 	return (
// 		// <div className="form-group">
// 		<div className={`${containerClassName} ${horizontalClasses}`}>
// 			{label && (
// 				<Label
// 					name={name}
// 					label={label}
// 					required={required}
// 					horizontal={horizontal}
// 				/>
// 			)}
// 			<div className="input-group">
// 				{icon && (
// 					<span
// 						className={`input-icon${
// 							variant === "secondary" && "-secondary"
// 						}`}
// 					>
// 						{icon}
// 					</span>
// 				)}
// 				<input
// 					type={type}
// 					id={name}
// 					name={name}
// 					className={
// 						//form-input-${variant}
// 						`
//                         ${inputVariantClasses[variant]}
//                         ${
// 							type === "date" && value
// 								? "text-neutrallight"
// 								: "text-muted"
// 						} ${inputClassName}
//                          ${error ? "border-b-red" : ""}`
// 					}
// 					placeholder={placeholder}
// 					value={value}
// 					onChange={onChange}
// 					disabled={disabled}
// 				/>
// 			</div>
// 			{/* form-error */}
// 			{error && (
// 				<div className="absolute max-w-fit text-red text-sm mt-0.5">{`* ${error}`}</div>
// 			)}
// 		</div>
// 	);
// };

// export default FormInput;

import { ReactNode } from "react";
import Label from "./Label";

interface InputProps {
	id?: string;
	name: string;
	type?: string;
	variant: "primary" | "secondary";
	iconLeft?: ReactNode;
	iconRight?: ReactNode;
	error?: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	placeholder?: string;
	title?: ReactNode | string;
	alignment?: "left" | "center" | "right";
}

const FormInput = ({
	id,
	name,
	type = "text",
	iconLeft,
	iconRight,
	error,
	value,
	onChange,
	placeholder,
	title = "",
	alignment
}: InputProps) => {
	return (
		<div className="w-full">
			<div className="grid grid-cols-[auto_1fr] items-center w-full gap-1">
				<Label title={title} name={name} />
				<div className="relative">
					{iconLeft && (
						<span className="absolute left-[10px] text-neutrallight pointer-events-none">
							{iconLeft}
						</span>
					)}

					<input
						id={id}
						type={type}
						name={name}
						value={value}
						onChange={onChange}
						placeholder={placeholder}
						className={`
						w-full bg-transparent text-neutrallight border-0 border-b focus:text-neutrallight
                        [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
						${error ? "border-red focus:border-red" : "border-muted focus:border-orange"}
                        py-0.5
						${iconLeft ? "pl-3" : ""}
						${iconRight ? "pr-3" : ""}
						${alignment && `text-${alignment}`}
						focus:outline-none focus:ring-0 focus:border-inherit
						transition-colors duration-200
					`}
					/>

					{iconRight && (
						<span className="absolute right-[10px] text-neutrallight pointer-events-none">
							{iconRight}
						</span>
					)}
				</div>

				{/* Mensaje de error absolutamente posicionado para no afectar el layout */}
				{/* {error && ( */}
				{(
					<div className="col-start-2 text-xs text-red">
						{error ? `* `+ error : "\u00A0"}
					</div>
				)}
			</div>
		</div>
	);
};

export default FormInput;
