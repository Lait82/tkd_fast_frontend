import { Routes, Route } from "react-router-dom";
// import { AuthProvider } from "./context/AuthContext"
import Landing from "@/pages/landing/Landing";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import ForgotPassword from "./pages/forgotPassword/ForgotPassword";
import Dashboard from "./pages/basicDashboard/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import CreateTournament from "./pages/createTournament/CreateTournament";
import TournamentDashboard from "./pages/tournamentDashboard/Dashboard";
import EditTournament from "./pages/editTournament/EditTournament";
import OnlyPublicRoute from "./components/OnlyPublicRoute";
import TournamentLoader from "./components/TournamentLoader";
import About from "./pages/about/About";

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
				path="/about"
				element={
					<OnlyPublicRoute>
						<About />
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
		</Routes>
		// </AuthProvider>
	);
}

export default App;
