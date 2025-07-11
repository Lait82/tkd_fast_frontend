import React, { ReactNode } from "react";

interface LabelProps {
	title: ReactNode | string;
	name: string;
	className?: string;
}

const Label: React.FC<LabelProps> = ({ title, name, className }) => {
	if (typeof title === "string") {
		return (
			<label htmlFor={name}>
				<span className={`text-muted${" " + className}`}>{title}</span>
			</label>
		);
	}
	return <label htmlFor={name}>{title}</label>;
};

export default Label;
