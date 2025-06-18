"use client";

import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaExclamationTriangle } from "react-icons/fa";
// import { useAuth } from "../context/AuthContext"
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/Auth.css";
import { useAuthStore } from "@/states/useAuthStore";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [formErrors, setFormErrors] = useState<{
		email?: string;
		password?: string;
	}>({});
	const navigate = useNavigate();

	const { login, loading, error } = useAuthStore();

	const validateForm = () => {
		const errors: { email?: string; password?: string } = {};
		let isValid = true;

		if (!email) {
			errors.email = "Email is required";
			isValid = false;
		} else if (!/\S+@\S+\.\S+/.test(email)) {
			errors.email = "Email is invalid";
			isValid = false;
		}

		if (!password) {
			errors.password = "Password is required";
			isValid = false;
		}

		setFormErrors(errors);
		return isValid;
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();

		if (validateForm()) {
			await login(email, password, navigate);
		}
	};

	return (
		<div className="auth-page">
			<Header />

			<main className="auth-container">
				<div className="auth-card">
					<div className="auth-header">
						<h1>Bienvenido otra vez</h1>
						<p>Inicia sesión para continuar</p>
					</div>

					{error && (
						<div className="auth-error">
							<FaExclamationTriangle />
							<span>{error}</span>
						</div>
					)}

					<form onSubmit={handleSubmit} className="auth-form">
						<div className="form-group">
							<label
								htmlFor="email"
								className="form-label font-bold"
							>
								Email
							</label>
							<div className="input-group">
								<span className="input-icon">
									<FaEnvelope />
								</span>
								<input
									type="email"
									id="email"
									className={`form-input-primary ${
										formErrors.email ? "input-error" : ""
									}`}
									placeholder="Ingresa tu email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									disabled={loading}
								/>
							</div>
							{formErrors.email && (
								<div className="form-error">
									{formErrors.email}
								</div>
							)}
						</div>

						<div className="form-group">
							<div className="password-header">
								<label
									htmlFor="password"
									className="form-label"
								>
									Contraseña
								</label>
								<Link
									to="/forgot-password"
									className="forgot-password"
								>
									¿Olvidaste tu contraseña?
								</Link>
							</div>
							<div className="input-group">
								<span className="input-icon">
									<FaLock />
								</span>
								<input
									type="password"
									id="password"
									className={`form-input-primary ${
										formErrors.password ? "input-error" : ""
									}`}
									placeholder="Ingresa tu contraseña"
									value={password}
									onChange={(e) =>
										setPassword(e.target.value)
									}
									disabled={loading}
								/>
							</div>
							{formErrors.password && (
								<div className="form-error">
									{formErrors.password}
								</div>
							)}
						</div>

						<button
							type="submit"
							className="btn-base btn-primary justify-center w-full"
							disabled={loading}
						>
							{loading ? "Iniciando sesión" : "Iniciar sesión"}
						</button>
					</form>

					<div className="auth-footer">
						<p>
							¿No tienes una cuenta?{" "}
							<Link to="/signup" className="auth-link">
								Regístrate
							</Link>
						</p>
					</div>
				</div>
			</main>

			<Footer />
		</div>
	);
};

export default Login;
