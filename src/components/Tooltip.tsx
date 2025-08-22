import * as TooltipRdx from "@radix-ui/react-tooltip";
import { ReactNode } from "react";

interface TooltipProps {
	children: ReactNode;
	text: string;
	side?: "top" | "right" | "bottom" | "left";
	align?: "start" | "center" | "end";
}

const Tooltip = ({
	children,
	text,
	side = "top",
	align = "start",
}: TooltipProps) => {
	return (
		<TooltipRdx.Provider delayDuration={200}>
			<TooltipRdx.Root>
				<TooltipRdx.Trigger asChild>{children}</TooltipRdx.Trigger>
				<TooltipRdx.Portal>
					<TooltipRdx.Content
						side={side}
						align={align}
						sideOffset={6}
						className="z-50 rounded-lg bg-super-elevated px-1 py-0.5 text-s font-bold text-neutrallight shadow-lg animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95"
					>
						{text}
						<TooltipRdx.Arrow className="fill-orange" />
					</TooltipRdx.Content>
				</TooltipRdx.Portal>
			</TooltipRdx.Root>
		</TooltipRdx.Provider>
	);
};

export default Tooltip;
