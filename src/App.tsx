import { Routes, Route } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"
import Landing from "./pages/Landing"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import ForgotPassword from "./pages/ForgotPassword"
import Dashboard from "./pages/Dashboard"
import ProtectedRoute from "./components/ProtectedRoute"
import CreateTournament from "./pages/CreateTournament"
import TournamentDashboard from "./pages/tournamentSelected/Dashboard"
import { Toaster } from "sonner"
import { RxCrossCircled } from "react-icons/rx";
import { RxCheckCircled } from "react-icons/rx";
import EditTournament from "./pages/EditTournament"
import { TournamentProvider } from "./context/TournamentContext"


function App() {
  return (
    <AuthProvider>
        
            <Toaster
            position='top-right'
            icons={{
                error: <RxCrossCircled size={36} color="var(--color-red)" />,
                success: <RxCheckCircled size={36} color="var(--color-green)" />
            }}
            toastOptions={{
                style: {
                background: '#373838',
                border: 'none',
                color:'var(--color-neutrallight)',
                borderRadius:'8px'
                },
                duration: 5000
            }}
            />
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />

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
                        <TournamentProvider>
                            <ProtectedRoute>
                                <EditTournament />
                            </ProtectedRoute>
                        </TournamentProvider>
                    }
                />
                <Route
                    path="/:tournamentCode/dashboard"
                    element={
                        <TournamentProvider>
                            <ProtectedRoute>
                                <TournamentDashboard />
                            </ProtectedRoute>
                        </TournamentProvider>
                    }
                />
            </Routes>
    </AuthProvider>
  )
}

export default App
