import React from "react";

interface IconProps extends React.HTMLAttributes<HTMLSpanElement> {
	size?: number | string;
}

const UserX: React.FC<IconProps> = ({ size = 32, ...props }: IconProps) => {
	return (
		<span
			{...props}
			className={`inline-block align-middle group ${
				props.className || ""
			}`}
			style={{ lineHeight: 0 }}
		>
			<svg
				width={size}
				height={size}
				viewBox="0 0 24 24"
				aria-hidden="true"
				className="transition-colors"
				xmlns="http://www.w3.org/2000/svg"
			>
				{/* User solid (aparece en hover) */}
				<path
					className="opacity-0 group-hover:opacity-100 transition-opacity duration-150"
					fill="currentColor"
					stroke="none"
					d="M9.00082 12C11.2105 12 13.0013 10.2094 13.0013 8C13.0013 5.79063 11.2105 4 9.00082 4C6.79119 4 5.00035 5.79063 5.00035 8C5.00035 10.2094 6.79119 12 9.00082 12ZM11.8011 13H11.2792C10.5854 13.3188 9.81342 13.5 9.00082 13.5C8.18822 13.5 7.41938 13.3188 6.72243 13H6.20049C3.88147 13 2 14.8812 2 17.2V18.5C2 19.3281 2.67195 20 3.50018 20H14.5015C15.3297 20 16.0016 19.3281 16.0016 18.5V17.2C16.0016 14.8812 14.1202 13 11.8011 13Z"
				/>

				{/* User outline (visible por defecto) */}
				<path
					className="opacity-100 group-hover:opacity-0 transition-opacity duration-150"
					fill="none"
					stroke="currentColor"
					strokeWidth={1.8}
					strokeLinecap="round"
					strokeLinejoin="round"
					d="M9.00082 12C11.2105 12 13.0013 10.2094 13.0013 8C13.0013 5.79063 11.2105 4 9.00082 4C6.79119 4 5.00035 5.79063 5.00035 8C5.00035 10.2094 6.79119 12 9.00082 12ZM11.8011 13H11.2792C10.5854 13.3188 9.81342 13.5 9.00082 13.5C8.18822 13.5 7.41938 13.3188 6.72243 13H6.20049C3.88147 13 2 14.8812 2 17.2V18.5C2 19.3281 2.67195 20 3.50018 20H14.5015C15.3297 20 16.0016 19.3281 16.0016 18.5V17.2C16.0016 14.8812 14.1202 13 11.8011 13Z"
				/>

				{/* X sólida (fija, siempre visible) */}
				<path
					d="M22 12L18 8M18 12L22 8"
					fill="none"
					stroke="currentColor"
					strokeWidth={2}
					strokeLinecap="round"
				/>
			</svg>
		</span>
	);
};

export default UserX;
