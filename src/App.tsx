import { Routes, Route } from "react-router-dom";
// import { AuthProvider } from "./context/AuthContext"
import Landing from "@/pages/landing/Landing";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import ForgotPassword from "./pages/forgotPassword/ForgotPassword";
import Dashboard from "./pages/basicDashboard/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import CreateTournament from "./pages/createTournament/CreateTournament";
import TournamentDashboard from "./pages/tournament/dashboard/Dashboard";
import EditTournament from "./pages/editTournament/EditTournament";
import OnlyPublicRoute from "./components/OnlyPublicRoute";
import TournamentLoader from "./components/TournamentLoader";
import About from "./pages/about/About";
import Info from "./pages/tournament/info/Info";
import Competitors from "./pages/tournament/competitors/Competitors";

function App() {
	return (
		// <AuthProvider>
		<Routes>
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
					<TournamentLoader>
						<TournamentDashboard />
					</TournamentLoader>
				}
			/>
			<Route
				path="/:tournamentCode/info"
				element={
					<TournamentLoader>
						<Info />
					</TournamentLoader>
				}
			/>
			<Route
				path="/:tournamentCode/competitors"
				element={
					<TournamentLoader>
						<Competitors />
					</TournamentLoader>
				}
			/>
		</Routes>
		// </AuthProvider>
	);
}

export default App;
