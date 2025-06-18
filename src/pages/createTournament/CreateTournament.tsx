"use client";

// import { useState, useEffect } from "react"
// import { useAuth } from "../context/AuthContext"
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GoBack from "@/components/GoBack";
import "@/styles/CreateTournament.css";
import FormInput from "@/components/forms/FormInput";
import { Hash } from "lucide-react";
import { FormEvent, useState } from "react";
import Button from "@/components/Button";
import { claimTournament } from "@/services/tournamentService";
// import { toast } from "sonner";
// import { RxCheckCircled } from "react-icons/rx";
import { errorToast, successToast } from "@/services/toasts";
import { useNavigate } from "react-router-dom";
// import { useAuthStore } from "@/states/useAuthStore";

// Mock data for tournaments
const CreateTournament = () => {
	// const { user } = useAuthStore();
	const [codeValue, setCodeValue] = useState<string>("");
	const [loading, setLoading] = useState<boolean>();
	const navigate = useNavigate();

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		setLoading(true);
		try {
			await claimTournament(codeValue);
			successToast("Reclamaste el torneo exitosamente.");
			navigate(`/${codeValue}/edit-tournament`);
			// setSuccess(true)
		} catch (err: any) {
			console.log(err);
			errorToast(err?.message);
		} finally {
			setLoading(false);
		}
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;
		setCodeValue(value);
	};

	return (
		<div className="create-tournament-page">
			<Header />

			<main className="create-tournament-container">
				<GoBack />
				<div className="bg-elevated flex justify-center create-tournament-card p-5 rounded-lg">
					<div className="welcome-section">
						<h1 className="text-3xl text-extrabold px-3">
							Ingresa tu código de torneo
						</h1>
						<form
							className="flex flex-col mt-7"
							onSubmit={handleSubmit}
						>
							<FormInput
								icon={<Hash />}
								name="code"
								inputClassName="font-extrabold text-center"
								placeholder="Tu código aquí"
								value={codeValue}
								onChange={handleChange}
							/>
							<Button
								type="submit"
								className="m-auto mt-5 px-3"
								disabled={loading}
							>
								{loading ? "Creando..." : "Crear Torneo"}
							</Button>
						</form>
					</div>
				</div>
			</main>

			<Footer />
		</div>
	);
};

export default CreateTournament;
