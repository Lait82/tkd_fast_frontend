import Datepicker from "@/components/Datepicker";
import FormInput from "@/components/forms/FormInput";
import IconSelect from "@/components/IconSelect";
import { errorToast, successToast } from "@/services/toasts";
import { createCompetitor } from "@/services/tournamentService";
import { useTournamentStore } from "@/states/useTournamentStore";
import { useManageCompetitors } from "./ManageCompetitorContext";
import { competitorSchema } from "@/types/schemas/primitiveSchemas";
import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { Rank } from "@/types/enums";

interface NewCompetitorForm {
	email: string;
	id_number: string;
	firstname: string;
	lastname: string;
	dob: Dayjs;
	rank: Rank;
}

const emptyForm: NewCompetitorForm = {
	email: "",
	id_number: "",
	firstname: "",
	lastname: "",
	dob: dayjs(),
	rank: Rank.WHITE,
};
const CreateCompetitor = () => {
	type Errors = Partial<Record<keyof NewCompetitorForm, string>>;
	const {
		setUserCompetitors,
		newCompetitorSchema,
		setSelectedCategories,
		selectedCategories,
	} = useManageCompetitors();
	const { tournament } = useTournamentStore();
	const [form, setForm] = useState<NewCompetitorForm>(emptyForm);
	const [formErrors, setFormErrors] = useState<Errors>();

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setForm({ ...form, [name]: value });
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			// Parseo el form
			const result = newCompetitorSchema.safeParse({
				...form,
			});

			if (!result.success) {
				const fieldErrors: Errors = {};
				result.error.issues.forEach((issue) => {
					const key = issue.path[0] as keyof NewCompetitorForm;
					fieldErrors[key] = issue.message;
				});
				setFormErrors(fieldErrors);
				errorToast("Revisá los campos");
				return;
			}

			const createCompPayload = {
				...form,
				categories: selectedCategories,
			};
			const res = await createCompetitor(
				tournament.code,
				createCompPayload
			);
			const createdCompetitor = competitorSchema.parse(res);
			successToast("Competidor creado con exito.");

			// Reset states
			setSelectedCategories([]);
			setUserCompetitors((prev) => [...prev, createdCompetitor]);
			setForm(emptyForm);
		} catch (err: any) {
			errorToast(err.message);
			// setError(err.message || "Error al editar el torneo")
		} finally {
			// setLoading(false)
		}
	};
	return (
		<div
			className={`bg-elevated flex flex-col gap-2 shadow-lg justify-center p-3 rounded-lg`}
		>
			<div className="flex flex-col gap-3">
				<h1 className="font-extrabold text-2xl">Agregar Competidor</h1>
				<div className="flex gap-2">
					<div
						className="shrink-0 flex rounded-full justify-center items-center bg-background text-orange text-5xl"
						style={{
							height: "130px",
							width: "130px",
						}}
					>
						{`${form.firstname
							.charAt(0)
							.toUpperCase()}${form.lastname
							.charAt(0)
							.toUpperCase()}`}
					</div>
					<form
						onSubmit={handleSubmit}
						className="grid grid-cols-2 gap-y-4 gap-x-2 flex-1 items-center"
						id="create-competitor-form"
					>
						{/* <div className="flex items-center gap-1"> */}
						<FormInput
							variant="secondary"
							name="firstname"
							value={form.firstname}
							onChange={handleChange}
							error={formErrors?.firstname}
							title={<span className="text-muted">Nombre</span>}
						/>
						{/* </div> */}
						<div className="flex items-center gap-1">
							<span className="text-muted">Graduación</span>
							{/* <BeltIcon rank={competitorDraft.rank} />
							{getRankName(competitorDraft.rank)} */}
							{/* <RankSelect
								value={competitorDraft.rank}
								onChange={handleChange}
							/> */}
							<IconSelect
								name="rank"
								value={form.rank}
								onChange={handleChange}
							/>
							{/* =????? */}
						</div>
						<FormInput
							variant="secondary"
							name="lastname"
							value={form.lastname}
							error={formErrors?.lastname}
							onChange={handleChange}
							title="Apellido"
						/>
						<Datepicker
							name="dob"
							value={form.dob}
							onChange={handleChange}
							error={formErrors?.dob}
							title="Fecha de nacimiento"
						/>
						<FormInput
							variant="secondary"
							name="email"
							value={form.email}
							error={formErrors?.email}
							onChange={handleChange}
							title="Email"
						/>
						<FormInput
							variant="secondary"
							name="id_number"
							type="number"
							value={form.id_number}
							error={formErrors?.id_number}
							onChange={handleChange}
							title="DNI"
						/>
						{/* <div className="flex justify-end col-start-2 ">
							<Button type="submit">Crear competidor</Button>
						</div> */}
					</form>
				</div>
			</div>
		</div>
	);
};

export default CreateCompetitor;
