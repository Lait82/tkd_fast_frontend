import React from "react";
import { Rank } from "@/types/enums";

interface BeltIconProps {
	rank?: Rank;
	size?: number;
	className?: string;
}
const rankColors: Record<Rank, { belt: string; tip: string }> = {
	WHITE: {
		belt: "var(--color-neutrallight)",
		tip: "var(--color-neutrallight)",
	},
	WHITE_YELLOW: {
		belt: "var(--color-neutrallight)",
		tip: "var(--color-yellow)",
	},
	YELLOW: { belt: "var(--color-yellow)", tip: "var(--color-yellow)" },
	YELLOW_GREEN: { belt: "var(--color-yellow)", tip: "var(--color-green)" },
	GREEN: { belt: "var(--color-green)", tip: "var(--color-green)" },
	GREEN_BLUE: { belt: "var(--color-green)", tip: "var(--color-blue)" },
	BLUE: { belt: "var(--color-blue)", tip: "var(--color-blue)" },
	BLUE_RED: { belt: "var(--color-blue)", tip: "var(--color-red)" },
	RED: { belt: "var(--color-red)", tip: "var(--color-red)" },
	RED_BLACK: { belt: "var(--color-red)", tip: "#000" },
	DAN_1: { belt: "#000000", tip: "#000000" },
	DAN_2: { belt: "#000000", tip: "#000000" },
	DAN_3: { belt: "#000000", tip: "#000000" },
	DAN_4: { belt: "#000000", tip: "#000000" },
	DAN_5: { belt: "#000000", tip: "#000000" },
	DAN_6: { belt: "#000000", tip: "#000000" },
	DAN_7: { belt: "#000000", tip: "#000000" },
	DAN_8: { belt: "#000000", tip: "#000000" },
	DAN_9: { belt: "#000000", tip: "#000000" },
};

const BeltIcon: React.FC<BeltIconProps> = ({
	rank = "WHITE",
	size = 36,
	className = "",
}) => {
	const { belt, tip } = rankColors[rank];
	return (
		//   <svg
		//     xmlns="http://www.w3.org/2000/svg"
		//     viewBox={`0 0 ${size} ${size}`}
		//     width={size}
		//     height={size}
		//     className={className}
		//     fill="currentColor"
		//   >
		//       {/* Main body */}
		//       <path d="M5 9h14l-3 6H8z" fill={belt}/>

		//       {/* Left arm */}
		//       <path d="M2 18l3-9h2v3l-3 6z" fill={belt}/>

		//       {/* Right arm */}
		//       <path d="M22 18l-3-9h-2v3l3 6z" fill={belt}/>

		//       {/* Center connector (red part) */}
		//       <path
		//         d="M12 6l-2 4h4l-2-4z"
		//         fill={tip}
		//         style={{ isolation: 'auto' }} // Ensures color layer works
		//       />
		//     </svg>

		<svg
			width={size}
			height={size * 0.33}
			viewBox={`0 0 212 106`}
			className={className}
			fill="none"
			xmlns="https://www.w3.org/2000/svg"
		>
			<path
				d="M0.703125 20.0469V39.3828H57.5391L69.8438 20.6328L81.5625 0.710938L41.1328 0.125H0.703125V20.0469ZM90.3516 0.710938C89.1797 0.710938 35.8594 85.0859 35.2734 86.2578C35.2734 87.4297 62.2266 104.422 62.8125 104.422L129.023 0.710938H90.3516ZM136.641 1.29688L133.711 5.39844L131.953 8.32812L133.125 11.2578L139.57 26.4922L144.844 39.3828H211.055V0.125H174.141C139.57 0.125 137.227 0.125 136.641 1.29688Z"
				fill={belt}
			/>
			<path
				d="M117.305 32.5367L107.344 49.5289L118.477 77.6539L130.195 105.779C131.953 105.779 160.078 93.4742 160.078 92.8883L128.438 16.7164C127.852 15.5445 126.68 17.3023 117.305 32.5367Z"
				fill={tip}
			/>
		</svg>
	);
};

export default BeltIcon;
