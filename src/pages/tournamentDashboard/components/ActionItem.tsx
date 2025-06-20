import type { ReactNode } from "react";

interface ActionItemProps {
	index: number;
	action: {
		action: () => void;
		icon: ReactNode;
		title: string;
		description: string;
		allowed: boolean;
	};
}

const ActionItem = ({ index, action }: ActionItemProps) => {
	return (
		<div
			key={index}
			className={`flex items-center gap-2 p-1 h-full
            rounded-lg 
            ${action.allowed ? "cursor-pointer" : "cursor-not-allowed"}
            ${action.allowed ? "transition-all ease-fluid" : null}
            border border-transparent
            ${
				action.allowed
					? "hover:border-orange hover:-translate-y-[2px] hover:rounded-lg"
					: null
			}`}
			onClick={action.allowed ? action.action : undefined}
		>
			<span
				className={`relative flex items-center justify-center text-3xl w-3.5 h-3.5 rounded-lg ${
					action.allowed ? "text-neutrallight" : "text-neutral-600"
				} shrink-0`}
			>
				{action.icon}
			</span>
			<div className="flex-1">
				<h3
					className={`${
						action.allowed
							? "text-neutrallight"
							: "text-neutral-600"
					} font-semibold mb-0.5 text-xl`}
				>
					{action.title}
				</h3>
				<p
					className={
						action.allowed
							? "text-neutrallight"
							: "text-neutral-600"
					}
				>
					{action.description}{" "}
					{action.allowed && (
						<span className="action-highlight font-black">{`>>>`}</span>
					)}
				</p>
			</div>
		</div>
	);
};

export default ActionItem;
