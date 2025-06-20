import { Role } from "@/types/enums";
import React from "react";

interface RoleBadgeProps {
	role?: Role;
}

const RoleBadge: React.FC<RoleBadgeProps> = ({ role = Role.NONE }) => {
	return (
		<span className={`status-badge ${role.toLowerCase()}`}>
			{role.toLowerCase()}
		</span>
	);
};

export default RoleBadge;
