import React from "react";
import Lottie from "lottie-react";
import loadingAnimation from "@/videos/loading.json";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: "primary" | "secondary";
	iconLeft?: React.ReactNode;
	iconRight?: React.ReactNode;
	style?: object;
	disabled?: boolean;
	loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
	children,
	variant = "primary",
	style,
	iconLeft,
	iconRight,
	className = "",
	disabled = false,
	loading = false,
	...props
}) => {
	const primaryClasses =
		"bg-neutrallight cursor-pointer text-background hover:bg-transparent hover:text-neutrallight";
	const secondaryClasses =
		"bg-transparent cursor-pointer text-neutrallight hover:bg-neutrallight hover:text-background";

	const primaryDisabledClasses =
		"bg-white-800 border-white-800 text-neutrallight-600 cursor-not-allowed";
	const secondaryDisabledClasses =
		"bg-transparent border-white-800 cursor-not-allowed";

	const getClasses = () => {
		return variant === "primary"
			? disabled
				? primaryDisabledClasses
				: primaryClasses
			: disabled
			? secondaryDisabledClasses
			: secondaryClasses;
	};
	return (
		<button
			type="submit"
			{...props}
			style={style}
			className={`px-1 py-0.5 rounded-full font-extrabold transition-all ease-fluid border-2 border-neutrallight inline-flex items-center decoration-0 justify-center 
				${getClasses()}
				${className}`}
			disabled={disabled}
		>
			{loading ? (
				<Lottie
					className="h-2 w-2"
					animationData={loadingAnimation}
					loop
					autoplay
				/>
			) : (
				<>
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
				</>
			)}
		</button>
	);
};

export default Button;
