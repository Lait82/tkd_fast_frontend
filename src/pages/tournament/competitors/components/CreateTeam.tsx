import FormInput from "@/components/forms/FormInput";
import { errorToast, successToast } from "@/services/toasts";
import { useTournamentStore } from "@/states/useTournamentStore";
import { useManageCompetitors } from "./ManageCompetitorContext";
import { teamSchema } from "@/types/schemas/primitiveSchemas";
import { useState } from "react";
import SelectTeamCompetitors from "./EditTeam/SelectTeamCompetitors/SelectTeamCompetitors";
import { z } from "zod/v4";
import { createTeam } from "@/services/teamService";

interface NewTeamForm {
	name: string;
	categories: string[];
}

const emptyForm: NewTeamForm = {
	name: "",
	categories: [],
};
const CreateTeam = () => {
	type Errors = Partial<Record<keyof NewTeamForm, string>>;
	const {
		setSelectedCategories,
		selectedCategories,
		setSelectedMembers,
		selectedMembers,
		setTeams,
		teams,
	} = useManageCompetitors();
	const { tournament } = useTournamentStore();
	const [form, setForm] = useState<NewTeamForm>(emptyForm);
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
			const result = z
				.object({
					name: z.string().min(3),
				})
				.safeParse({
					...form,
				});

			// Cuando haya mas campos va a ser util este approach.
			if (!result.success) {
				const fieldErrors: Errors = {};
				result.error.issues.forEach((issue) => {
					const key = issue.path[0] as keyof NewTeamForm;
					fieldErrors[key] = issue.message;
				});
				setFormErrors(fieldErrors);
				return;
			}

			const createTeamPayload = {
				...form,
				categories: selectedCategories,
				competitors: selectedMembers,
			};
			const res = await createTeam(tournament.code, createTeamPayload);
			const createdTeam = teamSchema.parse(res);
			successToast("Equipo creado con exito.");

			// Reset states
			setSelectedCategories([]);
			setSelectedMembers([]);
			setTeams([...teams, createdTeam]);
			setForm(emptyForm);
		} catch (err: any) {
			errorToast(err.message);
		} finally {
			// setLoading(false)
		}
	};

	return (
		<div
			className={`bg-elevated flex flex-col gap-2 shadow-lg justify-center p-3 rounded-lg`}
		>
			<div className="flex flex-col gap-3">
				<h1 className="font-extrabold text-2xl">Crear Equipo</h1>
				<div className="flex gap-2">
					<div
						className="flex-shrink-0 flex rounded-full overflow-ellipsis justify-center items-center bg-background text-orange text-5xl"
						style={{
							height: "130px",
							width: "130px",
						}}
					>
						{`${form.name
							.split(" ")
							.slice(0, 3)
							.map((word) => word.charAt(0).toUpperCase())
							.join("")}`}
					</div>
					<form
						onSubmit={handleSubmit}
						className="flex gap-y-4 gap-x-2 flex-1 items-center"
						id="create-team-form"
					>
						{/* <div className="flex items-center gap-1"> */}
						<FormInput
							variant="secondary"
							name="name"
							value={form.name}
							onChange={handleChange}
							error={formErrors?.name}
							title={<span className="text-muted">Nombre</span>}
						/>
					</form>
				</div>
				<SelectTeamCompetitors />
			</div>
		</div>
	);
};

export default CreateTeam;
