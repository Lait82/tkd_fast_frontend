import { Routes, Route } from "react-router-dom";
// import { AuthProvider } from "./context/AuthContext"
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import CreateTournament from "./pages/CreateTournament";
import TournamentDashboard from "./pages/tournamentSelected/Dashboard";
import { Toaster } from "sonner";
import { RxCrossCircled } from "react-icons/rx";
import { RxCheckCircled } from "react-icons/rx";
import EditTournament from "./pages/EditTournament";
// import { TournamentProvider } from "./context/TournamentContext";
import OnlyPublicRoute from "./components/OnlyPublicRoute";
import TournamentLoader from "./components/TournamentLoader";

function App() {
	return (
		// <AuthProvider>
		<Routes>
			{/* <Toaster
				position="top-right"
				icons={{
					error: (
						<RxCrossCircled size={36} color="var(--color-red)" />
					),
					success: (
						<RxCheckCircled size={36} color="var(--color-green)" />
					),
				}}
				toastOptions={{
					style: {
						background: "#373838",
						border: "none",
						color: "var(--color-neutrallight)",
						borderRadius: "8px",
					},
					duration: 5000,
				}}
			/> */}
			<Route
				path="/"
				element={
					<OnlyPublicRoute>
						<Landing />
					</OnlyPublicRoute>
				}
			/>
			<Route
				path="/login"
				element={
					<OnlyPublicRoute>
						<Login />
					</OnlyPublicRoute>
				}
			/>
			<Route
				path="/signup"
				element={
					<OnlyPublicRoute>
						<Signup />
					</OnlyPublicRoute>
				}
			/>
			<Route
				path="/forgot-password"
				element={
					<OnlyPublicRoute>
						<ForgotPassword />
					</OnlyPublicRoute>
				}
			/>

			{/* <ProtectedRoute> */}
			<Route
				path="/dashboard"
				element={
					<ProtectedRoute>
						<Dashboard />
					</ProtectedRoute>
				}
			/>
			<Route path="/create-tournament" element={<CreateTournament />} />
			<Route
				path="/:tournamentCode/edit-tournament"
				element={
					<TournamentLoader>
						<EditTournament />
					</TournamentLoader>
				}
			/>
			<Route
				path="/:tournamentCode/dashboard"
				element={
					// <TournamentProvider>
					<TournamentDashboard />
					// </TournamentProvider>
				}
			/>
			{/* </ProtectedRoute> */}
		</Routes>
		// </AuthProvider>
	);
}

export default App;
