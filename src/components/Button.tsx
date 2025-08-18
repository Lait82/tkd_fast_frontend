import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: "primary" | "secondary";
	iconLeft?: React.ReactNode;
	iconRight?: React.ReactNode;
	style?: object;
	disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
	children,
	variant = "primary",
	style,
	iconLeft,
	iconRight,
	className = "",
	disabled,
	...props
}) => {
	//     .btn-base {
	//   padding: 0.5rem 1.4rem;
	//   border-radius: 9999px;
	//   font-weight: 800;
	//   font-size: 1rem;
	//   cursor: pointer;
	//   transition: all 0.2s ease;
	//   border: 2px solid var(--color-neutrallight);
	//   display: inline-flex;
	//   align-items: center;
	//   text-decoration: none;
	//   text-align: center;
	// }
	return (
		<button
			type="submit"
			{...props}
			style={style}
			className={`px-1 py-0.5 rounded-full font-extrabold cursor-pointer transition-all ease-fluid border-2 border-neutrallight inline-flex items-center decoration-0 justify-center ${
				variant === "primary"
					? "bg-neutrallight text-background hover:bg-transparent hover:text-neutrallight"
					: "bg-transparent text-neutrallight hover:bg-neutrallight hover:text-background"
			} ${className}`}
			disabled={disabled}
		>
			{iconLeft && (
				<span className="inline-flex items-center mr-1">
					{iconLeft}
				</span>
			)}
			{children}
			{iconRight && (
				<span className="inline-flex items-center ml-1">
					{iconRight}
				</span>
			)}
		</button>
	);
};

export default Button;
