"use client"

import { useState, useEffect } from "react"
import { useAuth } from "../context/AuthContext"
import Header from "../components/Header"
import Footer from "../components/Footer"
import DashboardActions from "../components/DashboardActions"
import TournamentCard from "../components/TournamentCard"
import "../styles/Dashboard.css"

// Mock data for tournaments
const mockTournaments = [
  {
    id: 1,
    title: "ADCC Latin America Edition / Santiago Open",
    date: "06 Jun",
    daysRemaining: "Faltan 15 Días",
    image: "https://picsum.photos/586/120",
    status: "Competidor",
    statusType: "competitor",
  },
  {
    id: 2,
    title: "ADCC Latin America Edition / Santiago Open",
    date: "06 Jun",
    daysRemaining: "Faltan 15 Días",
    image: "https://picsum.photos/586/120",
    status: "Master",
    statusType: "master",
  },
  {
    id: 3,
    title: "ADCC Latin America Edition / Santiago Open",
    date: "06 Jun",
    daysRemaining: "Faltan 15 Días",
    image: "https://picsum.photos/586/120",
    status: "Instructor",
    statusType: "instructor",
  },
    {
    id: 4,
    title: "ADCC Latin America Edition / Santiago Open",
    date: "06 Jun",
    daysRemaining: "Faltan 15 Días",
    image: "https://picsum.photos/586/120",
    status: "Organizer",
    statusType: "organizer",
  },
]

const Dashboard = () => {
  const { user } = useAuth()



  return (
    <div className="dashboard-page">
      <Header />

      <main className="dashboard-container">
          <div className="dashboard-content p-4">
            <div className="dashboard-left">
              <div className="welcome-section">
                <h1 className="text-neutrallight text-3xl">Hola {user?.firstname || "Juanito"}! Que quieres hacer?</h1>
              </div>

              <DashboardActions />
            </div>

            <div className="dashboard-right">
              <div className="tournaments-section">
                <h1 className="text-2xl">Mis Torneos</h1>
                <div className="tournaments-grid">
                  {mockTournaments.map((tournament) => (
                    <TournamentCard key={tournament.id} tournament={tournament} />
                  ))}
                </div>
              </div>
            </div>
          </div>
      </main>

      <Footer />
    </div>
  )
}

export default Dashboard
