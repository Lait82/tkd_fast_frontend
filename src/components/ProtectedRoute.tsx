"use client";

import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/states/useAuthStore";
import CustomToaster from "./CustomToaster";

interface ProtectedRouteProps {
	children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
	const { isAuthenticated } = useAuthStore();
	const navigate = useNavigate();

	if (!isAuthenticated) {
		navigate("/login");
	}

	return (
		<>
			<CustomToaster />
			{children}
		</>
	);
};

export default ProtectedRoute;
