"use client";
import Header from "../components/Header";
import Footer from "../components/Footer";
import GoBack from "../components/GoBack";
import "../styles/EditTournament.css";
import { FaCalendarAlt, FaImage } from "react-icons/fa";
import { errorToast, successToast } from "@/services/toasts";
import FormInput from "@/components/forms/FormInput";
import { useState } from "react";
import TextArea from "@/components/forms/TextArea";
import Button from "@/components/Button";
import { EditTournamentData } from "@/types/tournament";
import { editTournament } from "@/services/organizerService";
import { useTournamentStore } from "@/states/useTournamentStore";

// Mock data for tournaments
const EditTournament = () => {
	// const { user } = useAuth();
	// const [codeValue, setCodeValue] = useState<string>('');
	// const [loading, setLoading] = useState<boolean>()
	const { tournament } = useTournamentStore();
	const [form, setForm] = useState<EditTournamentData>({
		name: tournament?.name || "",
		startDate: "",
		endDate: "",
		arena: tournament?.arena || "",
		address: tournament?.location || "",
		deadline: "",
		description: tournament?.description || "",
	});

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			await editTournament("62SQAHZX", form);
			successToast("Torneo editado con éxito");
		} catch (err: any) {
			console.error(err);
			errorToast(err.message);
			// setError(err.message || "Error al editar el torneo")
		} finally {
			// setLoading(false)
		}
	};

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setForm({ ...form, [name]: value });
	};

	return (
		<div className="create-tournament-page">
			<Header />

			<main className="create-tournament-container">
				<GoBack />
				<div className="bg-elevated flex flex-col justify-center create-tournament-card p-5 rounded-lg">
					<h1 className="text-3xl mr-auto">Información de Torneo</h1>

					<div className="edit-form-content">
						<form onSubmit={handleSubmit}>
							<label
								htmlFor="banner"
								className="bg-super-elevated rounded-lg shadow-card h-15 flex justify-center items-center cursor-pointer"
							>
								<FaImage className="text-muted" size={46} />
								<span className="text-2xl pl-2 text-muted">
									{" "}
									Agrega un banner a tu torneo
								</span>
							</label>
							<input
								name="banner"
								id="banner"
								type="file"
								style={{ display: "none" }}
							/>

							<div className="grid grid-cols-2 gap-y-5 pt-2">
								<div className="grid grid-cols-1 grid-rows-3 gap-3">
									<FormInput
										label="Nombre"
										required
										horizontal
										name="name"
										placeholder="Nombre"
										value={form.name ?? ""}
										variant="secondary"
										onChange={handleChange}
									/>
									<FormInput
										label="Arena"
										name="arena"
										required
										placeholder="Arena/Estadio"
										horizontal
										value={form.arena ?? ""}
										variant="secondary"
										onChange={handleChange}
									/>
									<FormInput
										label="Dirección"
										name="address"
										required
										placeholder="Dirección"
										horizontal
										value={form.address ?? ""}
										variant="secondary"
										onChange={handleChange}
									/>
								</div>
								<div className="grid grid-cols-1 grid-rows-3 gap-3">
									<FormInput
										label="Fecha de inicio"
										name="startDate"
										type="date"
										required
										variant="secondary"
										horizontal
										icon={<FaCalendarAlt />}
										value={form.startDate ?? ""}
										onChange={handleChange}
										// error={errors.dob}
										// disabled={loading}
									/>
									<FormInput
										label="Fecha de finalización"
										name="endDate"
										type="date"
										horizontal
										icon={<FaCalendarAlt />}
										value={form.endDate ?? ""}
										variant="secondary"
										onChange={handleChange}
										// error={errors.dob}
										// disabled={loading}
									/>
									<FormInput
										label="Cierre de inscripciones"
										name="deadline"
										type="date"
										required
										horizontal
										icon={<FaCalendarAlt />}
										value={form.deadline ?? ""}
										variant="secondary"
										onChange={handleChange}
										// error={errors.dob}
										// disabled={loading}
									/>
								</div>
								<div className="col-span-2">
									<TextArea
										name="description"
										label="Descripción"
										required
										placeholder="Descripción del torneo..."
										value={form.description ?? ""}
										// variant="secondary"
										rows={10}
										onChange={handleChange}
									/>
								</div>
								<div className="col-span-2 ml-auto mr-5">
									<Button>Crear Torneo</Button>
								</div>
							</div>
						</form>
					</div>
				</div>
			</main>

			<Footer />
		</div>
	);
};

export default EditTournament;
