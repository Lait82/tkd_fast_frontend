"use client"

import { useAuth } from "../context/AuthContext"
import Header from "../components/Header"
import Footer from "../components/Footer"
import "../styles/Dashboard.css"
import Button from "@/components/Button"

const Dashboard = () => {
  const { user, logout } = useAuth()

  return (
    <div className="dashboard-page">
      <Header />

      <main className="dashboard-container">
        <div className="dashboard-header">
          <h1>Welcome, {user?.firstname}!</h1>
          <Button className="btn-base btn-secondary" onClick={logout}>
            Logout
          </Button>
        </div>

        <div className="dashboard-content">
          <div className="dashboard-card">
            <h2>Your Profile</h2>
            <div className="profile-info">
              <div className="info-group">
                <span className="info-label">Name:</span>
                <span className="info-value">
                  {user?.firstname} {user?.lastname}
                </span>
              </div>
              <div className="info-group">
                <span className="info-label">Email:</span>
                <span className="info-value">{user?.email}</span>
              </div>
              <div className="info-group">
                <span className="info-label">Phone:</span>
                <span className="info-value">{user?.phone}</span>
              </div>
              <div className="info-group">
                <span className="info-label">ID Number:</span>
                <span className="info-value">{user?.id_number}</span>
              </div>
              <div className="info-group">
                <span className="info-label">Rank:</span>
                <span className="info-value">{user?.rank}</span>
              </div>
              <div className="info-group">
                <span className="info-label">School:</span>
                <span className="info-value">{user?.school}</span>
              </div>
              <div className="info-group">
                <span className="info-label">Federation:</span>
                <span className="info-value">{user?.federation}</span>
              </div>
              <div className="info-group">
                <span className="info-label">Date of Birth:</span>
                <span className="info-value">{user?.dob}</span>
              </div>
            </div>
          </div>

          <div className="dashboard-card">
            <h2>Upcoming Tournaments</h2>
            <p className="empty-state">No upcoming tournaments found.</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default Dashboard
