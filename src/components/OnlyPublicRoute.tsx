import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext"
import { useAuthStore } from "@/states/useAuthStore";

interface OnlyPublicRouteProps {
	children: ReactNode;
}

const OnlyPublicRoute = ({ children }: OnlyPublicRouteProps) => {
	const { isAuthenticated } = useAuthStore();

	if (isAuthenticated) {
		return <Navigate to="/dashboard" replace />;
	}

	return <>{children}</>;
};

export default OnlyPublicRoute;
