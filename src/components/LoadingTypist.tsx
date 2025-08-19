import React, { FC } from "react";
import TypeItComponent from "typeit-react";

interface LoadingTypistProps extends React.HTMLAttributes<HTMLSpanElement> {
	text?: string;
}

const LoadingTypist = ({ text = "Cargando", ...props }: LoadingTypistProps) => {
	const TypeIt = TypeItComponent as FC<any>;

	return (
		<TypeIt
			as={"h1"}
			options={{
				loop: true,
				cursor: false,
			}}
			getBeforeInit={(instance: any) => {
				instance
					.type(text)
					.pause(250)
					.type(".")
					.pause(200)
					.type(".")
					.pause(300)
					.type(".")
					.pause(1500)
					.delete(1)
					.pause(350)
					.delete(1)
					.pause(400)
					.delete(1)
					.pause(250);
				return instance;
			}}
			{...props}
		/>
	);
};
export default LoadingTypist;
