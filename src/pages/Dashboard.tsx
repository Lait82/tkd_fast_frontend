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
    status: "Competidor",
    statusType: "competitor",
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
]

const Dashboard = () => {
  const { user } = useAuth()



  return (
    <div className="dashboard-page">
      <Header />

      <main className="dashboard-container">
          <div className="dashboard-content">
            <div className="dashboard-left">
              <div className="welcome-section">
                <h1>Hola {user?.firstname || "Juanito"}! Que quieres hacer?</h1>
              </div>

              <DashboardActions />
            </div>

            <div className="dashboard-right">
              <div className="tournaments-section">
                <h2>Mis Torneos</h2>
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
