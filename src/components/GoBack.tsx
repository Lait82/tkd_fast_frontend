import React from "react";
import { useNavigate } from "react-router-dom";

interface GoBackProps extends React.HTMLAttributes<HTMLSpanElement> {
	variant?: "primary" | "secondary";
	iconLeft?: React.ReactNode;
	iconRight?: React.ReactNode;
}

const GoBack: React.FC<GoBackProps> = ({ className = "", ...props }) => {
	const navigate = useNavigate();
	return (
		<span
			style={{ transform: "all 0.2s ease" }}
			className={`font-bold transition-all ease-fluid ${className} cursor-pointer hover:text-orange font-extrabold`}
			onClick={() => navigate(-1)}
			{...props}
		>
			<span className="text-orange">{`<<< `}</span>
			Atrás
		</span>
	);
};

export default GoBack;
