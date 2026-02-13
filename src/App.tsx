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
import dayjs from "dayjs";
import es from "dayjs/locale/es";
import customParseFormat from "dayjs/plugin/customParseFormat";
import Categories from "./pages/tournament/categories/Categories";
import Invites from "./pages/tournament/invites/Invites";

function App() {
	dayjs.locale({
		...es,
		months: es.months?.map((m) => m.charAt(0).toUpperCase() + m.slice(1)),
		monthsShort: es.monthsShort?.map(
			(m) => m.charAt(0).toUpperCase() + m.slice(1)
		),
		weekdays: es.weekdays?.map(
			(m) => m.charAt(0).toUpperCase() + m.slice(1)
		),
		weekdaysShort: es.weekdaysShort?.map(
			(m) => m.charAt(0).toUpperCase() + m.slice(1)
		),
		weekdaysMin: es.weekdaysMin?.map(
			(m) => m.charAt(0).toUpperCase() + m.slice(1)
		),
	});
	dayjs.extend(customParseFormat);
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
			<Route
				path="/create-tournament"
				element={
					<ProtectedRoute>
						<CreateTournament />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/:tournamentCode/edit-tournament"
				element={
					<ProtectedRoute>
						<TournamentLoader>
							<EditTournament />
						</TournamentLoader>
					</ProtectedRoute>
				}
			/>
			<Route
				path="/:tournamentCode/dashboard"
				element={
					<ProtectedRoute>
						<TournamentLoader>
							<TournamentDashboard />
						</TournamentLoader>
					</ProtectedRoute>
				}
			/>
			<Route
				path="/:tournamentCode/info"
				element={
					<ProtectedRoute>
						<TournamentLoader>
							<Info />
						</TournamentLoader>
					</ProtectedRoute>
				}
			/>
			<Route
				path="/:tournamentCode/competitors"
				element={
					<ProtectedRoute>
						<TournamentLoader>
							<Competitors />
						</TournamentLoader>
					</ProtectedRoute>
				}
			/>
			<Route
				path="/:tournamentCode/categories"
				element={
					<ProtectedRoute>
						<TournamentLoader>
							<Categories />
						</TournamentLoader>
					</ProtectedRoute>
				}
			>
			</Route>
			<Route
				path="/:tournamentCode/invites"
				element={
					<ProtectedRoute>
						<TournamentLoader>
							<Invites />
						</TournamentLoader>
					</ProtectedRoute>
				}
			/>
		</Routes>
		// </AuthProvider>
	);
}

export default App;
